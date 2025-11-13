import { useState, useRef, useEffect } from "react";
import "../styles/landing.css";
import { validateLogin, getUsers } from "../utils/authUtils";
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

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const result = validateLogin(formData.email.trim(), formData.password);
    if (result === true) {
      const users = getUsers();
      const user = users.find(u => u.email === formData.email.trim());
      localStorage.setItem("greenflow_logged_in", "1");
      if (user) localStorage.setItem("greenflow_user", JSON.stringify({ email: user.email, name: user.name || "" }));
      setToast({ type: "success", message: "Inicio de sesión correcto. Redirigiendo..." });

      setTimeout(() => {
        if (onClose) onClose();
        window.location.reload();
      }, 800);
      return;
    }

    setError(result);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className="modal-container" ref={modalRef} role="dialog" aria-modal="true">
        <h3 className="modal-header">Iniciar Sesión</h3>

        {error && <div className="error-msg">{error}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-label">Correo</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />

          <label className="modal-label">Contraseña</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit" className="btn-modal-create">Iniciar Sesión</button>
          </div>
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
