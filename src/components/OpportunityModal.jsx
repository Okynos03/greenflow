// src/components/OpportunityModal.jsx
import React from 'react';
import '../styles/opportunities.css'; // Usaremos el mismo CSS

export default function OpportunityModal({ opportunity, onClose }) {
    if (!opportunity) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container op-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{opportunity.title}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-content">
                    <p className="modal-category">
                        <strong>Categoría:</strong> {opportunity.category}
                    </p>
                    
                    <p className="modal-description">{opportunity.description}</p>
                    
                    {/* Detalles Financieros */}
                    <h3 className="modal-subtitle">Proyección Financiera</h3>
                    <div className="op-project-grid modal-grid">
                        <div><strong>Inversión Inicial</strong><br/>${opportunity.inversionInicial.toLocaleString()} MXN</div>
                        {/* Estos valores se recalculan en OpportunitiesPage, pero aquí solo mostramos la inversión fija. 
                            Si quieres el ahorro/ROI dinámico, deberías pasar esos valores al modal. */}
                        <div><strong>Ahorro Estimado</strong><br/>(Ver resumen en la tabla principal)</div>
                        <div><strong>ROI Estimado</strong><br/>(Ver resumen en la tabla principal)</div>
                    </div>

                    {/* Beneficios */}
                    <h3 className="modal-subtitle">Beneficios Clave</h3>
                    <ul className="modal-benefits-list">
                        {opportunity.benefits.map((b, index) => (
                            <li key={index}>✔ {b}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="modal-footer">
                    <button className="btn-primary" onClick={onClose}>Cerrar</button>
                    <button className="btn-secondary">Iniciar Proyecto</button>
                </div>
            </div>
        </div>
    );
}