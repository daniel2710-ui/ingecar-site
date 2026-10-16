export interface BlogPost {
  slug: string;
  titulo: string;
  categoriaSlug: string;
  resumen: string;
  contenido: string[];
  fecha: string;
  tiempoLectura: string;
  destacado: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "remodelacion-cocina-apartamento-norte-barranquilla",
    titulo: "Cómo transformamos una cocina en el norte de Barranquilla",
    categoriaSlug: "proyectos-casos-exito",
    resumen:
      "Un recorrido por el proceso completo de remodelación: visita técnica, presupuesto y entrega en tres semanas.",
    contenido: [
      "Toda remodelación empieza con una visita técnica. En este proyecto, la cocina tenía instalaciones eléctricas e hidráulicas desactualizadas y poco aprovechamiento del espacio.",
      "Después de la toma de medidas, presentamos una propuesta de diseño con presupuesto detallado por partidas: demolición, instalaciones, mobiliario y acabados.",
      "La obra tomó tres semanas, con avances fotográficos compartidos con el cliente cada semana. El resultado: un espacio funcional, moderno y con acabados de calidad.",
    ],
    fecha: "2026-09-02",
    tiempoLectura: "4 min",
    destacado: true,
  },
  {
    slug: "5-senales-mantenimiento-electrico-preventivo",
    titulo: "5 señales de que tu instalación eléctrica necesita mantenimiento",
    categoriaSlug: "mantenimiento-instalaciones-electricas",
    resumen:
      "Identificar estas señales a tiempo evita fallas costosas y riesgos de seguridad en casa o en tu negocio.",
    contenido: [
      "Un breaker que se activa con frecuencia, enchufes calientes al tacto o luces que parpadean sin razón aparente son señales de alerta comunes.",
      "El mantenimiento preventivo revisa tableros, circuitos y conexiones antes de que una falla menor se convierta en un problema mayor.",
      "Si notas alguna de estas señales en tu hogar o negocio, una inspección técnica a tiempo puede ahorrarte reparaciones más costosas.",
    ],
    fecha: "2026-08-14",
    tiempoLectura: "3 min",
    destacado: true,
  },
  {
    slug: "que-considerar-antes-de-remodelar-tu-apartamento",
    titulo: "Qué considerar antes de remodelar tu apartamento",
    categoriaSlug: "remodelacion-construccion-hogar",
    resumen: "Presupuesto, tiempos y selección de materiales: las decisiones clave antes de empezar.",
    contenido: [
      "Definir un presupuesto realista desde el inicio evita sorpresas a mitad de obra. Es importante dejar un margen para imprevistos.",
      "El tiempo de ejecución varía según el alcance: un baño puede tomar dos semanas, una cocina completa hasta un mes.",
      "La selección de materiales impacta tanto el presupuesto como la durabilidad del resultado. Un buen asesor te ayuda a encontrar el equilibrio correcto.",
    ],
    fecha: "2026-07-20",
    tiempoLectura: "5 min",
    destacado: false,
  },
  {
    slug: "automatizacion-industrial-tendencias-2026",
    titulo: "Automatización industrial: tendencias que ya llegaron a Colombia",
    categoriaSlug: "ingenieria-tecnologia-innovacion",
    resumen: "Cómo la automatización está cambiando el mantenimiento industrial en la región Caribe.",
    contenido: [
      "Las plantas industriales en la región Caribe están adoptando sistemas de control y monitoreo que antes solo se veían en operaciones de mayor escala.",
      "La integración de sensores y control automatizado reduce tiempos de parada y mejora la trazabilidad de los procesos.",
      "Para las empresas, esto significa menos costos de mantenimiento reactivo y más capacidad de planeación.",
    ],
    fecha: "2026-06-30",
    tiempoLectura: "4 min",
    destacado: false,
  },
  {
    slug: "normativa-construccion-colombia-2026",
    titulo: "Lo que cambia en la normativa de construcción en Colombia este año",
    categoriaSlug: "noticias-tendencias-sector",
    resumen: "Un resumen de las actualizaciones normativas relevantes para proyectos de construcción.",
    contenido: [
      "El sector construcción sigue ajustándose a nuevos requerimientos técnicos y de sostenibilidad.",
      "Conocer estos cambios es clave tanto para contratistas como para propietarios que planean una obra nueva o una remodelación.",
    ],
    fecha: "2026-05-18",
    tiempoLectura: "3 min",
    destacado: false,
  },
  {
    slug: "ingecar-amplia-portafolio-remodelaciones",
    titulo: "INGECAR amplía su portafolio hacia remodelaciones residenciales",
    categoriaSlug: "actualidad-ingecar",
    resumen:
      "Después de más de 30 años en el sector empresarial, fortalecemos nuestra atención a hogares.",
    contenido: [
      "Con más de tres décadas de trayectoria atendiendo organizaciones públicas y privadas, en INGECAR decidimos fortalecer nuestra atención al segmento residencial.",
      "Hoy ofrecemos remodelación integral de casas y apartamentos con el mismo estándar de calidad y cumplimiento que nos ha caracterizado en proyectos empresariales.",
    ],
    fecha: "2026-04-10",
    tiempoLectura: "3 min",
    destacado: false,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategoria(categoriaSlug: string) {
  return blogPosts.filter((p) => p.categoriaSlug === categoriaSlug);
}

export function getPostsDestacados() {
  return blogPosts.filter((p) => p.destacado);
}
