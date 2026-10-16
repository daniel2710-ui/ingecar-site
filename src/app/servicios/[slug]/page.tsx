import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionLabel } from "@/components/site/section-label";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { RevealGroup } from "@/components/site/reveal-group";
import { QuoteForm } from "@/components/site/quote-form";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { serviceIcons } from "@/lib/service-icons";
import { getServicioBySlug, servicios } from "@/lib/data/servicios";
import { getProyectosByServicio } from "@/lib/data/proyectos";
import { getTestimoniosByServicio } from "@/lib/data/testimonios";
import { whatsappLink } from "@/lib/site-config";
import { TextReveal } from "@/components/site/text-reveal";

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);
  if (!servicio) return {};
  return {
    title: servicio.nombre,
    description: servicio.resumen,
  };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);
  if (!servicio) notFound();

  const Icon = serviceIcons[servicio.slug];
  const proyectosRelacionados = getProyectosByServicio(servicio.slug);
  const testimoniosRelacionados = getTestimoniosByServicio(servicio.slug);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            {Icon ? (
              <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-6" strokeWidth={1.75} />
              </div>
            ) : null}
            <h1 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              <TextReveal>{servicio.nombre}</TextReveal>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {servicio.descripcion}
            </p>
            <div className="mt-6">
              <a
                href={whatsappLink(`Hola, quiero más información sobre ${servicio.nombre}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                <MessageCircle className="size-4" />
                ¿Tienes dudas sobre {servicio.nombre.toLowerCase()}? Escríbenos
              </a>
            </div>
          </div>
          <PlaceholderImage label={servicio.nombre} className="aspect-[4/3] w-full rounded-2xl" />
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Cómo trabajamos</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Nuestro proceso</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicio.proceso.map((paso, i) => (
              <li key={paso} className="flex flex-col gap-3">
                <span className="font-data text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed text-foreground/85">{paso}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proyectos relacionados */}
      {proyectosRelacionados.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionLabel>Portafolio</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Proyectos relacionados
          </h2>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
            {proyectosRelacionados.map((p, i) => (
              <ProjectCard key={p.slug} proyecto={p} tone={i} />
            ))}
          </RevealGroup>
        </section>
      ) : null}

      {/* Testimonios */}
      {testimoniosRelacionados.length > 0 ? (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Testimonios</SectionLabel>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
              Clientes que confiaron en este servicio
            </h2>
            <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
              {testimoniosRelacionados.map((t, i) => (
                <TestimonialCard key={i} testimonio={t} />
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {servicio.faqs.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Resolvemos tus dudas
          </h2>
          <Accordion type="single" collapsible className="mt-6">
            {servicio.faqs.map((faq, i) => (
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
      ) : null}

      {/* Formulario */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="size-5" />
            <SectionLabel className="text-primary/70">Cotiza este servicio</SectionLabel>
          </div>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Solicita tu cotización de {servicio.nombre.toLowerCase()}
          </h2>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <QuoteForm servicioSlugPredefinido={servicio.slug} />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Prefieres ver más servicios?{" "}
            <Link href="/servicios" className="text-primary underline underline-offset-2">
              Vuelve al listado completo
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
