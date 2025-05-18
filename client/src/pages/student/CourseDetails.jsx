import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for course data

  const {
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  // Fetch Course Data
  const fetchCourseData = useCallback(async () => {
    if (!id) return; // Don't fetch if ID is not available
    setIsLoading(true);
    setPlayerData(null); // Reset player if course changes
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
      if (data.success && data.courseData) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message || "Course not found.");
        setCourseData(null); // Clear course data if not found or error
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch course details.");
      setCourseData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, backendUrl]);

  // Enroll Course
  const enrollCourse = async () => {
    if (!courseData || !courseData._id) {
        toast.error("Course data is not available to enroll.");
        return;
    }
    try {
      if (!userData) {
        return toast.warn("Login to Enroll");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Already Enrolled");
      }
      const token = await getToken();
      if (!token) {
        return toast.error("Authentication failed. Please try logging in again.");
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Enrollment failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred during enrollment.");
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]); // Now depends on the memoized fetchCourseData, which depends on id

  useEffect(() => {
    if (userData && userData.enrolledCourses && courseData && courseData._id) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    } else {
      setIsAlreadyEnrolled(false); // Default to not enrolled if data is missing
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Course not found or failed to load.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-sky-300/70"></div>

        {/* left column */}
        <div className="max-w-xl z-10 text-gray-800">
          <h1 className="md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm "
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription?.slice(0, 200) || "",
            }}></p>

          {/* review and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-600">
              {courseData.courseRatings?.length || 0}{" "}
              {(courseData.courseRatings?.length || 0) !== 1 ? "ratings" : "rating"}
            </p>
            <p>
              {courseData.enrolledStudents?.length || 0}{" "} {/* Corrected typo and added safe navigation */}
              {(courseData.enrolledStudents?.length || 0) !== 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600">{courseData.educator?.name || "N/A"}</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent?.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}>
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent?.length || 0} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0" // Consider a larger max-h if needed
                    }`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300"> {/* Added border-t */}
                      {chapter.chapterContent?.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2 items-center"> {/* Added items-center */}
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent section from toggling
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        ?.split("/")
                                        .pop(),
                                    });
                                  }
                                  }
                                  className="text-blue-500 cursor-pointer hover:underline">
                                  Preview
                                </p>
                              )}
                              <p className="text-xs text-gray-500"> {/* Made duration smaller and grey */}
                                {humanizeDuration(
                                  (lecture.lectureDuration || 0) * 60 * 1000,
                                  { units: ["h", "m"], round: true }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-10 md:py-20 text-sm md:text-default"> {/* Adjusted padding */}
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text" // Ensure 'rich-text' class styles HTML appropriately
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription || "<p>No description available.</p>",
              }}></p>
          </div>
        </div>

        {/* right column */}
        <div className="max-w-couse-card w-full md:w-auto z-10 shadow-custom-card rounded-lg md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] self-start sticky top-20"> {/* Added self-start and sticky */}
          {playerData && playerData.videoId ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video" // ensure this class is defined or use w-full aspect-video
              onEnd={() => setPlayerData(null)} // Optional: clear player on video end
            />
          ) : (
            courseData.courseThumbnail && <img src={courseData.courseThumbnail} alt={courseData.courseTitle || "Course thumbnail"} className="w-full object-cover aspect-video" />
          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} alt="time left clock icon" />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex gap-3 items-baseline pt-2"> {/* Changed to items-baseline for better price alignment */}
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  ((courseData.discount || 0) * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              {courseData.discount > 0 && (
                <>
                  <p className="md:text-lg text-gray-500 line-through"> {/* Made original price lighter */}
                    {currency}{courseData.coursePrice?.toFixed(2)}
                  </p>
                  <p className="md:text-lg text-green-600 font-semibold"> {/* Made discount prominent */}
                    {courseData.discount}% off
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center text-sm md:text-default gap-x-4 gap-y-2 pt-3 md:pt-4 text-gray-800"> {/* Added flex-wrap and gap control */}
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" className="w-4 h-4" /> {/* Explicit size */}
                <p>{calculateRating(courseData)} rating</p>
              </div>
              <div className="h-4 w-px bg-gray-300 hidden md:block"></div> {/* Hide on small screens */}
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" className="w-4 h-4" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-300 hidden md:block"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson icon" className="w-4 h-4" /> {/* Changed alt text */}
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button onClick={enrollCourse} className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150">
              {isAlreadyEnrolled ? "Go to Course" : "Enroll Now"} {/* Changed text for enrolled state */}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-600 space-y-1"> {/* Softer text, space between items */}
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;