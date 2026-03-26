const express = require("express");
const middleware = require("../middleware/authMiddleware")
const router = express.Router();
const notesroutes= require("./notes");
const{registerUser,userdetails,updatePassword,
  loginUser} = require("../controllers/authController");

router.use("/notes",notesroutes);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/user",middleware,userdetails);
router.put("/update-profile",updatePassword );

module.exports=router; 