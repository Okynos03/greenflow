import React, { useState, useEffect } from "react";
import "../styles/resources.css";
// Importar el PDF simulado
import GuiaRecopilacionDatosPDF from "../assets/circular.pdf";

// La prop 'initialTab' es nueva
export default function ResourcesPage({ initialTab }) { 
  // Usar initialTab si está presente, sino, usar "guias" por defecto
  const [activeTab, setActiveTab] = useState(initialTab || "guias"); 

  // Si la pestaña cambia externamente, actualizar el estado interno
  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="res-container">
      <h1>Centro de Recursos</h1>
      <p>Guías, herramientas y apoyo para tu transición a la economía circular</p>

      {/* ==== SUBTABS ==== */}
      <div className="res-subtabs">
        <button
          className={activeTab === "guias" ? "active" : ""}
          onClick={() => setActiveTab("guias")}
        >
          📄 Guías
        </button>
        {/* ... (otros botones de subtabs) ... */}
        <button
          className={activeTab === "videos" ? "active" : ""}
          onClick={() => setActiveTab("videos")}
        >
          🎬 Videos
        </button>
        <button
          className={activeTab === "incentivos" ? "active" : ""}
          onClick={() => setActiveTab("incentivos")}
        >
          📘 Incentivos
        </button>
        <button
          className={activeTab === "webinars" ? "active" : ""}
          onClick={() => setActiveTab("webinars")}
        >
          🧑‍🏫 Webinars
        </button>
      </div>

      {/* ======================= GUÍAS ======================= */}
      
      {activeTab === "guias" && (
        // ✅ RECURSO DE RECOPILACIÓN (DEBE SER EL PRIMERO)
        <div className="res-card highlighted"> {/* Añadir clase para destacarlo si se redirige */}
          <div className="res-icon">🚨</div>
          <div className="res-info">
            <h2>Guía práctica para implementar la economía circular en las pymes</h2>
            <span className="res-tag red">Obligatorio</span>
            <p>
              Guía práctica para implementar la economía circular en las pymes, indica exactamente qué registros anuales debe consolidar para completar el diagnóstico.
            </p>
            <div className="res-meta">
              <span>PDF</span> • <span>21 páginas</span>
            </div>
          </div>
          {/* ✅ Enlace directo al archivo para descarga */}
          <a href={GuiaRecopilacionDatosPDF} download className="res-download">⬇ Descargar</a>
        </div>
      )}

      {activeTab === "guias" && (
        <div className="res-card">
          {/* ... (Guía de Economía Circular para PYMEs) ... */}
          <div className="res-icon">📘</div>
          <div className="res-info">
            <h2>Huella de Carbono y parámetros esenciales</h2>
            <span className="res-tag green">Principiante</span>
            <p>
              Manual completo para calcular la huella de carbono.
            </p>
            <div className="res-meta">
              <span>PDF</span> • <span>12 páginas</span>
            </div>
          </div>
          <button className="res-download">⬇ Descargar</button>
        </div>
      )}

      {activeTab === "guias" && (
        // ... (Certificaciones de Sustentabilidad en México) ...
        <div className="res-card">
           <div className="res-icon">📗</div>
           <div className="res-info">
             <h2>Certificaciones de Sustentabilidad en México</h2>
             <span className="res-tag yellow">Intermedio</span>
             <p>
               Información sobre certificaciones disponibles y cómo obtenerlas.
             </p>
             <div className="res-meta">
               <span>PDF</span> • <span>30 páginas</span>
             </div>
           </div>
           <button className="res-download">⬇ Descargar</button>
         </div>
      )}

      {/* ======================= VIDEOS ======================= */}
      {activeTab === "videos" && (
        <div className="res-video-grid">
          <div className="res-video-card">
            <div className="res-video-thumb"></div>
            <div className="res-video-info">
              <span className="res-tag gray">Fundamentos</span> <span>15:30</span>
              <h3>Introducción a la Economía Circular</h3>
              <button className="res-link">↗ Ver Video</button>
            </div>
          </div>

          <div className="res-video-card">
            <div className="res-video-thumb"></div>
            <div className="res-video-info">
              <span className="res-tag gray">Técnico</span> <span>22:45</span>
              <h3>Cómo Calcular tu Huella de Carbono</h3>
              <button className="res-link">↗ Ver Video</button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= INCENTIVOS ======================= */}
      {activeTab === "incentivos" && (
        <div className="res-incentive-card">
          <div className="res-incentive-header">
            <h2>Programa de Apoyo a la Sustentabilidad Empresarial</h2>
            <span className="res-tag green">Subsidio</span>
            <span className="res-source">Gobierno de Guanajuato</span>
          </div>

          <p>
            Apoyo financiero para proyectos de eficiencia energética y gestión de residuos.
          </p>

          <div className="res-incentive-grid">
            <div>
              <strong>Monto</strong>
              <br /> Hasta $500,000 MXN
            </div>
            <div>
              <strong>Fecha Límite</strong>
              <br /> 30 de Junio, 2025
            </div>
          </div>

          <button className="res-primary">Más Información</button>
        </div>
      )}

      {/* ======================= WEBINARS ======================= */}
      {activeTab === "webinars" && (
        <div className="res-webinar-card">
          <span className="res-tag blue">Próximamente</span>

          <h2>Economía Circular en la Industria Manufacturera</h2>

          <div className="res-webinar-meta">
            🧑‍🏫 Dr. Carlos Méndez
            <br />
            15 de Noviembre, 2025 • 10:00 AM
          </div>

          <button className="res-primary">Registrarse</button>
        </div>
      )}
    </div>
  );
}
