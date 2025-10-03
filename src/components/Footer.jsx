// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} DementiaPredict. All rights reserved.
        </p>

        {/* Right Section - Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="/about"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
