import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import AdminDashBoard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="usersPage" element={<UsersPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
