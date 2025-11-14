import { useEffect, useState } from "react";
import "../styles/opportunities.css";
import { calculateCarbonFootprint } from "../utils/carbonCalc";

export default function OpportunitiesPage() {

  const [co2, setCo2] = useState(null); // CO₂ dinámico
  const ahorro = 505000;                // Temporal
  const roi = 1.4;                      // Temporal

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
    const answers = diagnostics[userId];

    if (answers) {
      const footprint = calculateCarbonFootprint(answers);
      setCo2(footprint.total / 1000); // convertir kg → toneladas
    } else {
      setCo2(0); // fallback por si no existe diagnóstico aún
    }
  }, []);

  return (
    <div className="op-container">
      <h1>Oportunidades de Mejora</h1>
      <p>Iniciativas personalizadas para tu empresa basadas en el diagnóstico</p>

      {/* ===== KPIs ===== */}
      <div className="op-kpis">
        <div className="op-kpi-card">
          <span className="op-kpi-icon">$</span>
          <h3>Ahorro Potencial Anual</h3>
          <p className="op-kpi-value">${ahorro.toLocaleString()} MXN</p>
        </div>

        <div className="op-kpi-card">
          <span className="op-kpi-icon">📉</span>
          <h3>Reducción de CO₂</h3>

          <p className="op-kpi-value">
            {co2 === null ? "Calculando..." : `${co2.toFixed(1)} ton/año`}
          </p>
        </div>

        <div className="op-kpi-card">
          <span className="op-kpi-icon">⏱</span>
          <h3>ROI Promedio</h3>
          <p className="op-kpi-value">{roi} años</p>
        </div>
      </div>

      <button className="op-export-btn">Exportar Reporte</button>

      {/* ==== PROYECTO 1 ==== */}
      <div className="op-project-card">
        <div className="op-project-header">
          <h2>Implementación de Sistema Solar Fotovoltaico</h2>
          <span className="op-tag">Recomendada</span>
        </div>

        <p>Instalación de paneles solares para cubrir el 60% del consumo energético de la planta.</p>

        <div className="op-project-grid">
          <div><strong>Categoría</strong><br/>Energía</div>
          <div><strong>Impacto</strong><br/><span className="impact-high">Alto</span></div>
          <div><strong>Ahorro Anual</strong><br/>$180,000 MXN/año</div>
          <div><strong>Inversión</strong><br/>$450,000 MXN</div>
          <div><strong>ROI</strong><br/>2.5 años</div>
        </div>

        <div className="op-benefits">
          <span>✔ Reducción de costos de electricidad</span>
          <span>✔ Independencia energética</span>
          <span>✔ Beneficios fiscales en GTO</span>
        </div>

        <div className="op-project-actions">
          <button className="btn-secondary">Ver Detalles</button>
          <button className="btn-primary">Iniciar Proyecto</button>
        </div>
      </div>

      {/* ==== PROYECTO 2 ==== */}
      <div className="op-project-card">
        <div className="op-project-header">
          <h2>Sistema de Captación y Reutilización de Agua Pluvial</h2>
          <span className="op-tag">Recomendada</span>
        </div>

        <p>Instalación de cisternas y sistema de filtración para uso en procesos industriales.</p>

        <div className="op-project-grid">
          <div><strong>Categoría</strong><br/>Agua</div>
          <div><strong>Impacto</strong><br/><span className="impact-medium">Medio</span></div>
          <div><strong>Ahorro Anual</strong><br/>$45,000 MXN/año</div>
          <div><strong>Inversión</strong><br/>$120,000 MXN</div>
          <div><strong>ROI</strong><br/>2.7 años</div>
        </div>

        <div className="op-benefits">
          <span>✔ Reducción de consumo de agua potable</span>
          <span>✔ Ahorro en costos de agua</span>
          <span>✔ Resiliencia ante sequías</span>
        </div>

        <div className="op-project-actions">
          <button className="btn-secondary">Ver Detalles</button>
          <button className="btn-primary">Iniciar Proyecto</button>
        </div>
      </div>
    </div>
  );
}
