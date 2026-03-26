import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 // ✅ import CSS file

const AdminNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes/admin/feed", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
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
    <div className="container">
      <h1 className="heading"> All users Notes</h1>

      {notes.length === 0 ? (
        <p className="noNotes">No Notes Found</p>
      ) : (
        <div className="grid">
          {notes.map((note) => (
            <div key={note._id} className="card">
              
              <h3 className="title">{note.title}</h3>

              <button
                className="viewBtn"
                onClick={() => navigate(`/notebook/${note._id}`)}
              >
                View Details
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotes;