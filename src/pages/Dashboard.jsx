import React, { useState, useEffect } from "react"; 
import Navbar from "../components/Navbar";

// Componentes ya existentes
import KPI from "../components/KPI";
import MonthlyLineChart from "../components/MonthlyLineChart";
import CategoryBarChart from "../components/CategoryBarChart";
import ProgressList from "../components/ProgressList";

import DiagnosticPage from "./DiagnosticPage";
import OpportunitiesPage from "./OpportunitiesPage";
import ResourcesPage from "./ResourcesPage.jsx";

// Importaciones para el cálculo dinámico
import { getDashboardMetrics } from "../utils/dashboardCalc";
// 🔥 CORREGIDO: Importación del listado de preguntas
import diagnosticQuestions from "../data/diagnosticQuestions"; 

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

  // NUEVO ESTADO: Para controlar la subpestaña de Recursos
  const [resourceSubTab, setResourceSubTab] = useState("guias");

  // Estado para almacenar las métricas calculadas
  const [dashboardData, setDashboardData] = useState(null);

  // Efecto para calcular las métricas cuando el componente se monta
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
    const answers = diagnostics[userId];

    if (answers) {
      // Cálculo de métricas
      const metrics = getDashboardMetrics(answers, diagnosticQuestions);
      setDashboardData(metrics);
    } else {
      // Usar valores por defecto si no hay diagnóstico
      setDashboardData(getDashboardMetrics({}, []));
    }
  }, [activeTab]);

  // NUEVA FUNCIÓN: Redirige al recurso específico
  const redirectToResource = (subTab) => {
    setActiveTab("recursos");
    setResourceSubTab(subTab);
  };
  
  // Si aún está cargando los datos
  if (!dashboardData && isDiagnosticCompleted()) {
    return <div className="loading">Cargando métricas...</div>;
  }

  // Datos Dinámicos
  const score = dashboardData?.score || 0;
  const savingsTotal = dashboardData?.savings.total || 0;
  const monthlyData = dashboardData?.savings.monthlyData || [];
  const progressAreas = dashboardData?.progressAreas || [];
  
  // Nuevas métricas de volumen
  const wasteReduction = dashboardData?.wasteReduction || { reductionTon: 0, percentage: 0 };
  const waterSavings = dashboardData?.waterSavings || 0;


  // Adaptar tus KPIs al nuevo formato de datos
  const kpiDataDynamic = [
    {
      id: 1,
      icon: "♻️",
      title: "Nivel de Circularidad",
      value: `${score.toFixed(1)}%`,
      change: "Progreso General",
    },
    {
      id: 2,
      icon: "💰",
      title: "Ahorro Potencial Anual",
      value: `$${savingsTotal.toLocaleString()}`,
      change: "MXN",
    },
    // KPI: Reducción de Residuos
    {
      id: 3,
      icon: "🍂",
      title: "Reducción de Residuos",
      value: `${wasteReduction.reductionTon.toLocaleString()} ton`,
      change: `${wasteReduction.percentage}% menos a vertedero`,
    },
    // KPI: Ahorro de Agua
    {
      id: 4,
      icon: "💧",
      title: "Ahorro Potencial de Agua",
      value: `${waterSavings.toLocaleString()} m³`,
      change: "Ahorro de consumo anual",
    },
  ];

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

            {/* KPIs: Usar datos dinámicos */}
            {/* 🔥 Estilo para 4 columnas, asumiendo que kpi-grid no lo tiene por defecto */}
            <section className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {kpiDataDynamic.map((k) => (
                <KPI key={k.id} {...k} />
              ))}
            </section>

            {/* GRÁFICAS */}
            <div className="charts-grid">
              <div className="info-card">
                <div className="chart-title">
                  <strong>Ahorro Mensual Proyectado</strong>
                  <span>(MXN)</span>
                </div>
                {/* Gráfica de Línea: Usar datos dinámicos */}
                <MonthlyLineChart data={monthlyData} />
              </div>

              <div className="info-card">
                <div className="chart-title">
                  <strong>Potencial por Área</strong>
                  <span>(%)</span>
                </div>
                {/* Gráfica de Categorías: Usar el puntaje por área */}
                <CategoryBarChart data={progressAreas} />
              </div>
            </div>

            {/* PROGRESO */}
            <div className="info-card">
              <div className="progress-title">Progreso en Áreas Clave</div>
              {/* ProgressList: Usar datos dinámicos */}
              <ProgressList areas={progressAreas} />
            </div>
          </>
        )}

        {/* ============ DIAGNÓSTICO ============ */}
        {activeTab === "diagnostico" &&
          // PASAR LA FUNCIÓN DE REDIRECCIÓN COMO PROP
          <DiagnosticPage redirectToResource={redirectToResource} />
        }

        {/* ============ OPORTUNIDADES ============ */}
        {activeTab === "oportunidades" && <OpportunitiesPage />}


        {/* ============ RECURSOS ============ */}
        {/* PASAR EL SUBTAB ACTIVO AL COMPONENTE ResourcesPage */}
        {activeTab === "recursos" && <ResourcesPage initialTab={resourceSubTab} />}

      </main>
    </div>
  );
}