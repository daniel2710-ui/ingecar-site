"use client";

import { useReveal } from "@/lib/use-reveal";
import type { Hito } from "@/lib/data/hitos";
import { cn } from "cn";

function TimelineItem({ hito, isLast, index }: { hito: Hito; isLast: boolean; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>("0px 0px -80px 0px");

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
      className={cn(
        "relative flex gap-5 pb-8 transition-[opacity,transform] duration-[320ms] ease-[var(--ease-out)] last:pb-0 motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex size-3 shrink-0 rounded-full transition-colors duration-300",
            visible ? "bg-primary" : "bg-border"
          )}
        />
        {!isLast ? <span className="mt-1 w-px flex-1 bg-border" /> : null}
      </div>
      <div className="-mt-1 pb-2">
        <p className="font-data text-sm font-medium text-primary">{hito.anio}</p>
        <p className="mt-1 font-heading text-base font-bold text-foreground">{hito.titulo}</p>
        <p className="mt-1 text-sm text-muted-foreground">{hito.descripcion}</p>
      </div>
    </li>
  );
}

export function Timeline({ hitos }: { hitos: Hito[] }) {
  return (
    <ol className="mt-8 flex flex-col gap-0">
      {hitos.map((h, i) => (
        <TimelineItem key={h.anio} hito={h} index={i} isLast={i === hitos.length - 1} />
      ))}
    </ol>
  );
}
