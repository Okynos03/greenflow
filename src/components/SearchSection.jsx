import React from "react";
import faqs from "../data/faqs";

export default function SearchSection() {
  return (
    <section className="search-section">
      <div className="container">
        <h2 className="center">¿Quieres conocer más...?</h2>

        <div className="search-bar">
          <input placeholder="Busca información sobre economía circular, beneficios, certificaciones..." />
        </div>

        <div className="faq-grid">
          {faqs.map(f => (
            <div key={f.id} className="faq-card">
              <div className="faq-icon">💡</div>
              <div className="faq-title">{f.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
