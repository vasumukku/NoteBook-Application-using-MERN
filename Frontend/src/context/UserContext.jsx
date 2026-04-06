import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [loginstatus, setLoginstatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoginstatus(false);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        headers: {
          authorization: token,
        },
      });

      setUserData({
        name: res.data.name,
        email: res.data.email,
      });

      setLoginstatus(true);
    } catch (e) {
      console.log("Error fetching user", e);
      localStorage.removeItem("token");
      setUserData({ name: "", email: "" });
      setLoginstatus(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        loginstatus,
        setLoginstatus,
        fetchUserDetails,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };