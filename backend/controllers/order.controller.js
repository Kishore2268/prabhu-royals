const Order = require('../models/order.model');
const Notification = require('../models/notification.model');
const asyncHandler = require('express-async-handler');
const { sendOrderConfirmationEmail, sendOrderNotificationEmail } = require('../utils/email');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private/Admin
exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create(req.body);

  // Send order confirmation email to user
  await sendOrderConfirmationEmail(order);

  // Create notification for new order
  await Notification.create({
    title: 'New Order Received',
    message: `Order #${order._id} has been received from ${order.user.name}`,
    type: 'order',
    data: { orderId: order._id }
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  const oldStatus = order.orderStatus;
  order.orderStatus = req.body.orderStatus;
  await order.save();

  // Create notification for status change
  if (oldStatus !== order.orderStatus) {
    await Notification.create({
      title: 'Order Status Updated',
      message: `Order #${order._id} status changed from ${oldStatus} to ${order.orderStatus}`,
      type: 'order',
      data: { orderId: order._id }
    });
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  await order.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 