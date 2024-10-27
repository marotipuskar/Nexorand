// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">Nexorand</Link>
      </h1>
      
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/leaderboard" className="hover:text-gray-300">Leaderboard</Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2"
            >
              <span className="text-sm font-semibold">{user.firstName}</span>
              <img
                src="../public/images/profile-icon.png" // replace with an profile icon
                alt="User Icon"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">Points: {user.points}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;