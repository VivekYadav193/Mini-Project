import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-md p-8">
      <div className="text-4xl font-bold mb-6">Welcome to Our Website</div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md mb-4 border border-blue-700"
        onClick={() => navigate("/signup")}
      >
        Signup
      </button>

      <hr className="my-6 border-t border-gray-400" />

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md border border-green-700"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
