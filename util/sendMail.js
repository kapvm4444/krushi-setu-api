const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendMail = catchAsync(async (options) => {
  //initiate the nodemailer with host, port, user, pass
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //config the options for mail
  const emailOptions = {
    from: 'KrishiSetu Support <support@krushisetu.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  //send the mail
  await transporter.sendMail(emailOptions);
});

module.exports = sendMail;
