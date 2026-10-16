import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { getProyectoBySlug, proyectos } from "@/lib/data/proyectos";
import { getServicioBySlug } from "@/lib/data/servicios";
import { whatsappLink } from "@/lib/site-config";

const estadoLabel = {
  ejecutado: "Proyecto ejecutado",
  certificado: "Trabajo certificado",
  referencia_contractual: "Referencia contractual",
} as const;

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = getProyectoBySlug(slug);
  if (!proyecto) return {};
  return { title: proyecto.titulo, description: proyecto.descripcion };
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = getProyectoBySlug(slug);
  if (!proyecto) notFound();
  const servicio = getServicioBySlug(proyecto.servicioSlug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/portafolio" className="text-sm font-medium text-primary">
        ← Volver al portafolio
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          {proyecto.segmento === "b2b" ? "Empresas" : proyecto.segmento === "b2c" ? "Hogares" : "Empresas y hogares"}
        </Badge>
        <Badge className="bg-primary/10 text-primary">{estadoLabel[proyecto.estado]}</Badge>
      </div>

      <h1 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
        {proyecto.titulo}
      </h1>

      <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4" /> {proyecto.ubicacion}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="size-4" /> {proyecto.anio}
        </span>
        {proyecto.duracion ? (
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> {proyecto.duracion}
          </span>
        ) : null}
      </div>

      {proyecto.clienteAutorizado && proyecto.clienteNombre ? (
        <p className="mt-3 text-sm font-medium text-foreground">
          Cliente: {proyecto.clienteNombre}
        </p>
      ) : null}

      <PlaceholderImage
        label={proyecto.antesDespues ? `${proyecto.titulo} — antes y después` : proyecto.titulo}
        className="mt-8 aspect-video w-full rounded-2xl"
      />

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <SectionLabel>Descripción</SectionLabel>
          <p className="mt-2 text-base leading-relaxed text-foreground/85">{proyecto.descripcion}</p>

          <SectionLabel className="mt-8">Alcance de los trabajos</SectionLabel>
          <p className="mt-2 text-base leading-relaxed text-foreground/85">{proyecto.alcance}</p>

          <SectionLabel className="mt-8">Resultados</SectionLabel>
          <p className="mt-2 text-base leading-relaxed text-foreground/85">{proyecto.resultados}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 h-fit">
          <p className="text-sm font-semibold text-foreground">¿Un proyecto similar en mente?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Cuéntanos qué necesitas y te enviamos una propuesta.
          </p>
          <Button asChild variant="cta" className="mt-4 w-full rounded-lg">
            <Link href={servicio ? `/servicios/${servicio.slug}` : "/cotizar"}>
              Solicitar un proyecto similar
            </Link>
          </Button>
          <a
            href={whatsappLink(`Hola, vi el proyecto "${proyecto.titulo}" y quiero algo similar.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-sm font-medium text-primary"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
