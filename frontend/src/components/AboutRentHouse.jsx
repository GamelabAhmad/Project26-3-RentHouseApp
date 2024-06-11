import React from "react";

const AboutRentHouse = () => {
  return (
    <>
      <section id="about" className="bg-white py-32 font-spartan rounded-lg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-forest mb-4">
              Tentang Sewa Rumah
            </h2>
            <p className="text-lg text-gray-800">
              Menyediakan Rumah Impian Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div>
              <img
                src="/img/about.png"
                alt="Tentang Sewa Rumah"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="text-gray-800">
              <p className="text-lg mb-4">
                Rent House Indonesia adalah platform yang menyediakan berbagai
                pilihan rumah untuk disewa sesuai dengan kebutuhan dan
                preferensi Anda. Kami memiliki beragam jenis rumah mulai dari
                rumah keluarga, rumah modern, rumah minimalis, hingga rumah
                suburban.
              </p>
              <p className="text-lg">
                Dengan layanan kami, Anda dapat dengan mudah menemukan rumah
                impian Anda dan menjadikannya tempat tinggal yang nyaman untuk
                Anda dan keluarga.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutRentHouse;
