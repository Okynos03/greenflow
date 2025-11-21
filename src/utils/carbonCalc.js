// === FACTORES DE EMISIÓN ===
const FE = {
  D1: 2.0,       // kg CO2 por m3 de gas (combustión fija)
  D2: 2.5,       // kg CO2 por litro (promedio gasolina/diesel)
  D3: 1800,      // kg CO2e por kg de refrigerante fugado
  D4: 0.455,     // kg CO2 por kWh
  D7: 1800       // kg CO2e por tonelada de residuo
};


// === CÁLCULOS DE HUELLA ===
export function calculateCarbonFootprint(answers) {
  // Inicializamos los resultados detallados
  const results = {
    D1: 0,
    D2: 0,
    D3: 0,
    D4: 0,
    D6: 0,
    D7: 0,
    total: 0
  };

  // D1 — Combustión fija
  if (answers.D1) {
    // Si la respuesta es un objeto (por preguntas numéricas con radio), usar .value
    const m3 = answers.D1.value ? Number(answers.D1.value) : Number(answers.D1); 
    results.D1 = m3 * FE.D1;
  }

  // D2 — Combustión móvil
  if (answers.D2) {
    const litros = answers.D2.value ? Number(answers.D2.value) : Number(answers.D2);
    results.D2 = litros * FE.D2;
  }

  // D3 — Refrigerantes
  if (answers.D3) {
    const kg = answers.D3.value ? Number(answers.D3.value) : Number(answers.D3);
    results.D3 = kg * FE.D3;
  }

  // D4 — Electricidad
  if (answers.D4) {
    const kwh = answers.D4.value ? Number(answers.D4.value) : Number(answers.D4);
    results.D4 = kwh * FE.D4;
  }

  // D6 — Viajes (estimación basada en categoría)
  if (answers.D6) {
    // Si la respuesta es un objeto (opción seleccionada), usar .option
    const selection = answers.D6.option || answers.D6; 
    const map = { Baja: 500, Media: 1200, Alta: 2800 }; // kg CO2/año
    results.D6 = map[selection] || 0;
  }

  // D7 — Residuos enviados a vertedero
  if (answers.D7) {
    const ton = answers.D7.value ? Number(answers.D7.value) : Number(answers.D7);
    results.D7 = ton * FE.D7;
  }

  // CÁLCULO TOTAL
  results.total = 
      results.D1 +
      results.D2 +
      results.D3 +
      results.D4 +
      results.D6 +
      results.D7;

  return results;
}