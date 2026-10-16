import { Star } from "lucide-react";
import type { Testimonio } from "@/lib/data/testimonios";

export function TestimonialCard({ testimonio }: { testimonio: Testimonio }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6">
      {testimonio.calificacion ? (
        <div className="flex gap-0.5 text-cta">
          {Array.from({ length: testimonio.calificacion }).map((_, i) => (
            <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
        “{testimonio.contenido}”
      </p>
      <p className="mt-4 text-sm font-semibold text-foreground">
        {testimonio.autorNombre ?? (testimonio.autorTipo === "empresa" ? "Cliente empresarial" : "Cliente particular")}
      </p>
    </div>
  );
}
