import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Acadex provides a meticulously indexed selection of top-quality
            courses across diverse fields. Our platform is designed to connect
            you with the learning that truly fits your needs and drives results.
          </p>
        </div>
        <div className="flex flex-col text-start md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Content us</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start text-start w-full">
          <h2 className="font-semibold text-white mb-5">
            Subcribe to our newsletter
          </h2>
          <p className="text-sm text-white/80">
            The latest news, artices, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-600/30 bg-gray-800 text-gray-600 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 w-24 h-9 text-white rounded-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="py-2 px-4 border-t border-gray-200 flex flex-col md:flex-row items-center md:justify-between">
        <div className="md:order-2 flex items-center justify-center gap-3 mb-4 md:mb-0">
          <a
            href="https://www.instagram.com/lohithoffical_?igsh=dWIxaGd4czJ3c3Y1"
            target="_blank"
            rel="noopener noreferrer">
            <img src={assets.instagram} alt="instagram_icon" />
          </a>
          <a
            href="https://github.com/LohithDGameR"
            target="_blank"
            rel="noopener noreferrer">
            <img src={assets.github} alt="github_icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/lohith-kallapalli-71480622b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer">
            <img src={assets.linkedin} alt="linkedin_icon" />
          </a>
        </div>
        <p className="text-sm text-gray-500 text-center md:text-left mt-4 md:mt-0">
          Copyright © 2025 Acadex. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
