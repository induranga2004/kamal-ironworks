const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const Employee = require('../models/employeeModel');
const { sendSMS, formatTaskSMS } = require('../utils/smsService');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    siteName,
    siteAddress,
    startDate,
    startTime,
    endDate,
    endTime,
    priority,
    assignedEmployees,
    client,
    appointment,
    quotation,
    notes,
    status,
  } = req.body;

  const task = await Task.create({
    title,
    description,
    siteName,
    siteAddress,
    startDate,
    startTime,
    endDate,
    endTime,
    priority: priority || 'medium',
    assignedEmployees: assignedEmployees || [],
    client,
    appointment,
    quotation,
    notes: notes || '',
    status: status || 'pending',
    createdBy: req.user._id,
  });

  if (task) {
    // Update employee task lists
    if (assignedEmployees && assignedEmployees.length > 0) {
      for (const employeeId of assignedEmployees) {
        await Employee.findByIdAndUpdate(
          employeeId,
          { $push: { tasks: task._id } }
        );
      }
    }

    // Send SMS to assigned employees if requested
    if (req.body.sendSMS && assignedEmployees && assignedEmployees.length > 0) {
      // Format date for SMS
      const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      for (const employeeId of assignedEmployees) {
        try {
          const employee = await Employee.findById(employeeId);
          if (employee && employee.phone) {
            const message = formatTaskSMS(
              description,
              siteName,
              formattedDate,
              startTime
            );

            const smsResult = await sendSMS(employee.phone, message);

            if (smsResult.success) {
              task.smsSent = true;
              task.smsTimestamp = Date.now();
              task.smsStatus = 'sent';
            } else {
              task.smsStatus = `Error: ${smsResult.error}`;
            }

            await task.save();
          }
        } catch (error) {
          console.error(`Error sending SMS to employee ${employeeId}:`, error);
        }
      }
    }

    res.status(201).json(task);
  } else {
    res.status(400);
    throw new Error('Invalid task data');
  }
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private/Admin
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({})
    .populate('assignedEmployees', 'name role phone')
    .populate('client', 'name email phone')
    .populate('createdBy', 'name')
    .populate('completedBy', 'name')
    .sort({ startDate: 1, startTime: 1 });
    
  res.json(tasks);
});

// @desc    Get tasks by date range
// @route   GET /api/tasks/range
// @access  Private/Admin
const getTasksByDateRange = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate) {
    res.status(400);
    throw new Error('Start date is required');
  }
  
  const start = new Date(startDate);
  let end;
  
  if (endDate) {
    end = new Date(endDate);
  } else {
    // If no end date is provided, default to 7 days from start
    end = new Date(start);
    end.setDate(end.getDate() + 7);
  }
  
  const tasks = await Task.find({
    startDate: { $gte: start, $lte: end }
  })
    .populate('assignedEmployees', 'name role phone')
    .populate('client', 'name email phone')
    .populate('createdBy', 'name')
    .sort({ startDate: 1, startTime: 1 });
    
  res.json(tasks);
});

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private/Admin
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedEmployees', 'name role phone')
    .populate('client', 'name email phone')
    .populate('appointment', 'preferredDateTime status')
    .populate('quotation', 'quotationNumber totalAmount')
    .populate('createdBy', 'name')
    .populate('completedBy', 'name');

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Get current assigned employees to compare changes
  const currentEmployees = [...task.assignedEmployees];
  const newEmployees = req.body.assignedEmployees || currentEmployees;
  
  // Check for employees to remove
  const employeesToRemove = currentEmployees.filter(
    id => !newEmployees.includes(id.toString())
  );
  
  // Check for new employees to add
  const employeesToAdd = newEmployees.filter(
    id => !currentEmployees.includes(id.toString()) && !currentEmployees.map(e => e.toString()).includes(id)
  );
  
  // Update task fields
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.siteName = req.body.siteName || task.siteName;
  task.siteAddress = req.body.siteAddress || task.siteAddress;
  task.startDate = req.body.startDate || task.startDate;
  task.startTime = req.body.startTime || task.startTime;
  task.endDate = req.body.endDate !== undefined ? req.body.endDate : task.endDate;
  task.endTime = req.body.endTime !== undefined ? req.body.endTime : task.endTime;
  task.priority = req.body.priority || task.priority;
  task.notes = req.body.notes !== undefined ? req.body.notes : task.notes;
  
  // Update status and set completed info if needed
  if (req.body.status && req.body.status !== task.status) {
    task.status = req.body.status;
    
    if (req.body.status === 'completed' && task.status !== 'completed') {
      task.completedBy = req.body.completedBy || null;
      task.completedAt = Date.now();
    }
  }
  
  // Update assigned employees
  task.assignedEmployees = newEmployees;
  
  const updatedTask = await task.save();
  
  // Handle employee task list updates
  // Remove task from employees no longer assigned
  for (const employeeId of employeesToRemove) {
    await Employee.findByIdAndUpdate(
      employeeId,
      { $pull: { tasks: task._id } }
    );
  }
  
  // Add task to newly assigned employees
  for (const employeeId of employeesToAdd) {
    await Employee.findByIdAndUpdate(
      employeeId,
      { $push: { tasks: task._id } }
    );
  }
  
  // Send SMS to new employees if requested
  if (req.body.sendSMS && employeesToAdd.length > 0) {
    // Format date for SMS
    const formattedDate = new Date(task.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    for (const employeeId of employeesToAdd) {
      try {
        const employee = await Employee.findById(employeeId);
        if (employee && employee.phone) {
          const message = formatTaskSMS(
            task.description,
            task.siteName,
            formattedDate,
            task.startTime
          );

          const smsResult = await sendSMS(employee.phone, message);

          if (smsResult.success) {
            task.smsSent = true;
            task.smsTimestamp = Date.now();
            task.smsStatus = 'sent';
            await task.save();
          } else {
            console.error(`SMS sending error:`, smsResult.error);
          }
        }
      } catch (error) {
        console.error(`Error sending SMS to employee ${employeeId}:`, error);
      }
    }
  }

  res.json(updatedTask);
});

// @desc    Send task SMS reminder
// @route   POST /api/tasks/:id/send-sms
// @access  Private/Admin
const sendTaskSMS = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (!task.assignedEmployees || task.assignedEmployees.length === 0) {
    res.status(400);
    throw new Error('No employees assigned to this task');
  }

  // Format date for SMS
  const formattedDate = new Date(task.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const employeeId of task.assignedEmployees) {
    try {
      const employee = await Employee.findById(employeeId);
      if (employee && employee.phone) {
        const message = formatTaskSMS(
          task.description,
          task.siteName,
          formattedDate,
          task.startTime
        );

        const smsResult = await sendSMS(employee.phone, message);

        if (smsResult.success) {
          successCount++;
        } else {
          failCount++;
        }

        results.push({
          employeeId: employee._id,
          name: employee.name,
          phone: employee.phone,
          success: smsResult.success,
          error: smsResult.error || null,
        });
      }
    } catch (error) {
      console.error(`Error sending SMS to employee ${employeeId}:`, error);
      failCount++;
      results.push({
        employeeId,
        success: false,
        error: error.message,
      });
    }
  }

  if (successCount > 0) {
    task.smsSent = true;
    task.smsTimestamp = Date.now();
    task.smsStatus = failCount > 0 ? 'partial' : 'sent';
    await task.save();
  }

  res.json({
    success: successCount > 0,
    totalSent: successCount,
    totalFailed: failCount,
    results,
  });
});

// @desc    Upload task attachment
// @route   PUT /api/tasks/:id/attachments
// @access  Private/Admin
const uploadTaskAttachment = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if file is in the request
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Upload file
  const uploadResult = await uploadFile(req.file, 'tasks/attachments');

  if (!uploadResult.success) {
    res.status(500);
    throw new Error('File upload failed');
  }

  // Add attachment to task
  const attachment = {
    url: uploadResult.url,
    publicId: uploadResult.public_id,
    name: req.file.originalname,
    type: req.file.mimetype,
  };

  task.attachments.push(attachment);
  const updatedTask = await task.save();

  res.json(updatedTask);
});

// @desc    Delete task attachment
// @route   DELETE /api/tasks/:id/attachments/:attachmentId
// @access  Private/Admin
const deleteTaskAttachment = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const attachment = task.attachments.find(a => a._id.toString() === req.params.attachmentId);

  if (!attachment) {
    res.status(404);
    throw new Error('Attachment not found');
  }

  // Delete from cloud storage
  if (attachment.publicId) {
    await deleteFile(attachment.publicId);
  }

  // Remove from task
  task.attachments = task.attachments.filter(a => a._id.toString() !== req.params.attachmentId);
  const updatedTask = await task.save();

  res.json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Delete all attachments
  for (const attachment of task.attachments) {
    if (attachment.publicId) {
      await deleteFile(attachment.publicId);
    }
  }

  // Remove task from employee lists
  for (const employeeId of task.assignedEmployees) {
    await Employee.findByIdAndUpdate(
      employeeId,
      { $pull: { tasks: task._id } }
    );
  }

  await task.remove();
  res.json({ message: 'Task removed' });
});

// @desc    Get tasks by employee
// @route   GET /api/tasks/employee/:employeeId
// @access  Private
const getTasksByEmployee = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedEmployees: req.params.employeeId })
    .sort({ createdAt: -1 })
    .populate('client', 'name email')
    .populate('assignedEmployees', 'name phone');

  res.json(tasks);
});

// @desc    Get tasks by client
// @route   GET /api/tasks/client/:clientId
// @access  Private
const getTasksByClient = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ client: req.params.clientId })
    .sort({ createdAt: -1 })
    .populate('assignedEmployees', 'name phone');

  res.json(tasks);
});

// @desc    Get tasks by status
// @route   GET /api/tasks/status/:status
// @access  Private
const getTasksByStatus = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ status: req.params.status })
    .sort({ createdAt: -1 })
    .populate('client', 'name email')
    .populate('assignedEmployees', 'name phone');

  res.json(tasks);
});

// @desc    Complete a task
// @route   PUT /api/tasks/:id/complete
// @access  Private
const completeTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.status = 'completed';
  task.completedAt = Date.now();
  task.completedBy = req.user._id;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc    Assign a task
// @route   PUT /api/tasks/:id/assign
// @access  Private/Admin
const assignTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Update assigned employees
  if (task.assignedEmployees && task.assignedEmployees.length > 0) {
    // Remove task from previous employees' task lists
    for (const employeeId of task.assignedEmployees) {
      await Employee.findByIdAndUpdate(
        employeeId,
        { $pull: { tasks: task._id } }
      );
    }
  }

  // Get new assigned employees from request body
  const { assignedEmployees } = req.body;
  
  task.assignedEmployees = assignedEmployees || [];
  
  // Add task to new employees' task lists
  if (assignedEmployees && assignedEmployees.length > 0) {
    for (const employeeId of assignedEmployees) {
      await Employee.findByIdAndUpdate(
        employeeId,
        { $push: { tasks: task._id } }
      );
    }
  }

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc    Get task statistics
// @route   GET /api/tasks/statistics
// @access  Private/Admin
const getTaskStatistics = asyncHandler(async (req, res) => {
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: 'completed' });
  const pendingTasks = await Task.countDocuments({ status: 'pending' });
  const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });

  // Get tasks by priority
  const highPriorityTasks = await Task.countDocuments({ priority: 'high' });
  const mediumPriorityTasks = await Task.countDocuments({ priority: 'medium' });
  const lowPriorityTasks = await Task.countDocuments({ priority: 'low' });

  // Get tasks completed this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const tasksCompletedThisMonth = await Task.countDocuments({
    status: 'completed',
    completedAt: { $gte: startOfMonth }
  });

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    tasksCompletedThisMonth,
    completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
  });
});

module.exports = {
  createTask,
  getTasks,
  getTasksByDateRange,
  getTaskById,
  updateTask,
  sendTaskSMS,
  uploadTaskAttachment,
  deleteTaskAttachment,
  deleteTask,
  getTasksByEmployee,
  getTasksByClient,
  getTasksByStatus,
  getTaskStatistics,
  completeTask,
  assignTask,
};
