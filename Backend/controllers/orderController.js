const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/emailService');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Check if all products are in stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.name}`);
    }
    
    if (product.countInStock < item.qty) {
      res.status(400);
      throw new Error(`${product.name} is out of stock`);
    }
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  if (order) {
    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.qty },
      });
    }

    // Send confirmation email
    const emailContent = `
      <h1>Order Confirmation</h1>
      <p>Hello ${req.user.name},</p>
      <p>Thank you for your order with Kamal Iron Works. Here are your order details:</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Order Total:</strong> LKR ${totalPrice.toFixed(2)}</p>
      <h2>Items Ordered:</h2>
      <ul>
        ${orderItems.map(item => `
          <li>${item.name} x ${item.qty} - LKR ${item.price.toFixed(2)}</li>
        `).join('')}
      </ul>
      <p>You can track your order status by logging into your account.</p>
      <p><a href="${process.env.FRONTEND_URL}/orders/${order._id}">View Order Details</a></p>
      <p>Best Regards,<br>Kamal Iron Works Team</p>
    `;
    
    try {
      await sendEmail({
        email: req.user.email,
        subject: `Order Confirmation #${order.orderNumber} - Kamal Iron Works`,
        html: emailContent,
      });
    } catch (error) {
      console.error('Order confirmation email sending error:', error);
    }

    // Send notification to admin
    try {
      const adminEmailContent = `
        <h1>New Order Received</h1>
        <p>A new order has been placed:</p>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Customer:</strong> ${req.user.name} (${req.user.email})</p>
        <p><strong>Order Total:</strong> LKR ${totalPrice.toFixed(2)}</p>
        <p>Please log in to the admin panel to process this order.</p>
      `;
      
      await sendEmail({
        email: process.env.EMAIL_FROM,
        subject: `New Order #${order.orderNumber} - Kamal Iron Works`,
        html: adminEmailContent,
      });
    } catch (error) {
      console.error('Admin notification email sending error:', error);
    }

    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error('Invalid order data');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    // Check if the user is the owner or an admin
    if (req.user.isAdmin || order.user._id.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'processing';
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address || req.user.email,
    };

    const updatedOrder = await order.save();

    // Send payment confirmation email
    const emailContent = `
      <h1>Payment Confirmation</h1>
      <p>Hello ${req.user.name},</p>
      <p>We have received your payment for order #${order.orderNumber}.</p>
      <p>Your order is now being processed.</p>
      <p><strong>Payment Amount:</strong> LKR ${order.totalPrice.toFixed(2)}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <p><strong>Payment Date:</strong> ${new Date(order.paidAt).toLocaleDateString()}</p>
      <p>You can track your order status by logging into your account.</p>
      <p><a href="${process.env.FRONTEND_URL}/orders/${order._id}">View Order Details</a></p>
      <p>Best Regards,<br>Kamal Iron Works Team</p>
    `;
    
    try {
      await sendEmail({
        email: req.user.email,
        subject: `Payment Received for Order #${order.orderNumber} - Kamal Iron Works`,
        html: emailContent,
      });
    } catch (error) {
      console.error('Payment confirmation email sending error:', error);
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'delivered';
    
    if (req.body.trackingNumber) {
      order.trackingNumber = req.body.trackingNumber;
    }

    const updatedOrder = await order.save();

    // Send delivery notification email to customer
    const user = await User.findById(order.user);
    
    if (user && user.email) {
      const emailContent = `
        <h1>Your Order Has Been Delivered</h1>
        <p>Hello ${user.name},</p>
        <p>Your order #${order.orderNumber} has been delivered.</p>
        <p><strong>Delivery Date:</strong> ${new Date(order.deliveredAt).toLocaleDateString()}</p>
        ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
        <p>Thank you for shopping with Kamal Iron Works!</p>
        <p>If you have any questions or concerns about your order, please contact us.</p>
        <p>Best Regards,<br>Kamal Iron Works Team</p>
      `;
      
      try {
        await sendEmail({
          email: user.email,
          subject: `Order #${order.orderNumber} Delivered - Kamal Iron Works`,
          html: emailContent,
        });
      } catch (error) {
        console.error('Delivery notification email sending error:', error);
      }
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, notes, trackingNumber } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  
  if (notes !== undefined) {
    order.notes = notes;
  }
  
  if (trackingNumber !== undefined) {
    order.trackingNumber = trackingNumber;
  }
  
  // Update delivery status if appropriate
  if (status === 'delivered' && !order.isDelivered) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  
  // Update payment status if marked as paid by admin
  if (status === 'processing' && !order.isPaid && req.body.markAsPaid) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: `admin-${Date.now()}`,
      status: 'completed',
      update_time: new Date().toISOString(),
      email_address: 'admin-update',
    };
  }

  const updatedOrder = await order.save();
  
  // Send status update email to customer
  const user = await User.findById(order.user);
  
  if (user && user.email) {
    const statusMessages = {
      'processing': 'Your order is now being processed.',
      'shipped': 'Your order has been shipped and is on its way to you.',
      'delivered': 'Your order has been delivered.',
      'cancelled': 'Your order has been cancelled.'
    };
    
    const statusMessage = statusMessages[status] || `Your order status has been updated to: ${status}`;
    
    const emailContent = `
      <h1>Order Status Update</h1>
      <p>Hello ${user.name},</p>
      <p>${statusMessage}</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
      ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
      <p>You can track your order by logging into your account.</p>
      <p><a href="${process.env.FRONTEND_URL}/orders/${order._id}">View Order Details</a></p>
      <p>Best Regards,<br>Kamal Iron Works Team</p>
    `;
    
    try {
      await sendEmail({
        email: user.email,
        subject: `Order #${order.orderNumber} Update - Kamal Iron Works`,
        html: emailContent,
      });
    } catch (error) {
      console.error('Status update email sending error:', error);
    }
  }

  res.json(updatedOrder);
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // If order is not cancelled and not delivered, restore product quantities
    if (order.status !== 'cancelled' && !order.isDelivered) {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { countInStock: item.qty },
        });
      }
    }

    await order.remove();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getUserOrders,
  deleteOrder,
};
