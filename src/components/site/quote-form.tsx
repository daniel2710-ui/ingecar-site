"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RevealGroup } from "@/components/site/reveal-group";
import { servicios } from "@/lib/data/servicios";
import { whatsappLink } from "@/lib/site-config";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre").max(100, "Nombre demasiado largo"),
  email: z.email("Ingresa un correo válido").max(200, "Correo demasiado largo"),
  telefono: z
    .string()
    .min(7, "Ingresa un teléfono de contacto")
    .max(20, "Teléfono demasiado largo"),
  segmento: z.enum(["empresa", "particular"]),
  servicioSlug: z.string().min(1, "Selecciona un servicio"),
  ubicacion: z
    .string()
    .min(2, "Indica la ciudad o ubicación del proyecto")
    .max(150, "Ubicación demasiado larga"),
  presupuesto: z.string().max(50, "Presupuesto demasiado largo").optional(),
  mensaje: z
    .string()
    .min(10, "Cuéntanos un poco más sobre tu proyecto")
    .max(2000, "Mensaje demasiado largo (máx. 2000 caracteres)"),
  tratamientoDatos: z.literal(true, {
    error: "Debes autorizar el tratamiento de tus datos personales",
  }),
  comunicacionesMarketing: z.boolean().optional(),
  // Honeypot: invisible para personas; los bots de envío masivo suelen diligenciarlo.
  // Si llega con contenido, la validación falla y el formulario no se envía.
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

function buildWhatsappMensaje(data: FormValues) {
  const servicio = servicios.find((s) => s.slug === data.servicioSlug);
  const lineas = [
    "Hola, quiero solicitar una cotización desde el sitio web de INGECAR.",
    "",
    `*Nombre:* ${data.nombre}`,
    `*Teléfono:* ${data.telefono}`,
    `*Correo:* ${data.email}`,
    `*Tipo de cliente:* ${data.segmento === "empresa" ? "Empresa" : "Persona natural"}`,
    `*Servicio de interés:* ${servicio?.nombre ?? data.servicioSlug}`,
    `*Ubicación del proyecto:* ${data.ubicacion}`,
  ];
  if (data.presupuesto) lineas.push(`*Presupuesto aproximado:* ${data.presupuesto}`);
  lineas.push("", "*Detalle del proyecto:*", data.mensaje);
  return lineas.join("\n");
}

export function QuoteForm({ servicioSlugPredefinido }: { servicioSlugPredefinido?: string }) {
  const [enviado, setEnviado] = useState(false);
  const [urlWhatsapp, setUrlWhatsapp] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      segmento: "particular",
      servicioSlug: servicioSlugPredefinido ?? "",
      comunicacionesMarketing: false,
      sitioWeb: "",
    },
  });

  function onSubmit(data: FormValues) {
    const url = whatsappLink(buildWhatsappMensaje(data));
    setUrlWhatsapp(url);
    setEnviado(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (enviado) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center animate-in fade-in-0 zoom-in-95 duration-300 ease-out"
      >
        <CheckCircle2 className="size-10 text-accent" />
        <p className="font-heading text-lg font-bold">Te estamos llevando a WhatsApp</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Abrimos un chat de WhatsApp con el resumen de tu solicitud, listo para enviar a nuestro
          equipo. Si no se abrió automáticamente, usa el botón.
        </p>
        <Button asChild variant="cta" size="lg" className="mt-2 h-12 rounded-lg px-6 text-base">
          <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" />
            Abrir WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="sitioWeb">Deja este campo vacío</label>
        <input id="sitioWeb" type="text" tabIndex={-1} autoComplete="off" {...register("sitioWeb")} />
      </div>
      <RevealGroup className="flex flex-col gap-5" stagger={60}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input
              id="nombre"
              {...register("nombre")}
              placeholder="Tu nombre"
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            <FieldError id="nombre-error" message={errors.nombre?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              {...register("telefono")}
              placeholder="300 000 0000"
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : undefined}
            />
            <FieldError id="telefono-error" message={errors.telefono?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="nombre@correo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="segmento">Tipo de cliente</Label>
            <Select
              defaultValue={watch("segmento")}
              onValueChange={(v) => setValue("segmento", v as FormValues["segmento"])}
            >
              <SelectTrigger id="segmento" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="particular">Persona natural</SelectItem>
                <SelectItem value="empresa">Empresa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="servicioSlug">Servicio de interés</Label>
            <Select
              defaultValue={watch("servicioSlug")}
              onValueChange={(v) => setValue("servicioSlug", v)}
            >
              <SelectTrigger
                id="servicioSlug"
                className="w-full"
                aria-invalid={!!errors.servicioSlug}
                aria-describedby={errors.servicioSlug ? "servicioSlug-error" : undefined}
              >
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {servicios.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="servicioSlug-error" message={errors.servicioSlug?.message} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ubicacion">Ciudad / ubicación del proyecto</Label>
            <Input
              id="ubicacion"
              {...register("ubicacion")}
              placeholder="Barranquilla, Atlántico"
              aria-invalid={!!errors.ubicacion}
              aria-describedby={errors.ubicacion ? "ubicacion-error" : undefined}
            />
            <FieldError id="ubicacion-error" message={errors.ubicacion?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="presupuesto">Presupuesto aproximado (opcional)</Label>
            <Input id="presupuesto" {...register("presupuesto")} placeholder="$ COP" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="mensaje">Cuéntanos sobre tu proyecto</Label>
          <Textarea
            id="mensaje"
            rows={4}
            {...register("mensaje")}
            placeholder="Describe el alcance, el espacio o el tipo de obra que necesitas"
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
          />
          <FieldError id="mensaje-error" message={errors.mensaje?.message} />
        </div>
      </RevealGroup>

      <div className="flex flex-col gap-3 rounded-lg bg-muted p-4">
        <label className="flex items-start gap-2.5 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-primary"
            aria-invalid={!!errors.tratamientoDatos}
            aria-describedby={errors.tratamientoDatos ? "tratamientoDatos-error" : undefined}
            {...register("tratamientoDatos")}
          />
          <span className="text-muted-foreground">
            Autorizo a INGECAR LTDA. el tratamiento de mis datos personales conforme a la{" "}
            <Link href="/legal/politica-tratamiento-datos" className="text-primary underline underline-offset-2">
              Política de Tratamiento de Datos Personales
            </Link>
            , de acuerdo con la Ley 1581 de 2012.
          </span>
        </label>
        <FieldError id="tratamientoDatos-error" message={errors.tratamientoDatos?.message} />

        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" className="mt-0.5 size-4 accent-primary" {...register("comunicacionesMarketing")} />
          <span className="text-muted-foreground">
            Quiero recibir comunicaciones comerciales y novedades de INGECAR.
          </span>
        </label>
      </div>

      <Button type="submit" variant="cta" size="lg" className="h-12 rounded-lg text-base" disabled={isSubmitting}>
        <MessageCircle className="size-4" />
        Enviar solicitud por WhatsApp
      </Button>
    </form>
  );
}
