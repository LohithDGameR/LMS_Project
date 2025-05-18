import React, { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex w-full items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-sky-300/70"
      }`}>
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-900">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="relative hover:text-blue-700 active:text-blue-800 transition duration-150 ease-in-out before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-0 before:h-[2px] before:bg-blue-700 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |{" "}
              <Link
                to="/my-enrollments"
                className="relative hover:text-blue-700 active:text-blue-800 transition duration-150 ease-in-out before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-0 before:h-[2px] before:bg-blue-700 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700">
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-900">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="relative hover:text-blue-700 active:text-blue-800 transition duration-150 ease-in-out before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-0 before:h-[2px] before:bg-blue-700 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |{" "}
              <Link
                to="/my-enrollments"
                className="relative hover:text-blue-700 active:text-blue-800 transition duration-150 ease-in-out before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-0 before:h-[2px] before:bg-blue-700 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
