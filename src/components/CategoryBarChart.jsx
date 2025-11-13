import React from "react";

export default function CategoryBarChart({ data = [] }) {
  const max = Math.max(...data.map(d => d.score), 100);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "end", height: 200 }}>
      {data.map((d, i) => {
        const pct = (d.score / max) * 100;
        return (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: `${Math.max(6, pct)}%`, background: "var(--green-primary)", borderRadius: 8, transition: "height .4s" }} />
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-dark)" }}>{d.category}</div>
          </div>
        );
      })}
    </div>
  );
}
