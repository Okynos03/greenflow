import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SearchSection />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
};
