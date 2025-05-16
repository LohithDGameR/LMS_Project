import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/AppContext";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-900">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-700 mt-3">
        Explore top-rated courses in coding, design, business, wellness, and
        more.
        <br />
        Achieve your goals with Acadex.
      </p>

      <div className="grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-900 border border-gray-900/30 px-10 py-3 rounded-full">
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
