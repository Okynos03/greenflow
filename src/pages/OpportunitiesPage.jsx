// src/pages/OpportunitiesPage.jsx

import { useEffect, useState } from "react";
import "../styles/opportunities.css";
import { calculateCarbonFootprint } from "../utils/carbonCalc";
// Importar la utilidad de cálculo de oportunidades
import { calculateOverallOpportunityMetrics, calculateOpportunityMetrics, OPPORTUNITIES } from "../utils/opportunityCalc"; 
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import OpportunityModal from "../components/OpportunityModal";
// 1. IMPORTAR EMAILJS
import emailjs from "@emailjs/browser";

export default function OpportunitiesPage() {

    const [co2, setCo2] = useState(null); 
    const [metrics, setMetrics] = useState({ ahorroTotal: 0, roiPromedio: null });
    // ESTADOS PARA EL MODAL
    const [showModal, setShowModal] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [hasAnswers, setHasAnswers] = useState(false);
    
    // Estado para controlar el botón de envío
    const [isSending, setIsSending] = useState(false);

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

    // 2. HELPER: Obtener el correo del usuario actual
    const getUserEmail = () => {
        const currentUserId = localStorage.getItem("currentUserId");
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        if (!currentUserId) return null;
        const foundUser = users.find(u => u.email === currentUserId || u.id === currentUserId);
        return foundUser ? foundUser.email : currentUserId;
    };

    // 3. HELPER: Generar el documento PDF (SOLO PARA DESCARGAR)
    const generatePDFDoc = () => {
        const userId = localStorage.getItem("currentUserId");
        const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
        const answers = diagnostics[userId] || {};
        const footprint = calculateCarbonFootprint(answers) || { total: 0 }; 
        const overallMetrics = calculateOverallOpportunityMetrics(answers);

        const doc = new jsPDF();
        let yOffset = 20;

        doc.setFontSize(18);
        doc.text("Reporte de Impacto y Oportunidades", 14, yOffset);
        yOffset += 10;
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, yOffset);
        yOffset += 15;

        // A. RESUMEN
        doc.setFontSize(14);
        doc.text("A. Resumen Financiero y de Impacto", 14, yOffset);
        yOffset += 7;
        const summaryRows = [
            ["Ahorro Potencial Anual", `$${overallMetrics.ahorroTotal.toLocaleString()} MXN`],
            ["ROI Promedio", `${overallMetrics.roiPromedio === null ? 'N/A' : overallMetrics.roiPromedio + ' años'}`],
            ["Reducción de CO₂ Estimada", `${(footprint.total / 1000).toFixed(2)} toneladas CO₂e`],
        ];
        autoTable(doc, {
            head: [["KPI", "Valor Estimado"]],
            body: summaryRows,
            startY: yOffset,
            headStyles: { fillColor: [52, 73, 94] }
        });
        yOffset = doc.lastAutoTable.finalY + 15;

        // B. DETALLE
        doc.setFontSize(14);
        doc.text("B. Detalle de Huella de Carbono", 14, yOffset);
        yOffset += 7;
        const tableRows = [
            ["D1. Combustión Fija", `${footprint.D1.toFixed(0) || 0} kg CO₂`],
            ["D2. Combustión Móvil", `${footprint.D2.toFixed(0) || 0} kg CO₂`],
            ["D3. Refrigerantes", `${footprint.D3.toFixed(0) || 0} kg CO₂e`],
            ["D4. Electricidad", `${footprint.D4.toFixed(0) || 0} kg CO₂`],
            ["D6. Viajes de Negocios", `${footprint.D6.toFixed(0) || 0} kg CO₂e`],
            ["D7. Residuos a Vertedero", `${footprint.D7.toFixed(0) || 0} kg CO₂e`]
        ];
        autoTable(doc, {
            head: [["Categoría", "Emisiones (kg CO₂e)"]],
            body: tableRows,
            startY: yOffset,
            headStyles: { fillColor: [155, 89, 182] }
        });
        yOffset = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.text(`Total Estimado de Huella: ${(footprint.total / 1000).toFixed(2)} toneladas de CO₂e`, 14, yOffset);

        return doc;
    };

    // 4. FUNCIÓN DE DESCARGA
    const exportPDF = () => {
        const doc = generatePDFDoc();
        doc.save("reporte-impacto-circular.pdf");
    };

    // 5. NUEVA FUNCIÓN HELPER: Generar el CUERPO DEL CORREO (Texto)
    const generateEmailBodyText = () => {
        const userId = localStorage.getItem("currentUserId");
        const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
        const answers = diagnostics[userId] || {};
        
        // Recalculamos datos
        const footprint = calculateCarbonFootprint(answers) || { total: 0 }; 
        const overallMetrics = calculateOverallOpportunityMetrics(answers);
        const date = new Date().toLocaleDateString();

        // Construimos un string con formato
        return `
REPORTE DE IMPACTO Y OPORTUNIDADES
Fecha: ${date}
--------------------------------------------------

A. RESUMEN FINANCIERO
- Ahorro Potencial Anual: $${overallMetrics.ahorroTotal.toLocaleString()} MXN
- ROI Promedio: ${overallMetrics.roiPromedio === null ? 'N/A' : overallMetrics.roiPromedio + ' años'}
- Reducción de CO2: ${(footprint.total / 1000).toFixed(2)} toneladas

--------------------------------------------------

B. DETALLE HUELLA DE CARBONO (kg CO2e)
- D1. Combustión Fija: ${footprint.D1.toFixed(0)}
- D2. Combustión Móvil: ${footprint.D2.toFixed(0)}
- D3. Refrigerantes: ${footprint.D3.toFixed(0)}
- D4. Electricidad: ${footprint.D4.toFixed(0)}
- D6. Viajes de Negocios: ${footprint.D6.toFixed(0)}
- D7. Residuos a Vertedero: ${footprint.D7.toFixed(0)}

TOTAL HUELLA: ${(footprint.total / 1000).toFixed(2)} Toneladas de CO2e

--------------------------------------------------
Este reporte fue generado automáticamente por la plataforma de Economía Circular.
        `;
    };

    // 6. FUNCIÓN DE ENVÍO DE CORREO (MODIFICADA: SIN ADJUNTOS)
    const handleSendEmail = async () => {
        const userEmail = getUserEmail();

        if (!userEmail) {
            alert("No se encontró un correo asociado a esta sesión.");
            return;
        }

        if (!confirm(`¿Deseas enviar el resumen del reporte a ${userEmail}?`)) {
            return;
        }

        setIsSending(true);

        try {
            // Generamos el TEXTO en lugar del PDF
            const emailBody = generateEmailBodyText();

            const templateParams = {
                to_email: userEmail,
                subject: "Tu Reporte de Economía Circular",
                message: emailBody, // <-- Aquí va todo el texto formateado
            };

            // === TUS CREDENCIALES ===
            await emailjs.send(
                'service_t2aamo8',    
                'template_ae6ewjc',   
                templateParams,
                'OdZsL29zoWRQ6rFYw'     
            );

            alert(`¡Resumen enviado exitosamente a ${userEmail}!`);

        } catch (error) {
            console.error("Error enviando correo:", error);
            alert("Hubo un error al enviar el correo. Verifica la consola.");
        } finally {
            setIsSending(false);
        }
    };

    // ... (El resto del componente: handleViewDetails y Renderizado, se mantiene igual) ...
    
    const handleViewDetails = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setShowModal(true);
    };

    if (co2 === 0 && metrics.ahorroTotal === 0) {
      return (
        <div className="op-container">
            <div className="info-card">
                <h1>💡 Oportunidades de Mejora</h1>
                <p>Para generar tu análisis personalizado de Ahorro Potencial, por favor completa el Diagnóstico en la pestaña anterior.</p>
            </div>
        </div>
      )
    }

    if (!hasAnswers) {
      return (
        <div className="op-container">
            <div className="info-card diagnostic-needed">
                <h1>💡 Oportunidades de Mejora</h1>
                <p>Para generar tu **Reporte de Impacto y Ahorro Potencial**, es indispensable que primero completes el diagnóstico.</p>
                <p className="highlight-text">Dirígete a la pestaña **📋 Diagnóstico** para comenzar a ingresar tus datos base.</p>
            </div>
        </div>
      )
    }

    return (
        <div className="op-container">
            <h1>Oportunidades de Mejora</h1>
            <p>Iniciativas personalizadas para tu empresa basadas en el diagnóstico</p>

            {/* ===== KPIs ===== */}
            <div className="op-kpis">
                <div className="op-kpi-card">
                    <span className="op-kpi-icon">$</span>
                    <h3>Ahorro Potencial Anual</h3>
                    <p className="op-kpi-value">${metrics.ahorroTotal.toLocaleString()} MXN</p>
                </div>
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

            {/* ===== BOTONES DE ACCIÓN ===== */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <button className="op-export-btn" onClick={exportPDF}>
                    📥 Descargar PDF
                </button>

                <button 
                    className="op-export-btn" 
                    onClick={handleSendEmail}
                    disabled={isSending}
                    style={{ backgroundColor: isSending ? '#95a5a6' : '#2ecc71' }}
                >
                    {isSending ? 'Enviando...' : '📧 Enviar Resumen'}
                </button>
            </div>

            {/* ==== PROYECTOS DINÁMICOS ==== */}
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

                        <p>{op.description.split('. ')[0]}.</p>

                        <div className="op-project-grid">
                            <div><strong>Categoría</strong><br/>{op.category}</div>
                            <div><strong>Impacto</strong><br/><span className={`impact-${ahorroAnual > 100000 ? 'high' : 'medium'}`}>
                                {ahorroAnual > 100000 ? 'Alto' : 'Medio'}
                            </span></div>
                            <div><strong>Ahorro Anual</strong><br/>${ahorroAnual.toLocaleString()} MXN/año</div>
                            <div><strong>Inversión</strong><br/>${op.inversionInicial.toLocaleString()} MXN</div>
                            <div><strong>ROI</strong><br/>{roi === null ? 'N/A' : `${roi} años`}</div>
                        </div>

                        <div className="op-benefits">
                            {op.benefits.map((b, index) => (
                                <span key={index}>✔ {b}</span>
                            ))}
                        </div>

                        <div className="op-project-actions">
                            <button className="btn-secondary" onClick={() => handleViewDetails(op)}>
                                Ver Detalles
                            </button>
                            <button className="btn-primary">Iniciar Proyecto</button>
                        </div>
                    </div>
                );
            })}
            
            {/* ✅ Modal de Detalles */}
            {showModal && selectedOpportunity && (
                <OpportunityModal 
                    opportunity={selectedOpportunity} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </div>
    );
}