import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import AboutRentHouse from "./components/AboutRentHouse";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="h-[2000px]">
      <Navbar />
      <LandingPage />
      <AboutRentHouse />
      <ProductSection />
      <Footer />
    </div>
  );
}

export default App;
