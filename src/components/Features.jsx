import React from "react";
import features from "../data/features";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="center">Funcionalidades de la Plataforma</h2>
        <div className="features-grid">
          {features.map(f => <FeatureCard key={f.id} item={f} />)}
        </div>
      </div>
    </section>
  );
}
