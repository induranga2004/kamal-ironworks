const express = require('express');
const router = express.Router();
const {
  createEmployee,
  uploadEmployeeAvatar,
  getEmployees,
  getEmployeesByRole,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

router.post('/', protect, admin, createEmployee);
router.put('/:id/avatar', protect, admin, upload.single('avatar'), uploadEmployeeAvatar);
router.get('/', protect, admin, getEmployees);
router.get('/role/:role', protect, admin, getEmployeesByRole);
router.get('/:id', protect, admin, getEmployeeById);
router.put('/:id', protect, admin, updateEmployee);
router.delete('/:id', protect, admin, deleteEmployee);

module.exports = router;
