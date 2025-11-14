import React, { useState } from "react";
import "../styles/resources.css";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("guias");

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
        <div className="res-card">
          <div className="res-icon">📘</div>
          <div className="res-info">
            <h2>Guía de Economía Circular para PYMEs</h2>
            <span className="res-tag green">Principiante</span>
            <p>
              Manual completo para implementar prácticas circulares en pequeñas y medianas empresas.
            </p>
            <div className="res-meta">
              <span>PDF</span> • <span>45 páginas</span>
            </div>
          </div>
          <button className="res-download">⬇ Descargar</button>
        </div>
      )}

      {activeTab === "guias" && (
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
