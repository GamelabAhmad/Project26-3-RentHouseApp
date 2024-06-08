// src/components/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetail = () => {
  const { productId } = useParams();

  // Dummy product data based on the productId, in real scenario this should be fetched from an API or state
  const products = {
    1: {
      title: "Rumah Keluarga Indah",
      description: "Dengan desain modern dan ruang luas...",
      price: "Rp 2.500.000 / bulan",
      address: "Jalan Utama No. 123, Springfield",
      details: "3 Kamar Tidur, 2 Kamar Mandi",
      image: "/img/rumah1.jpg",
    },
    2: {
      title: "Rumah Modern Mewah",
      description: "Rumah ini menghadirkan kemewahan dan kenyamanan...",
      price: "Rp 3.000.000 / bulan",
      address: "Jalan Kemang No. 456, Jakarta",
      details: "4 Kamar Tidur, 3 Kamar Mandi",
      image: "/img/rumah2.jpg",
    },
    // Add more products as needed
  };

  const product = products[productId];

  return (
    <>
      <Navbar hideNavbar={false} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-lg font-bold mt-4">{product.price}</p>
            <div className="mt-2 flex items-center text-sm">
              <svg
                className="w-4 h-4 text-gray-500 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              {product.address}
            </div>
            <div className="mt-1 flex items-center text-sm">
              <svg
                className="w-4 h-4 text-gray-500 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 10v12h16V10l-8-6-8 6z" />
              </svg>
              {product.details}
            </div>
            <div className="mt-4">
              <button className="bg-forest text-white px-4 py-2 rounded-md text-sm w-full hover:bg-[#1A4750]">
                Hubungi Agen
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
