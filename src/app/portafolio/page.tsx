"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/site/section-label";
import { ProjectCard } from "@/components/site/project-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { proyectos } from "@/lib/data/proyectos";
import { servicios } from "@/lib/data/servicios";

const anios = Array.from(new Set(proyectos.map((p) => p.anio))).sort((a, b) => b - a);

export default function PortafolioPage() {
  const [servicio, setServicio] = useState("todos");
  const [segmento, setSegmento] = useState("todos");
  const [anio, setAnio] = useState("todos");

  const filtrados = useMemo(() => {
    return proyectos.filter((p) => {
      if (servicio !== "todos" && p.servicioSlug !== servicio) return false;
      if (segmento !== "todos" && p.segmento !== segmento) return false;
      if (anio !== "todos" && String(p.anio) !== anio) return false;
      return true;
    });
  }, [servicio, segmento, anio]);

  const destacados = proyectos.filter((p) => p.destacado);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionLabel>Portafolio</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
        Proyectos ejecutados
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Obras y proyectos para empresas y hogares, con más de tres décadas de experiencia
        documentada.
      </p>

      {destacados.length > 0 ? (
        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Proyectos destacados
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((p, i) => (
              <ProjectCard key={p.slug} proyecto={p} tone={i} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-14 flex flex-wrap gap-3 border-y border-border py-5">
        <Select value={servicio} onValueChange={setServicio}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los servicios</SelectItem>
            {servicios.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>
                {s.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={segmento} onValueChange={setSegmento}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Empresas y hogares</SelectItem>
            <SelectItem value="b2b">Empresas</SelectItem>
            <SelectItem value="b2c">Hogares</SelectItem>
          </SelectContent>
        </Select>

        <Select value={anio} onValueChange={setAnio}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los años</SelectItem>
            {anios.map((a) => (
              <SelectItem key={a} value={String(a)}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((p, i) => (
          <ProjectCard key={p.slug} proyecto={p} tone={i} />
        ))}
      </div>
      {filtrados.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No hay proyectos que coincidan con estos filtros.
        </p>
      ) : null}
    </section>
  );
}
