import React, { useState } from 'react';
import { useUserContext } from '~/context/useUserContext';
import nameShortner from '~/utils/nameShortner';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useUserContext();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <a href="/" className="text-2xl font-bold hover:text-gray-300">
                        NextForm
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a
                            href="/form/new"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Form
                        </a>
                        <a
                            href="/contact"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Workflow
                        </a>
                        <a
                            href="/contact"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Plugin
                        </a>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center rounded-full bg-slate-500 w-10 h-10 justify-center text-white hover:bg-slate-400 focus:outline-none"
                            >
                                <span>{nameShortner(user?.name || "User")}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="/settings"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Settings
                                    </a>
                                    <button
                                        onClick={() => alert('Logout')}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-gray-300 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 text-white">
                    <a
                        href="/form/new"
                        className="block px-4 py-2 hover:bg-gray-700"
                    >
                        Form
                    </a>
                    <a
                        href="/contact"
                        className="block px-4 py-2 hover:bg-gray-700"
                    >
                        Workflow
                    </a>
                    <a
                        href="/contact"
                        className="block px-4 py-2 hover:bg-gray-700"
                    >
                        Plugin
                    </a>
                    <button
                        onClick={toggleDropdown}
                        className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                    >
                        Profile
                    </button>
                    {dropdownOpen && (
                        <div className="bg-gray-700 text-white">
                            <a
                                href="/profile"
                                className="block px-4 py-2 hover:bg-gray-600"
                            >
                                Profile
                            </a>
                            <a
                                href="/settings"
                                className="block px-4 py-2 hover:bg-gray-600"
                            >
                                Settings
                            </a>
                            <button
                                onClick={() => alert('Logout')}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
