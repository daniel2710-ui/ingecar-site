import type { Metadata } from "next";
import { ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/section-label";
import { certificaciones } from "@/lib/data/certificaciones";

export const metadata: Metadata = {
  title: "Certificaciones",
  description:
    "Certificaciones vigentes de INGECAR LTDA.: OHSAS 18001:2007, RUC y RUP, disponibles para procesos de contratación pública y privada.",
};

export default function CertificacionesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionLabel>Certificaciones</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
        Respaldo técnico y documental
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Nuestras certificaciones están disponibles para revisión en procesos de contratación
        pública y privada, incluyendo licitaciones.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {certificaciones.map((c) => (
          <div
            key={c.nombre}
            className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <ShieldCheck className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">{c.nombre}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.descripcion}</p>
                <p className="mt-1 font-data text-xs text-muted-foreground">
                  {c.entidadEmisora} · {c.fecha}
                </p>
              </div>
            </div>
            <Button variant="outline" className="shrink-0 gap-2 rounded-lg">
              <Download className="size-4" />
              Descargar PDF
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Los documentos se entregan en formato PDF y se actualizan periódicamente. Si necesitas un
        certificado específico para un proceso de contratación, escríbenos por WhatsApp o correo.
      </p>
    </section>
  );
}
