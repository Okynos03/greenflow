import React, { useState } from "react";
import Navbar from "../components/Navbar";

// Componentes ya existentes
import KPI from "../components/KPI";
import MonthlyLineChart from "../components/MonthlyLineChart";
import CategoryBarChart from "../components/CategoryBarChart";
import ProgressList from "../components/ProgressList";

import DiagnosticPage from "./DiagnosticPage"; // ahora se usará dentro del dashboard

import {
  kpiData,
  monthlySavings,
  categoryScores,
  progressAreas
} from "../data/mockData.js";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("resumen");

  return (
    <div>
      <Navbar />

      {/* NAV TABS */}
      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === "resumen" ? "active" : ""}`}
          onClick={() => setActiveTab("resumen")}
        >
          🔢 Resumen
        </button>

        <button
          className={`tab ${activeTab === "diagnostico" ? "active" : ""}`}
          onClick={() => setActiveTab("diagnostico")}
        >
          📋 Diagnóstico
        </button>

        <button
          className={`tab ${activeTab === "oportunidades" ? "active" : ""}`}
          onClick={() => setActiveTab("oportunidades")}
        >
          💡 Oportunidades
        </button>

        <button
          className={`tab ${activeTab === "recursos" ? "active" : ""}`}
          onClick={() => setActiveTab("recursos")}
        >
          📘 Recursos
        </button>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <main className="dashboard-container">
        
        {/* ============ RESUMEN ============ */}
        {activeTab === "resumen" && (
          <>
            <h1 className="dashboard-title">Panel de Control</h1>
            <p className="dashboard-subtitle">
              Visión general del desempeño de economía circular de tu empresa
            </p>

            {/* KPIs */}
            <section className="kpi-grid">
              {kpiData.map((k) => (
                <KPI key={k.id} {...k} />
              ))}
            </section>

            {/* GRÁFICAS */}
            <div className="charts-grid">
              <div className="info-card">
                <div className="chart-title">
                  <strong>Ahorro Mensual</strong>
                  <span>(MXN)</span>
                </div>
                <MonthlyLineChart data={monthlySavings} />
              </div>

              <div className="info-card">
                <div className="chart-title">
                  <strong>Puntuación por Categoría</strong>
                  <span>(0-100)</span>
                </div>
                <CategoryBarChart data={categoryScores} />
              </div>
            </div>

            {/* PROGRESO */}
            <div className="info-card">
              <div className="progress-title">Progreso en Áreas Clave</div>
              <ProgressList areas={progressAreas} />
            </div>
          </>
        )}

        {/* ============ DIAGNÓSTICO ============ */}
        {activeTab === "diagnostico" && <DiagnosticPage />}

        {/* ============ OPORTUNIDADES ============ */}
        {activeTab === "oportunidades" && (
          <div>
            <h2>Áreas de Oportunidad</h2>
            <p>Este módulo mostrará recomendaciones basadas en tu diagnóstico.</p>
          </div>
        )}

        {/* ============ RECURSOS ============ */}
        {activeTab === "recursos" && (
          <div>
            <h2>Recursos Disponibles</h2>
            <p>Guías, documentos, enlaces y herramientas.</p>
          </div>
        )}
      </main>
    </div>
  );
}
