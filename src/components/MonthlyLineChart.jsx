import React, { useRef, useEffect, useState } from "react";

function computePoints(data, width, height, pad = 24) {
  if (!data || data.length === 0) return { poly: "", points: [] };
  const vals = data.map(d => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / Math.max(1, data.length - 1);

  const points = data.map((d, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (d.value - min) / range) * (height - pad * 2);
    return { x, y, d };
  });

  const poly = points.map(p => `${p.x},${p.y}`).join(" ");
  return { poly, points };
}

export default function MonthlyLineChart({ data = [] }) {
  const ref = useRef(null);
  const [w, setW] = useState(600);
  const h = 220;

  useEffect(() => {
    const el = ref.current;
    function resize() {
      if (el) setW(el.clientWidth || 600);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const { poly, points } = computePoints(data, w, h);

  return (
    <div ref={ref} style={{ width: "100%", height: h }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${Math.max(w, 300)} ${h}`} preserveAspectRatio="none">
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
        <g stroke="#eee">
          <line x1="0" x2={Math.max(w, 300)} y1="40" y2="40" />
          <line x1="0" x2={Math.max(w, 300)} y1={h/2} y2={h/2} />
          <line x1="0" x2={Math.max(w, 300)} y1={h-40} y2={h-40} />
        </g>

        <polyline fill="none" stroke="var(--green-primary)" strokeWidth="3" points={poly} />

        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="var(--green-primary)" />
        ))}

        {points.map((p, i) => (
          <text key={i} x={p.x} y={h - 8} fontSize="11" fill="#6b7280" textAnchor="middle">{p.d.month}</text>
        ))}
      </svg>
    </div>
  );
}
