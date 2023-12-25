// Header.js
import React from 'react';

const Header = () => {
  return (
    <header
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md rounded-lg py-4 px-4 sm:px-6 flex justify-between items-center"
    >
      <h1 className="text-3xl font-extrabold tracking-wider uppercase animate-pulse">
        Curriculum Developer Hub
      </h1>
      <nav className="flex items-center gap-4">
        <a href="#" className="text-white hover:underline">
          Home
        </a>
        <a href="#" className="text-white hover:underline">
          Resources
        </a>
        <a href="#" className="text-white hover:underline">
          Community
        </a>
      </nav>
    </header>
  );
};

export default Header;
