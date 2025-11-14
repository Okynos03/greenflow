import { useState } from "react";
import iconLight from "../assets/icon-light.png";
import iconClock from "../assets/icon-clock.png";
import iconGlobe from "../assets/icon-globe.png";
import logo from "../assets/logo.png";
import FAQModal from "./FAQModal";
import faqs from "../data/faqs";
import "../styles/landing.css";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  // Filtrar preguntas según búsqueda
  const filtered = faqs.filter(f =>
    f.title.toLowerCase().includes(query.toLowerCase())
  );

  // Preguntas que se muestran por defecto
  const defaultItems = [
    { id: 1, icon: iconLight },
    { id: 2, icon: iconClock },
    { id: 3, icon: iconGlobe },
    { id: 4, icon: logo }
  ];

  // Selección final: si query vacío → 4 primeras; si hay búsqueda → resultados
  const itemsToShow = query.trim() === ""
    ? defaultItems.map(item => faqs.find(f => f.id === item.id))
    : filtered;

  return (
    <section className="search-section">
      <h1>¿Quieres conocer más...?</h1>

      <input
        type="text"
        placeholder="Busca sobre economía circular, ahorros, certificaciones..."
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="info-grid">
        {itemsToShow.map(faq => (
          <div
            key={faq.id}
            className="info-card"
            onClick={() => setSelectedFAQ(faq)}
          >
            <img
              src={
                faq.id === 1 ? iconLight :
                faq.id === 2 ? iconClock :
                faq.id === 3 ? iconGlobe :
                logo
              }
              alt="icon"
            />
            <p>{faq.title}</p>
          </div>
        ))}
      </div>

      {selectedFAQ && (
        <FAQModal faq={selectedFAQ} onClose={() => setSelectedFAQ(null)} />
      )}
    </section>
  );
}
