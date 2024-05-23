const nodemailer = require('nodemailer');

let myAddress = "oguzhanfatihkucuk@gmail.com";
let content = "Recipe Information 23.05.1201";

console.log(myAddress);
console.log(content);
const updateEmail = (newadress,newcontent) => {

  myAddress = newadress;
  content = newcontent;
  console.log("asdaasdddddd"+myAddress);
  sendEmail();
};


function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your provider's SMTP server
    port: 587, // Port may vary depending on your provider
    secure: false, // Use true for TLS, false for non-TLS (consult your provider)
    auth: {
      user: 'oguzhanfatihk@gmail.com', // Replace with your email address
      pass: 'dxisgisvngdjogcs' // Replace with your email password
    }
  });

  const mailOptions = {
    from: 'oguzhanfatihk@gmail.com', // Replace with your email address
    to: myAddress, // Replace with the recipient's email address
    subject: 'Sending Email using Nodemailer', // Replace with your desired subject
    text: content, // Plain text content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

sendEmail();

module.exports = {
  myAddress,
  content,
  updateEmail
};
