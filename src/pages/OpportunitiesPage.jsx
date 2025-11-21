// src/pages/OpportunitiesPage.jsx

import { useEffect, useState } from "react";
import "../styles/opportunities.css";
import { calculateCarbonFootprint } from "../utils/carbonCalc";
import { calculateOverallOpportunityMetrics, calculateOpportunityMetrics, OPPORTUNITIES } from "../utils/opportunityCalc"; 
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import OpportunityModal from "../components/OpportunityModal";
import emailjs from "@emailjs/browser";

// 1. IMPORTAR EL TOAST
import AlertToast from "../components/AlertToast";

export default function OpportunitiesPage() {

    const [co2, setCo2] = useState(null); 
    const [metrics, setMetrics] = useState({ ahorroTotal: 0, roiPromedio: null });
    
    // ESTADOS PARA EL MODAL DE DETALLES
    const [showModal, setShowModal] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    
    const [hasAnswers, setHasAnswers] = useState(false);
    
    // ESTADOS PARA EL ENVÍO DE CORREO
    const [isSending, setIsSending] = useState(false);
    const [showEmailConfirm, setShowEmailConfirm] = useState(false); // Modal de confirmación
    const [targetEmail, setTargetEmail] = useState(""); // Correo destino temporal

    // ESTADO PARA EL TOAST
    const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
        const answers = diagnostics[userId];

        if (answers && Object.keys(answers).length > 0) {
            setHasAnswers(true);
            const footprint = calculateCarbonFootprint(answers);
            setCo2(footprint.total / 1000); 
            const overallMetrics = calculateOverallOpportunityMetrics(answers);
            setMetrics(overallMetrics);
        } else {
            setHasAnswers(false);
            setCo2(0);
            setMetrics({ ahorroTotal: 0, roiPromedio: null });
        }
    }, []);

    // HELPER: Obtener el correo
    const getUserEmail = () => {
        const currentUserId = localStorage.getItem("currentUserId");
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (!currentUserId) return null;
        const foundUser = users.find(u => u.email === currentUserId || u.id === currentUserId);
        return foundUser ? foundUser.email : currentUserId;
    };

    // HELPER: Generar PDF
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

    const exportPDF = () => {
        const doc = generatePDFDoc();
        doc.save("reporte-impacto-circular.pdf");
        setToast({ type: "success", message: "PDF descargado correctamente" });
    };

    // PASO 1: Iniciar proceso (Abrir Modal)
    const handleInitiateEmail = () => {
        const userEmail = getUserEmail();
        if (!userEmail) {
            setToast({ type: "error", message: "No se encontró correo asociado." });
            return;
        }
        setTargetEmail(userEmail);
        setShowEmailConfirm(true); // Abrir modal
    };

    // PASO 2: Confirmar y Enviar (Acción del Modal ACTUALIZADA)
    const handleConfirmSend = async () => {
        setIsSending(true);
        setShowEmailConfirm(false); 

        // Recalcular datos para tenerlos frescos al enviar
        const userId = localStorage.getItem("currentUserId");
        const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};
        const answers = diagnostics[userId] || {};
        const footprint = calculateCarbonFootprint(answers) || { total: 0 }; 
        const overallMetrics = calculateOverallOpportunityMetrics(answers);
        const date = new Date().toLocaleDateString();

        try {
            // Preparamos los parámetros INDIVIDUALES para la plantilla HTML
            const templateParams = {
                to_email: targetEmail,
                subject: "Tu Reporte de Economía Circular",
                
                // Variables de Cabecera
                date: date,
                user_name: "Usuario Greenflow", // Puedes personalizar esto si guardas el nombre

                // Variables Financieras
                ahorro: `$${overallMetrics.ahorroTotal.toLocaleString()} MXN`,
                roi: overallMetrics.roiPromedio === null ? 'N/A' : `${overallMetrics.roiPromedio} años`,
                co2_total: `${(footprint.total / 1000).toFixed(2)}`,

                // Variables de Detalle (Huella)
                d1: footprint.D1.toFixed(0),
                d2: footprint.D2.toFixed(0),
                d3: footprint.D3.toFixed(0),
                d4: footprint.D4.toFixed(0),
                d6: footprint.D6.toFixed(0),
                d7: footprint.D7.toFixed(0)
            };

            await emailjs.send(
                'service_zfsa5ge',    
                'template_zqmhwxl',   
                templateParams,
                'zEjT2J1fsxccPvL6D'     
            );

            // ÉXITO: Mostrar Toast
            setToast({ type: "success", message: `Reporte enviado a ${targetEmail}` });

        } catch (error) {
            console.error("Error enviando correo:", error);
            // ERROR: Mostrar Toast
            setToast({ type: "error", message: "Error al enviar el correo." });
        } finally {
            setIsSending(false);
        }
    };

    const handleViewDetails = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setShowModal(true);
    };

    // --- Renderizados de estados vacíos ---
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
            {/* 1. TOAST NOTIFICATION */}
            {toast && (
                <AlertToast 
                    type={toast.type} 
                    message={toast.message} 
                    onClose={() => setToast(null)} 
                />
            )}

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
                    onClick={handleInitiateEmail} 
                    disabled={isSending}
                    style={{ backgroundColor: isSending ? '#95a5a6' : '#2ecc71' }}
                >
                    {isSending ? 'Procesando...' : '📧 Enviar Resumen'}
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

            {/* ✅ Modal de Confirmación de Correo */}
            {showEmailConfirm && (
                <div className="modal-overlay">
                    <div className="modal-container op-modal" style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                            <h2>Confirmar Envío</h2>
                            <button className="close-btn" onClick={() => setShowEmailConfirm(false)}>×</button>
                        </div>
                        
                        <div className="modal-description" style={{ textAlign: 'center', fontSize: '1.1rem', padding: '20px 0' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📧</div>
                            <p>¿Deseas enviar el resumen de oportunidades a la siguiente dirección?</p>
                            <p style={{ fontWeight: 'bold', color: '#2c3e50', marginTop: '10px' }}>
                                {targetEmail}
                            </p>
                        </div>

                        <div className="modal-footer" style={{ justifyContent: 'center' }}>
                            <button 
                                className="btn-secondary" 
                                onClick={() => setShowEmailConfirm(false)}
                                style={{ marginRight: '10px' }}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={handleConfirmSend}
                            >
                                Sí, Enviar Reporte
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}