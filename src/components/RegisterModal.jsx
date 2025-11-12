import { useState, useRef } from "react";
import "../styles/landing.css";

export default function RegisterModal({ onClose }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: "",
    sector: "",
    empleados: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar datos simulando base de datos local
    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    registros.push(formData);
    localStorage.setItem("registros", JSON.stringify(registros));

    alert("Cuenta creada correctamente ✅");
    onClose();
  };

  // Cerrar modal al hacer clic fuera del contenedor
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
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>Nombre de la Empresa</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            required
          />

          <label>Sector</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un sector</option>
            <option value="Manufactura">Manufactura</option>
            <option value="Alimentos y Bebidas">Alimentos y Bebidas</option>
            <option value="Textil">Textil</option>
            <option value="Construcción">Construcción</option>
            <option value="Servicios">Servicios</option>
            <option value="Otro">Otro</option>
          </select>

          <label>Número de Empleados</label>
          <select
            name="empleados"
            value={formData.empleados}
            onChange={handleChange}
            required
          >
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
            placeholder="correo@empresa.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña segura"
            required
          />

          <button type="submit" className="btn-modal-create">
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
