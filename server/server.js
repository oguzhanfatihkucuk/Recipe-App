const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

const sendEmail = (myAddress, content) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'oguzhanfatihk@gmail.com',
      pass: '################'
    }
  });

  const mailOptions = {
    from: 'oguzhanfatihk@gmail.com',
    to: myAddress,
    subject: 'Sending Email using Nodemailer',
    text: content
  };

  return transporter.sendMail(mailOptions);
};

app.post('/send-email', async (req, res) => {
  const { myAddress, content } = req.body;

  try {
    const info = await sendEmail(myAddress, content);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
