// src/utils/opportunityCalc.js
import { OPPORTUNITIES, COSTOS_UNITARIOS } from "../data/costFactors";

// Helper para obtener el valor numérico de una respuesta del diagnóstico
const getNumericAnswer = (answers, questionId) => {
    const answer = answers[questionId];
    if (!answer) return 0;
    
    // Si la respuesta es un objeto (formato {option: "...", value: "..."})
    if (typeof answer === 'object' && answer.value) {
        return Number(answer.value) || 0;
    }
    // Si la respuesta es un string simple (que no debería ocurrir con preguntas numéricas pero es seguro)
    return Number(answer) || 0;
};

/**
 * Calcula el ahorro anual y el ROI para una oportunidad específica.
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @param {Object} opportunity - Objeto de oportunidad de OPPORTUNITIES.
 * @returns {{ahorroAnual: number, roi: number}}
 */
const calculateOpportunityMetrics = (answers, opportunity) => {
    let ahorroAnual = 0;
    let inversion = opportunity.inversionInicial || 1; 

    // 1. Ahorro basado en Factor de Reducción (usando respuestas del usuario)
    if (opportunity.preguntaBaseId) {
        const baseValue = getNumericAnswer(answers, opportunity.preguntaBaseId);
        let costoUnitario = 0;
        
        // Determinar el costo unitario basado en la pregunta
        if (opportunity.preguntaBaseId === "D4") costoUnitario = COSTOS_UNITARIOS.KWH;
        if (opportunity.preguntaBaseId === "D7") costoUnitario = COSTOS_UNITARIOS.TON_VERTEDERO;

        if (costoUnitario > 0) {
            // Ahorro anual = (Base * Factor Reducción) * Costo Unitario
            ahorroAnual = baseValue * opportunity.factorReduccion * costoUnitario;
        }

    // 2. Ahorro basado en Ahorro Directo (para oportunidades sin base de consumo simple)
    } else if (opportunity.ahorroDirecto) {
        ahorroAnual = opportunity.ahorroDirecto;

    // 3. Ahorro basado en estimación (ej. Agua, si no se pidió m3 total en D)
    } else if (opportunity.baseM3AguaEstimada && opportunity.category === "Agua") {
        const baseValue = opportunity.baseM3AguaEstimada;
        const costoUnitario = COSTOS_UNITARIOS.AGUA_M3;
        ahorroAnual = baseValue * opportunity.factorReduccion * costoUnitario;
    }

    // Calcular ROI (en años, no en porcentaje, siguiendo tu ejemplo 1.4 años)
    // ROI (años) = Inversión Inicial / Ahorro Anual
    const roi = ahorroAnual > 0 ? (inversion / ahorroAnual) : Infinity;

    return {
        ahorroAnual: Math.max(0, ahorroAnual), // Aseguramos que no sea negativo
        roi: roi === Infinity ? null : Number(roi.toFixed(1))
    };
};


/**
 * Calcula el Ahorro Potencial Anual Total y el ROI Promedio de todas las oportunidades.
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @returns {{ahorroTotal: number, roiPromedio: number}}
 */
export function calculateOverallOpportunityMetrics(answers) {
    if (!answers) return { ahorroTotal: 0, roiPromedio: null };

    let totalAhorro = 0;
    let totalROI = 0;
    let countROI = 0;

    OPPORTUNITIES.forEach(op => {
        const { ahorroAnual, roi } = calculateOpportunityMetrics(answers, op);
        
        totalAhorro += ahorroAnual;

        if (roi !== null && roi !== Infinity) {
            totalROI += roi;
            countROI++;
        }
    });
    
    // ROI Promedio
    const roiPromedio = countROI > 0 ? (totalROI / countROI) : null;
    
    return {
        ahorroTotal: Math.round(totalAhorro),
        roiPromedio: roiPromedio ? Number(roiPromedio.toFixed(1)) : null
    };
}

// Exportamos el detalle para que OpportunitiesPage pueda mostrar las tarjetas individuales
export { calculateOpportunityMetrics, OPPORTUNITIES };