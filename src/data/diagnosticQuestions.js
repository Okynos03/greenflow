const diagnosticQuestions = [
  /* ============================================================
  // ====================== FASE PREVIA ==========================
  // ===================== (Filtro Común) =======================
  // ============================================================*/

  {
    id: "F0",
    modulo: "Filtro",
    categoria: "Conocimiento Mínimo",
    tipo: "filtro",
    sectores: ["General"], // Aplica a todos los sectores
    pregunta:
      "ATENCIÓN: Para continuar con el diagnóstico, su empresa debe contar con registros documentados de consumo (energía, agua) y gestión de residuos (por volumen o peso) de los últimos 12 meses. ¿Cuenta su empresa con los registros consolidados y la capacidad para proporcionar estos datos anuales?",
    opciones: [
      "Sí, estamos listos para cargar la información.", // Continuar
      "No, necesitamos más tiempo para recopilarla." // Enviar a recurso educativo/plantilla
    ]
  },

  /* ============================================================
  // ======================= MÓDULO A ============================
  // ========= Flujo de Materiales y Gestión de Residuos ========
  // ============================================================*/

  /* --- Preguntas Comunes (Aplica a todos los sectores si se usa "General") ---*/
  {
    id: "A1",
    modulo: "A",
    categoria: "Generación de Residuos",
    tipo: "comun",
    sectores: ["General"],
    pregunta:
      "¿Qué porcentaje de sus residuos totales se destina actualmente a la recolección municipal de basura (Vertedero)?",
    opciones: ["0-25%", "25-50%", "50-75%", "75-100%"]
  },
  {
    id: "A2",
    modulo: "A",
    categoria: "Separación de Residuos",
    tipo: "comun",
    sectores: ["General"],
    pregunta:
      "¿Cuenta con una separación interna básica de residuos (Papel/Cartón, Plástico, Vidrio, Orgánico)?",
    opciones: ["Sí", "No", "Parcialmente"]
  },
  {
    id: "A3",
    modulo: "A",
    categoria: "Plásticos",
    tipo: "comun",
    sectores: ["General"],
    pregunta:
      "¿Tiene un programa para reducir el uso de plásticos de un solo uso o envases no reciclables?",
    opciones: ["Sí", "No"]
  },

  /* ============================================================
  // ================== Sector Automotriz (🚘) ====================
  // ============================================================*/

  {
    id: "A4A",
    modulo: "A",
    categoria: "Optimización de Activos",
    pilar: "Reducción y Eficiencia",
    sectores: ["Automotriz", "Manufactura"], // Puede aplicar a Manufactura también
    pregunta:
      "Detalle su proceso de remanufactura interna de componentes: ¿Qué porcentaje aproximado de los componentes principales (ej. 'cores', 'tooling', equipos) que son devueltos por fallas o desgaste son remanufacturados/reacondicionados internamente para volver al inventario?",
    opciones: [
      "0%-5%: La práctica estándar es enviarlos a chatarra o disposición externa.",
      "6% - 25%: Se remanufacturan/reacondicionan algunos componentes específicos o de bajo costo.",
      "26%-50%: Contamos con un proceso semi-formal de remanufactura y un área designada.",
      "Más del 50%: La remanufactura está integrada en la estrategia de producción y es rentable."
    ]
  },
  {
    id: "A5A",
    modulo: "A",
    categoria: "Reducción de Insumos y Residuos Peligrosos",
    pilar: "Reutilización Interna (Flujos)",
    sectores: ["Automotriz", "Manufactura"],
    pregunta:
      "Gestión de Fluidos y Lubricantes: ¿Cómo se gestionan los fluidos de corte, aceites hidráulicos o lubricantes utilizados en sus procesos maquinado/producción?",
    opciones: [
      "Se desechan: Se disponen como de residuo al finalizar la vida útil establecida por el proveedor.",
      "Se filtran manualmente: Se extienden mediante filtrado simple o recarga de aditivos una vez.",
      "Análisis y Filtrado Avanzado: Se extienden la vida útil más de dos veces con análisis de laboratorio y filtrado periódico.",
      "Regeneración en Sitio: Contamos con un sistema de regeneración (destilación/tratamiento) de fluidos en la planta."
    ]
  },
  {
    id: "A6A",
    modulo: "A",
    categoria: "Logística Inversa y Reducción de Residuos",
    pilar: "Valorización y Simbiósis",
    sectores: ["Automotriz", "Logístico"],
    pregunta:
      "Logística Circular de Embalajes: ¿Qué porcentaje de sus embalajes de transporte (ej. 'totes', cajas plásticas, racks metálicos) se utilizan bajo un sistema de retorno o 'pooling' (son recuperados y reutilizados) con sus proveedores y/o clientes?",
    opciones: [
      "0%-10%: Usamos casi exclusivamente embalajes de un solo uso (cartón, plásticos desechables).",
      "11% - 30%: Solo con clientes y proveedores clave bajo acuerdos específicos.",
      "31%-60%: Es un estándar de la empresa y se gestiona con un sistema de Logística Inversa.",
      "Más del 60%: Toda nuestra cadena de suministro utiliza embalajes retornables y trazables."
    ]
  },

  /* ============================================================
  // ==================== Sector Servicios (🏨) ====================
  // ============================================================*/

  {
    id: "A4S",
    modulo: "A",
    categoria: "Eficiencia Operacional y Detección de Fugas",
    pilar: "Reducción y Eficiencia",
    sectores: ["Servicios"],
    pregunta:
      "Monitoreo Energético y Hídrico: ¿Cómo se realiza el control del consumo de agua y electricidad en sus instalaciones?",
    opciones: [
      "Solo Facturación: Se monitorea únicamente con base en la factura mensual global.",
      "Medición por Área: Contamos con medidores sectorizados (ej. aire acondicionado, cocina, áreas comunes) y se analizan mensualmente.",
      "Monitoreo en Tiempo Real (Básico): Existen medidores inteligentes que alertan sobre picos o consumos anormales.",
      "Gestión Automatizada (Avanzada): El monitoreo es en tiempo real y está conectado a un sistema de gestión de edificios (BMS) que optimiza automáticamente el uso."
    ]
  },
  {
    id: "A5S",
    modulo: "A",
    categoria: "Independencia Hídrica y Ahorro en Suministro",
    pilar: "Reutilización Interna (Flujos)",
    sectores: ["Servicios"],
    pregunta:
      "Gestión del Agua: ¿Cuál es el estatus de la reutilización de agua en sus instalaciones?",
    opciones: [
      "No se reutiliza: Toda el agua usada va al drenaje municipal.",
      "Básico: Se recolecta agua de lluvia o se reutiliza agua de limpieza para el riego esporádico.",
      "Sistemas de Aguas Grises: Contamos con infraestructura para reutilizar aguas grises (duchas/lavabos) en inodoros o riego de manera constante.",
      "Tratamiento y Reúso Avanzado: Se trata una parte significativa de las aguas residuales para su reintroducción en procesos operativos."
    ]
  },
  {
    id: "A6S",
    modulo: "A",
    categoria: "Cadena de Valor Circular y Reducción de Inversión",
    pilar: "Valorización y Simbiósis",
    sectores: ["Servicios"],
    pregunta:
      "Políticas de Compra Circular: En la adquisición de mobiliario, equipos de cómputo y consumibles, ¿cuál es el porcentaje del presupuesto anual destinado a productos reacondicionados, remanufacturados o con certificación de Ecodiseño?",
    opciones: [
      "0%: Las compras se centran en productos nuevos únicamente.",
      "1%-15%: Existe una política incipiente para considerar productos reacondicionados en áreas no críticas.",
      "16% - 35%: Es una prioridad la compra de productos con mayor ciclo de vida o remanufacturados (ej. mobiliario modular, equipos de cómputo).",
      "Más del 35%: La circularidad es un factor decisivo en todas las decisiones de compra de activos fijos y consumibles."
    ]
  },

  /* ============================================================
  // ===================== Sector Alimentos (🍎) ====================
  // ============================================================*/

  {
    id: "A4L",
    modulo: "A",
    categoria: "Optimización de Materia Prima y Reducción de Pérdidas",
    pilar: "Reducción y Eficiencia",
    sectores: ["Alimentos"],
    pregunta:
      "Trazabilidad de Pérdida de Alimentos: ¿Cómo se gestiona el registro de la materia prima que se convierte en pérdida o desperdicio durante el procesamiento?",
    opciones: [
      "No se registra: Se estima la pérdida con base en el inventario final.",
      "Registro Global: Se registra el peso/volumen total de la pérdida, pero no se clasifica por causa ni por etapa del proceso.",
      "Registro Detallado: La pérdida se clasifica por causa (ej. daño, calidad, error) y por etapa del proceso, permitiendo correcciones.",
      "Análisis Predictivo: Utilizamos software o tecnología IoT para predecir y prevenir las pérdidas antes de que ocurran."
    ]
  },
  {
    id: "A5L",
    modulo: "A",
    categoria: "Generación de Ingresos Adicionales (Upcycling)",
    pilar: "Reutilización Interna (Flujos)",
    sectores: ["Alimentos"],
    pregunta:
      "Valorización de Subproductos (Residuos Orgánicos): ¿Qué destino final tienen los subproductos inevitables de su procesamiento (ej. cáscaras, semillas, bagazo, sueros lácteos)?",
    opciones: [
      "Disposición Final: Se envían directamente a relleno sanitario o vertedero (costo).",
      "Alimento Animal: Se envían a granjas o terceros como alimento animal.",
      "Valorización Energética/Material: Se utilizan internamente o se venden a un tercero para la producción de biogás, compostaje o ingredientes secundarios de alto valor.",
      "Integración Completa: Están integrados como materia prima para un nuevo producto (ej. un ingrediente funcional, 'upcycling')."
    ]
  },
  {
    id: "A6L",
    modulo: "A",
    categoria: "Responsabilidad Extendida y Tendencia Regulatoria",
    pilar: "Valorización y Simbiósis",
    sectores: ["Alimentos"],
    pregunta:
      "Ecodiseño de Empaques: ¿Cuál es el compromiso de su empresa con el uso de materiales de empaque con criterios de Economía Circular?",
    opciones: [
      "Ninguno: Utilizamos los empaques estándar (ej. multicapa, no reciclable, sin material reciclado).",
      "En Revisión: Estamos en proceso de cambiar a materiales 100% reciclables o de origen reciclado.",
      "Implementado: Al menos el 70% de nuestros empaques son 100% reciclables, compostables o contienen un alto porcentaje de material reciclado.",
      "Líder: Todos nuestros empaques cumplen criterios de ecodiseño (aligeramiento, material reciclado, reciclabilidad garantizada)."
    ]
  },

  /* ============================================================
  // ==================== Sector Logístico (🚚) ====================
  // ============================================================*/

  {
    id: "A4O",
    modulo: "A",
    categoria: "Eficiencia Operacional y Huella de Carbono Alcance 1",
    pilar: "Reducción y Eficiencia",
    sectores: ["Logístico"],
    pregunta:
      "Optimización de Rutas y Flota: ¿Cómo se gestiona la eficiencia de combustible/energía de la flota vehicular?",
    opciones: [
      "Sin Gestión: No hay un monitoreo sistemático del consumo por ruta o vehículo.",
      "Análisis Básico: Se monitorea el rendimiento de combustible y se realizan mantenimientos preventivos.",
      "Software de Optimización: Se utiliza software o GPS avanzado para la optimización dinámica de rutas y la reducción de kilómetros vacíos.",
      "Flota Verde: Más del 20% de nuestra flota utiliza combustibles alternativos (eléctrico, híbrido, gas natural)."
    ]
  },
  {
    id: "A5O",
    modulo: "A",
    categoria: "Minimización de Pérdidas Operativas y Compra de Activos",
    pilar: "Reutilización Interna (Flujos)",
    sectores: ["Logístico"],
    pregunta:
      "Vida Útil de los Activos Logísticos: ¿Cuál es el número promedio de viajes/ciclos que realizan sus principales activos logísticos (ej. pallets, contenedores de plástico, cajas reutilizables) antes de ser desechados o sustituidos?",
    opciones: [
      "1 a 5 viajes: Uso de materiales principalmente desechables/de corta vida.",
      "6 a 15 viajes: Uso de algunos materiales reutilizables, pero sin un programa formal de mantenimiento/reparación.",
      "16 a 40 viajes: Contamos con un programa formal de inspección y reparación para maximizar la vida útil de los activos.",
      "Más de 40 viajes: Utilizamos materiales de muy alta resistencia y gestionamos activamente su ciclo de vida y reparación."
    ]
  },
  {
    id: "A6O",
    modulo: "A",
    categoria: "Monetización de Flujos de Residuos",
    pilar: "Valorización y Simbiósis",
    sectores: ["Logístico"], // También podría aplicar a Manufactura
    pregunta:
      "Valoración de Residuos de Almacén: ¿Qué destino final tienen los residuos masivos de embalaje (ej. film estirable, flejes de plástico, cartón)?",
    opciones: [
      "Residuo General: Se mezclan con otros residuos y se envía a disposición final (se paga por su recolección).",
      "Venta por Kg (Básico): Se compactan y se venden a valor de chatarra/material reciclable bajo.",
      "Venta Negociada: Se venden a un valor superior a recicladores que garantizan la trazabilidad del material.",
      "Reintroducción Directa: El material se devuelve a los proveedores o se utiliza en otro proceso (ej. reciclaje interno de film)."
    ]
  },
  /* ============================================================
  // ========== MÓDULO D — HUELLA DE CARBONO COMPLETA ===========
  // ========== (D1, D2, D3 incluidos) ============
  // ============================================================*/

  /* ------------------ D1. Emisiones Directas (Alcance 1) ------------------ */

  {
    id: "D1",
    modulo: "D1",
    categoria: "Combustión Fija",
    pilar: "Huella de Carbono (Alcance 1)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "Si utiliza Gas Natural, Gas LP o Diésel para procesos, ¿cuál fue el consumo anual total? (ingresar en m3)",
    opciones: ["Ingresar m3"] // Ajuste la etiqueta para ser más específica
  },
  {
    id: "D2",
    modulo: "D1",
    categoria: "Combustión Móvil",
    pilar: "Huella de Carbono (Alcance 1)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál es el consumo anual total de combustible de su flota propia? (Ingresar L ya sea gasolina o diésel)",
    opciones: ["Ingresar litros"]
  },
  {
    id: "D3",
    modulo: "D1",
    categoria: "Refrigerantes",
    pilar: "Huella de Carbono (Alcance 1)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuáles son los refrigerantes utilizados y cuál fue la carga perdida por fugas el último año? (kg)",
    opciones: ["Ingresar kg"]
  },


  /* ------------------ D2. Electricidad Comprada (Alcance 2) ------------------ */

  {
    id: "D4",
    modulo: "D2",
    categoria: "Electricidad",
    pilar: "Huella de Carbono (Alcance 2)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál fue su consumo total de electricidad (kWh) el último año?",
    opciones: ["Ingresar kWh"]
  },
  {
    id: "D5",
    modulo: "D2",
    categoria: "Origen Energético",
    pilar: "Huella de Carbono (Alcance 2)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Tienen energía renovable contratada o generación propia?",
    opciones: ["Sí", "No", "Parcialmente"] // D5 no se usa en el cálculo de CO2 total, solo es cualitativo
  },

  /* ------------------ D3. Otras Emisiones Indirectas (Alcance 3) ------------------ */

  {
    id: "D6",
    modulo: "D3",
    categoria: "Viajes de Negocios",
    pilar: "Huella de Carbono (Alcance 3)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Qué frecuencia de viajes por motivos laborales tiene la empresa?",
    opciones: ["Baja", "Media", "Alta"]
  },
  {
    id: "D7",
    modulo: "D3",
    categoria: "Residuos a Vertedero",
    pilar: "Huella de Carbono (Alcance 3)",
    tipo: "comun",
    sectores: ["General"],
    pregunta: "¿Cuál es el volumen anual de residuos enviados a vertedero? (ton)",
    opciones: ["Ingresar toneladas"]
  }
];

export default diagnosticQuestions;