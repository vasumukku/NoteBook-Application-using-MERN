const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [5, "Content must be at least 5 characters"]
    },
      createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);