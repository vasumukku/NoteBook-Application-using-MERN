// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// transporter.sendMail({
//   from: process.env.EMAIL_USER,
//   to: process.env.EMAIL_USER,
//   subject: "Test",
//   text: "Working?"
// })
// .then(() => console.log("✅ SUCCESS"))
// .catch(err => console.log("❌ ERROR:", err));