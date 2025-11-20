// src/components/ProgressList.jsx (CORREGIDO)

import React from "react";

export default function ProgressList({ areas = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {areas.map(a => (
        // ✅ SOLUCIÓN 1: Usar a.area como key
        <div key={a.area} style={{ width: "100%" }}> 
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            {/* ✅ SOLUCIÓN 2: Usar a.area para el nombre */}
            <div style={{ color: "var(--text-dark)", fontSize: 16 }}>{a.area}</div> 
            {/* ✅ SOLUCIÓN 3: Usar a.progress para el porcentaje */}
            <div style={{ fontWeight: 700, fontSize: 16 }}>{a.progress}%</div> 
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
                // ✅ SOLUCIÓN 4: Usar a.progress para el ancho
                width: `${a.progress}%`, 
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