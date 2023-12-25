import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dev from "./pages/Dev";
import Student from "./pages/Student";
import Instructor from "./pages/Instructor";
import Profile from "./pages/Profile";
import Otp from "./components/Otp";
import Subject from "../src/pages/Subject";

function App() {
  return (
    <>
      <Header />
      <hr />
      <hr />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/student" element={<Student />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/profile/:userid" element={<Profile />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/instructor/subjects" element={<Subject />} />
        </Routes>
      </Router>
      <hr />
      <hr />
      <Footer />
    </>
  );
}

export default App;
