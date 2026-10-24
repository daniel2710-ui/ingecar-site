import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { CinematicReveal } from "@/components/site/cinematic-reveal";
import type { Proyecto } from "@/lib/data/proyectos";

const estadoLabel: Record<Proyecto["estado"], string> = {
  ejecutado: "Proyecto ejecutado",
  certificado: "Trabajo certificado",
  referencia_contractual: "Referencia contractual",
};

export function ProjectCard({
  proyecto,
  tone = 0,
  cinematic = false,
}: {
  proyecto: Proyecto;
  tone?: number;
  /** Scroll-scrubbed image reveal — reserved for the homepage's featured
   * portfolio section. Leave false everywhere else (index, related-projects,
   * B2B/B2C landings) so it stays one deliberate moment, not a tic. */
  cinematic?: boolean;
}) {
  const image = (
    <PlaceholderImage label={proyecto.titulo} src={proyecto.imagen} tone={tone} className="size-full" />
  );

  return (
    <Link
      href={`/portafolio/${proyecto.slug}`}
      className="card-interactive group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-primary/40"
    >
      {cinematic ? (
        <CinematicReveal className="aspect-[4/3] w-full">{image}</CinematicReveal>
      ) : (
        <PlaceholderImage
          label={proyecto.titulo}
          src={proyecto.imagen}
          tone={tone}
          className="aspect-[4/3] w-full"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="outline" className="w-fit text-[11px] font-medium">
          {proyecto.segmento === "b2b" ? "Empresas" : proyecto.segmento === "b2c" ? "Hogares" : "Empresas y hogares"}
        </Badge>
        <h3 className="mt-3 font-heading text-base font-bold text-foreground">
          {proyecto.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{proyecto.descripcion}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
          <div>
            <p className="font-data text-[10px] uppercase tracking-wide text-muted-foreground">Ubicación</p>
            <p className="mt-0.5 truncate text-xs font-medium text-foreground">{proyecto.ubicacion}</p>
          </div>
          <div>
            <p className="font-data text-[10px] uppercase tracking-wide text-muted-foreground">Año</p>
            <p className="mt-0.5 font-data text-xs font-medium text-foreground">{proyecto.anio}</p>
          </div>
        </div>
        <span className="mt-3 text-[11px] font-medium uppercase tracking-wide text-primary/70">
          {estadoLabel[proyecto.estado]}
        </span>
      </div>
    </Link>
  );
}
