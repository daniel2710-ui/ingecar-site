import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/section-label";
import { StatStrip } from "@/components/site/stat-strip";
import { Timeline } from "@/components/site/timeline";
import { RevealGroup } from "@/components/site/reveal-group";
import { hitos } from "@/lib/data/hitos";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "INGECAR LTDA. — Ingeniería del Caribe, constituida en 1992. Más de tres décadas de trayectoria, misión, visión y política de calidad.",
};

const principios = [
  "Calidad",
  "Responsabilidad",
  "Cumplimiento",
  "Seguridad",
  "Confiabilidad",
  "Mejora continua",
  "Satisfacción del cliente",
];

export default function NosotrosPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pt-14 pb-10 sm:px-6">
        <SectionLabel>Nosotros</SectionLabel>
        <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
          <TextReveal>Más de tres décadas construyendo confianza</TextReveal>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-foreground/85">
          INGENIERÍA DEL CARIBE LTDA. (INGECAR) fue constituida en 1992, como respuesta a la
          demanda de servicios de ingeniería en la Región Caribe colombiana. Desde entonces, hemos
          desarrollado relaciones comerciales con organizaciones de los sectores público y
          privado, ejecutando proyectos de infraestructura, ingeniería eléctrica, construcción,
          mantenimiento y servicios especializados.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <StatStrip />
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <RevealGroup className="grid gap-5 sm:grid-cols-2" itemClassName="flex h-full flex-col">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="font-heading text-lg font-bold text-primary">Misión</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                Ofrecer servicios de ingeniería con capacidad técnica, logística y administrativa,
                bajo criterios de calidad, satisfacción del cliente y bienestar organizacional.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="font-heading text-lg font-bold text-primary">Visión</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                Consolidarnos en Colombia como proveedores reconocidos por la calidad de nuestros
                servicios y la utilización eficiente de nuestros recursos.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 sm:col-span-2">
              <h2 className="font-heading text-lg font-bold text-primary">Política de calidad</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {principios.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <SectionLabel>Trayectoria</SectionLabel>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
          Línea de tiempo
        </h2>
        <Timeline hitos={hitos} />
      </section>

      <section className="bg-primary py-16 text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="font-heading text-xl font-bold text-white sm:text-2xl">
            Una empresa colombiana con experiencia técnica real
          </p>
          <p className="mt-3 text-sm text-primary-foreground/75">
            Evolucionamos para atender tanto a empresas como a personas naturales, con soluciones
            de ingeniería, infraestructura, construcción y remodelación.
          </p>
        </div>
      </section>
    </>
  );
}
