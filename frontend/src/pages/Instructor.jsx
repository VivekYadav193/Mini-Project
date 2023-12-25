import React from 'react';
import { Link } from 'react-router-dom';

const Instructor = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome, Instructor!</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Button 1: View My Subjects */}
        <Link to="/instructor/subjects">
          <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:border-blue-300 transition">
            View My Subjects
          </button>
        </Link>

        {/* Button 2: Add Resources */}
        <Link to="/instructor/add-resources">
          <button className="border border-green-500 text-green-500 px-6 py-3 rounded-full hover:bg-green-500 hover:text-white focus:outline-none focus:ring focus:border-green-300 transition">
            Add Resources
          </button>
        </Link>

        {/* Button 3: My Feedbacks */}
        <Link to="/instructor/feedbacks">
          <button className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring focus:border-yellow-300 transition">
            My Feedbacks
          </button>
        </Link>

        {/* Button 4: Placeholder */}
        <button className="border border-purple-500 text-purple-500 px-6 py-3 rounded-full hover:bg-purple-500 hover:text-white focus:outline-none focus:ring focus:border-purple-300 transition">
          view resources
        </button>
      </div>
    </div>
  );
};

export default Instructor;
