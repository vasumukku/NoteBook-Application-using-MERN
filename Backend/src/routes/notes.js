const express = require("express");
const middleware = require("../middleware/authMiddleware")
const router = express.Router();
const { createNote,
  getMyNotes,
  deleteNote
}=require("../controllers/noteController");


router.post("/create",middleware,createNote);
router.get("/feed",getMyNotes);
router.post("/:id",deleteNote);
module.exports=router;