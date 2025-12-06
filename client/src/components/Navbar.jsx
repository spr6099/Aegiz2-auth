import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout(); // clear context + localStorage
    navigate("/"); // redirect to login
  };

  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left Side - Title */}
      <div className="text-xl font-semibold text-gray-700">User Management</div>

      {/* Right Side - User Info */}
      <div className="flex items-center gap-3 cursor-pointer">
        <FaUserCircle className="text-3xl text-gray-600" />
        <span
          className="text-gray-700 font-medium"
          onClick={() => setShowMenu(!showMenu)}
        >
          {user?.name}
        </span>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute right-6 top-14 bg-white text-slate-800 shadow-lg rounded-md py-2 w-40 border border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
