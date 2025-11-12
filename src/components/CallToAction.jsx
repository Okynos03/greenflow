import { useState } from "react";
import "../styles/landing.css";
import RegisterModal from "./RegisterModal";

export default function CallToAction() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="cta-section">
        <h2>¿Listo para transformar tu empresa?</h2>
        <p>Únete a las empresas de Celaya que están liderando la economía circular.</p>
        <button className="btn-light" onClick={() => setShowModal(true)}>
          Registrarse Gratis
        </button>
      </section>

      {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
    </>
  );
}
