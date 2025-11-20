const faqs = [
  {
    id: 1,
    title: "¿Qué es economía circular y por qué es importante para mi empresa?",
    answer:
      "La economía circular es un modelo económico que busca eliminar residuos y el uso continuo de recursos. En Celaya, puede ayudar a las empresas a reducir costos hasta en un 30% mediante la reutilización de materiales y optimización de procesos. \n\nSegún la Fundación Ellen MacArthur (FEM), la autoridad global en la materia, su definición se centra en la acción y el resultado: 'La economía circular es un sistema en el que los materiales nunca se convierten en residuos y la naturaleza se regenera. En una economía circular, los productos y materiales se mantienen en circulación mediante procesos como el mantenimiento, la reutilización, el reacondicionamiento, la refabricación, el reciclaje y el compostaje. La economía circular aborda el cambio climático y otros retos mundiales, como la pérdida de biodiversidad, los residuos y la contaminación, desvinculando la actividad económica del consumo de recursos finitos.' (Fundación Ellen MacArthur, s.f.)"
  },
  {
    id: 2,
    title: "¿Cuánto puedo ahorrar implementando economía circular?",
    answer:
      "Según estudios en empresas de Guanajuato, las empresas pueden lograr ahorros del 15-40% en costos de materiales y 20-35% en gestión de residuos. Use nuestra calculadora para una estimación personalizada. \n\nSegún un estudio realizado sugiere que, si se implementara la economía circular de manera efectiva en México, se podrían ahorrar hasta 1.2 billones de pesos anuales. (Accenture Strategy & WEF, 2015)"
  },
  {
    id: 3,
    title: "¿Qué beneficios fiscales hay para empresas circulares en GTO?",
    answer:
      "El estado ofrece deducciones en impuestos predial y nómina, así como apoyos del INADEM. Las empresas pueden acceder a certificaciones que facilitan exportaciones. \n\nLos beneficios fiscales para empresas circulares en Guanajuato están autorizados bajo el Título Séptimo de la Ley de Economía Circular para el Estado de Guanajuato y sus Municipios (2021). La Ley establece que las empresas que implementen proyectos de Economía Circular son sujetos a incentivos fiscales (como posibles deducciones, exenciones o apoyos económicos), los cuales son especificados anualmente en la Ley de Ingresos y otras disposiciones hacendarias del Estado o de los municipios. (Congreso del Estado de Guanajuato, 2021)"
  },
  {
    id: 4,
    title: "¿Cómo inicio la transición a economía circular en mi empresa?",
    answer:
      "Recomendamos comenzar con un diagnóstico de sus procesos actuales. Nuestra plataforma le guía paso a paso identificando sus mayores oportunidades de mejora sin inversión inicial. \n\nLa transición se inicia con un diagnóstico y la identificación de oportunidades de valor a través de los cinco modelos de negocio circulares. La FEM ofrece un marco metodológico para este gap analysis (análisis de brechas). (Fundación Ellen MacArthur, s.f.)"
  },
  {
    id: 5,
    title: "¿Dónde encuentro proveedores de materiales reciclados en Celaya?",
    answer:
      "Contamos con un directorio de más de 50 proveedores locales verificados. Desde materiales de construcción hasta insumos industriales reciclados."
  },
  // Nuevas preguntas añadidas
  {
    id: 6,
    title: "¿Cuál es la diferencia fundamental entre el concepto de Economía Circular y la Sostenibilidad en el ámbito empresarial?",
    answer:
      "La Sostenibilidad es el objetivo general (el resultado deseado a largo plazo), mientras que la Economía Circular es un marco de acción o herramienta diseñado específicamente para alcanzar ese objetivo mediante la eliminación de residuos y la regeneración de sistemas. (Fundación Ellen MacArthur, s.f.)"
  },
  {
    id: 7,
    title: "Además de las “3R” (Reducir, Reutilizar, Reciclar), ¿cuáles son los principales modelos de negocio circulares que se utilizan para generar ingresos?",
    answer:
      "Son los cinco modelos de negocio circulares definidos por la FEM: \n\n1. Suministros Circulares \n2. Recuperación de Recursos \n3. Extensión de la Vida del Producto \n4. Plataformas de Compartición \n5. Producto como Servicio \n\n(Fundación Ellen MacArthur, s.f.) "
  },
  {
    id: 8,
    title: "¿Qué es la Simbiosis Industrial y cómo permite a las empresas convertir sus residuos en una nueva fuente de ingresos?",
    answer:
      "Es un modelo de negocio circular de Recuperación de Recursos donde los residuos de una empresa se convierten en un recurso o materia prima de valor para otra empresa. Transforma un costo de disposición en un ingreso. (Comisión Europea y Fundación Ellen MacArthur, s.f.)"
  },
  {
    id: 9,
    title: "¿Qué tipo de inversión se requiere para la adopción de la Economía Circular, y cómo se justifica el Retorno de la Inversión (ROI)?",
    answer:
      "La inversión se requiere en innovación (rediseño de productos), infraestructura de logística inversa, y nuevas tecnologías (ej. para remanufactura). El ROI se justifica por la reducción de costos operativos (menos compra de materia prima virgen, menos costos de disposición de residuos) y la generación de nuevos flujos de ingresos por nuevos modelos de negocio. (Accenture Strategy & World Economic Forum, WEF ,2015)"
  },
  {
    id: 10,
    title: "¿Qué significa el principio de “Regenerar los Sistemas Naturales” en el contexto de las operaciones empresariales?",
    answer:
      "Es el tercer principio fundamental de la Economía Circular. Significa que las empresas deben diseñar procesos que devuelvan materiales biológicos (nutrientes) a la naturaleza para mejorarla (Ej. compostaje de residuos orgánicos) y no solo conservarla. (Fundación Ellen MacArthur, s.f.)"
  },
  {
    id: 11,
    title: "¿Cómo se mide el progreso hacia la circularidad de una empresa más allá de un simple porcentaje de reciclaje?",
    answer:
      "Se mide usando métricas avanzadas como el Índice de Circularidad de Materiales (MCI) de la FEM, o la Tasa de Circularidad Nacional, que cuantifican la proporción de material secundario que se reintroduce a la economía frente al material virgen. (Circle Economy, s.f.)"
  },
  {
    id: 12,
    title: "¿Qué significa el concepto de “Adquisición Circular” y cómo puedo utilizar las compras de mi empresa para impulsar la circularidad en mi cadena de suministro?",
    answer:
      "Se refiere a la estrategia de comprar productos y servicios diseñados para la circularidad, priorizando materiales reciclados, renovables o modelos de arrendamiento (Producto como Servicio) en lugar de la propiedad lineal. (Fundación Ellen MacArthur, s.f.)"
  },
  {
    id: 13,
    title: "¿Qué es el “Financiamiento Verde” o “Financiamiento Circular” y cuáles son los instrumentos financieros específicos disponibles para proyectos de EC en México?",
    answer:
      "Es el capital destinado a proyectos con un impacto ambiental positivo. Los instrumentos disponibles en México se encuentran en la Banca de Desarrollo, como Nacional Financiera (NAFIN), que ofrece créditos o garantías para proyectos de eficiencia energética, reconversión tecnológica y gestión de residuos. (Nacional Financiera, NAFIN, s.f.)"
  },
  {
    id: 14,
    title: "¿Qué métricas de gestión cultural o de cambio de mentalidad se deben medir para asegurar una transición exitosa a un modelo de negocio circular?",
    answer:
      "Estas métricas son cualitativas e incluyen la Tasa de Adopción de Procesos Circulares (número de empleados que usan el nuevo proceso), el Índice de Conciencia Ambiental (medido con encuestas internas), y la Tasa de Generación de Ideas Circulares (innovación interna). (Corredor, K. T. ,2024)"
  }
];

export default faqs;