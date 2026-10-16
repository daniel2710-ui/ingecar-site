import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { servicios } from "@/lib/data/servicios";
import { proyectos } from "@/lib/data/proyectos";
import { testimonios } from "@/lib/data/testimonios";
import { whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Remodelaciones y construcción residencial",
  description:
    "Transforma tu casa o apartamento con INGECAR: remodelaciones, cocinas, baños, acabados e instalaciones eléctricas residenciales.",
};

export default function HogaresPage() {
  const serviciosB2C = servicios.filter((s) => s.segmento === "b2c" || s.segmento === "ambos");
  const proyectosB2C = proyectos.filter((p) => p.segmento === "b2c").slice(0, 3);
  const testimoniosB2C = testimonios.filter((t) => t.autorTipo === "particular").slice(0, 2);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionLabel>Remodelaciones y construcción residencial</SectionLabel>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
              Tu casa, transformada con acabados de calidad
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Remodelamos cocinas, baños y espacios completos de tu casa o apartamento, con
              acompañamiento desde la visita técnica hasta la entrega final.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" size="lg" className="h-12 rounded-lg px-6 text-base">
                <Link href="/cotizar">Solicitar cotización</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-lg px-6 text-base">
                <a href={whatsappLink("Hola, quiero remodelar mi casa/apartamento.")} target="_blank" rel="noopener noreferrer">
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <PlaceholderImage label="Remodelación residencial" className="aspect-[4/3] w-full rounded-2xl lg:aspect-square" />
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Servicios para tu hogar</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Todo lo que tu casa necesita
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviciosB2C.map((s) => (
              <ServiceCard key={s.slug} servicio={s} />
            ))}
          </div>
        </div>
      </section>

      {proyectosB2C.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionLabel>Antes y después</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Transformaciones recientes
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {proyectosB2C.map((p, i) => (
              <ProjectCard key={p.slug} proyecto={p} tone={i} />
            ))}
          </div>
        </section>
      ) : null}

      {testimoniosB2C.length > 0 ? (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Testimonios</SectionLabel>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {testimoniosB2C.map((t, i) => (
                <TestimonialCard key={i} testimonio={t} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-14 text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            ¿Listo para transformar tu espacio?
          </h2>
          <Button asChild variant="cta" size="lg" className="h-12 rounded-lg px-6 text-base">
            <Link href="/cotizar">Solicitar cotización</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
