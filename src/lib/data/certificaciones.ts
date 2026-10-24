export interface Certificacion {
  nombre: string;
  entidadEmisora: string;
  descripcion: string;
  fecha: string;
}

export const certificaciones: Certificacion[] = [
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
