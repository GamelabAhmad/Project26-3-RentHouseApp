import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="text-center p-8 rounded-lg bg-opacity-50 backdrop-blur-lg font-spartan text-shadow">
        <h1 className="text-8xl font-bold mb-4 animate-bounce">404</h1>
        <p className="text-3xl mb-8">
          Oops! We Couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-black bg-opacity-60 rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
