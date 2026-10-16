import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Servicio } from "@/lib/data/servicios";
import { serviceIcons } from "@/lib/service-icons";

export function ServiceCard({ servicio }: { servicio: Servicio }) {
  const Icon = serviceIcons[servicio.slug];

  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
        {Icon ? <Icon className="size-5" strokeWidth={1.75} /> : null}
      </div>
      <h3 className="mt-4 font-heading text-base font-bold text-foreground">
        {servicio.nombre}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {servicio.resumen}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Ver servicio
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
