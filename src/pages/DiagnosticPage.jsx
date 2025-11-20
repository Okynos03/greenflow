import { useEffect, useState } from "react";
import diagnosticQuestions from "../data/diagnosticQuestions";
import DiagnosticQuestion from "../components/DiagnosticQuestion";
import "../styles/diagnostic.css";

export default function DiagnosticPage({ redirectToResource }) {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false); // 🔥 pantalla final

  /* ======================================================
  // Detectar usuario y filtrar preguntas según sector
  // ====================================================== */

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.id === userId);

    if (!user) return;

    // Usar el sector guardado para filtrar
    const sector = user.sector; 

    // Mapeo especial para los sectores que son combinados o simplificados en las preguntas
    const sectorMap = {
      "Alimentos": "Alimentos",
      "Alimentos y Bebidas": "Alimentos", // Adaptación del sector guardado
      "Automotriz": "Automotriz",
      "Servicios": "Servicios",
      "Logístico": "Logístico",
      "Manufactura": "Manufactura",
    };

    const sectorKey = sectorMap[sector] || sector; // Obtener la clave de sector para el filtrado

    const filtered = diagnosticQuestions.filter((q) => {
      // 1. Mostrar preguntas de filtro F0 siempre
      if (q.modulo === "Filtro") return true; 

      // 2. Mostrar preguntas comunes (sectores: ["General"])
      const isCommon = q.sectores.includes("General");
      
      // 3. Mostrar preguntas específicas del sector
      const isSpecific = q.sectores.includes(sectorKey);
      
      return isCommon || isSpecific;
    });

    setFilteredQuestions(filtered);
  }, []);

  /* ======================================================
  // Verificar si el usuario YA tiene diagnóstico guardado
  // ... (El resto del código permanece sin cambios)
  // ====================================================== */
  
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};

    if (diagnostics[userId]) {
      setFinished(true); 
      setAnswers(diagnostics[userId]); 
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const finishDiagnostic = () => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};

    diagnostics[userId] = answers;

    localStorage.setItem("diagnostics", JSON.stringify(diagnostics));

    setFinished(true); 
  };

  const restartDiagnostic = () => {
    const userId = localStorage.getItem("currentUserId");
    const diagnostics = JSON.parse(localStorage.getItem("diagnostics")) || {};

    delete diagnostics[userId];
    localStorage.setItem("diagnostics", JSON.stringify(diagnostics));

    setAnswers({});
    setStep(0);
    setFinished(false);
  };

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

  if (filteredQuestions.length === 0)
    return <div className="loading">Cargando diagnóstico...</div>;

  const current = filteredQuestions[step];
  const progress = ((step + 1) / filteredQuestions.length) * 100;

  // 🔥 NUEVA LÓGICA DE REDIRECCIÓN AL HACER CLIC EN SIGUIENTE
  const handleNext = () => {
    // 1. Verificar si es la pregunta F0 (índice 0)
    if (step === 0 && current.id === "F0") {
      const answerF0 = answers["F0"];
      
      // 2. Si la respuesta es "No, necesitamos más tiempo..."
      if (answerF0 === "No, necesitamos más tiempo para recopilarla.") {
        // Redirigir al tab de Recursos -> Guías (recurso educativo)
        redirectToResource("guias"); 
        return; // Detiene la ejecución para no avanzar el paso
      }
    }
    
    // Si la respuesta es "Sí" o es cualquier otra pregunta, avanza normalmente
    setStep(step + 1);
  };

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
            onClick={handleNext} 
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