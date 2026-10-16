export interface Certificacion {
  nombre: string;
  entidadEmisora: string;
  descripcion: string;
  fecha: string;
}

export const certificaciones: Certificacion[] = [
  {
    nombre: "OHSAS 18001:2007",
    entidadEmisora: "Consejo Colombiano de Seguridad",
    descripcion:
      "Sistema de gestión de seguridad y salud ocupacional, obtenido en 2011.",
    fecha: "2011",
  },
  {
    nombre: "RUC — Registro Uniforme de Contratistas",
    entidadEmisora: "Consejo Colombiano de Seguridad",
    descripcion:
      "Programa de Seguridad Industrial y Salud Ocupacional para contratistas, implementado desde 2010.",
    fecha: "2010",
  },
  {
    nombre: "RUP — Registro Único de Proponentes",
    entidadEmisora: "Cámara de Comercio",
    descripcion: "Registro vigente para participación en procesos de contratación pública.",
    fecha: "Vigente",
  },
];

export const blogCategorias = [
  { slug: "proyectos-casos-exito", nombre: "Proyectos y casos de éxito" },
  { slug: "remodelacion-construccion-hogar", nombre: "Remodelación, construcción y hogar" },
  { slug: "mantenimiento-instalaciones-electricas", nombre: "Mantenimiento e instalaciones eléctricas" },
  { slug: "ingenieria-tecnologia-innovacion", nombre: "Ingeniería, tecnología e innovación" },
  { slug: "noticias-tendencias-sector", nombre: "Noticias y tendencias del sector" },
  { slug: "actualidad-ingecar", nombre: "Actualidad de INGECAR" },
];
