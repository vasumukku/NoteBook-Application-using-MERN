import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const Notebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ GET NOTE
  const getNote = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/notes/${id}`);
      const data = res.data.data[0];

      setNote(data);
      setTitle(data.title);
      setContent(data.content);

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ UPDATE NOTE (FIXED)
  const updateNote = async () => {
    try {
      console.log("Updating...");

      const res = await axios.put(
        `http://localhost:5000/notes/${id}`,   // ✅ FIXED URL
        {
          title,
          content,
        }
      );

      console.log(res.data);

      toast.success("Note updated successfully ✅");
      setEditMode(false);
      getNote();

    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
    }
  };

  // ✅ DELETE NOTE (FIXED)
  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`); // ✅ FIXED URL

       toast.success("Note deleted successfully 🗑️");
      navigate("/notes");

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getNote();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!note) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>

      {/* TITLE */}
      {editMode ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      ) : (
        <h1 style={styles.title}>{note.title}</h1>
      )}

      {/* DATE */}
      <p style={styles.date}>
        {formatDate(note.createdAt)}
      </p>

      {/* CONTENT */}
      {editMode ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
      ) : (
        <div style={styles.card}>
          <p>{note.content}</p>
        </div>
      )}

      {/* BUTTONS */}
      <div style={styles.btnContainer}>

        {editMode ? (
          <>
            <button style={styles.saveBtn} onClick={updateNote}>
              Save
            </button>

            <button
              style={styles.cancelBtn}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              style={styles.editBtn}
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={deleteNote}
            >
              Delete
            </button>
          </>
        )}

      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
  },

  title: {
    fontSize: "32px",
    color: "#1a73e8",
  },

  date: {
    color: "gray",
    marginBottom: "20px",
  },

  card: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
  },

  input: {
    width: "100%",
    fontSize: "28px",
    padding: "10px",
  },

  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
  },

  btnContainer: {
    marginTop: "20px",
  },

  editBtn: {
    marginRight: "10px",
    padding: "10px",
    background: "blue",
    color: "white",
  },

  deleteBtn: {
    padding: "10px",
    background: "red",
    color: "white",
  },

  saveBtn: {
    marginRight: "10px",
    padding: "10px",
    background: "green",
    color: "white",
  },

  cancelBtn: {
    padding: "10px",
    background: "gray",
    color: "white",
  },
};

export default Notebook;