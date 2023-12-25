import React, { useState, useEffect } from "react";
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/sub/getAllSubjects"
        );
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl py-8">
      <div className="flex justify-between mb-1 sm:mb-0">
        <h2 className="text-2xl leading-tight text-blue-700">Subject List</h2>
      </div>
      <div className="my-2 py-2 overflow-x-auto sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-700">Loading subjects...</p>
        ) : (
          <div className="min-w-full overflow-hidden rounded-lg shadow border-b border-gray-200">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <TransitionGroup component="tbody">
                {subjects.map((subject) => (
                  <CSSTransition key={subject._id} timeout={500} classNames="item">
                    <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {subject.code}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {subject.description}
                      </td>
                    </tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subject;
