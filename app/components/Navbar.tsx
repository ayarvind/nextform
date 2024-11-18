import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black p-4 mb-[40px]">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-2xl font-semibold">
                    <a href="/" className="flex items-center">
                        <img src="#" alt="Logo" className="w-8 h-8 mr-2" />
                        <span>NextForm</span>
                    </a>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <a href="#home" className="text-white hover:text-gray-200">Home</a>
                    <a href="#features" className="text-white hover:text-gray-200">Features</a>
                    <a href="#pricing" className="text-white hover:text-gray-200">Pricing</a>
                    <a href="#about" className="text-white hover:text-gray-200">About</a>
                    <div className="relative">
                        <button className="flex items-center text-white hover:text-gray-200">
                            <img
                                src="#"
                                alt="User Profile"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>John Doe</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu (dropdown) */}
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } md:hidden bg-blue-700 py-4 space-y-4 text-center`}
            >
                <a href="#home" className="text-white hover:text-gray-200 block">Home</a>
                <a href="#features" className="text-white hover:text-gray-200 block">Features</a>
                <a href="#pricing" className="text-white hover:text-gray-200 block">Pricing</a>
                <a href="#about" className="text-white hover:text-gray-200 block">About</a>
                <div className="mt-4">
                    <button className="flex items-center text-white mx-auto">
                        <img
                            src="#"
                            alt="User Profile"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>John Doe</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
