import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AdminSidebar from "../components/AdminSidebar";
import UserSidebar from "../components/UserSidebar";

const Layout = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-slate-800">
        {user?.role === "admin" ? <AdminSidebar /> : <UserSidebar />}
      </div>

      <div className="flex flex-col flex-1">
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
