import React, { useState, useEffect } from "react"; // Importar useEffect
import Navbar from "../components/Navbar";

// Componentes ya existentes
import KPI from "../components/KPI";
import MonthlyLineChart from "../components/MonthlyLineChart";
import CategoryBarChart from "../components/CategoryBarChart";
import ProgressList from "../components/ProgressList";

import DiagnosticPage from "./DiagnosticPage"; 
import OpportunitiesPage from "./OpportunitiesPage";
import ResourcesPage from "./ResourcesPage.jsx";

import {
  kpiData,
  monthlySavings,
  categoryScores,
  progressAreas
} from "../data/mockData.js";

import "../styles/dashboard.css";

export default function Dashboard() {
  
  // Función para verificar si el diagnóstico está completado
  const isDiagnosticCompleted = () => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
    return !!diagnostics[userId];
  };

  // El estado inicial ahora depende del resultado de isDiagnosticCompleted()
  const initialTab = isDiagnosticCompleted() ? "resumen" : "diagnostico";
  const [activeTab, setActiveTab] = useState(initialTab);

  //NUEVO ESTADO: Para controlar la subpestaña de Recursos
  const [resourceSubTab, setResourceSubTab] = useState("guias"); 

  //NUEVA FUNCIÓN: Redirige al recurso específico
  const redirectToResource = (subTab) => {
    setActiveTab("recursos");
    setResourceSubTab(subTab);
  };

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
        {activeTab === "diagnostico" && 
            //PASAR LA FUNCIÓN DE REDIRECCIÓN COMO PROP
            <DiagnosticPage redirectToResource={redirectToResource} />
        }

        {/* ============ OPORTUNIDADES ============ */}
        {activeTab === "oportunidades" && <OpportunitiesPage />}


        {/* ============ RECURSOS ============ */}
        {/*PASAR EL SUBTAB ACTIVO AL COMPONENTE ResourcesPage */}
        {activeTab === "recursos" && <ResourcesPage initialTab={resourceSubTab} />}

      </main>
    </div>
  );
}