import { createContext, useState, useEffect, useCallback } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch All Courses
  const fetchAllCourses = useCallback(async () => {
    // setAllCourses(dummyCourses);
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message || "Failed to fetch courses.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred while fetching courses.");
    }
  }, [backendUrl]); // Added backendUrl as dependency, though it's from env

  // Fetch UserData
  const fetchUserData = useCallback(async () => {
    if (!user) return; // Ensure user object exists

    if (user.publicMetadata && user.publicMetadata.role === "educator") {
      setIsEducator(true);
    } else {
      setIsEducator(false); // Explicitly set to false if not educator
    }

    try {
      const token = await getToken();
      if (!token) {
        // toast.warn("Authentication token not available."); // Optional: if you want to notify
        return;
      }
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      // Avoid error toast if it's a 401 or 403, as Clerk might be handling session
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.warn("User data fetch unauthorized/forbidden. Clerk might be refreshing session.");
      } else {
        toast.error(error.response?.data?.message || error.message || "An error occurred while fetching user data.");
      }
      setUserData(null); // Clear userData on error
    }
  }, [user, getToken, backendUrl]);

  // Fetch User Enrolled courses
  const fetchUserEnrolledCourses = useCallback(async () => {
    setEnrolledCourses(dummyCourses);
    // if (!userData) return; // Ensure userData is available (implies user is authenticated and data fetched)
    // try {
    //   const token = await getToken();
    //   if (!token) return;

    //   const { data } = await axios.get(
    //     backendUrl + "/api/user/enrolled-courses",
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );

    //   if (data.success) {
    //     setEnrolledCourses(data.enrolledCourses?.reverse() || []);
    //   } else {
    //     toast.error(data.message || "Failed to fetch enrolled courses.");
    //   }
    // } catch (error) {
    //   toast.error(error.response?.data?.message || error.message || "An error occurred while fetching enrolled courses.");
    //   setEnrolledCourses([]); // Clear on error
    // }
  }, [getToken, backendUrl, userData]); // Added userData as dependency

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if (!course || !course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  //Function to calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    if (!chapter || !chapter.chapterContent) return "N/A";
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration || 0)); // Use forEach, handle missing duration
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  //Funtion to calculate Course Duration
  const calculateCourseDuration = (course) => {
    if (!course || !course.courseContent) return "N/A";
    let time = 0;
    course.courseContent.forEach((chapter) => // Use forEach
      chapter.chapterContent?.forEach((lecture) => (time += lecture.lectureDuration || 0)) // Use forEach, handle missing duration
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  //Funtion to calculate to No of Lectures in the course
  const calculateNoOfLectures = (course) => {
    if (!course || !course.courseContent) return 0;
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      // Clear user-specific data if user logs out
      setUserData(null);
      setEnrolledCourses([]);
      setIsEducator(false);
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    if (userData) { // Fetch enrolled courses only after userData is available
        fetchUserEnrolledCourses();
    }
  }, [userData, fetchUserEnrolledCourses]);


  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,
    userData,
    setUserData, // Be cautious exposing this directly if not needed
    getToken,
    fetchAllCourses,
    fetchUserData, // Expose if needed elsewhere, e.g., for a manual refresh
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};