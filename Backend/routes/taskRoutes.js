const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  uploadTaskAttachment,
  deleteTaskAttachment,
  completeTask,
  assignTask,
  getTasksByEmployee,
  getTasksByClient,
  getTasksByStatus,
  getTaskStatistics,
} = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

// Base routes
router.route('/')
  .post(protect, admin, createTask)
  .get(protect, getTasks);

// Filtered task routes (these must come before /:id routes)
router.get('/statistics', protect, admin, getTaskStatistics);
router.get('/employee/:employeeId', protect, getTasksByEmployee);
router.get('/client/:clientId', protect, getTasksByClient);
router.get('/status/:status', protect, getTasksByStatus);

// Task by ID routes - these must come after other specific routes
router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, admin, updateTask)
  .delete(protect, admin, deleteTask);

// Task actions
router.put('/:id/complete', protect, completeTask);
router.put('/:id/assign', protect, admin, assignTask);

// File attachments
router.post(
  '/:id/attachments',
  protect, 
  upload.single('attachment'),
  uploadTaskAttachment
);

router.delete('/:id/attachments/:attachmentId', protect, deleteTaskAttachment);

module.exports = router;
