const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel');
const Quotation = require('../models/quotationModel');
const Task = require('../models/taskModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Employee = require('../models/employeeModel');
const BlogPost = require('../models/blogPostModel');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
const getDashboardAnalytics = asyncHandler(async (req, res) => {
  // Today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 30 days ago
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  // 7 days ago
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  // Get counts
  const totalUsers = await User.countDocuments({ isAdmin: false });
  const newUsers = await User.countDocuments({ 
    isAdmin: false,
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  const totalAppointments = await Appointment.countDocuments();
  const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
  const todayAppointments = await Appointment.countDocuments({
    status: 'confirmed',
    preferredDateTime: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
    }
  });
  
  const totalQuotations = await Quotation.countDocuments();
  const pendingQuotations = await Quotation.countDocuments({ status: 'sent' });
  const acceptedQuotations = await Quotation.countDocuments({ status: 'accepted' });
  
  const totalTasks = await Task.countDocuments();
  const pendingTasks = await Task.countDocuments({ status: 'pending' });
  const completedTasks = await Task.countDocuments({ status: 'completed' });
  const todayTasks = await Task.countDocuments({
    startDate: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
    }
  });
  
  const totalProducts = await Product.countDocuments();
  const lowStockProducts = await Product.countDocuments({ countInStock: { $lt: 10 } });
  
  const totalOrders = await Order.countDocuments();
  const newOrders = await Order.countDocuments({ status: 'pending' });
  const processingOrders = await Order.countDocuments({ status: 'processing' });
  const shippedOrders = await Order.countDocuments({ status: 'shipped' });
  
  // Recent sales revenue
  const recentOrders = await Order.find({
    createdAt: { $gte: thirtyDaysAgo },
    isPaid: true
  });
  
  const totalRevenue = recentOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  
  // Weekly revenue breakdown
  const weeklyRevenue = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    const dailyOrders = await Order.find({
      createdAt: { $gte: date, $lt: nextDay },
      isPaid: true
    });
    
    const dailyRevenue = dailyOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    weeklyRevenue.push({
      date: date.toISOString().split('T')[0],
      revenue: dailyRevenue
    });
  }
  
  // Get appointment success rate
  const lastMonthAppointments = await Appointment.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  const lastMonthQuotations = await Quotation.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  const appointmentSuccessRate = lastMonthAppointments > 0 
    ? (lastMonthQuotations / lastMonthAppointments * 100).toFixed(2)
    : 0;
  
  // Get quote acceptance rate
  const sentQuotesLastMonth = await Quotation.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
    status: { $in: ['sent', 'accepted', 'rejected'] }
  });
  
  const acceptedQuotesLastMonth = await Quotation.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
    status: 'accepted'
  });
  
  const quoteAcceptanceRate = sentQuotesLastMonth > 0 
    ? (acceptedQuotesLastMonth / sentQuotesLastMonth * 100).toFixed(2)
    : 0;
  
  // Top selling products
  const topSellingProducts = await Order.aggregate([
    { $match: { isPaid: true } },
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.product',
        name: { $first: '$orderItems.name' },
        totalSold: { $sum: '$orderItems.qty' },
        revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 }
  ]);
  
  // Recent activity
  const recentActivities = await Promise.all([
    // Recent orders
    Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name')
      .lean()
      .then(orders => orders.map(order => ({
        type: 'order',
        id: order._id,
        title: `New order #${order.orderNumber}`,
        user: order.user ? order.user.name : 'Guest',
        timestamp: order.createdAt,
        amount: order.totalPrice,
        status: order.status
      }))),
      
    // Recent appointments
    Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .then(appointments => appointments.map(appointment => ({
        type: 'appointment',
        id: appointment._id,
        title: `New appointment request`,
        user: appointment.name,
        timestamp: appointment.createdAt,
        status: appointment.status,
        siteAddress: appointment.siteAddress
      }))),
      
    // Recent completed tasks
    Task.find({ status: 'completed' })
      .sort({ completedAt: -1 })
      .limit(5)
      .lean()
      .then(tasks => tasks.map(task => ({
        type: 'task',
        id: task._id,
        title: task.title,
        siteName: task.siteName,
        timestamp: task.completedAt || task.updatedAt,
        status: 'completed'
      }))),
      
    // Recent quotations
    Quotation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('client', 'name')
      .lean()
      .then(quotations => quotations.map(quotation => ({
        type: 'quotation',
        id: quotation._id,
        title: `Quotation #${quotation.quotationNumber}`,
        user: quotation.client ? quotation.client.name : 'Unknown',
        timestamp: quotation.createdAt,
        amount: quotation.totalAmount,
        status: quotation.status
      })))
  ]);
  
  // Flatten and sort by timestamp
  const allActivities = [
    ...recentActivities[0],
    ...recentActivities[1],
    ...recentActivities[2],
    ...recentActivities[3]
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
  
  res.json({
    counts: {
      users: {
        total: totalUsers,
        new: newUsers
      },
      appointments: {
        total: totalAppointments,
        pending: pendingAppointments,
        today: todayAppointments
      },
      quotations: {
        total: totalQuotations,
        pending: pendingQuotations,
        accepted: acceptedQuotations
      },
      tasks: {
        total: totalTasks,
        pending: pendingTasks,
        completed: completedTasks,
        today: todayTasks
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts
      },
      orders: {
        total: totalOrders,
        new: newOrders,
        processing: processingOrders,
        shipped: shippedOrders
      }
    },
    revenue: {
      total: totalRevenue,
      weekly: weeklyRevenue
    },
    rates: {
      appointmentSuccess: appointmentSuccessRate,
      quoteAcceptance: quoteAcceptanceRate
    },
    topProducts: topSellingProducts,
    recentActivity: allActivities
  });
});

// @desc    Get appointment analytics
// @route   GET /api/analytics/appointments
// @access  Private/Admin
const getAppointmentAnalytics = asyncHandler(async (req, res) => {
  // Define time periods
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  
  // Monthly breakdown of appointments
  const appointmentsByMonth = await Appointment.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear }
      }
    },
    {
      $group: {
        _id: { 
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' }
        },
        count: { $sum: 1 },
        confirmed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0]
          }
        },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        },
        cancelled: {
          $sum: {
            $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0]
          }
        }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);
  
  // Format the monthly data for easy consumption
  const months = [];
  for (let i = 0; i < 12; i++) {
    const monthData = appointmentsByMonth.find(
      m => m._id.month === i + 1 && m._id.year === today.getFullYear()
    );
    
    months.push({
      month: i + 1,
      name: new Date(today.getFullYear(), i, 1).toLocaleString('default', { month: 'long' }),
      total: monthData ? monthData.count : 0,
      confirmed: monthData ? monthData.confirmed : 0,
      completed: monthData ? monthData.completed : 0,
      cancelled: monthData ? monthData.cancelled : 0
    });
  }
  
  // Appointment conversion metrics
  const totalAppointments = await Appointment.countDocuments({ createdAt: { $gte: startOfYear } });
  const convertedToQuotations = await Appointment.countDocuments({ 
    createdAt: { $gte: startOfYear },
    quotation: { $ne: null }
  });
  
  const conversionRate = totalAppointments > 0 
    ? (convertedToQuotations / totalAppointments * 100).toFixed(2)
    : 0;
  
  // Average time to confirmation
  const confirmedAppointments = await Appointment.find({
    confirmedDateTime: { $exists: true, $ne: null }
  }).select('createdAt confirmedDateTime');
  
  let avgTimeToConfirmation = 0;
  if (confirmedAppointments.length > 0) {
    const totalTime = confirmedAppointments.reduce((sum, app) => {
      return sum + (new Date(app.confirmedDateTime) - new Date(app.createdAt));
    }, 0);
    avgTimeToConfirmation = totalTime / confirmedAppointments.length / (1000 * 60 * 60); // in hours
  }
  
  // Popular appointment times
  const popularTimes = await Appointment.aggregate([
    {
      $project: {
        hour: { $hour: '$preferredDateTime' }
      }
    },
    {
      $group: {
        _id: '$hour',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
  
  // Format for 24-hour clock
  const timeDistribution = Array(24).fill(0);
  popularTimes.forEach(time => {
    timeDistribution[time._id] = time.count;
  });
  
  res.json({
    monthly: months,
    conversion: {
      total: totalAppointments,
      converted: convertedToQuotations,
      rate: conversionRate
    },
    timing: {
      avgConfirmationTime: avgTimeToConfirmation.toFixed(2), // in hours
      popularTimes: timeDistribution
    }
  });
});

// @desc    Get task analytics
// @route   GET /api/analytics/tasks
// @access  Private/Admin
const getTaskAnalytics = asyncHandler(async (req, res) => {
  // Define time periods
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  
  // Task completion rate by month
  const tasksByMonth = await Task.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear }
      }
    },
    {
      $group: {
        _id: { 
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' }
        },
        total: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);
  
  // Format monthly data
  const months = [];
  for (let i = 0; i < 12; i++) {
    const monthData = tasksByMonth.find(
      m => m._id.month === i + 1 && m._id.year === today.getFullYear()
    );
    
    months.push({
      month: i + 1,
      name: new Date(today.getFullYear(), i, 1).toLocaleString('default', { month: 'long' }),
      total: monthData ? monthData.total : 0,
      completed: monthData ? monthData.completed : 0,
      completionRate: monthData && monthData.total > 0 
        ? (monthData.completed / monthData.total * 100).toFixed(2)
        : 0
    });
  }
  
  // Task distribution by priority
  const tasksByPriority = await Task.aggregate([
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        }
      }
    }
  ]);
  
  const priorityMap = {
    'low': { count: 0, completed: 0 },
    'medium': { count: 0, completed: 0 },
    'high': { count: 0, completed: 0 },
    'urgent': { count: 0, completed: 0 }
  };
  
  tasksByPriority.forEach(p => {
    if (priorityMap.hasOwnProperty(p._id)) {
      priorityMap[p._id] = {
        count: p.count,
        completed: p.completed,
        completionRate: p.count > 0 ? (p.completed / p.count * 100).toFixed(2) : 0
      };
    }
  });
  
  // Task distribution by employee role
  const tasksByRole = await Employee.aggregate([
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'assignedEmployees',
        as: 'assignedTasks'
      }
    },
    {
      $group: {
        _id: '$role',
        employeeCount: { $sum: 1 },
        totalTasks: { $sum: { $size: '$assignedTasks' } }
      }
    },
    {
      $project: {
        role: '$_id',
        employeeCount: 1,
        totalTasks: 1,
        tasksPerEmployee: { 
          $cond: [
            { $gt: ['$employeeCount', 0] },
            { $divide: ['$totalTasks', '$employeeCount'] },
            0
          ]
        }
      }
    },
    {
      $sort: { totalTasks: -1 }
    }
  ]);
  
  // Get SMS success rate
  const smsStats = await Task.aggregate([
    {
      $match: {
        smsSent: { $exists: true }
      }
    },
    {
      $group: {
        _id: null,
        totalSent: { $sum: { $cond: [{ $eq: ['$smsSent', true] }, 1, 0] } },
        successful: { 
          $sum: { 
            $cond: [
              { $and: [
                { $eq: ['$smsSent', true] }, 
                { $eq: ['$smsStatus', 'sent'] }
              ]}, 
              1, 
              0
            ] 
          } 
        }
      }
    }
  ]);
  
  let smsSuccessRate = 0;
  if (smsStats.length > 0 && smsStats[0].totalSent > 0) {
    smsSuccessRate = (smsStats[0].successful / smsStats[0].totalSent * 100).toFixed(2);
  }
  
  // Employee productivity (tasks completed per employee)
  const employeeProductivity = await Employee.aggregate([
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'completedBy',
        as: 'completedTasks'
      }
    },
    {
      $match: {
        'completedTasks.0': { $exists: true } // Only employees who completed at least one task
      }
    },
    {
      $project: {
        name: 1,
        role: 1,
        tasksCompleted: { $size: '$completedTasks' }
      }
    },
    {
      $sort: { tasksCompleted: -1 }
    },
    {
      $limit: 5 // Top 5 employees
    }
  ]);
  
  res.json({
    monthly: months,
    byPriority: priorityMap,
    byRole: tasksByRole,
    sms: {
      successRate: smsSuccessRate
    },
    topEmployees: employeeProductivity
  });
});

// @desc    Get sales analytics
// @route   GET /api/analytics/sales
// @access  Private/Admin
const getSalesAnalytics = asyncHandler(async (req, res) => {
  // Define time periods
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  
  // Monthly sales data
  const salesByMonth = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear },
        isPaid: true
      }
    },
    {
      $group: {
        _id: { 
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' }
        },
        orders: { $sum: 1 },
        revenue: { $sum: '$totalPrice' },
        shipping: { $sum: '$shippingPrice' },
        tax: { $sum: '$taxPrice' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);
  
  // Format monthly data
  const months = [];
  for (let i = 0; i < 12; i++) {
    const monthData = salesByMonth.find(
      m => m._id.month === i + 1 && m._id.year === today.getFullYear()
    );
    
    months.push({
      month: i + 1,
      name: new Date(today.getFullYear(), i, 1).toLocaleString('default', { month: 'long' }),
      orders: monthData ? monthData.orders : 0,
      revenue: monthData ? monthData.revenue : 0,
      shipping: monthData ? monthData.shipping : 0,
      tax: monthData ? monthData.tax : 0
    });
  }
  
  // Product category performance
  const categoryPerformance = await Order.aggregate([
    { $match: { isPaid: true } },
    { $unwind: '$orderItems' },
    {
      $lookup: {
        from: 'products',
        localField: 'orderItems.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$productDetails' },
    {
      $group: {
        _id: '$productDetails.category',
        orders: { $sum: 1 },
        items: { $sum: '$orderItems.qty' },
        revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } }
      }
    },
    { $sort: { revenue: -1 } }
  ]);
  
  // Payment method distribution
  const paymentMethods = await Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: '$paymentMethod',
        count: { $sum: 1 },
        total: { $sum: '$totalPrice' }
      }
    },
    { $sort: { count: -1 } }
  ]);
  
  // Order status distribution
  const orderStatusCounts = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const statusMap = {
    'pending': 0,
    'processing': 0,
    'shipped': 0,
    'delivered': 0,
    'cancelled': 0
  };
  
  orderStatusCounts.forEach(s => {
    if (statusMap.hasOwnProperty(s._id)) {
      statusMap[s._id] = s.count;
    }
  });
  
  // Customer purchasing patterns
  const customerPatterns = await User.aggregate([
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'user',
        as: 'orders'
      }
    },
    {
      $project: {
        name: 1,
        email: 1,
        orderCount: { $size: '$orders' },
        totalSpent: {
          $sum: {
            $map: {
              input: '$orders',
              as: 'order',
              in: { 
                $cond: [
                  { $eq: ['$$order.isPaid', true] },
                  '$$order.totalPrice',
                  0
                ]
              }
            }
          }
        }
      }
    },
    {
      $match: {
        orderCount: { $gt: 0 }
      }
    },
    {
      $sort: { totalSpent: -1 }
    },
    {
      $limit: 10
    }
  ]);
  
  res.json({
    monthly: months,
    categories: categoryPerformance,
    payments: paymentMethods,
    status: statusMap,
    topCustomers: customerPatterns,
    yearToDate: {
      revenue: months.reduce((sum, m) => sum + m.revenue, 0),
      orders: months.reduce((sum, m) => sum + m.orders, 0)
    }
  });
});

// @desc    Get website analytics
// @route   GET /api/analytics/website
// @access  Private/Admin
const getWebsiteAnalytics = asyncHandler(async (req, res) => {
  // For a real implementation, you'd integrate with Google Analytics API
  // This is a placeholder that returns some sample data
  
  // Blog post performance
  const blogPerformance = await BlogPost.aggregate([
    { $match: { status: 'published' } },
    { $sort: { views: -1 } },
    { $limit: 10 },
    {
      $project: {
        title: 1,
        slug: 1,
        views: 1,
        language: 1,
        publishedAt: 1,
        commentCount: { $size: '$comments' }
      }
    }
  ]);
  
  // Blog performance by language
  const blogByLanguage = await BlogPost.aggregate([
    {
      $group: {
        _id: '$language',
        posts: { $sum: 1 },
        views: { $sum: '$views' },
        comments: { $sum: { $size: '$comments' } }
      }
    }
  ]);
  
  // Sample traffic sources data (in a real app this would come from Google Analytics)
  const trafficSources = [
    { source: 'Organic Search', visits: 1845, percentage: 42.5 },
    { source: 'Direct', visits: 1024, percentage: 23.6 },
    { source: 'Social Media', visits: 728, percentage: 16.8 },
    { source: 'Referral', visits: 516, percentage: 11.9 },
    { source: 'Email', visits: 227, percentage: 5.2 }
  ];
  
  // Sample page performance data (in a real app this would come from Google Analytics)
  const pagePerformance = [
    { path: '/', pageviews: 3245, uniqueViews: 2456, avgTimeOnPage: 123, bounceRate: 32.4 },
    { path: '/products', pageviews: 1876, uniqueViews: 1435, avgTimeOnPage: 95, bounceRate: 28.7 },
    { path: '/contact', pageviews: 952, uniqueViews: 872, avgTimeOnPage: 65, bounceRate: 25.2 },
    { path: '/blog', pageviews: 725, uniqueViews: 601, avgTimeOnPage: 187, bounceRate: 18.9 },
    { path: '/about', pageviews: 489, uniqueViews: 421, avgTimeOnPage: 72, bounceRate: 22.3 }
  ];
  
  // Sample device data (in a real app this would come from Google Analytics)
  const deviceData = [
    { device: 'Mobile', sessions: 2345, percentage: 54.2 },
    { device: 'Desktop', sessions: 1567, percentage: 36.2 },
    { device: 'Tablet', sessions: 418, percentage: 9.6 }
  ];
  
  // Sample conversion data (in a real app this would come from Google Analytics)
  const conversionData = {
    appointmentRequests: {
      total: 128,
      conversionRate: 4.2
    },
    contactFormSubmissions: {
      total: 95,
      conversionRate: 3.1
    },
    productPurchases: {
      total: 57,
      conversionRate: 1.9
    },
    totalVisitors: 3045
  };
  
  res.json({
    blog: {
      topPosts: blogPerformance,
      byLanguage: blogByLanguage
    },
    traffic: {
      sources: trafficSources,
      pages: pagePerformance,
      devices: deviceData
    },
    conversions: conversionData
  });
});

module.exports = {
  getDashboardAnalytics,
  getAppointmentAnalytics,
  getTaskAnalytics,
  getSalesAnalytics,
  getWebsiteAnalytics,
};
