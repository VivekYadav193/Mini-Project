import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { selectUser } from "../redux/userSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { userid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [educatorDetails, setEducatorDetails] = useState(null);

  const navigateBasedOnRole = () => {
    switch (user.role) {
      case "educator":
        navigate("/instructor");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "developer":
        navigate("/Dev");
        break;
      case "student":
        navigate("/student");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userid) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `/api/v1/profile/userdetails/${userid}`
          );

          const educatorId = response.data.user.educator;
          if (educatorId) {
            const educatorResponse = await axios.get(
              `/api/v1/profile/educatordetails/${educatorId}`
            );
            setEducatorDetails(educatorResponse.data.educator);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [userid]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center font-sans">
      <header className="bg-green-500 text-white py-4 w-full text-center">
      <h1 className="text-3xl font-extrabold tracking-wider">
        Welcome, {user.username}!
      </h1>
    </header>


      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-500">
          Profile Overview
        </h2>
        {isLoading ? (
          <p className="text-gray-700 mt-4 text-center">
            <span className="animate-spin mr-2">&#9696;</span>Loading user
            details...
          </p>
        ) : (
          <>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            {user.role === "educator" && educatorDetails && (
              <>
                <p className="text-gray-700">
                  <span className="font-semibold">Educator ID:</span>{" "}
                  {educatorDetails.educatorId || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Designation:</span>{" "}
                  {educatorDetails.designation || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Department:</span>{" "}
                  {educatorDetails.educatorDepartment || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">College:</span>{" "}
                  {educatorDetails.educatorCollege || "N/A"}
                </p>
                <div className="mt-4">
                  <span className="font-semibold">Courses:</span>{" "}
                  {educatorDetails.educatorCourses.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {educatorDetails.educatorCourses.map((course) => (
                        <li key={course._id}>{course.name}</li>
                      ))}
                    </ul>
                  ) : (
                    "No courses available"
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <button
        onClick={navigateBasedOnRole}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        Go to {getRoleLabel(user.role)} Page
      </button>
    </div>
  );
};

const getRoleLabel = (role) => {
  switch (role) {
    case "educator":
      return "Educator";
    case "admin":
      return "Admin";
    case "developer":
      return "Curriculum Developer";
    default:
      return "Dashboard";
  }
};

export default Profile;
