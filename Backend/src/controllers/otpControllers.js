const transporter = require("../config/mailConfig");

// temporary store
let otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND OTP
const sendOTP = async (req, res) => {
  const { email } = req.body;
 

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
// console.log(typeof process.env.EMAIL_PASS);

  const otp = generateOTP();
  otpStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
   text: `Your OTP is ${otp}. 🔒 Do NOT share this code with anyone!`
  };

  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
    
    await transporter.sendMail(mailOptions);
    res.send("OTP sent ");
  } catch (err) {
    console.log(err);
    res.status(401).send("Error ");
  }
};

// VERIFY OTP
const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  console.log(otpStore[email]);
   if (!otpStore[email]) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }
   if (String(otpStore[email]) === String(otp)) {
    delete otpStore[email];
    res.send("OTP correct ✅");
  } else {
    res.send("Wrong OTP ❌");
  }
};

module.exports={
  sendOTP,
  verifyOTP 
}