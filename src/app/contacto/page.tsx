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
import { RevealGroup } from "@/components/site/reveal-group";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { TextReveal } from "@/components/site/text-reveal";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre").max(100, "Nombre demasiado largo"),
  email: z.email("Ingresa un correo válido").max(200, "Correo demasiado largo"),
  asunto: z
    .string()
    .min(2, "Indica el motivo de tu mensaje")
    .max(150, "Asunto demasiado largo"),
  mensaje: z.string().min(10, "Escribe tu mensaje").max(2000, "Mensaje demasiado largo (máx. 2000 caracteres)"),
  tratamientoDatos: z.literal(true, {
    error: "Debes autorizar el tratamiento de tus datos personales",
  }),
  // Honeypot: invisible para personas; los bots de envío masivo suelen diligenciarlo.
  sitioWeb: z.string().max(0, "").optional(),
});
type FormValues = z.infer<typeof schema>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs text-destructive animate-in fade-in-0 duration-150">
      {message}
    </p>
  );
}

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);
  const [urlWhatsapp, setUrlWhatsapp] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormValues) {
    const mensaje = [
      "Hola, te escribo desde el formulario de contacto del sitio web de INGECAR.",
      "",
      `*Nombre:* ${data.nombre}`,
      `*Correo:* ${data.email}`,
      `*Asunto:* ${data.asunto}`,
      "",
      `*Mensaje:*`,
      data.mensaje,
    ].join("\n");
    const url = whatsappLink(mensaje);
    setUrlWhatsapp(url);
    setEnviado(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionLabel>Contacto</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground"><TextReveal>Hablemos de tu proyecto</TextReveal></h1>
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
            className="card-interactive flex items-start gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40"
          >
            <MessageCircle className="size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">WhatsApp Business</p>
              <p className="text-sm text-muted-foreground">Canal principal de atención inmediata</p>
            </div>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="card-interactive flex items-start gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40"
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
            <div role="status" className="mt-6 flex flex-col items-center gap-3 rounded-xl bg-secondary/60 p-8 text-center animate-in fade-in-0 zoom-in-95 duration-300 ease-out">
              <CheckCircle2 className="size-8 text-accent" />
              <p className="font-semibold text-foreground">Te estamos llevando a WhatsApp</p>
              <p className="text-sm text-muted-foreground">
                Abrimos un chat con tu mensaje listo para enviar. Si no se abrió automáticamente,
                usa el botón.
              </p>
              <Button asChild variant="cta" size="lg" className="mt-1 h-11 rounded-lg">
                <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Abrir WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4" noValidate>
              <div className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="sitioWeb">Deja este campo vacío</label>
                <input id="sitioWeb" type="text" tabIndex={-1} autoComplete="off" {...register("sitioWeb")} />
              </div>
              <RevealGroup className="flex flex-col gap-4" stagger={60}>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    {...register("nombre")}
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? "nombre-error" : undefined}
                  />
                  <FieldError id="nombre-error" message={errors.nombre?.message} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <FieldError id="email-error" message={errors.email?.message} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input
                    id="asunto"
                    placeholder="Alianza comercial, proveedor, consulta..."
                    {...register("asunto")}
                    aria-invalid={!!errors.asunto}
                    aria-describedby={errors.asunto ? "asunto-error" : undefined}
                  />
                  <FieldError id="asunto-error" message={errors.asunto?.message} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    rows={4}
                    {...register("mensaje")}
                    aria-invalid={!!errors.mensaje}
                    aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                  />
                  <FieldError id="mensaje-error" message={errors.mensaje?.message} />
                </div>
              </RevealGroup>

              <label className="flex items-start gap-2.5 rounded-lg bg-muted p-4 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-primary"
                  aria-invalid={!!errors.tratamientoDatos}
                  aria-describedby={errors.tratamientoDatos ? "tratamientoDatos-error" : undefined}
                  {...register("tratamientoDatos")}
                />
                <span className="text-muted-foreground">
                  Autorizo el tratamiento de mis datos personales conforme a la{" "}
                  <Link href="/legal/politica-tratamiento-datos" className="text-primary underline underline-offset-2">
                    Política de Tratamiento de Datos Personales
                  </Link>
                  .
                </span>
              </label>
              <FieldError id="tratamientoDatos-error" message={errors.tratamientoDatos?.message} />

              <Button type="submit" variant="cta" size="lg" className="h-12 rounded-lg" disabled={isSubmitting}>
                <MessageCircle className="size-4" />
                Enviar por WhatsApp
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
