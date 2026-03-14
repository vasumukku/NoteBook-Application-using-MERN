import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Notebook = () => {

  const { id } = useParams();
  const [note, setNote] = useState(null);

  const getNote = async () => {
    try {
      console.log(id);

      const res = await axios.get(`http://localhost:5000/notes/${id}`);

      console.log(res.data); // ✅ changed (better to log res.data)
      setNote(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {          // ✅ added check
      getNote();
    }
  }, [id]);            // ✅ changed dependency

  if (!note) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{note.title}</h1>
      <p style={styles.content}>{note.content}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto"
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#1a73e8"
  },
  content: {
    fontSize: "20px",
    marginTop: "20px",
    lineHeight: "1.7"
  }
};

export default Notebook;