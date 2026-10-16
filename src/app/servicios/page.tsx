import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/section-label";
import { ServiceCard } from "@/components/site/service-card";
import { RevealGroup } from "@/components/site/reveal-group";
import { servicios } from "@/lib/data/servicios";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conoce las 8 líneas de servicio de INGECAR: electricidad, obras civiles, remodelaciones, automatización industrial, telecomunicaciones y más.",
};

export default function ServiciosPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionLabel>Servicios</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
        <TextReveal>Soluciones integrales de ingeniería</TextReveal>
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Ocho líneas de servicio para atender proyectos empresariales y residenciales en toda
        Colombia, respaldadas por más de tres décadas de experiencia.
      </p>
      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
        {servicios.map((s) => (
          <ServiceCard key={s.slug} servicio={s} />
        ))}
      </RevealGroup>
    </section>
  );
}
