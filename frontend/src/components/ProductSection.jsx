import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const ProductSection = () => {
  const products = [
    {
      id: 1,
      price: "Rp 2.500.000 / bulan",
      imgSrc: "/img/rumah1.jpg",
      title: "Rumah Keluarga Indah",
      description:
        "Dengan desain modern dan ruang luas, Rumah Modern Mewah menawarkan gaya hidup mewah bagi penghuninya",
      address: "Jalan Utama No. 123, Springfield",
      details: "3 Kamar Tidur, 2 Kamar Mandi",
      available: 4,
    },
    {
      id: 2,
      price: "Rp 3.000.000 / bulan",
      imgSrc: "/img/rumah2.jpg",
      title: "Rumah Modern Mewah",
      description:
        "Rumah ini menghadirkan kemewahan dan kenyamanan dengan desain yang modern dan perhatian terhadap detail.",
      address: "Jalan Kemang No. 456, Jakarta",
      details: "4 Kamar Tidur, 3 Kamar Mandi",
      available: 4,
    },
    {
      id: 3,
      price: "Rp 2.200.000 / bulan",
      imgSrc: "/img/rumah3.jpg",
      title: "Rumah Minimalis Nyaman",
      description:
        "Rumah ini menawarkan kenyamanan dengan desain minimalis yang sederhana namun elegan.",
      address: "Jalan Diponegoro No. 789, Surabaya",
      details: "2 Kamar Tidur, 1 Kamar Mandi",
      available: 5,
    },
    {
      id: 4,
      price: "Rp 2.800.000 / bulan",
      imgSrc: "/img/rumah4.jpg",
      title: "Rumah Suburban Luas",
      description:
        "Rumah ini menawarkan ruang yang luas dengan lingkungan perkotaan yang nyaman.",
      address: "Jalan Sudirman No. 101, Bandung",
      details: "3 Kamar Tidur, 2 Kamar Mandi",
      available: 3,
    },
  ];

  return (
    <>
      <Navbar hideNavbar={true} />
      <section id="Product-Card">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col product-card mt-16"
              >
                <div className="absolute top-0 left-0 bg-[#FAEB98] text-[#0E1525] px-4 py-2 rounded-md text-sm font-bold font-spartan">
                  {product.price}
                </div>
                <div className="h-40 overflow-hidden">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow product-card-content font-spartan">
                  <h2 className="text-lg font-bold text-gray-800 font-spartan">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm font-spartan">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm font-spartan">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    {product.address}
                  </div>
                  <div className="mt-1 flex items-center text-sm font-spartan">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 10v12h16V10l-8-6-8 6z" />
                    </svg>
                    {product.details}
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500 px-4 py-2 font-spartan">
                  <span>Tersedia: {product.available} rumah</span>
                </div>
                <div className="p-4 pt-0 product-card-footer">
                  <NavLink
                    to={`/product/${product.id}`}
                    className="bg-forest text-white px-4 py-2 rounded-md text-sm w-full hover:bg-[#1A4750] flex items-center justify-center"
                  >
                    Detail
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSection;
