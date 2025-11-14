import React from "react";

export default function ProgressList({ areas = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {areas.map(a => (
        <div key={a.name} style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ color: "var(--text-dark)", fontSize: 16 }}>{a.name}</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{a.pct}%</div>
          </div>

          <div style={{
            width: "100%",
            height: 10,
            background: "#e5e5e5",
            borderRadius: 999,
            overflow: "hidden"
          }}>
            <div
              style={{
                width: `${a.pct}%`,
                height: "100%",
                background: "var(--text-dark)",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
