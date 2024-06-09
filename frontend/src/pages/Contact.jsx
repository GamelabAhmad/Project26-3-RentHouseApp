// src/components/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="mt-20 px-4">
      <h2 className="text-2xl font-bold">Contact Rent House</h2>
      <p className="mt-4 text-gray-700">
        Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut,
        jangan ragu untuk menghubungi kami melalui formulir di bawah ini.
      </p>
      <form className="mt-6 space-y-6">
        <div className="form-group">
          <label
            htmlFor="name"
            className="block mb-2 text-gray-700 font-semibold text-left"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full px-1 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="email"
            className="block mb-2 text-gray-700 font-semibold text-left"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-1 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="message"
            className="block mb-2 text-gray-700 font-semibold text-left"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message"
            className="w-full px-1 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-forest text-white px-4 py-2 rounded-md text-sm hover:bg-[#1A4750]"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
