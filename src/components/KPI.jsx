import React from "react";

export default function KPI({ icon, title, value, change, changeUp }) {
  return (
    <div className="info-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22 }}>{icon}</div>
        <div style={{ fontSize: 13, color: changeUp ? "var(--green-primary)" : "#d32f2f", fontWeight: 600 }}>
          {changeUp ? "▲" : "▼"} {change}
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 13, color: "var(--text-dark)" }}>{title}</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>{value}</div>
      </div>
    </div>
  );
}
