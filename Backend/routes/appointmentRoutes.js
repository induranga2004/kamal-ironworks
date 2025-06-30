const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getUserAppointments,
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', createAppointment);
router.get('/', protect, admin, getAppointments);
router.get('/my-appointments', protect, getUserAppointments);
router.get('/:id', protect, getAppointmentById);
router.put('/:id', protect, admin, updateAppointment);
router.delete('/:id', protect, admin, deleteAppointment);

module.exports = router;
