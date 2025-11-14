import heroLogo from "../assets/hero-logo.jpg";
import "../styles/landing.css";

export default function HeroSection({ onOpenRegister, onGoToSearch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">

          <h1>Impulsa la Economía Circular en tu Empresa</h1>
          <p>
            Plataforma inteligente para diagnosticar y desarrollar oportunidades de economía circular 
            en Celaya, Gto. Optimiza recursos, reduce impactos ambientales y fortalece tu competitividad.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onOpenRegister}>
              Comienza Ahora
            </button>

            <button className="btn-secondary" onClick={onGoToSearch}>
              Conoce Más
            </button>
          </div>

        </div>

        <div className="hero-image">
          <img src={heroLogo} alt="GREENFLOW logo" />
        </div>
      </div>
    </section>
  );
}
