import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Userdetails() {
  const navigate = useNavigate(); // initialize the hook
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Fetch user
  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:5000/user", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setUser(res.data);
      cosole.log(res.data);
      setName(res.data["name"]);
    })
    .catch((err) => console.log(err));
  }, [token]);



  //  try {
  //       const res = await axios.get("http://localhost:5000/user", {
  //         headers: {
  //           authorization: localStorage.getItem("token"),
  //         },
  //       });
  
  //       setUsernamedb(res.data.name);
  //       setUserEmail(res.data.email);
  //     } catch (e) {
  //       console.log("Error fetching user");
  //     }



  // 🔹 Update
  const handleUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/update-profile",
        {
          name,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            // Authorization: `Bearer ${token}`,
             Authorization: localStorage.getItem("token"),
          },
        }
      );

      setUser({ ...user, name });

      setEditMode(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      alert("Updated successfully ✅");

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>

      <div style={styles.card}>

        {/* NAME */}
        <p style={styles.label}>Name:</p>
        {editMode ? (
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p style={styles.text}>{user.name}</p>
        )}

        {/* EMAIL */}
        <p style={styles.label}>Email:</p>
        <p style={styles.text}>{user.email}</p>

        {/* PASSWORD */}
        {editMode && (
          <>
            <input
              type="password"
              placeholder="Old Password"
              style={styles.input}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              style={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        {/* BUTTONS */}
        {!editMode ? (
          <button
            style={{ ...styles.btn, ...styles.editBtn }}
            onClick={() => setEditMode(true)}
          >
            ✏️ Edit Profile
          </button>

        ) : (
          <>
            <button
              style={{ ...styles.btn, ...styles.saveBtn }}
              onClick={handleUpdate}
            >
              Save
            </button>

            <button
              style={{ ...styles.btn, ...styles.cancelBtn }}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Userdetails;


// 🎨 Styles (same file)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "60px",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  text: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  btn: {
    padding: "10px",
    margin: "5px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "45%",
    color: "white",
  },
  editBtn: {
    background: "#4CAF50",
    width: "100%",
  },
  saveBtn: {
    background: "#2196F3",
  },
  cancelBtn: {
    background: "#f44336",
  },
};