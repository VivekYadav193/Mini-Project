// Otp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOtp, selectUser } from "../redux/userSlice";
import axios from "axios";

const Otp = () => {
  const navigate = useNavigate();
  const storedOtp = useSelector(selectOtp);
  const userData = useSelector(selectUser);
  const userData2 = { ...userData, otp: storedOtp };

  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState(null);

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
    setError(null); // Clear error when the OTP changes
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (enteredOtp === storedOtp) {
      try {
        console.log("Signup data", userData2);

        const response = await axios.post("api/v1/auth/signup", userData2);

        console.log("Signup successful", response.data);
        console.log("Signup successful", response.data.user._id);
        
        navigate(`/profile/${response.data.user._id}`);
        console.log("Signup successful", response.data.user._id);     

      } catch (error) {
        console.error("Signup failed", error);
        setError("Signup failed. Please try again."); // Set an error message
      }

      console.log("OTP match! Navigating to profile");
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-lg shadow-md p-8 max-w-md w-full"
      >
        <label className="flex flex-col mb-4">
          <p className="text-base font-medium text-gray-700">Enter OTP:</p>
          <input
            type="text"
            value={enteredOtp}
            onChange={handleOtpChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold rounded-lg text-base px-4 py-2"
        >
          Verify OTP
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Otp;
