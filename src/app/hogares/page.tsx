import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { BeforeAfter } from "@/components/site/before-after";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { RevealGroup } from "@/components/site/reveal-group";
import { servicios } from "@/lib/data/servicios";
import { proyectos } from "@/lib/data/proyectos";
import { testimonios } from "@/lib/data/testimonios";
import { faqsHogares } from "@/lib/data/faqs-segmento";
import { whatsappLink } from "@/lib/site-config";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Remodelaciones y construcción residencial",
  description:
    "Transforma tu casa o apartamento con INGECAR: remodelaciones, cocinas, baños, acabados e instalaciones eléctricas residenciales.",
};

export default function HogaresPage() {
  const serviciosB2C = servicios.filter((s) => s.segmento === "b2c" || s.segmento === "ambos");
  const proyectosB2C = proyectos.filter((p) => p.segmento === "b2c").slice(0, 3);
  const proyectosAntesDespues = proyectos.filter((p) => p.segmento === "b2c" && p.antesDespues);
  const testimoniosB2C = testimonios.filter((t) => t.autorTipo === "particular").slice(0, 2);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionLabel>Remodelaciones y construcción residencial</SectionLabel>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
              <TextReveal>Tu casa, transformada con acabados de calidad</TextReveal>
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
          <PlaceholderImage
            label="Remodelación residencial"
            src="/images/hogares-remodelacion-residencial.jpg"
            className="aspect-[4/3] w-full rounded-2xl lg:aspect-square"
          />
        </div>
      </section>

      {/* Antes/después — la pieza central del storytelling en remodelaciones (slider interactivo) */}
      {proyectosAntesDespues.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionLabel>Antes y después</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Arrastra para ver la transformación
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Desliza sobre cada proyecto para comparar el espacio original con el resultado entregado.
          </p>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2" itemClassName="flex h-full flex-col">
            {proyectosAntesDespues.map((p) => (
              <Link key={p.slug} href={`/portafolio/${p.slug}`} className="group flex flex-col gap-3">
                <BeforeAfter
                  label={p.titulo}
                  srcAntes={p.imagenAntes}
                  srcDespues={p.imagenDespues}
                  className="aspect-[4/3] w-full"
                />
                <div>
                  <p className="font-heading text-base font-bold text-foreground group-hover:text-primary">
                    {p.titulo}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {p.ubicacion} · {p.duracion ?? `${p.anio}`}
                  </p>
                </div>
              </Link>
            ))}
          </RevealGroup>
        </section>
      ) : null}

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Servicios para tu hogar</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Todo lo que tu casa necesita
          </h2>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
            {serviciosB2C.map((s) => (
              <ServiceCard key={s.slug} servicio={s} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {proyectosB2C.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionLabel>Portafolio residencial</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Más transformaciones recientes
          </h2>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3" itemClassName="flex h-full">
            {proyectosB2C.map((p, i) => (
              <ProjectCard key={p.slug} proyecto={p} tone={i} />
            ))}
          </RevealGroup>
        </section>
      ) : null}

      {testimoniosB2C.length > 0 ? (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Testimonios</SectionLabel>
            <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2" itemClassName="flex h-full">
              {testimoniosB2C.map((t, i) => (
                <TestimonialCard key={i} testimonio={t} />
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionLabel>Preguntas frecuentes</SectionLabel>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
          Resolvemos tus dudas
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqsHogares.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-[15px] font-medium">
                {faq.pregunta}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-surface-dark px-6 py-14 text-center">
          <h2 className="font-heading text-2xl font-bold text-surface-dark-foreground sm:text-3xl">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Cuéntanos qué quieres remodelar y coordinamos una visita técnica.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta-on-dark" size="lg" className="h-12 rounded-lg px-6 text-base">
              <Link href="/cotizar">Solicitar cotización</Link>
            </Button>
            <Button asChild variant="outline-on-dark" size="lg" className="h-12 rounded-lg px-6 text-base">
              <a href={whatsappLink("Hola, quiero remodelar mi casa/apartamento.")} target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
