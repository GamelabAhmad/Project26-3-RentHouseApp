import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const fullName = localStorage.getItem("fullname");
  const loggedIn = fullName ? fullName.split(" ")[0] : "";

  function handleLogout() {
    localStorage.removeItem("fullname");
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <nav className="bg-forest sticky top-0 font-spartan shadow z-10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-soft-yellow text-xl font-bold uppercase">
          <h1>Rent House Indonesia</h1>
        </div>
        <div className="flex gap-2 items-center justify-between" id="menu-bar">
          <NavLink to="/" className="text-white p-2 text-lg font-medium">
            Home
          </NavLink>
          <NavLink to="#about" className="text-white p-2 text-lg font-medium">
            About
          </NavLink>
          <NavLink to="#contact" className="text-white p-2 text-lg font-medium">
            Contact
          </NavLink>
          {loggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white flex p-2 text-lg font-medium items-center gap-1 focus:outline-none"
              >
                {loggedIn}
                <RiLogoutBoxLine className="font-bold" />
              </button>
              {showDropdown && (
                <div className="absolute top-10 right-2 bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                  <span
                    onClick={handleLogout}
                    className="px-4 py-1 block cursor-pointer bg-white hover:bg-secondary font-semibold transition-all duration-100 text-gray-800"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-white flex p-2 text-lg font-medium items-center gap-1"
            >
              Login <RiLoginBoxLine className="font-bold" />
            </NavLink>
          )}
          <NavLink
            to="/cart"
            className="text-[#daa520] p-2 text-lg font-medium flex items-center mb-1"
          >
            <FaShoppingBag />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
