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

//admin notes 
const getallNotes = async (req, res) => {
  try {

    const allNotes = await Note.find({});

    if (allNotes.length === 0) {
      return res.status(200).json({ message: "Book is empty" });
    }

    res.status(200).json(allNotes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const editNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const usernotesid = req.params.id;

    const updatedNotes = await Note.findByIdAndUpdate(
      usernotesid,
      {
        title: title,
        content: content
      },
       { returnDocument: "after" }
    );

    if (!updatedNotes) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNotes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) { 
      return res.status(404).json({ message: "Note not found" });
    }


    res.json({ message: "Note Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


  

module.exports={
  createNote,
  getMyNotes,
  getallNotes,
  editNotes,
  deleteNote


}
