import React from "react";
import Navbar from "./Navbar"; // Sesuaikan dengan path file Navbar

const ProductSection = () => {
  return (
    <>
      <Navbar hideNavbar={true} />
      <section id="Product-Card">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Produk Sewa Rumah 1 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col product-card mt-16">
              <div className="absolute top-0 left-0 bg-[#FAEB98] text-[#0E1525] px-4 py-2 rounded-md text-sm font-bold">
                Rp 2.500.000 / bulan
              </div>
              <div className="h-40 overflow-hidden">
                <img
                  src="/img/rumah1.jpg"
                  alt="Rumah Keluarga Indah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow product-card-content">
                <h2 className="text-lg font-bold text-gray-800">
                  Rumah Keluarga Indah
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Dengan desain modern dan ruang luas, Rumah Modern Mewah
                  menawarkan gaya hidup mewah bagi penghuninya
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Jalan Utama No. 123, Springfield
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 10v12h16V10l-8-6-8 6z" />
                  </svg>
                  3 Kamar Tidur, 2 Kamar Mandi
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500 px-4 py-2">
                <span>Tersedia: 4 rumah</span>
              </div>
              <div className="p-4 pt-0 product-card-footer">
                <button className="bg-forest  text-white px-4 py-2 rounded-md text-sm w-full hover:bg-[#EBD987]">
                  Hubungi Agen
                </button>
              </div>
            </div>

            {/* Produk Sewa Rumah 2 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col product-card mt-16">
              <div className="absolute top-0 left-0 bg-[#FAEB98] text-[#0E1525] px-4 py-2 rounded-md text-sm font-bold">
                Rp 3.000.000 / bulan
              </div>
              <div className="h-40 overflow-hidden">
                <img
                  src="/img/rumah2.jpg"
                  alt="Rumah Modern Mewah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow product-card-content">
                <h2 className="text-lg font-bold text-gray-800">
                  Rumah Modern Mewah
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Rumah ini menghadirkan kemewahan dan kenyamanan dengan desain
                  yang modern dan perhatian terhadap detail.
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Jalan Kemang No. 456, Jakarta
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 10v12h16V10l-8-6-8 6z" />
                  </svg>
                  4 Kamar Tidur, 3 Kamar Mandi
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500 px-4 py-2">
                <span>Tersedia: 4 rumah</span>
              </div>
              <div className="p-4 pt-0 product-card-footer">
                <button className="bg-forest  text-white px-4 py-2 rounded-md text-sm w-full hover:bg-[#EBD987]">
                  Hubungi Agen
                </button>
              </div>
            </div>

            {/* Produk Sewa Rumah 3 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col product-card mt-16">
              <div className="absolute top-0 left-0 bg-[#FAEB98] text-[#0E1525] px-4 py-2 rounded-md text-sm font-bold">
                Rp 2.200.000 / bulan
              </div>
              <div className="h-40 overflow-hidden">
                <img
                  src="/img/rumah3.jpg"
                  alt="Rumah Minimalis Nyaman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow product-card-content">
                <h2 className="text-lg font-bold text-gray-800">
                  Rumah Minimalis Nyaman
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Rumah ini menawarkan kenyamanan dengan desain minimalis yang
                  sederhana namun elegan.
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Jalan Diponegoro No. 789, Surabaya
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 10v12h16V10l-8-6-8 6z" />
                  </svg>
                  2 Kamar Tidur, 1 Kamar Mandi
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500 px-4 py-2">
                <span>Tersedia: 5 rumah</span>
              </div>
              <div className="p-4 pt-0 product-card-footer">
                <button className="bg-forest  text-white px-4 py-2 rounded-md text-sm w-full hover:bg-[#EBD987]">
                  Hubungi Agen
                </button>
              </div>
            </div>

            {/* Produk Sewa Rumah 4 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col product-card mt-16">
              <div className="absolute top-0 left-0 bg-[#FAEB98] text-[#0E1525] px-4 py-2 rounded-md text-sm font-bold">
                Rp 2.800.000 / bulan
              </div>
              <div className="h-40 overflow-hidden">
                <img
                  src="/img/rumah4.jpg"
                  alt="Rumah Suburban Luas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow product-card-content">
                <h2 className="text-lg font-bold text-gray-800">
                  Rumah Suburban Luas
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Rumah ini menawarkan ruang yang luas dengan lingkungan
                  perkotaan yang nyaman.
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Jalan Sudirman No. 101, Bandung
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 10v12h16V10l-8-6-8 6z" />
                  </svg>
                  3 Kamar Tidur, 2 Kamar Mandi
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500 px-4 py-2">
                <span>Tersedia: 3 rumah</span>
              </div>
              <div className="p-4 pt-0 product-card-footer">
                <button className="bg-forest  text-white px-4 py-2 rounded-md text-sm w-full hover:bg-forest">
                  Hubungi Agen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSection;
