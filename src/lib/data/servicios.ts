export type Segmento = "b2b" | "b2c" | "ambos";

export interface Servicio {
  slug: string;
  nombre: string;
  segmento: Segmento;
  resumen: string;
  descripcion: string;
  proceso: string[];
  faqs: { pregunta: string; respuesta: string }[];
  /** Real photograph path (public/images/servicios/). */
  imagen: string;
}

export const servicios: Servicio[] = [
  {
    slug: "electricidad-mantenimiento",
    imagen: "/images/servicios/electricidad-mantenimiento.jpg",
    nombre: "Electricidad y mantenimiento",
    segmento: "ambos",
    resumen:
      "Instalaciones eléctricas, mantenimiento preventivo y correctivo para empresas y hogares.",
    descripcion:
      "Diseñamos, instalamos y mantenemos redes eléctricas de baja y media tensión, tableros de distribución e instalaciones residenciales. Trabajamos bajo contratos recurrentes de mantenimiento para locales comerciales, plantas industriales y conjuntos residenciales, y también atendemos solicitudes puntuales en casas y apartamentos.",
    proceso: [
      "Diagnóstico inicial e inspección de la instalación",
      "Cotización con alcance y materiales detallados",
      "Ejecución de los trabajos con personal certificado",
      "Pruebas de funcionamiento y entrega con garantía",
    ],
    faqs: [
      {
        pregunta: "¿Atienden mantenimiento eléctrico recurrente para empresas?",
        respuesta:
          "Sí, manejamos contratos de mantenimiento preventivo programado y correctivo de emergencia para locales comerciales e industriales.",
      },
      {
        pregunta: "¿Hacen instalaciones eléctricas completas en remodelaciones?",
        respuesta:
          "Sí, diseñamos y ejecutamos instalaciones eléctricas nuevas como parte de proyectos de remodelación o construcción residencial.",
      },
    ],
  },
  {
    slug: "automatizacion-industrial",
    imagen: "/images/servicios/automatizacion-industrial.jpg",
    nombre: "Automatización industrial",
    segmento: "b2b",
    resumen:
      "Soluciones técnicas para plantas, infraestructura energética y procesos industriales.",
    descripcion:
      "Implementamos sistemas de automatización y control para procesos industriales, incluyendo integración de PLCs, tableros de control y supervisión de procesos. Trabajamos con organizaciones industriales y energéticas que requieren confiabilidad operativa y cumplimiento técnico.",
    proceso: [
      "Levantamiento técnico del proceso a automatizar",
      "Diseño de la solución y selección de componentes",
      "Instalación, programación y puesta en marcha",
      "Acompañamiento y mantenimiento post-implementación",
    ],
    faqs: [
      {
        pregunta: "¿Qué tipo de industrias atienden?",
        respuesta:
          "Trabajamos con organizaciones comerciales, industriales y del sector energético que requieren automatización de procesos y control técnico.",
      },
    ],
  },
  {
    slug: "obras-civiles",
    imagen: "/images/servicios/obras-civiles.jpg",
    nombre: "Arquitectura y obras civiles",
    segmento: "ambos",
    resumen: "Construcción, infraestructura y obra civil para proyectos empresariales y residenciales.",
    descripcion:
      "Ejecutamos proyectos de obra civil desde infraestructura institucional hasta adecuaciones locativas, con más de tres décadas de experiencia documentada en vivienda de interés social, infraestructura pública y obras para el sector privado.",
    proceso: [
      "Estudio del proyecto y planos",
      "Presupuesto y cronograma de obra",
      "Ejecución con supervisión técnica constante",
      "Entrega y acta de finalización",
    ],
    faqs: [
      {
        pregunta: "¿Participan en licitaciones públicas de obra civil?",
        respuesta:
          "Sí, contamos con certificaciones y referencias contractuales documentadas que respaldan nuestra participación en procesos de contratación estatal.",
      },
    ],
  },
  {
    slug: "remodelaciones",
    imagen: "/images/servicios/remodelaciones.jpg",
    nombre: "Remodelaciones y construcción residencial",
    segmento: "b2c",
    resumen: "Transformación de casas y apartamentos con acabados modernos y acompañamiento integral.",
    descripcion:
      "Remodelamos cocinas, baños, fachadas y espacios completos de casas y apartamentos, acompañando al cliente desde la visita técnica hasta la entrega final. Nos enfocamos en acabados de calidad, cumplimiento de plazos y transparencia en el presupuesto.",
    proceso: [
      "Visita técnica y toma de medidas",
      "Propuesta de diseño y presupuesto",
      "Ejecución de la obra con avances fotográficos",
      "Entrega final y acompañamiento post-obra",
    ],
    faqs: [
      {
        pregunta: "¿Hacen remodelaciones completas o solo por espacios?",
        respuesta:
          "Ambas. Puedes remodelar un solo espacio, como cocina o baño, o confiarnos la renovación completa de tu casa o apartamento.",
      },
      {
        pregunta: "¿Puedo ver el antes y después de proyectos anteriores?",
        respuesta:
          "Sí, en nuestro portafolio encuentras galerías de antes y después de remodelaciones ejecutadas.",
      },
    ],
  },
  {
    slug: "telecomunicaciones",
    imagen: "/images/servicios/telecomunicaciones.jpg",
    nombre: "Telecomunicaciones",
    segmento: "b2b",
    resumen: "Infraestructura de telecomunicaciones para empresas y proyectos de infraestructura.",
    descripcion:
      "Diseñamos e implementamos infraestructura de telecomunicaciones para empresas, incluyendo cableado estructurado, redes de datos y soluciones de conectividad para operaciones comerciales e industriales.",
    proceso: [
      "Diagnóstico de necesidades de conectividad",
      "Diseño de la infraestructura requerida",
      "Instalación y certificación de la red",
      "Pruebas finales y entrega documentada",
    ],
    faqs: [
      {
        pregunta: "¿Trabajan con cableado estructurado certificado?",
        respuesta:
          "Sí, instalamos y certificamos cableado estructurado conforme a los estándares aplicables para infraestructura empresarial.",
      },
    ],
  },
  {
    slug: "proteccion-ambiental",
    imagen: "/images/servicios/proteccion-ambiental.jpg",
    nombre: "Protección y tecnología ambiental",
    segmento: "b2b",
    resumen: "Soluciones técnicas de protección ambiental para operaciones industriales.",
    descripcion:
      "Brindamos soluciones de protección y tecnología ambiental orientadas a organizaciones que requieren cumplir con criterios técnicos y regulatorios en sus operaciones, con enfoque en seguridad y sostenibilidad.",
    proceso: [
      "Evaluación técnica de la operación",
      "Propuesta de solución ambiental",
      "Implementación y verificación",
      "Seguimiento y documentación de cumplimiento",
    ],
    faqs: [],
  },
  {
    slug: "pozos-aguas-subterraneas",
    imagen: "/images/servicios/pozos-aguas-subterraneas.jpg",
    nombre: "Pozos de aguas subterráneas",
    segmento: "ambos",
    resumen: "Perforación y mantenimiento de pozos de agua para proyectos de infraestructura.",
    descripcion:
      "Ejecutamos proyectos de perforación y mantenimiento de pozos de aguas subterráneas, con experiencia documentada en acueductos e infraestructura hídrica para comunidades y organizaciones desde nuestros primeros años de operación.",
    proceso: [
      "Estudio técnico del terreno",
      "Perforación y construcción del pozo",
      "Pruebas de caudal y calidad",
      "Entrega y mantenimiento posterior",
    ],
    faqs: [],
  },
  {
    slug: "estructuras-metalicas",
    imagen: "/images/servicios/estructuras-metalicas.jpg",
    nombre: "Estructuras metálicas",
    segmento: "b2b",
    resumen: "Diseño, fabricación y montaje de estructuras metálicas industriales.",
    descripcion:
      "Diseñamos, fabricamos y montamos estructuras metálicas para proyectos industriales y de infraestructura, con control de calidad en cada etapa del proceso.",
    proceso: [
      "Diseño estructural y planos de fabricación",
      "Fabricación en taller",
      "Montaje en sitio",
      "Inspección final y entrega",
    ],
    faqs: [],
  },
];

export function getServicioBySlug(slug: string) {
  return servicios.find((s) => s.slug === slug);
}
