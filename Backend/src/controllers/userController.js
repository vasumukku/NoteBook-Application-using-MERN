// // 1. Import packages
// const express = require("express");
// const nodemailer = require("nodemailer");



// // 2. Store OTP (like notebook 📒)
// let otpStore = {};

// // 3. Generate OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // 4. Setup email sender
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "mukkuvasu01@gmail.com",
//     pass: "Vasu@567890" // this is not mail password like dummy i will create now 
//   }
// });


// // =========================
// // 📩 SEND OTP API
// // =========================
// app.post("/send-otp", async (req, res) => {
//   const { email } = req.body;

//   const otp = generateOTP();         // create OTP
//   otpStore[email] = otp;             // save OTP

//   const mailOptions = {
//     from: "mukkuvasu01@gmail.com",
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP is ${otp}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.send("OTP sent ✅");
//   } catch (err) {
//     res.send("Error ❌");
//   }
// });


// // =========================
// // 🔐 VERIFY OTP API
// // =========================
// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (otpStore[email] === otp) {
//     delete otpStore[email];   // remove after success
//     res.send("OTP correct ✅");
//   } else {
//     res.send("Wrong OTP ❌");
//   }
// });



