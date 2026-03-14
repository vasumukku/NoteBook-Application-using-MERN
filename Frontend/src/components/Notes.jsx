import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes/admin/feed"
      //   , {
      //   withCredentials: true,
      // }
    );
      setNotes(res.data);
    } catch (error) {
      console.log("Error fetching notes:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Notes</h1>

      {notes.length === 0 ? (
        <p style={styles.noNotes}>No Notes Found</p>
      ) : (
        <div style={styles.grid}>
          {notes.map((note) => (
            <div key={note._id} style={styles.card}>
              <h3 style={styles.title}>{note.title}</h3>
              <p style={styles.content}>{note.content}</p>
              <div style={styles.buttons}>
                <button style={styles.edit}>Edit</button>
                <button onClick={() => navigate(`/notebook/${note._id}`)}>
                    View Details
                </button> 
                <button style={styles.delete}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  noNotes: {
    textAlign: "center",
    color: "#888",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#222",
  },
  content: {
    marginBottom: "15px",
    color: "#555",
    lineHeight: 1.5,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  edit: {
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
  },
  delete: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};

export default Notes;