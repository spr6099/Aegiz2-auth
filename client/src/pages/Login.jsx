import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  // 🔥 Auto-redirect if already logged in
  useEffect(() => {
    if (user?.role === "admin") navigate("/admin", { replace: true });
    if (user?.role === "user") navigate("/user", { replace: true });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setloading(true);
    try {
      const response = await api.post("/auth/login", { email, password });

      const token = response.data.token;
      const user = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // console.log(response);

      setToken(token);
      setUser(user);

      if (user.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (error) {
      console.error(error);
      seterror(error.response.data.message || "Login failed. please try again");
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          {/* Email */}
          <label className="block text-gray-700 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
          />

          {/* Password */}
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />

          {/* Forgot Password */}
          <div className="text-right mt-2 mb-4">
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Forgot Password?
            </button>
          </div>
          <div className="text-right mt-2 mb-4">
            <Link to="/register">Register</Link>
          </div>

          {/* Sign In Button */}
          <button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-md font-semibold"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
