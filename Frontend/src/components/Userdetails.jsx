import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Userdetails() {
  const { userData, fetchUserDetails, loading } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (userData?.name) {
      setName(userData.name);
    }
  }, [userData]);

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/update-profile`,
        {
          name,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      await fetchUserDetails();

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

  if (loading) return <h3>Loading...</h3>;

 return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>👤 User Profile</h2>

      {/* NAME */}
      <div style={styles.field}>
        <label style={styles.label}>Name</label>
        {editMode ? (
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p style={styles.text}>{userData?.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div style={styles.field}>
        <label style={styles.label}>Email</label>
        <p style={styles.text}>{userData?.email}</p>
      </div>

      {/* PASSWORD FIELDS */}
      {editMode && (
        <div style={styles.field}>
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
        </div>
      )}

      {/* BUTTONS */}
      {!editMode ? (
        <button style={styles.editBtn} onClick={() => setEditMode(true)}>
          ✏️ Edit Profile
        </button>
      ) : (
        <div style={styles.btnGroup}>
          <button style={styles.saveBtn} onClick={handleUpdate}>
            Save
          </button>
          <button style={styles.cancelBtn} onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
);
}

export default Userdetails;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9",
    fontFamily: "Arial",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
    color: "#333",
  },

  field: {
    marginBottom: "15px",
    textAlign: "left",
  },

  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },

  text: {
    marginTop: "5px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },

  editBtn: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  saveBtn: {
    flex: 1,
    marginRight: "5px",
    padding: "10px",
    background: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancelBtn: {
    flex: 1,
    marginLeft: "5px",
    padding: "10px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};