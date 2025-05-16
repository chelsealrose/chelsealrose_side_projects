require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const mailOptions = {
    from: `"${name}" <${email}>`, // sender address
    to: process.env.RECEIVER_EMAIL, // your receiving email
    subject: 'New RV Leasing Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)
    res.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
