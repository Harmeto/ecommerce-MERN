const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')

/**
 * Envia correo a usuario
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no encuentra usuarios
 * @returns {Promise<void>} 
 */
const sendEmail = asyncHandler(async(data, _, res) =>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_SECRET_KEY
    }
  })

  let info = await transporter.sendMail({
    from:'"Hey :turtle: <abc@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  })

  console.log("message sent: %s", info.messageId);

  console.log("preview url: %s", nodemailer.getTestMessageUrl(info));
})

module.exports = sendEmail