const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/auth");
dotenv.config(); 
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
app.use("/",userRoutes);

connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
})
.catch((e)=>{
  console.log("something went wrong ")
})

