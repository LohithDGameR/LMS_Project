import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text4xl text-gray-800 font-semiblod">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-700 sm:text-sm">
        Your comprehensive index to a world of learning. We empower your future
        by offering meticulously curated courses designed to fit your unique
        goals and aspirations.{" "}
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700">
          Get started
        </button>
        <button className="flex items-center gap-2">
          Learn more <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
