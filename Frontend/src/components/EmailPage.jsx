import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function EmailPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false); // default false
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSendOtp = async () => {
    try {
      setSending(true); // start loading

      const res = await axios.post(
        `${BASE_URL}/api/send-otp`,
        { email: email },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(res.data.message || "OTP Sent ✅");

      navigate("/send-otp", { state: { email } });

    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setSending(false); // stop loading
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Email</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          borderRadius: "5px",
          border: "1px solid gray"
        }}
      />

      <br /><br />

      <button
        onClick={handleSendOtp}
        disabled={sending}
        style={{
          padding: "10px 20px",
          backgroundColor: sending ? "gray" : "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: sending ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          margin: "auto"
        }}
      >
        {sending && (
          <span className="loader"></span>
        )}
        {sending ? "Sending..." : "Send OTP"}
      </button>

      {/* 🔹 Spinner CSS */}
      <style>
        {`
          .loader {
            width: 16px;
            height: 16px;
            border: 3px solid white;
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default EmailPage;