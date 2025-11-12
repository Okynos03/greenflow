import "../styles/landing.css";

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <h1>Funcionalidades de la Plataforma</h1>
      <div className="features-grid">
        <div className="feature-card green">
          <div className="icon-circle">📊</div>
          <h3>Diagnóstico Inteligente</h3>
          <p>Evalúa el nivel de circularidad de tu empresa y descubre áreas de oportunidad específicas.</p>
        </div>
        <div className="feature-card blue">
          <div className="icon-circle">💡</div>
          <h3>Oportunidades Personalizadas</h3>
          <p>Recibe recomendaciones adaptadas a tu sector y tamaño de empresa.</p>
        </div>
        <div className="feature-card orange">
          <div className="icon-circle">🌍</div>
          <h3>Impacto Medible</h3>
          <p>Monitorea tus ahorros económicos y tu reducción de impacto ambiental.</p>
        </div>
      </div>
    </section>
  );
}
