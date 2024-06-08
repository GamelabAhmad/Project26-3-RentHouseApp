import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Register() {
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
          <h2 className="text-2xl font-bold text-slate-950">Register</h2>
          <p className="text-gray-700">Create a new account</p>
        </div>
        <form className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-gray-700 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-forest text-white rounded-md hover:bg-[#1A4750] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            Register
          </button>
          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
