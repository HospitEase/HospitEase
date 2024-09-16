import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-green p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <a href="/"> Hospit-Ease</a>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white hover:text-gray-500">
              Home
            </a>
            <a href="/about" className="text-white hover:text-gray-200">
              About
            </a>
            <a href="/services" className="text-white hover:text-gray-200">
              Services
            </a>
            <a href="/contact" className="text-white hover:text-gray-200">
              Contact
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="/login"
              className="text-white hover:text-gray-200 px-4 py-2 rounded-lg hover:bg-blue"
            >
              Login
            </a>
            <a
              href="/signup"
              className="text-white hover:text-gray-200 px-4 py-2 rounded-lg hover:bg-blue"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
