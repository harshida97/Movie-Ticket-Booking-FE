import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToggleComponent from './ToggleComponent';

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const adminName = localStorage.getItem('userName'); // Get the name from local storage
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/register'); // Redirect to the login page
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <img
                            src="https://png.pngtree.com/background/20210711/original/pngtree-film-stage-blue-glitter-movie-background-picture-image_1168564.jpg"
                            alt="Logo"
                            className="h-10 w-10"
                        />
                        <span className="text-white text-xl ml-2">
                            Welcome, admin {adminName}!
                        </span>
                    </div>

                    {/* Toggle Button for Mobile (Hamburger) */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
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
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Links Section */}
                    <div className="hidden lg:flex lg:items-center lg:justify-end space-x-6 text-white">
                        <Link to="/register">Home</Link>
                        <Link to="/movies">Shows</Link>
                        <Link to="/theaterlist">Theaters</Link>
                        <Link to="/userslist">Users List</Link>
                        <button onClick={handleLogout}>Logout</button>
                        <ToggleComponent />
                    </div>
                </div>

                {/* Mobile Links Section */}
                <div
                    className={`${
                        isOpen ? 'block' : 'hidden'
                    } lg:hidden bg-gray-800 p-4`}
                >
                    <div className="flex flex-col items-center">
                        <Link to="/register" className="block py-2 text-white">Home</Link>
                        <Link to="/movies" className="block py-2 text-white">Shows</Link>
                        <Link to="/theaterlist" className="block py-2 text-white">Theaters</Link>
                        <Link to="/userslist" className="block py-2 text-white">Users List</Link>
                        <button 
                            onClick={handleLogout} 
                            className="block py-2 text-white"
                        >
                            Logout
                        </button>
                        <ToggleComponent />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminNavbar;
