const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getSalesAnalytics,
  getAppointmentAnalytics,
  getTaskAnalytics,
  getWebsiteAnalytics,
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

// All analytics routes require admin access
router.use(protect, admin);

// Dashboard overview
router.get('/dashboard', getDashboardAnalytics);

// Detailed analytics routes
router.get('/sales', getSalesAnalytics);
router.get('/appointments', getAppointmentAnalytics);
router.get('/tasks', getTaskAnalytics);
router.get('/website', getWebsiteAnalytics);

module.exports = router;
