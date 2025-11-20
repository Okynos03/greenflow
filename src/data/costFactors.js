// data/costFactors.js

// Costos unitarios promedio estimados en Celaya, Guanajuato (MXN)
export const COSTOS_UNITARIOS = {
    // Energía
    KWH: 2.50,         // MXN por kWh (Tarifa industrial/comercial promedio)
    AGUA_M3: 35.00,    // MXN por metro cúbico de agua potable
    // Combustibles
    GAS_M3: 11.50,     // MXN por m3 de Gas Natural (o equivalente LP)
    LITRO_COMBUSTIBLE: 24.00, // MXN por litro de Diesel/Gasolina (flota)
    // Residuos
    TON_VERTEDERO: 1800.00, // Costo de disposición por tonelada (según D7)
};

// Definición de las Oportunidades Clave (Ejemplos)
// Estos datos son FIJOS y se usan para calcular el ROI y el Ahorro Potencial Total
export const OPPORTUNITIES = [
    {
        id: "OP1_ENERGIA",
        title: "Implementación Solar Fotovoltaico",
        category: "Energía",
        inversionInicial: 450000, // MXN (Fijo)
        // Factor de reducción: Se proyecta reducir el 60% del consumo base de kWh
        factorReduccion: 0.60, 
        preguntaBaseId: "D4" // Consumo base: D4 (kWh)
    },
    {
        id: "OP2_RESIDUOS",
        title: "Simbiosis Industrial y Venta de Residuos",
        category: "Residuos",
        inversionInicial: 30000, // MXN (Logística / Estudio)
        // Factor de reducción: Se proyecta desviar el 40% del residuo de vertedero
        factorReduccion: 0.40,
        preguntaBaseId: "D7" // Consumo base: D7 (toneladas a vertedero)
    },
    {
        id: "OP3_FLUIDOS",
        title: "Regeneración de Fluidos de Maquinado",
        category: "Flujos Internos",
        inversionInicial: 120000, // MXN (Sistema de filtrado avanzado)
        // No está en las preguntas D, se usa una estimación de ahorro anual directo (ej. 80,000 MXN)
        ahorroDirecto: 80000, 
        preguntaBaseId: null // No requiere una pregunta de consumo directo para este ejemplo
    },
    {
        id: "OP4_AGUA",
        title: "Sistema de Reutilización de Aguas Grises",
        category: "Agua",
        inversionInicial: 120000, // MXN (Instalación de infraestructura)
        // Factor de reducción: Se proyecta reducir el 30% del consumo total de agua (usaremos una estimación de consumo de agua total del sector Servicios)
        factorReduccion: 0.30, 
        preguntaBaseId: null, // Asumimos un Consumo Base de Agua anual de 1500 m3 si el usuario es del sector Servicios
        baseM3AguaEstimada: 1500
    }
];