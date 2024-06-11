import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("fullname", data.data.fullname);
        setFullname(data.data.fullname);
        setSuccess(`Welcome! Find your house, ${data.data.fullname}`);
        setError("");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (res.status === 401) {
        setError("Email or password is incorrect. Please try again.");
        setSuccess("");
      } else {
        setError(data.message || "Gagal masuk");
        setSuccess("");
      }
    } catch (error) {
      setError(`login failed: ${error.message}`);
      setSuccess("");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-spartan">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md md:max-w-lg">
        <NavLink
          className="absolute top-10 left-6 text-gray-700 hover:text-gray-900"
          to="/"
        >
          <AiOutlineArrowLeft size={24} />
        </NavLink>
        <div className="text-center mb-8">
          <h2 className="text-3xl uppercase font-bold text-forest">Login</h2>
          <p className="text-gray-700">Welcome, Please enter your details</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-semibold ml-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-1 px-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest text-left"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-700 font-semibold ml-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest text-left"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-forest text-white rounded-md hover:bg-[#1A4750] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-lg font-bold uppercase text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-lg font-bold uppercase text-center">
              {success}
            </p>
          )}
          <p className="text-center text-gray-700 mt-4">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-500">
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
