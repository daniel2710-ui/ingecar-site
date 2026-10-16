import Link from "next/link";
import { ArrowRight, Building2, Home as HomeIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { StatStrip } from "@/components/site/stat-strip";
import { TrustLogos } from "@/components/site/trust-logos";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { RevealGroup } from "@/components/site/reveal-group";
import { servicios } from "@/lib/data/servicios";
import { getProyectosDestacados } from "@/lib/data/proyectos";
import { getTestimoniosDestacados } from "@/lib/data/testimonios";
import { whatsappLink } from "@/lib/site-config";

export default function HomePage() {
  const destacados = getProyectosDestacados().slice(0, 4);
  const testimonios = getTestimoniosDestacados().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <RevealGroup className="contents" stagger={90}>
            <div>
              <SectionLabel>Ingeniería · Construcción · Remodelación</SectionLabel>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
                Soluciones de ingeniería, construcción y remodelación para empresas y hogares
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Transformamos tus proyectos en realidad con experiencia, calidad y soluciones
                integrales en construcción, instalaciones eléctricas, mantenimiento y remodelaciones.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="cta" size="lg" className="h-12 rounded-lg px-6 text-base">
                  <Link href="/cotizar">Solicitar cotización</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-lg px-6 text-base">
                  <a href={whatsappLink("Hola, quiero más información sobre los servicios de INGECAR.")} target="_blank" rel="noopener noreferrer">
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <PlaceholderImage
              label="Proyecto INGECAR en ejecución"
              tone={0}
              className="aspect-[4/3] w-full rounded-2xl lg:aspect-square"
            />
          </RevealGroup>
        </div>
      </section>

      {/* Accesos diferenciados */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href="/empresas"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
          >
            <Building2 className="size-8 text-primary" strokeWidth={1.5} />
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold text-foreground">
                Soluciones para empresas
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mantenimiento, obras civiles, automatización y cumplimiento para tu operación.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Ver soluciones B2B
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
          <Link
            href="/hogares"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
          >
            <HomeIcon className="size-8 text-primary" strokeWidth={1.5} />
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold text-foreground">
                Remodelaciones y construcción residencial
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Transforma tu casa o apartamento con acabados modernos y acompañamiento integral.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Ver soluciones para tu hogar
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <StatStrip />
        <div className="mt-10">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Empresas que han confiado en INGECAR
          </p>
          <div className="mt-5">
            <TrustLogos />
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Lo que hacemos</SectionLabel>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Soluciones integrales de ingeniería
          </h2>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="flex h-full">
            {servicios.map((s) => (
              <ServiceCard key={s.slug} servicio={s} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Portafolio destacado */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Portafolio</SectionLabel>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Proyectos ejecutados
            </h2>
          </div>
          <Link href="/portafolio" className="hidden shrink-0 text-sm font-medium text-primary sm:inline-flex sm:items-center sm:gap-1">
            Ver todo el portafolio <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="flex h-full">
          {destacados.map((p, i) => (
            <ProjectCard key={p.slug} proyecto={p} tone={i} />
          ))}
        </RevealGroup>
        <Link href="/portafolio" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary sm:hidden">
          Ver todo el portafolio <ArrowRight className="size-3.5" />
        </Link>
      </section>

      {/* Testimonios */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Testimonios</SectionLabel>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3" itemClassName="flex h-full">
            {testimonios.map((t, i) => (
              <TestimonialCard key={i} testimonio={t} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <ShieldCheck className="size-10 shrink-0 text-primary" strokeWidth={1.5} />
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Respaldados por certificaciones vigentes
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                OHSAS 18001:2007, RUC y RUP — listos para procesos de contratación pública y privada.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="lg" className="h-11 shrink-0 rounded-lg px-5">
            <Link href="/certificaciones">Ver certificaciones</Link>
          </Button>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-14 text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="max-w-md text-sm text-primary-foreground/75">
            Cuéntanos qué necesitas y te respondemos con una propuesta clara y a tiempo.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta" size="lg" className="h-12 rounded-lg px-6 text-base">
              <Link href="/cotizar">Solicitar cotización</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg bg-white px-6 text-base text-primary hover:bg-white/90"
            >
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
