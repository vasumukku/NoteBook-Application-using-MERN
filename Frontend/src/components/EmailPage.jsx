import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function EmailPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      console.log("api calling ");

      const res = await axios.post(
        "http://localhost:5000/api/send-otp",
        { email: email },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      // ✅ success toast
      toast.success(res.data.message || "OTP Sent ✅");

      navigate("/send-otp", { state: { email } });

    } catch (err) {
      console.log(err);

      // ❌ error toast
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Email</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />
      <button onClick={handleSendOtp}>Send OTP</button>
      
      

    </div>
  );
}

export default EmailPage;