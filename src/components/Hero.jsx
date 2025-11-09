import React from "react";
import heroLogo from "../assets/hero-logo.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1>Impulsa la Economía Circular en tu Empresa</h1>
          <p className="lead">
            Plataforma inteligente para diagnosticar y desarrollar oportunidades de economía circular en Celaya, Gto. Optimiza recursos, reduce impactos ambientales y fortalece tu competitividad.
          </p>
          <div className="hero-cta">
            <a href="#comienza" className="btn btn-primary">Comienza Ahora</a>
            <button className="btn btn-outline">Conoce Más</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroLogo} alt="Greenflow logo" />
        </div>
      </div>
    </section>
  );
}
