const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config(); 
const app = express();

app.use(express.json());


connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
})
.catch((e)=>{
  console.log("something went wrong ")
})

