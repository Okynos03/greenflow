import React from "react";
import Navbar from "../components/Navbar";
import KPI from "../components/KPI";
import MonthlyLineChart from "../components/MonthlyLineChart";
import CategoryBarChart from "../components/CategoryBarChart";
import ProgressList from "../components/ProgressList";
import { kpiData, monthlySavings, categoryScores, progressAreas } from "../data/mockData.js";
import "../styles/landing.css";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: "2.4rem 1.2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ fontSize: 26, marginBottom: 6 }}>Panel de Control</h1>
          <p style={{ color: "var(--text-gray)", marginBottom: 18 }}>Visión general del desempeño de economía circular de tu empresa</p>

          <section className="info-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {kpiData.map(k => (
              <KPI key={k.id} {...k} />
            ))}
          </section>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
            <div className="info-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>Ahorro Mensual</div>
                <div style={{ color: "var(--text-gray)" }}>(MXN)</div>
              </div>
              <MonthlyLineChart data={monthlySavings} />
            </div>

            <div className="info-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>Puntuación por Categoría</div>
                <div style={{ color: "var(--text-gray)" }}>(0-100)</div>
              </div>
              <CategoryBarChart data={categoryScores} />
            </div>
          </div>

          <div className="info-card" style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Progreso en Áreas Clave</div>
            <ProgressList areas={progressAreas} />
          </div>
        </div>
      </main>
    </div>
  );
}
