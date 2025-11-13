import React from "react";

export default function ProgressList({ areas = [] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {areas.map(a => (
        <div key={a.name}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ color: "var(--text-dark)" }}>{a.name}</div>
            <div style={{ fontWeight: 700 }}>{a.pct}%</div>
          </div>
          <div style={{ height: 10, background: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${a.pct}%`, height: "100%", background: "var(--text-dark)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
