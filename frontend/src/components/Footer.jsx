import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <section id="footer">
      <footer className="bg-forest py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-0 md:gap-x-8">
            <div className="text-white text-center md:text-left font-spartan">
              <h2 className="text-soft-yellow text-3xl font-bold mb-4">
                Rent House Indonesia
              </h2>
              <p className="text-lg mb-4">
                Temukan rumah impian Anda dengan kami.
              </p>
              <p className="text-lg">
                Hubungi kami jika Anda membutuhkan bantuan lebih lanjut.
              </p>
            </div>
            <div className="text-white font-spartan">
              <h3 className="text-lg font-bold mb-4">Menu</h3>
              <ul>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-white font-spartan">
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-white font-spartan">
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex flex-col items-center md:items-start md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <a href="#" className="text-lg hover:text-gray-300">
                  <FaFacebook />
                </a>
                <a href="#" className="text-lg hover:text-gray-300">
                  <FaTwitter />
                </a>
                <a href="#" className="text-lg hover:text-gray-300">
                  <FaInstagram />
                </a>
                <a href="#" className="text-lg hover:text-gray-300">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
          <hr className="border-white my-8" />
          <div className="text-white text-center font-spartan">
            <p>
              &copy; {new Date().getFullYear()} Rent House Indonesia. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
