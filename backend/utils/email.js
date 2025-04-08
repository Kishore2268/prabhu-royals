const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Define email options
  const message = {
    from: `${process.env.SMTP_USER}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Send email
  await transporter.sendMail(message);
};

const sendOrderConfirmationEmail = async (order) => {
  const message = `
    <h2>Thank you for your order!</h2>
    <p>Order ID: ${order._id}</p>
    <p>Total Amount: $${order.totalPrice}</p>
    <h3>Order Details:</h3>
    <ul>
      ${order.orderItems.map(item => `
        <li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>
      `).join('')}
    </ul>
    <p>We will process your order shortly.</p>
  `;

  await sendEmail({
    email: order.user.email,
    subject: 'Order Confirmation',
    message: 'Thank you for your order!',
    html: message
  });
};

const sendOrderNotificationEmail = async (order) => {
  const message = `
    <h2>New Order Received!</h2>
    <p>Order ID: ${order._id}</p>
    <p>Customer: ${order.user.name}</p>
    <p>Email: ${order.user.email}</p>
    <p>Total Amount: $${order.totalPrice}</p>
    <h3>Order Details:</h3>
    <ul>
      ${order.orderItems.map(item => `
        <li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>
      `).join('')}
    </ul>
  `;

  await sendEmail({
    email: process.env.ADMIN_EMAIL,
    subject: 'New Order Notification',
    message: 'A new order has been received!',
    html: message
  });
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
  sendOrderNotificationEmail
}; 