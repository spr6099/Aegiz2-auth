import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [password, setpassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [error, seterror] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      // console.log(api);
      const res = await api.post("/auth", { name, email, contact, password });
      // console.log(res);
      alert("succesfull");
      setname("");
      setemail("");
      setpassword("");
      setrePassword("");
      setcontact("");
      navigate("/")
    } catch (error) {
      console.error(error);
      seterror(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-full max-w-sm">
        <h2 className="text-center py-3 text-2xl font-semibold">Register</h2>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-2 py-3 border rounded "
            onChange={(e) => setname(e.target.value)}
            value={name}
            required
          />
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-2 py-3 border rounded "
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your number"
            className="w-full px-2 py-3 border rounded "
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your password"
            className="w-full px-2 py-3 border rounded "
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Re Enter your password"
            className="w-full px-2 py-3 border rounded "
            value={rePassword}
            onChange={(e) => setrePassword(e.target.value)}
            required
          />
          <Link to="/" className="flex justify-end text-emerald-900 font-semibold px-3 hover:text-emerald-700">Login</Link>
          <button
            className="bg-blue-900 hover:bg-blue-700 px-3 py-2 rounded text-white w-full "
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
