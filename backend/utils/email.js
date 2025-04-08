const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    });

    // Verify connection configuration
    await transporter.verify();
    console.log('Email server connection verified');

    // Define email options
    const message = {
      from: `${process.env.SMTP_FROM_NAME || 'Royal Mobiles'} <${process.env.SMTP_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    // Send email
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw the error, just log it
    return { error: error.message };
  }
};

const sendOrderConfirmationEmail = async (order) => {
  try {
    const message = `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Total Amount: ₹${order.totalPrice}</p>
      <h3>Order Details:</h3>
      <ul>
        ${order.orderItems.map(item => `
          <li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>
        `).join('')}
      </ul>
      <p>We will process your order shortly.</p>
    `;

    return await sendEmail({
      email: order.user.email,
      subject: 'Order Confirmation',
      message: 'Thank you for your order!',
      html: message
    });
  } catch (error) {
    console.error('Error in sendOrderConfirmationEmail:', error);
    return { error: error.message };
  }
};

const sendOrderNotificationEmail = async (order) => {
  try {
    const message = `
      <h2>New Order Received!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Customer: ${order.user.name}</p>
      <p>Email: ${order.user.email}</p>
      <p>Total Amount: ₹${order.totalPrice}</p>
      <h3>Order Details:</h3>
      <ul>
        ${order.orderItems.map(item => `
          <li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>
        `).join('')}
      </ul>
    `;

    return await sendEmail({
      email: process.env.ADMIN_EMAIL,
      subject: 'New Order Notification',
      message: 'A new order has been received!',
      html: message
    });
  } catch (error) {
    console.error('Error in sendOrderNotificationEmail:', error);
    return { error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
  sendOrderNotificationEmail
}; 