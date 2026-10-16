"use client";

import { useState } from "react";
import { Mail, MessageCircle, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionLabel } from "@/components/site/section-label";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  email: z.email("Ingresa un correo válido"),
  asunto: z.string().min(2, "Indica el motivo de tu mensaje"),
  mensaje: z.string().min(10, "Escribe tu mensaje"),
  tratamientoDatos: z.literal(true, {
    error: "Debes autorizar el tratamiento de tus datos personales",
  }),
});
type FormValues = z.infer<typeof schema>;

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    // Simulated submission — no backend/email integration yet (out of scope for this design phase).
    await new Promise((r) => setTimeout(r, 500));
    setEnviado(true);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionLabel>Contacto</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">Hablemos de tu proyecto</h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        Nuestra atención es ágil y directa: coordina tu visita técnica o cotización por WhatsApp
        y nuestro equipo se desplaza hasta tu proyecto. No contamos con oficina de atención al
        público — operamos de forma virtual, con base en {siteConfig.ciudad}.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40"
          >
            <MessageCircle className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">WhatsApp Business</p>
              <p className="text-sm text-muted-foreground">Canal principal de atención inmediata</p>
            </div>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40"
          >
            <Mail className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Correo corporativo</p>
              <p className="text-sm text-muted-foreground break-all">{siteConfig.email}</p>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
            <Clock className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Horario de atención</p>
              <p className="text-sm text-muted-foreground">{siteConfig.horario}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
            <MapPin className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Base operativa</p>
              <p className="text-sm text-muted-foreground">
                {siteConfig.ciudad} — atención en sitio mediante visitas coordinadas
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Formulario de contacto general
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Para consultas, alianzas comerciales, proveedores o solicitudes institucionales.
            ¿Buscas una cotización? Usa el{" "}
            <Link href="/cotizar" className="text-primary underline underline-offset-2">
              formulario de cotización
            </Link>
            .
          </p>

          {enviado ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-xl bg-secondary/60 p-8 text-center animate-in fade-in-0 zoom-in-95 duration-300 ease-out">
              <CheckCircle2 className="size-8 text-accent" />
              <p className="font-semibold text-foreground">Mensaje enviado</p>
              <p className="text-sm text-muted-foreground">Te responderemos lo antes posible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" {...register("nombre")} />
                {errors.nombre ? <p className="text-xs text-destructive">{errors.nombre.message}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="asunto">Asunto</Label>
                <Input id="asunto" placeholder="Alianza comercial, proveedor, consulta..." {...register("asunto")} />
                {errors.asunto ? <p className="text-xs text-destructive">{errors.asunto.message}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea id="mensaje" rows={4} {...register("mensaje")} />
                {errors.mensaje ? <p className="text-xs text-destructive">{errors.mensaje.message}</p> : null}
              </div>

              <label className="flex items-start gap-2.5 rounded-lg bg-muted p-4 text-sm">
                <input type="checkbox" className="mt-0.5 size-4 accent-primary" {...register("tratamientoDatos")} />
                <span className="text-muted-foreground">
                  Autorizo el tratamiento de mis datos personales conforme a la{" "}
                  <Link href="/legal/politica-tratamiento-datos" className="text-primary underline underline-offset-2">
                    Política de Tratamiento de Datos Personales
                  </Link>
                  .
                </span>
              </label>
              {errors.tratamientoDatos ? (
                <p className="text-xs text-destructive">{errors.tratamientoDatos.message}</p>
              ) : null}

              <Button type="submit" variant="cta" size="lg" className="h-12 rounded-lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
