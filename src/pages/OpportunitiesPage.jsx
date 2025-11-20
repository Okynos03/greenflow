// src/pages/OpportunitiesPage.jsx

import { useEffect, useState } from "react";
import "../styles/opportunities.css";
import { calculateCarbonFootprint } from "../utils/carbonCalc";
// Importar la utilidad de cálculo de oportunidades
import { calculateOverallOpportunityMetrics, calculateOpportunityMetrics, OPPORTUNITIES } from "../utils/opportunityCalc"; 
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import OpportunityModal from "../components/OpportunityModal";

export default function OpportunitiesPage() {

    const [co2, setCo2] = useState(null); 
    const [metrics, setMetrics] = useState({ ahorroTotal: 0, roiPromedio: null });
    //ESTADOS PARA EL MODAL
    const [showModal, setShowModal] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [hasAnswers, setHasAnswers] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
        const answers = diagnostics[userId];

        if (answers && Object.keys(answers).length > 0) {
            setHasAnswers(true); // Hay respuestas

            // Cálculo de CO2
            const footprint = calculateCarbonFootprint(answers);
            setCo2(footprint.total / 1000); 
            
            // Cálculo de Ahorro y ROI Potencial
            const overallMetrics = calculateOverallOpportunityMetrics(answers);
            setMetrics(overallMetrics);
        } else {
            setHasAnswers(false); // No hay respuestas
            setCo2(0);
            setMetrics({ ahorroTotal: 0, roiPromedio: null });
        }
    }, []);

    const exportPDF = () => {
        const userId = localStorage.getItem("currentUserId");
        const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
        const answers = diagnostics[userId] || {};

        // 1. Obtener resultados de Huella de Carbono
        const footprint = calculateCarbonFootprint(answers) || { total: 0 }; 
        
        // 2. Obtener resultados de Ahorro y ROI Potencial
        const overallMetrics = calculateOverallOpportunityMetrics(answers);


        const doc = new jsPDF();
        let yOffset = 20;

        doc.setFontSize(18);
        doc.text("Reporte de Impacto y Oportunidades", 14, yOffset);
        yOffset += 10;
        
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, yOffset);
        yOffset += 15;


        // =========================================================
        // A. RESUMEN DE OPORTUNIDADES (Ahorro y ROI)
        // =========================================================
        doc.setFontSize(14);
        doc.text("A. Resumen Financiero y de Impacto", 14, yOffset);
        yOffset += 7;

        const summaryRows = [
            ["Ahorro Potencial Anual", `$${overallMetrics.ahorroTotal.toLocaleString()} MXN`],
            ["ROI Promedio (Retorno de Inversión)", `${overallMetrics.roiPromedio === null ? 'N/A' : overallMetrics.roiPromedio + ' años'}`],
            ["Reducción de CO₂ Estimada", `${(footprint.total / 1000).toFixed(2)} toneladas CO₂e`],
        ];
        
        autoTable(doc, {
            head: [["KPI", "Valor Estimado"]],
            body: summaryRows,
            startY: yOffset,
            headStyles: { fillColor: [52, 73, 94] }
        });
        yOffset = doc.lastAutoTable.finalY + 15;


        // =========================================================
        // B. DETALLE DE HUELLA DE CARBONO
        // =========================================================
        doc.setFontSize(14);
        doc.text("B. Detalle de Huella de Carbono (Alcances 1, 2 y 3)", 14, yOffset);
        yOffset += 7;

        const tableRows = [
            ["D1. Combustión Fija (Alcance 1)", `${footprint.D1.toFixed(0) || 0} kg CO₂`],
            ["D2. Combustión Móvil (Alcance 1)", `${footprint.D2.toFixed(0) || 0} kg CO₂`],
            ["D3. Refrigerantes (Alcance 1)", `${footprint.D3.toFixed(0) || 0} kg CO₂e`],
            ["D4. Electricidad (Alcance 2)", `${footprint.D4.toFixed(0) || 0} kg CO₂`],
            ["D6. Viajes de Negocios (Alcance 3)", `${footprint.D6.toFixed(0) || 0} kg CO₂e`],
            ["D7. Residuos a Vertedero (Alcance 3)", `${footprint.D7.toFixed(0) || 0} kg CO₂e`]
        ];
        
        autoTable(doc, {
            head: [["Categoría", "Emisiones (kg CO₂e)"]],
            body: tableRows,
            startY: yOffset,
            headStyles: { fillColor: [155, 89, 182] } // Color diferente para distinguir sección
        });
        yOffset = doc.lastAutoTable.finalY + 15;

        // Total
        doc.setFontSize(14);
        doc.text(`Total Estimado de Huella: ${(footprint.total / 1000).toFixed(2)} toneladas de CO₂e`, 14, yOffset);


        doc.save("reporte-impacto-circular.pdf");
    };

    // Función para abrir el modal
    const handleViewDetails = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setShowModal(true);
    };


    // El JSX de renderizado (return) del componente permanece igual,
    // ya que usa las variables 'co2' y 'metrics' que ya actualizamos en el useEffect.
    
    // ... (omito el JSX para mantener la brevedad, ya que no tiene cambios funcionales) ...

    if (co2 === 0 && metrics.ahorroTotal === 0) {
      return (
        <div className="op-container">
            <div className="info-card">
                <h1>💡 Oportunidades de Mejora</h1>
                <p>Para generar tu análisis personalizado de Ahorro Potencial, por favor completa el <a href="#" onClick={() => {/* Lógica para cambiar a la pestaña de diagnóstico */}}>Diagnóstico</a> en la pestaña anterior.</p>
            </div>
        </div>
      )
    }

    if (!hasAnswers) {
      return (
        <div className="op-container">
            <div className="info-card diagnostic-needed">
                <h1>💡 Oportunidades de Mejora</h1>
                <p>
                    Para generar tu **Reporte de Impacto y Ahorro Potencial**, es indispensable que 
                    primero completes el diagnóstico.
                </p>
                <p className="highlight-text">
                    Dirígete a la pestaña **📋 Diagnóstico** para comenzar a ingresar tus datos base.
                </p>
                            </div>
        </div>
      )
    }

    return (
        <div className="op-container">
            <h1>Oportunidades de Mejora</h1>
            <p>Iniciativas personalizadas para tu empresa basadas en el diagnóstico</p>

            {/* ===== KPIs (sin cambios) ===== */}
            <div className="op-kpis">
                {/* ... Renderizado de KPIs ... */}
                <div className="op-kpi-card">
                    <span className="op-kpi-icon">$</span>
                    <h3>Ahorro Potencial Anual</h3>
                    <p className="op-kpi-value">${metrics.ahorroTotal.toLocaleString()} MXN</p>
                </div>
                {/* ... otros KPIs ... */}
                <div className="op-kpi-card">
                    <span className="op-kpi-icon">📉</span>
                    <h3>Reducción de CO₂</h3>
                    <p className="op-kpi-value">
                        {co2 === null ? "Calculando..." : `${co2.toFixed(1)} ton/año`}
                    </p>
                </div>
                <div className="op-kpi-card">
                    <span className="op-kpi-icon">⏱</span>
                    <h3>ROI Promedio</h3>
                    <p className="op-kpi-value">
                        {metrics.roiPromedio === null ? "N/A" : `${metrics.roiPromedio} años`}
                    </p>
                </div>
            </div>

            <button className="op-export-btn" onClick={exportPDF}>
                Exportar Reporte
            </button>

            {/* ==== PROYECTOS DINÁMICOS (Renderizado de Oportunidades) ==== */}
            {OPPORTUNITIES.map(op => {
                const userId = localStorage.getItem("currentUserId");
                const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
                const answers = diagnostics[userId];
                
                const { ahorroAnual, roi } = calculateOpportunityMetrics(answers, op);

                return (
                    <div className="op-project-card" key={op.id}>
                        <div className="op-project-header">
                            <h2>{op.title}</h2>
                            <span className="op-tag">Recomendada</span>
                        </div>

                        <p>{op.description.split('. ')[0]}.</p> {/* Usar la primera oración de la descripción */}

                        <div className="op-project-grid">
                            <div><strong>Categoría</strong><br/>{op.category}</div>
                            <div><strong>Impacto</strong><br/><span className={`impact-${ahorroAnual > 100000 ? 'high' : 'medium'}`}>
                                {ahorroAnual > 100000 ? 'Alto' : 'Medio'}
                            </span></div>
                            <div><strong>Ahorro Anual</strong><br/>${ahorroAnual.toLocaleString()} MXN/año</div>
                            <div><strong>Inversión</strong><br/>${op.inversionInicial.toLocaleString()} MXN</div>
                            <div><strong>ROI</strong><br/>{roi === null ? 'N/A' : `${roi} años`}</div>
                        </div>

                        {/* ✅ Beneficios Dinámicos */}
                        <div className="op-benefits">
                            {op.benefits.map((b, index) => (
                                <span key={index}>✔ {b}</span>
                            ))}
                        </div>

                        <div className="op-project-actions">
                            {/* ✅ Llama a la función del modal */}
                            <button className="btn-secondary" onClick={() => handleViewDetails(op)}>
                                Ver Detalles
                            </button>
                            <button className="btn-primary">Iniciar Proyecto</button>
                        </div>
                    </div>
                );
            })}
            
            {/* ✅ Modal de Detalles (Se renderiza condicionalmente) */}
            {showModal && selectedOpportunity && (
                <OpportunityModal 
                    opportunity={selectedOpportunity} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </div>
    );
}