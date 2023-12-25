import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOtp, setUser } from "../redux/userSlice";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("api/v1/auth/sendotp", formData);
      // Handle the success case, maybe navigate to another page
      console.log("API call successful", response.data);
      dispatch(setOtp(response.data.otp));
      dispatch(setUser(formData));
      navigate("/otp");
    } catch (error) {
      // Handle errors
      console.error("API call failed", error);

      // You can also handle specific error responses here
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-lg shadow-md p-8 max-w-md w-full"
      >
        <label className="flex flex-col mb-4">
          <p className="text-base font-medium text-gray-700">Name:</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChangeHandler}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>

        <label className="flex flex-col mb-4">
          <p className="text-base font-medium text-gray-700">E Mail:</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>

        <label className="flex flex-col mb-4">
          <p className="text-base font-medium text-gray-700">Password:</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>

        <label className="flex flex-col mb-4">
          <p className="text-base font-medium text-gray-700">Role:</p>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={onChangeHandler}
            />
            <label htmlFor="student">Student</label>
            <input
              type="radio"
              id="educator"
              name="role"
              value="educator"
              checked={formData.role === "educator"}
              onChange={onChangeHandler}
            />
            <label htmlFor="educator">Educator</label>
            <input
              type="radio"
              id="developer"
              name="role"
              value="developer"
              checked={formData.role === "developer"}
              onChange={onChangeHandler}
            />
            <label htmlFor="developer">Curriculum Developer</label>
          </div>
        </label>

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold rounded-lg text-base px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
