import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import CreateBook from "./components/Createbook"
import Notebook from "./components/Notebook"
import AdminNotes from "./components/AdminNotes"
import Userdetails from "./components/Userdetails"
import Otpui from "./components/Otpui"
import EmailPage from "./components/EmailPage"
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginstatus, setLoginstatus] = useState(false); 

  return (
    <BrowserRouter>

      <Navbar loginstatus={loginstatus} setLoginstatus={setLoginstatus} />

      <Routes>
        <Route path="/register" element={<Register name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />
        <Route path="/" element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} loginstatus={loginstatus} setLoginstatus={setLoginstatus} />} />
        <Route path="/notes" element={<Notes />} /> 
        <Route path="/notes/admin" element={<AdminNotes />} /> 
        <Route path="/notebook/:id" element={<Notebook />} />
        <Route path="/createbook" element={<CreateBook email={email}/>} /> 
        <Route path="/profile" element={<Userdetails />} /> 
        <Route path="/send-otp" element={<Otpui />} />  
        <Route path="/EmailPage" element={<EmailPage />}/> 

      </Routes>

      {/* ✅ ADD THIS BELOW */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

    </BrowserRouter>
  );
}

export default App;