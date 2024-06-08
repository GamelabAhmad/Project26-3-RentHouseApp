import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Register() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-custom-gradient font-spartan"
      style={{
        backgroundImage: `url('/img/house-landingpage-final.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg relative">
        <NavLink
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
          to="/login"
        >
          <AiOutlineArrowLeft size={24} />
        </NavLink>
        <form className="space-y-6 font-spartan">
          <h2 className="text-2xl font-bold text-slate-950 text-center font-spartan">
            Daftar
          </h2>
          <div className="form-group">
            <label
              htmlFor="nama"
              className="block mb-2 text-gray-700 font-semibold font-spartan"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              placeholder="Masukkan Nama Lengkap Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 font-spartan"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-semibold font-spartan"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan Email Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 font-spartan"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-700 font-semibold font-spartan"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan Password Anda"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 font-spartan"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-orange-600 font-semibold font-spartan"
          >
            Daftar
          </button>
          <p className="text-center text-gray-700 mt-4 font-spartan">
            Atau daftar menggunakan akun Google
          </p>
          <a
            className="block w-full py-2 text-center bg-yellow-400 text-white rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-orange-600 mt-2 font-spartan"
            href="#"
          >
            Daftar dengan Google
          </a>
        </form>
      </div>
    </div>
  );
}
