import React from "react";
import "../styles/landing.css"; // Asegúrate de tener los estilos aquí o en tu archivo global

export default function PlansModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container plans-modal-container">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="plans-header">
          <h2>Planes de Suscripción</h2>
          <p className="plans-subtitle">GREENFLOW - Economía Circular</p>
        </div>

        <div className="plans-title-main">
          <h3>Elige el Plan Ideal para tu Empresa</h3>
          <p>Potencia tu transición hacia la economía circular con las herramientas que necesitas</p>
        </div>

        <div className="plans-grid">
          
          {/* PLAN GRATUITO */}
          <div className="plan-card">
            <div className="plan-icon">✨</div>
            <h4 className="plan-name">Gratuito</h4>
            <p className="plan-desc">Ideal para explorar la plataforma</p>
            <div className="plan-price">$0 <span>MXN</span></div>
            <p className="plan-period">por siempre</p>
            
            <ul className="plan-features">
              <li>✔ Diagnóstico básico (1 categoría)</li>
              <li>✔ 3 oportunidades por mes</li>
              <li>✔ Recursos educativos básicos</li>
              <li>✔ Calculadora de ROI simple</li>
              <li>✔ Soporte por email</li>
              <li className="disabled">✕ Diagnóstico completo</li>
              <li className="disabled">✕ Oportunidades ilimitadas</li>
              <li className="disabled">✕ Análisis de impacto detallado</li>
              <li className="disabled">✕ Soporte prioritario</li>
            </ul>
            
            <button className="plan-btn-outline">Plan Actual</button>
          </div>

          {/* PLAN PROFESIONAL */}
          <div className="plan-card professional">
            <div className="popular-badge">⭐ Más Popular</div>
            <div className="plan-icon green-icon">⚡</div>
            <h4 className="plan-name">Profesional</h4>
            <p className="plan-desc">Para empresas que inician su transformación</p>
            <div className="plan-price">$499 <span>MXN</span></div>
            <p className="plan-period">por mes</p>
            
            <ul className="plan-features">
              <li>✔ Todo lo del plan Gratuito</li>
              <li>✔ Diagnóstico completo (5 categorías)</li>
              <li>✔ Oportunidades ilimitadas</li>
              <li>✔ Biblioteca completa de recursos</li>
              <li>✔ Calculadora avanzada de ROI</li>
              <li>✔ Análisis de impacto detallado</li>
              <li>✔ Reportes exportables en PDF</li>
              <li>✔ Soporte prioritario por chat</li>
              <li className="disabled">✕ Consultoría personalizada</li>
            </ul>

            <button className="plan-btn-primary">Comenzar Ahora</button>
          </div>

          {/* PLAN EMPRESARIAL */}
          <div className="plan-card enterprise">
            <div className="plan-icon purple-icon">👑</div>
            <h4 className="plan-name">Empresarial</h4>
            <p className="plan-desc">Solución completa para grandes empresas</p>
            <div className="plan-price">$1,499 <span>MXN</span></div>
            <p className="plan-period">por mes</p>
            
            <ul className="plan-features">
              <li>✔ Todo lo del plan Profesional</li>
              <li>✔ Consultoría personalizada (4 hrs/mes)</li>
              <li>✔ Análisis multi-planta</li>
              <li>✔ API para integración con ERP</li>
              <li>✔ Dashboard ejecutivo personalizado</li>
              <li>✔ Capacitación para equipo (online)</li>
              <li>✔ Conexión con proveedores certificados</li>
              <li>✔ Soporte dedicado 24/7</li>
              <li>✔ Auditorías trimestrales de circularidad</li>
            </ul>

            <button className="plan-btn-purple">Contactar Ventas</button>
          </div>

        </div>
      </div>
    </div>
  );
}