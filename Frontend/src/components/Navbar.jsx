import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Navbar({ loginstatus, setLoginstatus }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [usernamedb, setUsernamedb] = useState("");
  const [useremail, setUserEmail] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // ✅ NEW: reference for dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoginstatus(true);
  }, []);

  const userdetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      setUsernamedb(res.data.name);
      setUserEmail(res.data.email);
    } catch (e) {
      console.log("Error fetching user");
    }
  };

  useEffect(() => {
    if (open && loginstatus) {
      userdetails();
    }
  }, [open, loginstatus]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginstatus(false);
    navigate("/");
  };

  const details = () => {
    if (useremail === "admin@gmail.com") {
      navigate("/EmailPage");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <p
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        NoteBook Tracker 🚀
      </p>

      <div className="nav-right">
        {loginstatus && (
          <button
            className="createBtn"
            onClick={() => navigate("/createbook")}
          >
            + Create
          </button>
        )}

        {/* PROFILE BUTTON */}
        <button
          className="profileBtn"
          onClick={() => setOpen(!open)}
        >
          👤
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="dropdown" ref={dropdownRef}>
            {!loginstatus ? (
              <button
                className="loginBtn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <div>
                <p><b>Name:</b> {usernamedb}</p>
                <p><b>Email:</b> {useremail}</p>

                <button
                  className="editProfileBtn"
                  onClick={details}
                >
                  Edit Profile
                </button>

                <button
                  className="logoutBtn"
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