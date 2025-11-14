import React from "react";

export default function KPI({ icon, title, value, change, changeUp }) {
  return (
    <div className="info-card kpi-card">
      <div className="kpi-header">
        <div className="kpi-icon">{icon}</div>
        <div className={`kpi-change ${changeUp ? "up" : "down"}`}>
          {changeUp ? "▲" : "▼"} {change}
        </div>
      </div>

      <div className="kpi-body">
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">{value}</div>
      </div>
    </div>
  );
}
