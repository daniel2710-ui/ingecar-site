import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Certificaciones",
  description:
    "Certificaciones vigentes de INGECAR LTDA.: RUC y RUP, disponibles para procesos de contratación pública y privada.",
};

export default function CertificacionesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionLabel>Certificaciones</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
        <TextReveal>Respaldo técnico y documental</TextReveal>
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Nuestras certificaciones están disponibles para revisión en procesos de contratación
        pública y privada, incluyendo licitaciones.
      </p>

      <Button asChild variant="cta" size="lg" className="mt-6 h-12 gap-2 rounded-lg px-6 text-base">
        <a href="/docs/certificaciones-ingecar.pdf" download="Certificaciones-INGECAR.pdf">
          <Download className="size-4" />
          Ver certificaciones
        </a>
      </Button>

      <p className="mt-8 text-xs text-muted-foreground">
        El documento se actualiza periódicamente. Si necesitas una versión específica para un
        proceso de contratación en particular, escríbenos por WhatsApp o correo.
      </p>
    </section>
  );
}
