import "../styles/diagnostic.css";

export default function DiagnosticQuestion({ question, answer, onAnswer }) {
  const isNumeric = (text) =>
    text.startsWith("Ingresar") || text.includes("litros") || text.includes("kg");

  const hasNumericOptions = question.opciones.some(isNumeric);

  return (
    <div className="question-card">
      <span className="question-tag">{question.categoria}</span>

      <h2 className="question-text">{question.pregunta}</h2>

      <div className="options-container">
        
        {/* 🔹 CASO 1: Pregunta de tipo numérico con radios (ej: gasolina / diésel) */}
        {hasNumericOptions && question.opciones.length > 1 && (
          <>
            {question.opciones.map((op, i) => (
              <div key={i} className="numeric-option-block">
                <label className={`option ${answer?.option === op ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name={question.id}
                    checked={answer?.option === op}
                    onChange={() => onAnswer(question.id, { option: op, value: "" })}
                  />
                  {op}
                </label>

                {/* Si está seleccionada → mostrar input */}
                {answer?.option === op && (
                  <input
                    type="number"
                    className="numeric-input"
                    placeholder="Ingresa la cantidad"
                    value={answer?.value || ""}
                    onChange={(e) =>
                      onAnswer(question.id, { option: op, value: e.target.value })
                    }
                  />
                )}
              </div>
            ))}
          </>
        )}

        {/* 🔹 CASO 2: Pregunta numérica simple (ej: “Ingresar valor”, “Ingresar kg”, etc.) */}
        {hasNumericOptions && question.opciones.length === 1 && (
          <input
            type="number"
            className="numeric-input"
            placeholder="Ingresa el valor"
            value={answer || ""}
            onChange={(e) => onAnswer(question.id, e.target.value)}
          />
        )}

        {/* 🔹 CASO 3: Opciones normales (Sí / No / Parcialmente / rangos) */}
        {!hasNumericOptions &&
          question.opciones.map((op, i) => (
            <label key={i} className={`option ${answer === op ? "selected" : ""}`}>
              <input
                type="radio"
                name={question.id}
                checked={answer === op}
                onChange={() => onAnswer(question.id, op)}
              />
              {op}
            </label>
          ))}
      </div>
    </div>
  );
}
