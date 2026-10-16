import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { TrustLogos } from "@/components/site/trust-logos";
import { servicios } from "@/lib/data/servicios";
import { proyectos } from "@/lib/data/proyectos";
import { testimonios } from "@/lib/data/testimonios";
import { whatsappLink } from "@/lib/site-config";

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
              Ingeniería confiable para tu operación
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
          <PlaceholderImage label="Mantenimiento industrial" className="aspect-[4/3] w-full rounded-2xl lg:aspect-square" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
          <ShieldCheck className="size-6 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Certificados en OHSAS 18001:2007, RUC y RUP — listos para procesos de contratación
            pública y privada.{" "}
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
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviciosB2B.map((s) => (
              <ServiceCard key={s.slug} servicio={s} />
            ))}
          </div>
        </div>
      </section>

      {proyectosB2B.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionLabel>Portafolio empresarial</SectionLabel>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Proyectos para empresas</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {proyectosB2B.map((p, i) => (
              <ProjectCard key={p.slug} proyecto={p} tone={i} />
            ))}
          </div>
        </section>
      ) : null}

      {testimoniosB2B.length > 0 ? (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionLabel>Testimonios</SectionLabel>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {testimoniosB2B.map((t, i) => (
                <TestimonialCard key={i} testimonio={t} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-14 text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Hablemos de tu operación
          </h2>
          <Button asChild variant="cta" size="lg" className="h-12 rounded-lg px-6 text-base">
            <Link href="/cotizar">Solicitar cotización</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
