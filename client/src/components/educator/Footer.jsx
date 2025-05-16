import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p
          className="py-4 text-center text-xs md:text-sm 
text-gray-500">
          Copyright 2025 © Lohith Kallaplli. All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4">
        <a
          href="https://www.instagram.com/lohithoffical_?igsh=dWIxaGd4czJ3c3Y1"
          target="_blank"
          rel="noopener noreferrer">
          <img src={assets.instagram_icon} alt="facebook_icon" />
        </a>
        <a
          href="https://github.com/LohithDGameR"
          target="_blank"
          rel="noopener noreferrer">
          <img src={assets.github_icon} alt="twitter_icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/lohith-kallapalli-71480622b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer">
          <img src={assets.linkedin_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
