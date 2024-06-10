import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ProductDetail = () => {
  const { productId } = useParams();
  const [showFacilities, setShowFacilities] = useState(false);

  const products = {
    1: {
      title: "Rumah Keluarga Indah",
      description:
        "Dengan desain modern dan ruang luas, Rumah Modern Mewah menawarkan gaya hidup mewah bagi penghuninya.",
      price: "Rp 2.500.000 / bulan",
      address: "Jalan Utama No. 123, Springfield",
      details: "3 Kamar Tidur, 2 Kamar Mandi",
      facilities: [
        "Kolam Renang",
        "Taman",
        "Garasi",
        "Internet Cepat",
        "Keamanan 24 Jam",
      ],
      image: "/img/rumah1.jpg",
      available: 4,
    },
    2: {
      title: "Rumah Modern Mewah",
      description:
        "Rumah ini menghadirkan kemewahan dan kenyamanan dengan desain yang modern dan perhatian terhadap detail.",
      price: "Rp 3.000.000 / bulan",
      address: "Jalan Kemang No. 456, Jakarta",
      details: "4 Kamar Tidur, 3 Kamar Mandi",
      facilities: [
        "Kolam Renang",
        "Taman Bermain",
        "Garasi",
        "Sistem Keamanan Terpadu",
        "Internet Cepat",
      ],
      image: "/img/rumah2.jpg",
      available: 4,
    },
    3: {
      title: "Rumah Minimalis Nyaman",
      description:
        "Rumah ini menawarkan kenyamanan dengan desain minimalis yang sederhana namun elegan.",
      price: "Rp 2.200.000 / bulan",
      address: "Jalan Diponegoro No. 789, Surabaya",
      details: "2 Kamar Tidur, 1 Kamar Mandi",
      facilities: [
        "Dekat Transportasi Umum",
        "Akses Internet",
        "Keamanan 24 Jam",
        "Parkir Luas",
      ],
      image: "/img/rumah3.jpg",
      available: 5,
    },
    4: {
      title: "Rumah Suburban Luas",
      description:
        "Rumah ini menawarkan ruang yang luas dengan lingkungan perkotaan yang nyaman.",
      price: "Rp 2.800.000 / bulan",
      address: "Jalan Sudirman No. 101, Bandung",
      details: "3 Kamar Tidur, 2 Kamar Mandi",
      facilities: [
        "Taman Luas",
        "Kolam Renang Komunal",
        "Koneksi Internet Cepat",
        "Keamanan 24 Jam",
      ],
      image: "/img/rumah4.jpg",
      available: 3,
    },
  };
  const product = products[productId];

  if (!product) {
    return <div>Product not found</div>;
  }

  const toggleShowFacilities = () => {
    setShowFacilities(!showFacilities);
  };

  return (
    <>
      <Navbar hideNavbar={false} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <Link to="/" className="absolute top-0 left-0 mt-4 ml-4">
            <AiOutlineArrowLeft className="w-8 h-8 text-gray-500" />
          </Link>
          <img
            src={product.image}
            alt={product.title}
            className="w-full lg:w-1/2 h-auto"
          />
          <div className="lg:ml-8 mt-8 lg:mt-0">
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
            <div className="mt-1 text-sm text-gray-500">
              <span>Tersedia: {product.available} rumah</span>
            </div>
            <div className="mt-4">
              <button
                className="text-forest underline mr-2 hover:text-[#1A4750]"
                onClick={toggleShowFacilities}
              >
                {showFacilities ? "Hide" : "Show more"}
              </button>
            </div>
            {showFacilities && (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Fasilitas:</h3>
                <ul className="list-disc list-inside">
                  {product.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <Link to="/">
                <button className="bg-forest text-white px-4 py-2 rounded-md text-sm hover:bg-[#1A4750]">
                  Pesan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
