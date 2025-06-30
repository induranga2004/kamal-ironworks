const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Base routes
router.route('/')
  .get(protect, admin, getOrders)
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getUserOrders);

// Order by ID routes - must come after other specific routes
router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

router.route('/:id/delete')
  .delete(protect, admin, deleteOrder);

module.exports = router;
