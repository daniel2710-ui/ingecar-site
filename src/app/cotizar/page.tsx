import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/section-label";
import { QuoteForm } from "@/components/site/quote-form";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description: "Solicita tu cotización de ingeniería, construcción o remodelación con INGECAR LTDA.",
};

export default function CotizarPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionLabel>Cotización</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
        <TextReveal>Cuéntanos sobre tu proyecto</TextReveal>
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        Completa el formulario y nuestro equipo te contactará para avanzar con tu cotización.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <QuoteForm />
      </div>
    </section>
  );
}
