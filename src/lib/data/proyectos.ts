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
  /** Real photograph paths (public/images/portafolio/). Omit to keep placeholders. */
  imagen?: string;
  imagenAntes?: string;
  imagenDespues?: string;
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
    imagen: "/images/portafolio/mantenimiento-electrico-exito.jpg",
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
    antesDespues: true,
    imagen: "/images/portafolio/d1-despues.jpg",
    imagenAntes: "/images/portafolio/d1-antes.jpg",
    imagenDespues: "/images/portafolio/d1-despues.jpg",
  },
  {
    slug: "renovacion-fachada-exito-valledupar",
    titulo: "Renovación de fachada — Éxito Vecino",
    servicioSlug: "obras-civiles",
    segmento: "b2b",
    clienteNombre: "Grupo Éxito",
    clienteAutorizado: true,
    ubicacion: "Valledupar, Cesar",
    anio: 2025,
    duracion: "Aprox. 6 semanas",
    descripcion:
      "Renovación integral de fachada de tienda Éxito Vecino, incluyendo estructura, paneles y señalización corporativa.",
    alcance: "Montaje de andamios, instalación de paneles de fachada y señalización.",
    resultados: "Fachada renovada y tienda entregada operativa.",
    estado: "ejecutado",
    destacado: true,
    antesDespues: true,
    imagen: "/images/portafolio/exito-valledupar-despues.jpg",
    imagenAntes: "/images/portafolio/exito-valledupar-antes.jpg",
    imagenDespues: "/images/portafolio/exito-valledupar-despues.jpg",
  },
  {
    slug: "demolicion-preparacion-pisos",
    titulo: "Demolición y preparación de superficies",
    servicioSlug: "remodelaciones",
    segmento: "b2c",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2025,
    descripcion:
      "Demolición y preparación de piso como parte de trabajos de remodelación y adecuación de espacios.",
    alcance: "Retiro de enchape existente y preparación de la superficie para el nuevo acabado.",
    resultados: "Superficie lista para la instalación del nuevo piso.",
    estado: "ejecutado",
    destacado: true,
    antesDespues: false,
    imagen: "/images/portafolio/demolicion-pisos.jpg",
  },
  {
    slug: "instalaciones-electricas-residenciales",
    titulo: "Instalaciones eléctricas residenciales",
    servicioSlug: "electricidad-mantenimiento",
    segmento: "b2c",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2025,
    descripcion: "Instalación y conexión de tablero eléctrico como parte de trabajos de remodelación.",
    alcance: "Instalación de tablero de distribución y conexión de circuitos.",
    resultados: "Instalación eléctrica funcional y conforme a norma.",
    estado: "ejecutado",
    destacado: true,
    antesDespues: false,
    imagen: "/images/portafolio/instalacion-electrica-residencial.jpg",
  },
  {
    slug: "senalizacion-carulla-freshmarket",
    titulo: "Instalación de señalización comercial",
    servicioSlug: "obras-civiles",
    segmento: "b2b",
    clienteNombre: "Carulla",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2025,
    descripcion: "Instalación y mantenimiento de señalización iluminada en punto de venta.",
    alcance: "Montaje con plataforma elevadora, instalación y ajuste de aviso luminoso.",
    resultados: "Señalización instalada y operativa.",
    estado: "ejecutado",
    destacado: false,
    antesDespues: false,
    imagen: "/images/portafolio/carulla-freshmarket.jpg",
  },
  {
    slug: "mantenimiento-industrial-cerrejon",
    titulo: "Mantenimiento industrial y obras civiles",
    servicioSlug: "automatizacion-industrial",
    segmento: "b2b",
    clienteAutorizado: false,
    ubicacion: "Región Caribe",
    anio: 2020,
    descripcion: "Inspección y mantenimiento de infraestructura eléctrica en subestación de alta tensión.",
    alcance: "Mantenimiento de infraestructura eléctrica e intervenciones de obra civil asociadas.",
    resultados: "Cumplimiento de los requerimientos técnicos y de seguridad del contratante.",
    estado: "referencia_contractual",
    destacado: false,
    antesDespues: false,
    imagen: "/images/portafolio/mantenimiento-subestacion.jpg",
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
    imagen: "/images/portafolio/cableado-estructurado.jpg",
  },
  {
    slug: "adecuacion-punto-venta-carulla",
    titulo: "Renovación de fachada — Carulla",
    servicioSlug: "obras-civiles",
    segmento: "b2b",
    clienteNombre: "Carulla",
    clienteAutorizado: false,
    ubicacion: "Barranquilla, Atlántico",
    anio: 2025,
    descripcion: "Renovación de fachada en punto de venta de la cadena.",
    alcance: "Montaje de andamios, pintura e intervención de fachada para la adecuación del local.",
    resultados: "Avance de obra conforme al cronograma acordado con el cliente.",
    estado: "ejecutado",
    destacado: false,
    antesDespues: true,
    imagen: "/images/portafolio/carulla-despues.jpg",
    imagenAntes: "/images/portafolio/carulla.jpg",
    imagenDespues: "/images/portafolio/carulla-despues.jpg",
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
