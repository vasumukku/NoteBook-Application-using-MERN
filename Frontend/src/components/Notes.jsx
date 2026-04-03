import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 // ✅ import CSS file

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [fav ,setFav]=useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


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


   useEffect(() => {
    const searchText = (fav || "").toString().toLowerCase();
    console.log(searchText);
    const filtered = notes.filter((item) =>
      item.title?.toLowerCase().includes(searchText)
    );
  
    setFilteredNotes(filtered);
  }, [fav, notes]);

  return (
    <div className="container">
      <h1 className="heading">Notes</h1>
       {/* <input type="text" value={fav} onChange={(e) => setFav(e.target.value)} /> 
      <br />
      <br /> */}

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
  <input
    type="text"
    value={fav}
    placeholder="🔍 Enter your fav notes..."
    onChange={(e) => setFav(e.target.value)}
    style={{
      padding: "10px 15px",
      width: "350px",
      borderRadius: "25px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      marginTop:"-50px"

    }}
  />
</div>

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
  );
};

export default Notes;