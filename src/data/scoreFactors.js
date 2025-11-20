// src/data/scoreFactors.js

// Asignación de puntos para opciones cualitativas comunes.
export const QUALITATIVE_SCORES = {
    // Escala general de 1 a 4 para rangos/niveles
    '0-5%': 1,
    '6% - 25%': 2,
    '26%-50%': 3,
    'Más del 50%': 4,
    '0%-10%': 1,
    '11% - 30%': 2,
    '31%-60%': 3,
    'Más del 60%': 4,
    '0%': 1,
    '1%-15%': 2,
    '16% - 35%': 3,
    'Más del 35%': 4,
    '1 a 5 viajes': 1,
    '6 a 15 viajes': 2,
    '16 a 40 viajes': 3,
    'Más de 40 viajes': 4,

    // Escala simple de Sí/No
    'No': 1,
    'Parcialmente': 2,
    'Sí': 3,

    // Niveles de Gestión de Residuos/Eficiencia
    'Se desechan': 1,
    'Se filtran manualmente': 2,
    'Análisis y Filtrado Avanzado': 3,
    'Regeneración en Sitio': 4,
    'Disposición Final': 1,
    'Alimento Animal': 2,
    'Valorización Energética/Material': 3,
    'Integración Completa': 4,
    'Ninguno': 1,
    'En Revisión': 2,
    'Implementado': 3,
    'Líder': 4,
    'Sin Gestión': 1,
    'Análisis Básico': 2,
    'Software de Optimización': 3,
    'Flota Verde': 4,
    
    // Nivel de Trazabilidad (Alimentos)
    'No se registra': 1,
    'Registro Global': 2,
    'Registro Detallado': 3,
    'Análisis Predictivo': 4,

    // Respuestas que no aplican a la puntuación de circularidad (Módulo D)
    'Baja': 1, // Para viajes, no penalizamos bajo, es una estimación.
    'Media': 2,
    'Alta': 3,
};

// Escala para el ROI (usada en dashboardCalc para determinar el progreso en el progressList)
export const IMPACT_WEIGHTS = {
    'Energía': 0.35,
    'Residuos': 0.30,
    'Agua': 0.20,
    'Flujos Internos': 0.15,
};

// Valor máximo que una pregunta puede tener para simplificar el cálculo.
export const MAX_SCORE_PER_QUESTION = 4;