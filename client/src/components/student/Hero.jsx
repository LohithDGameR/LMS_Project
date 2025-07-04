import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-sky-300/70">
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
        Discover courses indexed to
        <br />
        <span className="text-blue-600">fit your future goals at Acadex.</span>
      </h1>

      <p className="md:block hidden text-gray-800 max-w-2x1 mx-auto">
        Acadex provides world-class instruction, engaging content, and a
        thriving community - your complete index for achieving your goals.
      </p>

      <p className="md:hidden text-gray-800 max-w-sm mx-auto">
        Acadex provides world-class instruction, engaging content, and a
        thriving community - your complete index for achieving your goals.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
