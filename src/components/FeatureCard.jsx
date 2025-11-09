import React from "react";

export default function FeatureCard({ item }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <img src={item.icon} alt="" />
      </div>
      <h3>{item.title}</h3>
      <p className="muted">{item.description}</p>
    </div>
  );
}
