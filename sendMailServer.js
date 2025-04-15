// sendMailServer.js
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 2525,
  secure: false, // use true if using TLS (port 465)
  tls: {
    rejectUnauthorized: false,
  },
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: 'shubhamgupta.poxcoin@gmail.com',
      to,
      subject,
      text,
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 Email sender server running on http://localhost:3000');
});
