import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchSection from "../components/SearchSection";
import FeaturesSection from "../components/FeaturesSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchSection />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </>
  );
}
