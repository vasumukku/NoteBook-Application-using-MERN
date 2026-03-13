import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import CreateBook from "./components/Createbook"

function App() {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[loginstatus,setLoginstatus]=useState(false);
  return (
    <BrowserRouter>

      <Navbar loginstatus={loginstatus} setLoginstatus={setLoginstatus}/>

      <Routes>
        <Route path="/" element={<Register name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>} />
        <Route path="/login" element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword}  loginstatus={loginstatus} setLoginstatus={setLoginstatus} />} />
        <Route path="/notes" element={<Notes />} /> 
        <Route path="/createbook" element={<CreateBook />} /> 

      </Routes>

    </BrowserRouter>
  );
}

export default App;