// src/utils/opportunityCalc.js
import { OPPORTUNITIES, COSTOS_UNITARIOS } from "../data/costFactors";

/**
 * Helper para obtener el valor numérico de una respuesta del diagnóstico.
 * @param {Object} answers - Respuestas del diagnóstico.
 * @param {string} questionId - ID de la pregunta.
 * @returns {number} Valor numérico o 0.
 */
const getNumericAnswer = (answers, questionId) => {
    // Si el objeto answers no existe o la respuesta específica no existe, retorna 0.
    if (!answers || !answers[questionId]) return 0;

    const answer = answers[questionId];
    let valueToParse;
    
    // Si la respuesta es un objeto (formato {option: "...", value: "..."})
    if (typeof answer === 'object' && answer.value) {
        valueToParse = answer.value;
    } else {
        valueToParse = answer;
    }
    
    // Convertir a número y asegurar que retorna 0 si es NaN.
    const numericValue = Number(valueToParse);
    return isNaN(numericValue) ? 0 : numericValue;
};

/**
 * Calcula el ahorro anual y el ROI para una oportunidad específica.
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @param {Object} opportunity - Objeto de oportunidad de OPPORTUNITIES.
 * @returns {{ahorroAnual: number, roi: number}}
 */
const calculateOpportunityMetrics = (answers, opportunity) => {
    let ahorroAnual = 0;
    
    // Aseguramos que inversiónInicial sea un número, con fallback 1
    const inversion = Number(opportunity.inversionInicial) || 1; 
    const factorReduccion = Number(opportunity.factorReduccion) || 0;

    // 1. Ahorro basado en Factor de Reducción (usando respuestas del usuario D4/D7)
    if (opportunity.preguntaBaseId) {
        const baseValue = getNumericAnswer(answers, opportunity.preguntaBaseId);
        let costoUnitario = 0;
        
        // Determinar el costo unitario basado en la pregunta y asegurar que es un número
        if (opportunity.preguntaBaseId === "D4") 
            costoUnitario = Number(COSTOS_UNITARIOS.KWH) || 0;
        if (opportunity.preguntaBaseId === "D7") 
            costoUnitario = Number(COSTOS_UNITARIOS.TON_VERTEDERO) || 0;

        if (costoUnitario > 0) {
            // Ahorro anual = (Base * Factor Reducción * Costo Unitario)
            ahorroAnual = baseValue * factorReduccion * costoUnitario;
        }

    // 2. Ahorro basado en Ahorro Directo (para oportunidades sin base de consumo simple)
    } else if (opportunity.ahorroDirecto) {
        ahorroAnual = Number(opportunity.ahorroDirecto) || 0;

    // 3. Ahorro basado en estimación (ej. Agua, si no se pidió m3 total en D)
    } else if (opportunity.baseM3AguaEstimada && opportunity.category === "Agua") {
        const baseValue = Number(opportunity.baseM3AguaEstimada) || 0;
        const costoUnitario = Number(COSTOS_UNITARIOS.AGUA_M3) || 0;
        
        ahorroAnual = baseValue * factorReduccion * costoUnitario;
    }

    // Aseguramos que ahorroAnual es un número antes de calcular ROI
    ahorroAnual = Number(ahorroAnual) || 0; 

    // Calcular ROI (en años, no en porcentaje)
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
export { calculateOpportunityMetrics, OPPORTUNITIES, getNumericAnswer }; 
// NOTA: Exporté getNumericAnswer para que pueda ser utilizada en dashboardCalc.js