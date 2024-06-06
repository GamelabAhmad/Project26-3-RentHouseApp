import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Navbar = ({ hideNavbar }) => {
  if (hideNavbar) {
    return null;
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
          <NavLink
            to="/login"
            className="text-white flex p-2 text-lg font-medium items-center gap-1"
          >
            Login <IoIosLogIn className="font-bold" />
          </NavLink>
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
};

export default Navbar;
