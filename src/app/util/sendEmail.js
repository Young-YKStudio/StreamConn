export const sendEmail = async (options) => {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'streamconnectservice@gmail.com',
      pass: 'xnrupxursatefrev'
    }
  })

  const mailOptions = {
    from: 'Stream Connect Service <service@streamconnect.com>',
    to: options.to,
    subject: options.subject,
    html: options.html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.log(err)
  }
}