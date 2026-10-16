import type { Segmento } from "./servicios";

export interface Proyecto {
  slug: string;
  titulo: string;
  servicioSlug: string;
  segmento: Segmento;
  clienteNombre?: string;
  clienteAutorizado: boolean;
  ubicacion: string;
  anio: number;
  duracion?: string;
  descripcion: string;
  alcance: string;
  resultados: string;
  estado: "ejecutado" | "certificado" | "referencia_contractual";
  destacado: boolean;
  antesDespues: boolean;
}

export const proyectos: Proyecto[] = [
  {
    slug: "mantenimiento-electrico-retail-barranquilla",
    titulo: "Mantenimiento eléctrico para cadena de retail",
    servicioSlug: "electricidad-mantenimiento",
    segmento: "b2b",
    clienteNombre: "Grupo Éxito",
    clienteAutorizado: true,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2024,
    duracion: "Contrato recurrente",
    descripcion:
      "Mantenimiento preventivo y correctivo de instalaciones eléctricas para puntos de venta de la cadena.",
    alcance:
      "Revisión periódica de tableros, iluminación, circuitos y sistemas de respaldo en múltiples puntos de venta.",
    resultados: "Reducción de incidentes eléctricos y continuidad operativa en los locales atendidos.",
    estado: "referencia_contractual",
    destacado: true,
    antesDespues: false,
  },
  {
    slug: "adecuacion-locativa-d1",
    titulo: "Adecuación locativa de punto de venta",
    servicioSlug: "obras-civiles",
    segmento: "b2b",
    clienteNombre: "D1",
    clienteAutorizado: true,
    ubicacion: "Región Caribe",
    anio: 2023,
    descripcion: "Adecuación de obra civil e instalaciones para apertura de nuevo punto de venta.",
    alcance: "Obra civil, instalaciones eléctricas y acabados locativos.",
    resultados: "Entrega del local dentro del cronograma comercial establecido.",
    estado: "referencia_contractual",
    destacado: true,
    antesDespues: false,
  },
  {
    slug: "remodelacion-cocina-apartamento-norte",
    titulo: "Remodelación integral de cocina",
    servicioSlug: "remodelaciones",
    segmento: "b2c",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2025,
    duracion: "3 semanas",
    descripcion: "Remodelación completa de cocina en apartamento, incluyendo acabados e instalaciones.",
    alcance: "Demolición, instalación eléctrica e hidráulica, mobiliario y acabados finales.",
    resultados: "Transformación completa del espacio con acabados modernos y funcionales.",
    estado: "ejecutado",
    destacado: true,
    antesDespues: true,
  },
  {
    slug: "remodelacion-bano-casa-prado",
    titulo: "Remodelación de baño principal",
    servicioSlug: "remodelaciones",
    segmento: "b2c",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2025,
    duracion: "2 semanas",
    descripcion: "Renovación de baño principal con enchape, grifería y mueble de baño nuevos.",
    alcance: "Demolición parcial, instalaciones hidráulicas, enchape y acabados.",
    resultados: "Espacio renovado con acabados modernos entregado en el plazo acordado.",
    estado: "ejecutado",
    destacado: false,
    antesDespues: true,
  },
  {
    slug: "vivienda-interes-social-fundacion",
    titulo: "60 viviendas de interés social",
    servicioSlug: "obras-civiles",
    segmento: "b2c",
    clienteAutorizado: false,
    ubicacion: "Fundación, Magdalena",
    anio: 2001,
    descripcion: "Diseño y construcción de 60 viviendas de interés social.",
    alcance: "Diseño arquitectónico y ejecución de obra civil completa para el proyecto habitacional.",
    resultados: "Entrega de 60 unidades de vivienda a la comunidad de Fundación.",
    estado: "referencia_contractual",
    destacado: false,
    antesDespues: false,
  },
  {
    slug: "mantenimiento-industrial-cerrejon",
    titulo: "Mantenimiento industrial y obras civiles",
    servicioSlug: "automatizacion-industrial",
    segmento: "b2b",
    clienteAutorizado: false,
    ubicacion: "La Guajira",
    anio: 2010,
    descripcion: "Proyectos de infraestructura eléctrica y mantenimiento industrial para el sector energético.",
    alcance: "Mantenimiento de infraestructura eléctrica e intervenciones de obra civil asociadas.",
    resultados: "Cumplimiento de los requerimientos técnicos y de seguridad del contratante.",
    estado: "referencia_contractual",
    destacado: false,
    antesDespues: false,
  },
  {
    slug: "cableado-estructurado-oficinas",
    titulo: "Cableado estructurado para oficinas corporativas",
    servicioSlug: "telecomunicaciones",
    segmento: "b2b",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2024,
    descripcion: "Instalación y certificación de cableado estructurado para nuevas oficinas administrativas.",
    alcance: "Diseño de red, instalación de cableado y certificación de puntos de red.",
    resultados: "Red de datos certificada y operativa para el cliente.",
    estado: "ejecutado",
    destacado: false,
    antesDespues: false,
  },
];

export function getProyectoBySlug(slug: string) {
  return proyectos.find((p) => p.slug === slug);
}

export function getProyectosByServicio(servicioSlug: string) {
  return proyectos.filter((p) => p.servicioSlug === servicioSlug);
}

export function getProyectosDestacados() {
  return proyectos.filter((p) => p.destacado);
}
