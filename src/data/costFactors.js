// data/costFactors.js (ACTUALIZADO)

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
export const OPPORTUNITIES = [
    {
        id: "OP1_ENERGIA",
        title: "Implementación Solar Fotovoltaico",
        category: "Energía",
        inversionInicial: 450000, 
        factorReduccion: 0.60, 
        preguntaBaseId: "D4", 
        benefits: [
            "Reducción de costos de electricidad",
            "Independencia energética",
            "Beneficios fiscales en GTO"
        ],
        description: "Instalación de paneles solares fotovoltaicos en el techo de la planta para cubrir hasta el 60% del consumo energético anual. Esto reduce drásticamente las emisiones de Alcance 2 y garantiza la estabilidad del costo energético a largo plazo. Se recomienda evaluar la capacidad estructural del techo y la interconexión con CFE."
    },
    {
        id: "OP2_RESIDUOS",
        title: "Simbiosis Industrial y Venta de Residuos",
        category: "Residuos",
        inversionInicial: 30000, 
        factorReduccion: 0.40,
        preguntaBaseId: "D7", 
        benefits: [
            "Generación de ingresos por residuos",
            "Reducción de costos de disposición",
            "Cumplimiento normativo avanzado"
        ],
        description: "Establecimiento de acuerdos de 'Simbiosis Industrial' con empresas cercanas. Los residuos que actualmente se envían a vertedero (ej. plásticos, metales, lodos) se venden o se entregan a otra empresa como materia prima. La inversión incluye el estudio de factibilidad y la logística de recolección."
    },
    {
        id: "OP3_FLUIDOS",
        title: "Regeneración de Fluidos de Maquinado",
        category: "Flujos Internos",
        inversionInicial: 120000, 
        ahorroDirecto: 80000, 
        preguntaBaseId: null,
        benefits: [
            "Ahorro en compra de lubricantes vírgenes",
            "Disminución de residuos peligrosos",
            "Mayor calidad de maquinado"
        ],
        description: "Instalación de un sistema de filtrado y tratamiento avanzado de fluidos de corte y lubricantes hidráulicos. Esto extiende la vida útil de los fluidos de 2 a 4 veces, reduciendo el volumen de residuos peligrosos generados y los costos de adquisición de materiales nuevos."
    },
    {
        id: "OP4_AGUA",
        title: "Sistema de Reutilización de Aguas Grises",
        category: "Agua",
        inversionInicial: 120000,
        factorReduccion: 0.30, 
        preguntaBaseId: null, 
        baseM3AguaEstimada: 1500,
        benefits: [
            "Reducción de consumo de agua potable",
            "Ahorro en costos de agua",
            "Resiliencia ante sequías"
        ],
        description: "Implementación de infraestructura de captación de agua pluvial y reutilización de aguas grises (procedentes de lavabos o duchas) para usos no potables, como inodoros, riego o ciertos procesos de enfriamiento. Esto reduce la dependencia de la red municipal."
    }
];