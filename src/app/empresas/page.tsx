import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { TrustLogos } from "@/components/site/trust-logos";
import { StatStrip } from "@/components/site/stat-strip";
import { RevealGroup } from "@/components/site/reveal-group";
import { servicios } from "@/lib/data/servicios";
import { proyectos } from "@/lib/data/proyectos";
import { testimonios } from "@/lib/data/testimonios";
import { faqsEmpresas } from "@/lib/data/faqs-segmento";
import { whatsappLink } from "@/lib/site-config";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Soluciones para empresas",
  description:
    "Mantenimiento, obras civiles, automatización industrial y cumplimiento técnico para tu operación. Más de 30 años de experiencia B2B.",
};

export default function EmpresasPage() {
  const serviciosB2B = servicios.filter((s) => s.segmento === "b2b" || s.segmento === "ambos");
  const proyectosB2B = proyectos.filter((p) => p.segmento === "b2b").slice(0, 3);
  const testimoniosB2B = testimonios.filter((t) => t.autorTipo === "empresa").slice(0, 2);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionLabel>Soluciones para empresas</SectionLabel>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
              <TextReveal>Ingeniería confiable para tu operación</TextReveal>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Mantenimiento recurrente, obras civiles, automatización industrial y cumplimiento
              técnico respaldado por certificaciones vigentes y más de 30 años de trayectoria.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" size="lg" className="h-12 rounded-lg px-6 text-base">
                <Link href="/cotizar">Solicitar cotización</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-lg px-6 text-base">
                <a href={whatsappLink("Hola, quiero información para mi empresa.")} target="_blank" rel="noopener noreferrer">
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <PlaceholderImage
            label="Mantenimiento industrial"
            src="/images/empresas-hero.jpg"
            className="aspect-[4/3] w-full rounded-2xl lg:aspect-square"
          />
        </div>
      </section>

      {/* Credenciales — el decisor B2B busca cumplimiento antes que estética */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <StatStrip />
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <ShieldCheck className="size-6 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Certificados en RUC y RUP — listos para procesos de contratación pública y
            privada.{" "}
            <Link href="/certificaciones" className="font-medium text-primary underline underline-offset-2">
              Ver certificaciones
            </Link>
          </p>
        </div>
        <div className="mt-10">
          <TrustLogos />
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Servicios para empresas</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
            Soluciones técnicas para tu operación
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Contratos de mantenimiento recurrente y proyectos técnicos con trazabilidad y
            cumplimiento documentado en cada etapa.
          </p>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
            {serviciosB2B.map((s) => (
              <ServiceCard key={s.slug} servicio={s} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {proyectosB2B.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionLabel>Portafolio empresarial</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Proyectos para empresas</h2>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3" itemClassName="flex h-full">
            {proyectosB2B.map((p, i) => (
              <ProjectCard key={p.slug} proyecto={p} tone={i} />
            ))}
          </RevealGroup>
        </section>
      ) : null}

      {testimoniosB2B.length > 0 ? (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Testimonios</SectionLabel>
            <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2" itemClassName="flex h-full">
              {testimoniosB2B.map((t, i) => (
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
          {faqsEmpresas.map((faq, i) => (
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
            Hablemos de tu operación
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Agenda una visita técnica o cuéntanos el alcance de tu proyecto para enviarte una propuesta.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta-on-dark" size="lg" className="h-12 rounded-lg px-6 text-base">
              <Link href="/cotizar">Solicitar cotización</Link>
            </Button>
            <Button asChild variant="outline-on-dark" size="lg" className="h-12 rounded-lg px-6 text-base">
              <a href={whatsappLink("Hola, quiero información para mi empresa.")} target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
