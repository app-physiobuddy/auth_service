const nodemailer = require('nodemailer');
require('dotenv').config();
const ErrorTypes = require('../../utilities/errors/ErrorTypes');



// Function to send an email
function emailProvider(userEmail, subject, text, html) {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
    const sendEmail = async () => {
      // Email configuration
      const mailOptions = {
        from: 'noreplyphysiobuddy.com',
        to: userEmail,
        subject: subject, 
        text: text,
        html: html
      };
      const info = await transporter.sendMail(mailOptions);
      if (info.accepted.length <= 0) {
        throw ErrorTypes.ServerError("Password couldn't be recovered by email");
      }
      return info
    }
    return {sendEmail}
    // Send email
}

module.exports = emailProvider