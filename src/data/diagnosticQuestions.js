const diagnosticQuestions = [
  
  /* ============================================================
     =====================  MÓDULO A  ===========================
     ========= Flujo de Materiales y Gestión de Residuos =========
     ============================================================*/

  /* --- Preguntas Comunes ---*/
  {
    id: "A1",
    modulo: "A",
    categoria: "Generación de Residuos",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Qué porcentaje de sus residuos totales se destina actualmente a la recolección municipal de basura (Vertedero)?",
    opciones: ["0-25%", "25-50%", "50-75%", "75-100%"]
  },
  {
    id: "A2",
    modulo: "A",
    categoria: "Separación de Residuos",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuenta con una separación interna básica de residuos (Papel/Cartón, Plástico, Vidrio, Orgánico)?",
    opciones: ["Sí", "No", "Parcialmente"]
  },
  {
    id: "A3",
    modulo: "A",
    categoria: "Plásticos",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Tiene un programa para reducir el uso de plásticos de un solo uso o envases no reciclables?",
    opciones: ["Sí", "No"]
  },
  {
    id: "A4",
    modulo: "A",
    categoria: "Materias Recicladas",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Qué porcentaje de las materias primas que se compran son de origen reciclado o renovable?",
    opciones: ["0-25%", "25-50%", "50-75%", "75-100%"]
  },

  /* --- Preguntas Específicas POR SECTOR para Micro/Pequeña ---*/

  {
    id: "A6",
    modulo: "A",
    categoria: "Textil",
    tipo: "micro",
    sectores: ["Textil"],
    pregunta: "¿Reutilizan el hilo sobrante o los retazos de tela en productos de menor valor o los entregan a un tercero?",
    opciones: ["Sí", "No"]
  },
  {
    id: "A7",
    modulo: "A",
    categoria: "Alimentos",
    tipo: "micro",
    sectores: ["Alimentos y Bebidas"],
    pregunta: "¿Miden y registran diariamente el desperdicio de alimentos o producto en proceso?",
    opciones: ["Sí", "No"]
  },
  {
    id: "A8",
    modulo: "A",
    categoria: "Servicios",
    tipo: "micro",
    sectores: ["Servicios", "Otro"],
    pregunta: "¿Están utilizando vasos, cubiertos o envases reutilizables para el personal?",
    opciones: ["Sí", "No"]
  },
  {
    id: "A9",
    modulo: "A",
    categoria: "Construcción",
    tipo: "micro",
    sectores: ["Construcción"],
    pregunta: "¿Tienen un sistema para separar los residuos de demolición en la fuente?",
    opciones: ["Sí", "No"]
  },

  /* --- Preguntas Específicas PARA Mediana/Grande ---*/

  {
    id: "A10",
    modulo: "A",
    categoria: "Manufactura",
    tipo: "mediana",
    sectores: ["Manufactura"],
    pregunta: "¿Realizan un análisis de la composición de sus residuos para encontrar materiales de alto valor?",
    opciones: ["Sí", "No"]
  },
  {
    id: "A11",
    modulo: "A",
    categoria: "Textil",
    tipo: "mediana",
    sectores: ["Textil"],
    pregunta: "¿Tienen implementado un proceso para recuperar prendas o productos defectuosos y remanufacturarlos?",
    opciones: ["Sí", "No"]
  },


  /* ============================================================
     =====================  MÓDULO B  ===========================
     =========  Eficiencia Operacional y Cadena de Valor =========
     ============================================================*/

  /* Comunes */
  {
    id: "B1",
    modulo: "B",
    categoria: "Eficiencia Hídrica",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Utilizan sistemas de captación de agua de lluvia?",
    opciones: ["Sí", "No"]
  },
  {
    id: "B2",
    modulo: "B",
    categoria: "Ahorro de Agua",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Ha implementado medidas para el ahorro de agua?",
    opciones: ["Sí", "No"]
  },
  {
    id: "B3",
    modulo: "B",
    categoria: "Diseño",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Sus productos tienen un diseño modular que facilite reparación?",
    opciones: ["Sí", "No", "No aplica"]
  },
  {
    id: "B4",
    modulo: "B",
    categoria: "Retorno del Producto",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Tiene un proceso para recuperar el producto del cliente después de su uso?",
    opciones: ["Sí", "No", "Solo si lo solicita"]
  },

  /* Micro/Pequeña */
  {
    id: "B6",
    modulo: "B",
    categoria: "Agropecuario",
    tipo: "micro",
    sectores: ["Agropecuario"],
    pregunta: "¿Utiliza sistemas de riego por goteo o técnicas de eficiencia hídrica avanzada?",
    opciones: ["Sí", "No"]
  },
  {
    id: "B7",
    modulo: "B",
    categoria: "Servicios",
    tipo: "micro",
    sectores: ["Servicios", "Otros"],
    pregunta: "¿Ha identificado algún material que usa una sola vez y podría reutilizarse?",
    opciones: ["Sí", "No"]
  },
  {
    id: "B8",
    modulo: "B",
    categoria: "Comercio",
    tipo: "micro",
    sectores: ["Comercio", "Retail"],
    pregunta: "¿Ofrecen descuentos si el cliente devuelve empaques?",
    opciones: ["Sí", "No"]
  },

  /* Mediana/Grande */
  {
    id: "B9",
    modulo: "B",
    categoria: "Manufactura",
    tipo: "mediana",
    sectores: ["Manufactura", "Textil"],
    pregunta: "¿Miden la intensidad de uso del agua (litros por unidad de producto)?",
    opciones: ["Sí", "No"]
  },
  {
    id: "B10",
    modulo: "B",
    categoria: "Construcción",
    tipo: "mediana",
    sectores: ["Construcción"],
    pregunta: "¿Utilizan materiales de larga vida útil o bajo impacto ambiental certificado?",
    opciones: ["Sí", "No"]
  },


  /* ============================================================
     =====================  MÓDULO C  ===========================
     =========   Estrategia, Inversión y Digitalización   =========
     ============================================================*/

  /* Comunes */
  {
    id: "C1",
    modulo: "C",
    categoria: "Barreras",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál es la principal barrera que le impide implementar iniciativas de sostenibilidad actualmente?",
    opciones: [
      "Falta de presupuesto",
      "Falta de conocimiento",
      "Falta de tiempo",
      "Falta de personal",
      "No es prioridad"
    ]
  },
  {
    id: "C2",
    modulo: "C",
    categoria: "Responsables",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Existe un líder formalmente responsable de iniciativas de sostenibilidad?",
    opciones: ["Sí", "No"]
  },
  {
    id: "C3",
    modulo: "C",
    categoria: "Colaboración",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Ha buscado socios o startups que puedan usar sus residuos como materia prima?",
    opciones: ["Sí", "No"]
  },
  {
    id: "C4",
    modulo: "C",
    categoria: "Apertura",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Qué tan dispuesta está su empresa a colaborar con competidores para compartir soluciones de eficiencia?",
    opciones: ["Muy dispuesta", "Indiferente", "Nada dispuesta"]
  },
  {
    id: "C5",
    modulo: "C",
    categoria: "Digitalización",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Utiliza herramientas o software para medir la eficiencia de agua, materiales o inventario?",
    opciones: ["Sí", "No"]
  },

  /* Micro/Pequeña */
  {
    id: "C6",
    modulo: "C",
    categoria: "Conocimiento",
    tipo: "micro",
    sectores: ["General"],
    pregunta: "¿El dueño/gerente tiene conocimiento básico o avanzado de economía circular?",
    opciones: ["Nulo", "Básico", "Avanzado"]
  },

  /* Mediana/Grande */
  {
    id: "C7",
    modulo: "C",
    categoria: "Financiamiento Verde",
    tipo: "mediana",
    sectores: ["Manufactura", "Construcción"],
    pregunta: "¿Han explorado líneas de financiamiento verde para proyectos sostenibles?",
    opciones: ["Sí", "No"]
  },


  /* ============================================================
     ==========  MÓDULO D — HUELLA DE CARBONO COMPLETA ===========
     ==========        (D1, D2, D3 incluidos)          ============
     ============================================================*/

  /* ------------------ D1. Emisiones Directas ------------------ */

  {
    id: "D1",
    modulo: "D1",
    categoria: "Combustión Fija",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "Si utiliza Gas Natural, Gas LP o Diesel para procesos, ¿cuál fue el consumo anual total? (ingresar en m3)",
    opciones: ["Ingresar valor"]
  },
  {
    id: "D2",
    modulo: "D1",
    categoria: "Combustión Móvil",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál es el consumo anual total de combustible de su flota propia? (Ingresar L ya sea gasolina o diésel)",
    opciones: ["Ingresar litros"]
  },
  {
    id: "D3",
    modulo: "D1",
    categoria: "Refrigerantes",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuáles son los refrigerantes utilizados y cuál fue la carga perdida por fugas el último año? (kg)",
    opciones: ["Ingresar kg"]
  },


  /* ------------------ D2. Electricidad Comprada ------------------ */

  {
    id: "D4",
    modulo: "D2",
    categoria: "Electricidad",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál fue su consumo total de electricidad (kWh) el último año?",
    opciones: ["Ingresar kWh"]
  },
  {
    id: "D5",
    modulo: "D2",
    categoria: "Origen Energético",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Tienen energía renovable contratada o generación propia?",
    opciones: ["Sí", "No", "Parcialmente"]
  },

  /* ------------------ D3. Otras emisiones indirectas ------------------ */

  {
    id: "D6",
    modulo: "D3",
    categoria: "Viajes",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Qué frecuencia de viajes por motivos laborales tiene la empresa?",
    opciones: ["Baja", "Media", "Alta"]
  },
  {
    id: "D7",
    modulo: "D3",
    categoria: "Residuos",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál es el volumen anual de residuos enviados a vertedero? (ton)",
    opciones: ["Ingresar toneladas"]
  }
];



export default diagnosticQuestions;
