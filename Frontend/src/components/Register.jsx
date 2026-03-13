import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Register({ name, setName, email, setEmail, password, setPassword,loginstatus,setLoginstatus}) {

  const navigate = useNavigate();
  // setLoginstatus(!loginstatus);
  const handleRegister = async () => {

    if (!name || !email || !password) {
      Swal.fire({
        title:"Error",
        text:"Please fill all fields",
        icon:"error"
      });
      return;
    }

    try {

      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password
      });

      Swal.fire({
        title:"Success",
        text:"Registration Successful",
        icon:"success"
      });

      navigate("/login");

    } catch (error) {

      Swal.fire({
        title:"Error",
        text:"Registration Failed",
        icon:"error"
      });

    }

  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          style={styles.input}
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#f4f4f4"},
  box:{background:"white",padding:"30px",width:"300px",textAlign:"center",borderRadius:"8px"},
  input:{width:"90%",padding:"10px",margin:"10px 0"},
  btn:{width:"100%",padding:"10px",background:"#007bff",color:"white",border:"none"}
};

export default Register;