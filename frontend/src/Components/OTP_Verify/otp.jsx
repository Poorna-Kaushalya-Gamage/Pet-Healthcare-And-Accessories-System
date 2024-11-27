import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Otp({ email }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [otpGenerated, setOtpGenerated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate OTP via system
      const generatedOtp = generateOTP();

      // Save generated OTP
      await axios.post("http://localhost:5000/otps", { email, otp: generatedOtp });

      alert("OTP generated successfully!");
      setOtpGenerated(true);
    } catch (error) {
      console.error("Error generating OTP:", error);
      alert("Error generating OTP. Please try again.");
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      alert("OTP must be 6 digits long and contain no spaces.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/otps/verify", { email, otp });
      const message = response.data;
      if (message === "Success") {
        alert("OTP verification successful!");
        navigate("/UserDashboard", { state: { email } });
      } else {
        alert("Incorrect OTP! Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  // Function to generate OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div>
        {!otpGenerated ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="email"
              value={email}
              readOnly // Make email input readonly
              placeholder="Enter your email"
              required
              className="border rounded-md py-2 px-3 mb-2 w-72"
            />
            <center>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                Generate OTP
              </button>
            </center>
          </form>
        ) : (
          <form onSubmit={handleVerification}>
            <p className="text-sm mb-2">Please check your email for OTP. Time: 1min</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP to verify"
              required
              className="border rounded-md py-2 px-3 mb-2 w-72"
            />
            <center>
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Verify OTP
              </button>
            </center>
          </form>
        )}
      </div>
    </div>
  );
}

export default Otp;
