import React from "react";

function Footer() {
    return (
        <footer className="bg-black p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-white text-2xl font-bold mb-4 md:mb-0">
                    <a href="/">Hospit-Ease</a>
                </div>
                <div className="flex space-x-4 mb-4 md:mb-0">
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
                <div className="flex space-x-4 mb-4 md:mb-0">
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
                <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-white hover:text-gray-200">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" className="text-white hover:text-gray-200">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className="text-white hover:text-gray-200">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div className="text-center text-white mt-4">
                &copy; {new Date().getFullYear()} Hospit-Ease. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;