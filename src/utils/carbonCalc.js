// === FACTORES DE EMISIÓN ===
const FE = {
  D1: 2.0,              // kg CO2 por m3 de gas (combustión fija)
  D2: 2.5,              // kg CO2 por litro (promedio gasolina/diesel)
  D3: 1800,             // kg CO2e por kg de refrigerante fugado
  D4: 0.455,            // kg CO2 por kWh
  D7: 1800              // kg CO2e por tonelada de residuo
};


// === CÁLCULOS DE HUELLA ===
export function calculateCarbonFootprint(answers) {
  const results = {};

  // D1 — Combustión fija
  if (answers.D1) {
    const m3 = Number(answers.D1);
    results.D1 = m3 * FE.D1;
  }

  // D2 — Combustión móvil
  if (answers.D2) {
    const litros = Number(answers.D2);
    results.D2 = litros * FE.D2;
  }

  // D3 — Refrigerantes
  if (answers.D3) {
    const kg = Number(answers.D3);
    results.D3 = kg * FE.D3;
  }

  // D4 — Electricidad
  if (answers.D4) {
    const kwh = Number(answers.D4);
    results.D4 = kwh * FE.D4;
  }

  // D6 — Viajes
  if (answers.D6) {
    const map = { Baja: 500, Media: 1200, Alta: 2800 }; // kg CO2/año
    results.D6 = map[answers.D6] || 0;
  }

  // D7 — Residuos enviados a vertedero
  if (answers.D7) {
    const ton = Number(answers.D7);
    results.D7 = ton * FE.D7;
  }

  // TOTAL
  results.total = 
      (results.D1 || 0) +
      (results.D2 || 0) +
      (results.D3 || 0) +
      (results.D4 || 0) +
      (results.D6 || 0) +
      (results.D7 || 0);

  return results;
}
