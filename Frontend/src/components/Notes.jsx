import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [fav, setFav] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch Notes
  const getNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes/feed`, {
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

  // Search Filter
  useEffect(() => {
    const searchText = (fav || "").toLowerCase();

    const filtered = notes.filter((item) =>
      item.title?.toLowerCase().includes(searchText)
    );

    setFilteredNotes(filtered);
  }, [fav, notes]);

  return (
    <>
      {/* INLINE CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f6fa;
           overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: auto;
          padding: 20px
          height:80vh;
      
        }
          html, body {
            height: 80vh;
          }

        .heading {
          text-align: center;
          margin-bottom: 20px;
        }

        .searchContainer {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
        }

        .searchInput {
          width: 100%;
          max-width: 400px;
          padding: 10px 15px;
          border-radius: 25px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .card {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .title {
          margin-bottom: 15px;
          font-size: 18px;
        }

        .viewBtn {
          padding: 8px 15px;
          border: none;
          background: #4CAF50;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .viewBtn:hover {
          background: #45a049;
        }

        .noNotes {
          text-align: center;
          color: gray;
          margin-top: 0px;
          
        }
      `}</style>

      <div className="container">
        <h1 className="heading">My Notes</h1>

        {/* Search Bar */}
        <div className="searchContainer">
          <input
            type="text"
            value={fav}
            placeholder="🔍 Search notes..."
            onChange={(e) => setFav(e.target.value)}
            className="searchInput"
          />
        </div>

        {/* Notes */}
        {filteredNotes.length === 0 ? (
          <p className="noNotes">No Notes Found</p>
        ) : (
          <div className="grid">
            {filteredNotes.map((note) => (
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
    </>
  );
};

export default Notes;