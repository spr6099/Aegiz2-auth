import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdPerson, MdPeople, MdLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear context + localStorage
    navigate("/"); // redirect to login
  };

  return (
    <div className="h-screen w-64 bg-slate-800 text-gray-300 flex flex-col">
      {/* Logo */}
      <div className="p-5 text-2xl font-bold text-white tracking-wide border-b border-slate-700">
        Admin Panel
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        <Link
          to="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-700 transition }`}
        >
          <MdDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-700 transition 
            }`}
        >
          <MdPerson size={20} />
          My Profile
        </Link>

        <Link
          to="/admin/usersPage"
          className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-700 transition }`}
        >
          <MdPeople size={20} />
          Manage Users
        </Link>
      </nav>

      {/* Sign Out */}
      <button
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition rounded-md m-4"
        onClick={handleLogout}
      >
        <MdLogout size={20} />
        Sign Out
      </button>
    </div>
  );
};

export default AdminSidebar;
