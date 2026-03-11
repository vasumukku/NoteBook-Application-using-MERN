const Note = require("../models/Note");

const createNote = async (req, res) => {
  try {
    
    const { title, content } = req.body;

    
    const note = new Note({
      userId: req.user.id, 
      title,
      content
    });
    

    await note.save();
    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}; 


const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) { 
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await note.deleteOne();

    res.json({ message: "Note Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
  

module.exports={
  createNote,
  getMyNotes,
  deleteNote


}
