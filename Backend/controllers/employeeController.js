const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    role,
    phone,
    email,
    address,
    nic,
    joinDate,
    emergencyContact,
    skills,
  } = req.body;

  // Check if phone number already exists
  const employeeExists = await Employee.findOne({ phone });
  if (employeeExists) {
    res.status(400);
    throw new Error('Employee with this phone number already exists');
  }

  const employee = await Employee.create({
    name,
    role,
    phone,
    email: email || '',
    address: address || '',
    nic: nic || '',
    joinDate: joinDate || Date.now(),
    emergencyContact: emergencyContact || {},
    skills: skills || [],
    status: 'active',
    createdBy: req.user._id,
  });

  if (employee) {
    res.status(201).json(employee);
  } else {
    res.status(400);
    throw new Error('Invalid employee data');
  }
});

// @desc    Upload employee avatar
// @route   PUT /api/employees/:id/avatar
// @access  Private/Admin
const uploadEmployeeAvatar = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Check if file is in the request
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Delete previous avatar if it exists
  if (employee.avatar && employee.avatar.publicId) {
    await deleteFile(employee.avatar.publicId);
  }

  // Upload new avatar
  const uploadResult = await uploadFile(req.file, 'employees/avatars');

  if (!uploadResult.success) {
    res.status(500);
    throw new Error('File upload failed');
  }

  // Update employee with avatar info
  employee.avatar = {
    url: uploadResult.url,
    publicId: uploadResult.public_id,
  };

  const updatedEmployee = await employee.save();
  res.json(updatedEmployee);
});

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({}).sort({ name: 1 });
  res.json(employees);
});

// @desc    Get employees by role
// @route   GET /api/employees/role/:role
// @access  Private/Admin
const getEmployeesByRole = asyncHandler(async (req, res) => {
  const { role } = req.params;
  const employees = await Employee.find({ role, status: 'active' }).sort({ name: 1 });
  res.json(employees);
});

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private/Admin
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate('tasks');

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.role = req.body.role || employee.role;
    employee.phone = req.body.phone || employee.phone;
    employee.email = req.body.email !== undefined ? req.body.email : employee.email;
    employee.address = req.body.address !== undefined ? req.body.address : employee.address;
    employee.nic = req.body.nic !== undefined ? req.body.nic : employee.nic;
    employee.joinDate = req.body.joinDate || employee.joinDate;
    employee.emergencyContact = req.body.emergencyContact || employee.emergencyContact;
    employee.status = req.body.status || employee.status;
    employee.skills = req.body.skills || employee.skills;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    // Delete avatar if it exists
    if (employee.avatar && employee.avatar.publicId) {
      await deleteFile(employee.avatar.publicId);
    }
    
    await employee.remove();
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

module.exports = {
  createEmployee,
  uploadEmployeeAvatar,
  getEmployees,
  getEmployeesByRole,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
