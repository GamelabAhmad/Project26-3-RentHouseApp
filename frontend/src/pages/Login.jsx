import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Contoh: cek apakah email dan password yang dimasukkan adalah "admin"
    if (email === "admin" && password === "admin") {
      // Jika login berhasil, tampilkan pesan toast "Login berhasil"
      toast.success("Login berhasil");
    } else {
      // Jika login gagal, tampilkan pesan toast "Login gagal"
      toast.error("Login gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-spartan">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md md:max-w-lg">
        <NavLink
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
          to="/"
        >
          <AiOutlineArrowLeft size={24} />
        </NavLink>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-950">Login</h2>
          <p className="text-gray-700">Welcome, Please enter your details</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-semibold ml-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-forest text-white rounded-md hover:bg-[#1A4750] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            Login
          </button>
          <p className="text-center text-gray-700 mt-4">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-500">
              Register
            </NavLink>
          </p>
        </form>
      </div>
      <ToastContainer /> {/* Container untuk menampilkan pesan toast */}
    </div>
  );
}
