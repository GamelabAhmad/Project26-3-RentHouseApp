import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [nomorTelp, setNomorTelp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("penyewa");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Password doesn't match");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullname,
          nomor_telp: nomorTelp,
          role,
          nama_bank: role === "pemilik" ? bankName : null,
          nomor_rekening: role === "pemilik" ? accountNumber : null,
        }),
      });
      if (res.ok) {
        setSuccessMessage("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to register");
      }
    } catch (error) {
      setError(`register failed: ${error.message}`);
    }
  }
  console.log(fullname, email, password, confirmPassword);
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
          <h2 className="text-3xl uppercase font-bold text-forest">Register</h2>
          <p className="text-gray-700">Create a new account</p>
        </div>
        <form className="space-y-4" onSubmit={handleRegister}>
          {error && (
            <p className="text-red-500 text-lg font-bold uppercase">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-lg font-bold uppercase">
              {successMessage}
            </p>
          )}
          <div className="form-group">
            <label
              htmlFor="fullname"
              className="block mb-1 text-gray-700 font-semibold ml-2"
            >
              Fullname
            </label>
            <input
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              type="text"
              id="fullname"
              placeholder="fullname"
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="role"
              className="block mb-1 text-gray-700 font-semibold ml-2"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-1 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="penyewa" className="p-4">
                Penyewa
              </option>
              <option value="pemilik" className="p-4">
                Pemilik
              </option>
            </select>
          </div>
          {role === "pemilik" && (
            <>
              <div className="form-group">
                <label
                  htmlFor="bank-name"
                  className="block mb-1 text-gray-700 font-semibold ml-2"
                >
                  Nama Bank
                </label>
                <select
                  id="bank-name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-1 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Pilih Bank</option>
                  <option value="BCA">BCA</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="SEABANK">SEABANK</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="nomor-rekening"
                  className="block mb-1 text-gray-700 font-semibold ml-2"
                >
                  Nomor Rekening <span className="text-red-500 text-lg">*</span>
                </label>
                <input
                  onChange={(e) => setAccountNumber(e.target.value)}
                  value={accountNumber}
                  type="text"
                  id="nomor-rekening"
                  placeholder="Nomor Rekening"
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-semibold ml-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="nomor_telp"
              className="block mb-1 text-gray-700 font-semibold ml-2"
            >
              Phone Number
            </label>
            <input
              onChange={(e) => setNomorTelp(e.target.value)}
              value={nomorTelp}
              type="text"
              id="nomor_telp"
              placeholder="089123456789"
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-semibold ml-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="confirm-password"
              className="block mb-1 text-gray-700 font-semibold ml-2"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2  bg-forest text-white rounded-md hover:bg-[#1A4750] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
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
