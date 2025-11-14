import React from "react";
import Navbar from "../components/Navbar";
import KPI from "../components/KPI";
import MonthlyLineChart from "../components/MonthlyLineChart";
import CategoryBarChart from "../components/CategoryBarChart";
import ProgressList from "../components/ProgressList";
import { kpiData, monthlySavings, categoryScores, progressAreas } from "../data/mockData.js";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      {/* NAV TABS */}
      <div className="dashboard-tabs">
        <button className="tab active">🔢 Resumen</button>
        <button className="tab">📋 Diagnóstico</button>
        <button className="tab">💡 Oportunidades</button>
        <button className="tab">📘 Recursos</button>
      </div>

      <main className="dashboard-container">
        <h1 className="dashboard-title">Panel de Control</h1>
        <p className="dashboard-subtitle">
          Visión general del desempeño de economía circular de tu empresa
        </p>

        {/* KPIs */}
        <section className="kpi-grid">
          {kpiData.map(k => (
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
      </main>
    </div>
  );
}
