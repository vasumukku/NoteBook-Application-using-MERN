const express = require("express");
const middleware = require("../middleware/authMiddleware")
const router = express.Router();
const { createNote,
  getMyNotes,
  getallNotes,
  getParticularNotes,
  editNotes,
  deleteNote
}=require("../controllers/noteController");


router.post("/create",middleware,createNote);
router.get("/feed",middleware,getMyNotes);
router.get("/admin/feed",getallNotes);
router.get("/:id",getParticularNotes);
router.put("/:id",editNotes);
router.delete("/:id",deleteNote);
module.exports=router;

