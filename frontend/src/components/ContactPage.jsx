// components/ContactPage.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="contact-page bg-gray-100 min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Contact Rent House
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8">
          If you have any questions or need further information, please feel
          free to contact us. We're here to help!
        </p>
        <div className="contact-details mt-8 max-w-lg mx-auto bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border rounded"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Send Message
            </button>
          </form>
          <div className="contact-info mt-8">
            <p>
              <strong>Email:</strong> contact@renthouse.com
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Rent House Street, City, Country
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
