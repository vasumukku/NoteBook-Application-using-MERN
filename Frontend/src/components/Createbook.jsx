import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleAddBook = async () => {
    if (!title || !content) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both title and content",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/create",
        { title, content },
        { withCredentials: true } // if backend uses cookies
      );
      Swal.fire({
        icon: "success",
        title: "Book Added",
        text: "Your book was added successfully!",
      });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add book. Try again.",
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create Book</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleAddBook} style={styles.button}>
          Add Book
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default CreateBook;