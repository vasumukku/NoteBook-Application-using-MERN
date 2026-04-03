import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Login({ email, setEmail, password, setPassword, setLoginstatus }) {

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/notes");
    }
  }, []);

  const handleLogin = async () => {

    if (!email || !password) {
      Swal.fire({
        title: "Error",
        text: "Please enter email and password",
        icon: "error"
      });
      return;
    }

    try {

      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      Swal.fire({
        title: "Success",
        text: "Login Successful",
        icon: "success"
      });

      setLoginstatus(true);
      setEmail("");
      setPassword("");

      if(email=="admin@gmail.com"){
        navigate("/notes/admin");  

      }else{
        navigate("/notes");
      }

     

    } catch (error) {

      Swal.fire({
        title: "Error",
        text: "Login failed",
        icon: "error"
      });

    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f4f4f4"
  },
  box:{
    background:"white",
    padding:"30px",
    width:"300px",
    textAlign:"center",
    borderRadius:"8px"
  },
  input:{
    width:"90%",
    padding:"10px",
    margin:"10px 0"
  },
  btn:{
    width:"100%",
    padding:"10px",
    background:"green",
    color:"white",
    border:"none"
  }
};

export default Login;