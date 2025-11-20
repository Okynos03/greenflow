// src/utils/dashboardCalc.js

import { 
    calculateOverallOpportunityMetrics, 
    OPPORTUNITIES, 
    calculateOpportunityMetrics 
} from "./opportunityCalc";
import { QUALITATIVE_SCORES, MAX_SCORE_PER_QUESTION, IMPACT_WEIGHTS } from "../data/scoreFactors";


// Constante para generar los datos de la gráfica de línea
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];


/**
 * Helper para obtener el valor numérico de una respuesta del diagnóstico (Duplicado aquí por seguridad)
 */
const getNumericAnswer = (answers, questionId) => {
    if (!answers || !answers[questionId]) return 0;
    const answer = answers[questionId];
    let valueToParse;
    
    if (typeof answer === 'object' && answer.value) {
        valueToParse = answer.value;
    } else {
        valueToParse = answer;
    }
    
    const numericValue = Number(valueToParse);
    return isNaN(numericValue) ? 0 : numericValue; 
};


/**
 * Helper para asegurar que la respuesta sea el string de la opción seleccionada.
 */
const getAnswerString = (answer) => {
    if (!answer) return null;
    // Si la respuesta es un objeto (como en preguntas numéricas o de radio que usan {option: '...', value: '...'}), solo necesitamos la opción.
    if (typeof answer === 'object' && answer.option) {
        return answer.option;
    }
    // Si es una respuesta de opción simple (ej. "Sí", "No")
    return answer;
};


/**
 * Calcula el Nivel de Circularidad (Puntuación 0-100) basado en las respuestas del Módulo A.
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @param {Array} questions - Lista completa de preguntas para saber el máximo posible.
 * @returns {number} Nivel de Circularidad (0-100)
 */
export function calculateCircularityScores(answers, questions) {
    if (!answers || questions.length === 0) return { totalScore: 0, categoryScores: [] };

    let totalScore = 0;
    let totalMaxScore = 0;
    
    // Objeto para acumular puntajes por la clave 'categoria'
    const scoresByCategory = {}; 
    const maxScoresByCategory = {};
    
    // Filtramos solo las preguntas del Módulo A (circularidad)
    const circularityQuestions = questions.filter(q => q.modulo && q.modulo.startsWith("A"));

    circularityQuestions.forEach(q => {
        const answerString = getAnswerString(answers[q.id]);
        
        // 🔥 Usamos la 'categoria' como la clave de agrupación
        const categoryKey = q.categoria; 
        
        // Asumimos que las preguntas cualitativas tienen un máximo de 4 puntos
        const maxScoreQ = MAX_SCORE_PER_QUESTION; 

        // Acumular el puntaje máximo general y por categoría
        totalMaxScore += maxScoreQ;
        maxScoresByCategory[categoryKey] = (maxScoresByCategory[categoryKey] || 0) + maxScoreQ;

        if (answerString) {
            const score = QUALITATIVE_SCORES[answerString] || 1;
            totalScore += score;
            scoresByCategory[categoryKey] = (scoresByCategory[categoryKey] || 0) + score;
        }
    });

    // 2. Normalizar los puntajes por categoría a 0-100
    const finalCategoryScores = Object.keys(scoresByCategory).map(cat => {
        const achieved = scoresByCategory[cat];
        const maximum = maxScoresByCategory[cat];
        
        const score = (achieved / maximum) * 100;
        
        return {
            // 🔥 Usamos 'category' para la gráfica (CategoryBarChart espera este campo)
            category: cat,
            score: Number(score.toFixed(1))
        };
    });

    const finalTotalScore = (totalScore / totalMaxScore) * 100;

    return {
        totalScore: Number(finalTotalScore.toFixed(1)),
        categoryScores: finalCategoryScores
    };
}


/**
 * Calcula el Progreso por Área Clave (para la ProgressList) basándose en el Ahorro Potencial.
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @returns {Array} [{area: string, progress: number}]
 */
export function calculateProgressAreas(answers) {
    if (!answers) return [];

    const areaProgress = {};
    const areaAhorroTotal = {};

    // 1. Calcular el ahorro individual por área/categoría
    OPPORTUNITIES.forEach(op => {
        const { ahorroAnual } = calculateOpportunityMetrics(answers, op);
        const area = op.category;
        
        // Sumar el ahorro por área
        areaAhorroTotal[area] = (areaAhorroTotal[area] || 0) + ahorroAnual;
    });

    // 2. Determinar la progresión (simplificada)
    
    const areas = ["Energía", "Residuos", "Agua", "Flujos Internos"];
    
    return areas.map(area => {
        const ahorro = areaAhorroTotal[area] || 0;
        let progress = 0;
        
        if (ahorro > 200000) {
            progress = 90; // Alto Potencial
        } else if (ahorro > 50000) {
            progress = 60; // Potencial Medio
        } else {
            progress = 30; // Potencial Bajo
        }
        
        return {
            area: area,
            progress: progress,
            impact: IMPACT_WEIGHTS[area] * 100
        };
    });
}


/**
 * Calcula la Reducción Potencial de Residuos a Vertedero (en toneladas/año).
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @returns {{reductionTon: number, percentage: number}}
 */
function calculateWasteReduction(answers) {
    // Usamos OP2_RESIDUOS como referencia, ya que usa D7 (Residuos a Vertedero)
    const opResiduos = OPPORTUNITIES.find(op => op.id === "OP2_RESIDUOS");
    if (!opResiduos) return { reductionTon: 0, percentage: 0 };

    // Residuos base (D7)
    const residuosBaseTon = getNumericAnswer(answers, opResiduos.preguntaBaseId);
    
    // Proyección: Reducción = Base * Factor de Reducción
    const reductionTon = residuosBaseTon * opResiduos.factorReduccion;
    
    // Cálculo de Porcentaje (Fórmula: Reducción / Base * 100)
    const percentage = residuosBaseTon > 0 
        ? (reductionTon / residuosBaseTon) * 100 
        : 0;
        
    return { 
        reductionTon: Number(reductionTon.toFixed(2)), 
        percentage: Number(percentage.toFixed(1)) 
    };
}


/**
 * Calcula el Ahorro Potencial de Agua (en m³/año).
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @returns {number} Ahorro de agua en m³/año
 */
function calculateWaterSavings(answers) {
    // Usamos OP4_AGUA como referencia. Esta OP usa una base de consumo estimada.
    const opAgua = OPPORTUNITIES.find(op => op.id === "OP4_AGUA");
    if (!opAgua) return 0;

    // Base de Consumo Estimada (m3/año). La buscamos directamente del objeto de oportunidad.
    const aguaBaseM3 = opAgua.baseM3AguaEstimada || 0;
    
    // Proyección: Ahorro = Base * Factor de Reducción
    const savingsM3 = aguaBaseM3 * opAgua.factorReduccion;
    
    return Number(savingsM3.toFixed(0));
}


/**
 * Combina todos los cálculos para obtener el objeto de métricas del Dashboard.
 * @param {Object} answers - Respuestas del diagnóstico del usuario.
 * @param {Array} questions - Lista completa de preguntas.
 * @returns {{score: number, savings: {total: number, monthly: number, monthlyData: Array}, wasteReduction: Object, waterSavings: number, progressAreas: Array}}
 */
export function getDashboardMetrics(answers, questions) {
    if (!answers || questions.length === 0) {
        return {
            score: 0,
            savings: { total: 0, monthly: 0, monthlyData: [] },
            wasteReduction: { reductionTon: 0, percentage: 0 },
            waterSavings: 0,
            progressAreas: []
        };
    }

    // Calcular Ahorro Total y ROI
    const { ahorroTotal } = calculateOverallOpportunityMetrics(answers);
    
    // Aseguramos que ahorroTotal es un número y no hay NaN
    const safeAhorroTotal = isNaN(ahorroTotal) ? 0 : ahorroTotal;
    const monthlySavingsValue = safeAhorroTotal > 0 ? (safeAhorroTotal / 12) : 0;

    // Cálculo de Reducción y Ahorro en Volumen
    const wasteReduction = calculateWasteReduction(answers);
    const waterSavings = calculateWaterSavings(answers);


    // Generar datos mensuales (asumimos un ahorro plano a lo largo de 12 meses)
    const monthlyData = MONTHS.map((month) => ({
        month: month,
        value: monthlySavingsValue, // Aquí va el valor numérico
    }));
    
    // 🔥 CORRECCIÓN AQUÍ: Usar calculateCircularityScores
    const { totalScore, categoryScores } = calculateCircularityScores(answers, questions);

    return {
        // Nivel de Circularidad (KPI)
        score: totalScore,
        
        // 🔥 Incluir el array de categorías para la gráfica de barras
        categoryScores: categoryScores, 
        
        // Ahorro
        savings: {
            total: safeAhorroTotal,
            monthly: monthlySavingsValue,
            monthlyData: monthlyData // El array formateado
        },
        
        // Incluir nuevos cálculos
        wasteReduction: wasteReduction, 
        waterSavings: waterSavings, 

        // Progreso por Área
        progressAreas: calculateProgressAreas(answers)
    };
}