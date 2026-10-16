export interface Testimonio {
  autorNombre?: string;
  autorTipo: "empresa" | "particular";
  contenido: string;
  calificacion?: number;
  servicioSlug?: string;
  destacadoHome: boolean;
}

export const testimonios: Testimonio[] = [
  {
    autorTipo: "empresa",
    contenido:
      "El equipo de INGECAR responde con rapidez cada vez que surge una necesidad de mantenimiento en nuestros puntos de venta. Cumplimiento y comunicación clara en cada contrato.",
    calificacion: 5,
    servicioSlug: "electricidad-mantenimiento",
    destacadoHome: true,
  },
  {
    autorNombre: "Cliente residencial, Barranquilla",
    autorTipo: "particular",
    contenido:
      "Remodelaron nuestra cocina en el tiempo acordado y el resultado superó lo que esperábamos. Muy atentos durante todo el proceso.",
    calificacion: 5,
    servicioSlug: "remodelaciones",
    destacadoHome: true,
  },
  {
    autorNombre: "Cliente residencial, Barranquilla",
    autorTipo: "particular",
    contenido:
      "Buena comunicación desde la visita técnica hasta la entrega. El baño quedó exactamente como lo planeamos.",
    calificacion: 5,
    servicioSlug: "remodelaciones",
    destacadoHome: false,
  },
  {
    autorTipo: "empresa",
    contenido:
      "Llevamos varios años trabajando con INGECAR en proyectos de adecuación locativa. Cumplen los cronogramas comerciales que necesitamos.",
    calificacion: 5,
    servicioSlug: "obras-civiles",
    destacadoHome: true,
  },
];

export function getTestimoniosByServicio(servicioSlug: string) {
  return testimonios.filter((t) => t.servicioSlug === servicioSlug);
}

export function getTestimoniosDestacados() {
  return testimonios.filter((t) => t.destacadoHome);
}
