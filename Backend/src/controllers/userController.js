// const editNotes = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const usernotesid = req.params.id;

//     const updatedNotes = await Note.findByIdAndUpdate(
//       usernotesid,
//       {
//         title: title,
//         content: content
//       },
//        { returnDocument: "after" }
//     );

//     if (!updatedNotes) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     res.status(200).json(updatedNotes);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const deleteNote = async (req, res) => {
//   try {
//     const note = await Note.findByIdAndDelete(req.params.id);

//     if (!note) { 
//       return res.status(404).json({ message: "Note not found" });
//     }


//     res.json({ message: "Note Deleted" });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };