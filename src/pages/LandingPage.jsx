import { useRef, useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchSection from "../components/SearchSection";
import FeaturesSection from "../components/FeaturesSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";

export default function LandingPage() {

  const [showRegister, setShowRegister] = useState(false);
  const searchRef = useRef(null);

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* MODAL DE REGISTRO */}
      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}

      {/* HERO — Enviamos funciones */}
      <HeroSection
        onOpenRegister={() => setShowRegister(true)}
        onGoToSearch={scrollToSearch}
      />

      {/* SEARCH SECTION — referencia para scroll */}
      <div ref={searchRef}>
        <SearchSection />
      </div>

      <FeaturesSection />

      {/* Este CTA ya abre modal por separado, y sigue funcionando */}
      <CallToAction onOpenRegister={() => setShowRegister(true)} />

      <Footer />
    </>
  );
}
