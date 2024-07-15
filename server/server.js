const express = require('express'); // Express kütüphanesini dahil et
const nodemailer = require('nodemailer'); // Nodemailer kütüphanesini dahil et
const bodyParser = require('body-parser'); // İstemci verilerini almak için body-parser'ı dahil et
const cors = require('cors'); // CORS ayarları için cors kütüphanesini dahil et

const app = express(); // Express uygulaması oluştur
const port = 3002; // Sunucu için port numarasını ayarla

app.use(bodyParser.json()); // Gelen JSON verilerini işlemek için body-parser'ı kullan
app.use(cors()); // CORS'u etkinleştir

// E-posta göndermek için bir fonksiyon tanımla
const sendEmail = (myAddress, content) => {
  const transporter = nodemailer.createTransport({ // E-posta gönderimi için transporter oluştur
    host: 'smtp.gmail.com', // Gmail SMTP sunucusu
    port: 587, // SMTP portu
    secure: false, // Güvenli bağlantı istemiyoruz
    auth: { // E-posta kimlik bilgileri
      user: 'oguzhanfatihk@gmail.com', // E-posta adresi
      pass: 'dxisgisvngdjogcs' // E-posta şifresi (gizli tutulmalı)
    }
  });

  // Gönderilecek e-posta ayarları
  const mailOptions = {
    from: 'oguzhanfatihk@gmail.com', // Gönderen e-posta adresi
    to: myAddress, // Alıcı e-posta adresi
    subject: 'Sale Recipe', // E-posta konusu
    text: content // E-posta içeriği
  };

  return transporter.sendMail(mailOptions); // E-postayı gönder
};

// E-posta göndermek için bir POST isteği al
app.post('/send-email', async (req, res) => {
  const { myAddress, content } = req.body; // İstekten alıcı adresi ve içerik

  try {
    const info = await sendEmail(myAddress, content); // E-postayı gönder
    console.log('Email sent: ' + info.response); // Gönderim durumunu konsola yaz
    res.status(200).send('Email sent successfully'); // Başarılı yanıt gönder
  } catch (error) {
    console.error(error); // Hata durumunda hatayı konsola yaz
    res.status(500).send('Failed to send email'); // Hata mesajı gönder
  }
});

// Anasayfa isteğine yanıt ver
app.get('/', (req, res) => {
  res.send('Server is running'); // Sunucunun çalıştığını belirten mesaj gönder
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`); // Sunucu başlatıldığında konsola mesaj yaz
});
