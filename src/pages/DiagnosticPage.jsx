import { useEffect, useState } from "react";
import diagnosticQuestions from "../data/diagnosticQuestions";
import DiagnosticQuestion from "../components/DiagnosticQuestion";
import "../styles/diagnostic.css";

export default function DiagnosticPage() {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false); // 🔥 pantalla final

  /* ======================================================
     Detectar usuario y filtrar preguntas según sector y tamaño
     ====================================================== */

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.id === userId);

    if (!user) return;

    const sector = user.sector;
    const size = user.empleados;

    let sizeType = "micro";
    if (size === "51-200" || size === "201-500") sizeType = "mediana";
    if (size === "Más de 500") sizeType = "grande";

    const filtered = diagnosticQuestions.filter((q) => {
      if (q.tipo === "comun") return true;
      if (q.tipo === sizeType) return true;
      if (q.sectores.includes(sector)) return true;
      return false;
    });

    setFilteredQuestions(filtered);
  }, []);

  /* ======================================================
     Verificar si el usuario YA tiene diagnóstico guardado
     ====================================================== */

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};

    if (diagnostics[userId]) {
      setFinished(true);           // 🔥 Mostrar pantalla final
      setAnswers(diagnostics[userId]); // opcional, por si quieres verlas
    }
  }, []);

  /* ======================================================
     Guardar respuesta actual
     ====================================================== */
  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  /* ======================================================
     Finalizar diagnóstico
     ====================================================== */
  const finishDiagnostic = () => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};

    diagnostics[userId] = answers;

    localStorage.setItem("diagnostics", JSON.stringify(diagnostics));

    setFinished(true); // 🔥 Pantalla final
  };

  /* ======================================================
     Volver a contestar → borrar diagnóstico
     ====================================================== */
  const restartDiagnostic = () => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};

    delete diagnostics[userId];
    localStorage.setItem("diagnostics", JSON.stringify(diagnostics));

    setAnswers({});
    setStep(0);
    setFinished(false);
  };

  /* ======================================================
     Pantalla final si ya está completado
     ====================================================== */

  if (finished) {
    return (
      <div className="diagnostic-finished">
        <h1>🎉 Diagnóstico completado</h1>
        <p>Tu diagnóstico ha sido almacenado correctamente.</p>

        <button className="btn-primary" onClick={restartDiagnostic}>
          Volver a contestar
        </button>
      </div>
    );
  }

  /* ======================================================
     Cargando preguntas filtradas
     ====================================================== */

  if (filteredQuestions.length === 0)
    return <div className="loading">Cargando diagnóstico...</div>;

  const current = filteredQuestions[step];
  const progress = ((step + 1) / filteredQuestions.length) * 100;

  return (
    <div className="diagnostic-container">
      <h1>Diagnóstico de Economía Circular</h1>
      <p>Responde las siguientes preguntas para evaluar el nivel de circularidad de tu empresa</p>

      {/* Barra de progreso */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="progress-text">
        Pregunta {step + 1} de {filteredQuestions.length}
      </p>

      {/* Pregunta actual */}
      <DiagnosticQuestion
        question={current}
        answer={answers[current.id]}
        onAnswer={handleAnswer}
      />

      {/* Botones */}
      <div className="diagnostic-buttons">
        <button
          className="btn-secondary"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >
          Anterior
        </button>

        {step < filteredQuestions.length - 1 ? (
          <button
            className="btn-primary"
            onClick={() => setStep(step + 1)}
            disabled={!answers[current.id]}
          >
            Siguiente
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={finishDiagnostic}
            disabled={!answers[current.id]}
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
