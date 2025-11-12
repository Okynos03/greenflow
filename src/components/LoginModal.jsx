import { useState, useRef } from "react";
import "../styles/landing.css";
import { validateLogin } from "../utils/authUtils";
import AlertToast from "./AlertToast";

export default function LoginModal({ onClose }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    // Validar con "base de datos"
    const result = validateLogin(formData.email, formData.password);

    if (result === true) {
      setToast({ type: "success", message: "Inicio de sesión exitoso ✅" });
      setError("");
      onClose();
    } else {
      setToast({ type: "error", message: result });
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>Iniciar Sesión</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="correo@empresa.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-modal-create">
            Iniciar Sesión
          </button>
        </form>
      </div>
      {toast && (
  <AlertToast
    type={toast.type}
    message={toast.message}
    onClose={() => setToast(null)}
  />
)}

    </div>
  );
}
