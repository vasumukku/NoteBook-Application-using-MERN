const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/auth");
const otpRoutes = require("./src/routes/otpRoutes");
dotenv.config(); 
const app = express();

const cors = require("cors");
app.use(
  cors({
     origin: [process.env.FRONTEND_PORT], // React frontend URL
    credentials: true
  }) 
);

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());



app.use("/api", otpRoutes);
app.use("/",userRoutes);

app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true,               // Very important!
  })
);

connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
})
.catch((e)=>{
  console.log("something went wrong ")
})

