import React, { useContext, useEffect, useState, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import Loading from "../../components/student/Loading"; // Assuming you have a Loading component

const CoursesList = () => {
  const { allCourses } = useContext(AppContext);
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const { input } = useParams();
  // const [filteredCourses, setFilteredCourses] = useState([]); // Replaced by useMemo

  const filteredCourses = useMemo(() => {
    if (!allCourses || allCourses.length === 0) {
      return [];
    }
    const tempCourses = allCourses.slice(); // Create a copy

    if (input) {
      return tempCourses.filter((item) =>
        item.courseTitle?.toLowerCase().includes(input.toLowerCase())
      );
    }
    return tempCourses;
  }, [allCourses, input]);

  // Show loading if allCourses is not yet populated
  if (!allCourses) {
      return <Loading />;
  }


  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 pb-16 text-left min-h-screen"> {/* Added pb and min-h */}
        <div className="flex md:flex-row flex-col gap-6 items-center justify-between w-full mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Our Courses
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/")}>
                Home
              </span>{" "}
              / <span>Course List</span>
              {input && <span className="text-gray-700"> / Search: "{input}"</span>}
            </p>
          </div>
          <SearchBar data={input} /> {/* Assuming SearchBar handles its own logic */}
        </div>

        {input && filteredCourses.length > 0 && (
          <div className="flex items-center justify-between gap-4 px-4 py-2 border rounded-md mt-8 mb-8 bg-gray-50 text-gray-700">
            <p>Showing results for: <span className="font-semibold">"{input}"</span></p>
            <button // Changed to button for better accessibility
              onClick={() => navigate("/course-list")}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              aria-label="Clear search"
            >
              Clear <img
                src={assets.cross_icon}
                alt=""
                className="ml-1 w-4 h-4"
              />
            </button>
          </div>
        )}

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 md:p-0">
            {filteredCourses.map((course) => ( // Removed index as key if course._id is available
              <CourseCard key={course._id || course.courseTitle} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">
              {input ? `No courses found for "${input}".` : "No courses available at the moment."}
            </p>
            {input && (
                <button
                    onClick={() => navigate("/course-list")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    View All Courses
                </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;