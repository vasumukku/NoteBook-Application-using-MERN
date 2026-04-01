import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Otpui() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/verify-otp",
        {
          email: email,
          otp: enteredOtp,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);

      // ✅ FIXED CONDITION
     if (res.data === "OTP correct ✅") {
        toast.success(res.data.message || "OTP Verified ✅");
        navigate("/profile");
      } else {
        toast.error(res.data.message || "Invalid OTP ❌");
      }

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid OTP ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Enter OTP</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            style={{
              width: "40px",
              height: "50px",
              textAlign: "center",
              fontSize: "20px",
            }}
          />
        ))}
      </div>

      <br />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default Otpui;