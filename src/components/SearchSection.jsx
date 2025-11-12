import iconLight from "../assets/icon-light.png";
import iconClock from "../assets/icon-clock.png";
import iconGlobe from "../assets/icon-globe.png";
import logo from "../assets/logo.png";
import "../styles/landing.css";

export default function SearchSection() {
  return (
    <section className="search-section">
      <h1>¿Quieres conocer más...?</h1>
      <input 
        type="text" 
        placeholder="Busca información sobre economía circular, beneficios, certificaciones..." 
        className="search-bar"
      />

      <div className="info-grid">
        <div className="info-card">
          <img src={iconLight} alt="icon" />
          <p>¿Qué es economía circular y por qué es importante para mi empresa?</p>
        </div>
        <div className="info-card">
          <img src={iconClock} alt="icon" />
          <p>¿Cuánto puedo ahorrar implementando economía circular?</p>
        </div>
        <div className="info-card">
          <img src={iconGlobe} alt="icon" />
          <p>¿Qué beneficios fiscales hay para empresas circulares en GTO?</p>
        </div>
        <div className="info-card">
          <img src={logo} alt="icon" />
          <p>¿Cómo inicio la transición a economía circular en mi empresa?</p>
        </div>
      </div>
    </section>
  );
}
