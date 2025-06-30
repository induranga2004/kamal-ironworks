const express = require('express');
const router = express.Router();
const {
  initiateGoogleAuth,
  handleGoogleCallback,
  listCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  syncAppointments,
  getUserCalendarSettings,
  updateUserCalendarSettings,
} = require('../controllers/calendarController');
const { protect, admin } = require('../middleware/authMiddleware');

// Auth routes
router.get('/auth', protect, initiateGoogleAuth);
router.get('/callback', protect, handleGoogleCallback);

// Calendar events management
router.get('/events', protect, listCalendarEvents);
router.post('/events', protect, createCalendarEvent);
router.put('/events/:eventId', protect, updateCalendarEvent);
router.delete('/events/:eventId', protect, deleteCalendarEvent);

// Sync appointments with Google Calendar
router.post('/sync', protect, syncAppointments);

// User calendar settings
router.get('/settings', protect, getUserCalendarSettings);
router.put('/settings', protect, updateUserCalendarSettings);

module.exports = router;
