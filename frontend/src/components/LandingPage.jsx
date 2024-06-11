import React from "react";

export default function LandingPage() {
  return (
    <section
      id="landing-page"
      className="landing-page font-spartan min-h-screen relative"
    >
      <main className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
        <div className="text-start p-4 uppercase">
          <h1 className="text-8xl uppercase text-white font-extrabold text-shadow">
            Rent
            <br /> House
            <br /> Indonesia
          </h1>
          <p className="text-3xl font-bold text-soft-yellow">
            Solusi Mudah Sewa Rumah Idaman Anda
          </p>
        </div>
        <a
          href="#about"
          className="px-6 shadow uppercase py-4 bg-forest text-white rounded-lg cari-rumah-button transition duration-200 font-semibold"
        >
          Cari Rumah Sekarang
        </a>
      </main>
    </section>
  );
}
