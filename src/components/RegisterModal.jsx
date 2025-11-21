import { useState, useRef, useEffect } from "react";
import "../styles/landing.css";
import AlertToast from "./AlertToast";
import { saveUser, getUsers } from "../utils/authUtils";

export default function RegisterModal({ onClose }) {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: "",
    sector: "",
    empleados: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  // Cerrar con Escape
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validación correo
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Ingresa un correo válido.");
      return;
    }

    // Validación contraseña
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Obtener usuarios
    const users = getUsers();
    const emailNormalized = formData.email.trim().toLowerCase();

    if (users.some((u) => u.email === emailNormalized)) {
      setError("Este correo ya está registrado.");
      return;
    }

    // Guardar usuario
    saveUser({
      id: crypto.randomUUID(),
      ...formData,
      email: emailNormalized, // normalizado
    });

    setToast({ type: "success", message: "Cuenta creada correctamente" });

    setTimeout(() => {
      onClose();
    }, 900);
  };

  // Cerrar clic fuera
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>Registrarse</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <label>Nombre de la Empresa</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Sector</label>
          <select name="sector" value={formData.sector} onChange={handleChange} required>
            <option value="">Selecciona un sector</option>
            {/* Sectores Definidos */}
            <option value="Manufactura">Manufactura</option>
            <option value="Automotriz">Automotriz</option> 
            <option value="Alimentos y Bebidas">Alimentos y Bebidas</option> 
            <option value="Servicios">Servicios</option>
            <option value="Logístico">Logístico</option>
            <option value="Otro">Otro</option>
          </select>

          <label>Número de Empleados</label>
          <select name="empleados" value={formData.empleados} onChange={handleChange} required>
            <option value="">Selecciona un rango</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="Más de 500">Más de 500</option>
          </select>

          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-modal-create">
            Crear Cuenta
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