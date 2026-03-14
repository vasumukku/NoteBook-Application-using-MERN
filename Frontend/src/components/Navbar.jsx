import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar({ loginstatus, setLoginstatus }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [usernamedb, setUsernamedb] = useState("");
  const [useremail, setUserEmail] = useState("");

  // ✅ Check token when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoginstatus(true);
    }
  }, []);

  // Fetch user details
  const userdetails = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsernamedb(res.data.name);
      setUserEmail(res.data.email);

    } catch (e) {
      console.log("Error fetching user");
    }
  };

  // Call API when sidebar opens
  useEffect(() => {
    if (open && loginstatus) {
      userdetails();
    }
  }, [open, loginstatus]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginstatus(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "grey",
        padding: "10px",
        alignItems: "center",
        position: "relative",
      }}
    >

      <p style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
        My Website
      </p>

      <div>

        {loginstatus && (
          <button
            style={{
              backgroundColor: "lightblue",
              fontSize: "18px",
              padding: "8px 15px",
              borderRadius: "10px",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/createbook")}
          >
            Create +
          </button>
        )}

        {/* Profile Button */}
        <button
          style={{
            padding: "15px",
            borderRadius: "50%",
            backgroundColor: "aqua",
            cursor: "pointer",
          }}
          onClick={() => setOpen(!open)}
        >
          🤖
        </button>

        {/* Sidebar */}
        {open && (
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "60px",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
              width: "200px",
            }}
          >

            {!loginstatus ? (

              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            ) : (

              <div>

                <p><b>Name:</b> {usernamedb}</p>
                <p><b>Email:</b> {useremail}</p>

                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Navbar;