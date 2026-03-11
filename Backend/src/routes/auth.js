const express = require("express");
const router = express.Router();
const notesroutes= require("./notes");
const{registerUser,
  loginUser} = require("../controllers/authController");

router.use("/notes",notesroutes);
router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports=router;