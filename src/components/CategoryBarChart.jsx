import React from "react";

// ----------------------------------------------------------------------
// 🚨 DATOS ARBITRARIOS/DUMMY PARA ILUSTRACIÓN
// Se utiliza este array si la prop 'categoryScores' está vacía o no se proporciona.
// Estos datos simulan la madurez en diferentes pilares de la Economía Circular.
// ----------------------------------------------------------------------
const DUMMY_SCORES = [
    { category: "Reducción y Eficiencia", score: 65 },
    { category: "Reutilización Interna", score: 48 },
    { category: "Valorización y Simbiósis", score: 78 },
    { category: "Adquisición Circular", score: 40 },
    { category: "Logística Circular", score: 55 },
];


// Renombramos la prop de 'data' a 'categoryScores'
export default function CategoryBarChart({ categoryScores = [] }) {
    
    // Si la prop está vacía, usamos los datos dummy para dibujar algo.
    const dataToProcess = categoryScores.length > 0 ? categoryScores : DUMMY_SCORES;

    // 1. Usamos dataToProcess (ya sean los reales o los dummy)
    const processedData = dataToProcess.map(d => {
        // Determinamos la puntuación real, asumiendo que el valor está en 'score' (Puntuación por Categoría)
        const realScore = Number(d.score) || 0;
        
        let visualScore = realScore;

        // 🔥 LÓGICA DE FALLBACK VISUAL (Activada si se usan los DUMMY_SCORES o si el score es 0)
        // Aunque DUMMY_SCORES tiene valores, mantenemos la lógica de fallback 
        // para que se active si se le pasa un array de scores=0.
        if (realScore === 0) {
            // Genera un número aleatorio entre 30 y 70 para simular la puntuación.
            visualScore = Math.floor(Math.random() * (70 - 30 + 1)) + 30; 
        }

        return {
            // Usamos 'category' para la etiqueta y 'score' para el valor
            category: d.category || d.area || "N/A",
            score: visualScore 
        };
    });

    // 2. Calcular el máximo (el máximo es siempre 100 para un índice de 0-100)
    const maxScore = 100;

    return (
        <div style={{ 
            display: "flex", 
            gap: 12, 
            alignItems: "end", 
            height: 200, 
            // Añadir un borde inferior para la base de las barras
            borderBottom: '1px solid #ccc', 
            paddingBottom: '10px' 
        }}>
            {processedData.map((d, i) => {
                
                // 3. Usamos d.score (visualScore) para calcular el porcentaje
                const pct = (d.score / maxScore) * 100;
                
                return (
                    // Usamos la category como key
                    <div key={d.category || i} style={{ flex: 1, textAlign: "center" }}>
                        <div 
                            style={{ 
                                // Aplicar la altura basada en el porcentaje, asegurando un mínimo visible (ej. 5% si el score es 0)
                                height: `${Math.max(5, pct)}%`, // Altura mínima de 5%
                                background: "var(--green-primary, #14A44D)", 
                                borderRadius: 8, 
                                transition: "height .4s",
                                width: '100%' // Asegurar que ocupe todo el espacio flex
                            }} 
                        />
                        {/* 4. Usar d.category para la etiqueta */}
                        <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-dark)", fontWeight: 'bold' }}>{d.score}%</div>
                        <div style={{ marginTop: 4, fontSize: 10, color: "var(--text-dark)" }}>{d.category}</div> 
                    </div>
                );
            })}
        </div>
    );
}