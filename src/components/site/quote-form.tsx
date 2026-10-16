"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
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
import { servicios } from "@/lib/data/servicios";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  email: z.email("Ingresa un correo válido"),
  telefono: z.string().min(7, "Ingresa un teléfono de contacto"),
  segmento: z.enum(["empresa", "particular"]),
  servicioSlug: z.string().min(1, "Selecciona un servicio"),
  ubicacion: z.string().min(2, "Indica la ciudad o ubicación del proyecto"),
  presupuesto: z.string().optional(),
  mensaje: z.string().min(10, "Cuéntanos un poco más sobre tu proyecto"),
  tratamientoDatos: z.literal(true, {
    error: "Debes autorizar el tratamiento de tus datos personales",
  }),
  comunicacionesMarketing: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function QuoteForm({ servicioSlugPredefinido }: { servicioSlugPredefinido?: string }) {
  const [enviado, setEnviado] = useState(false);
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
    },
  });

  async function onSubmit() {
    // Simulated submission — no backend/email integration yet (out of scope for this design phase).
    // Wire to Resend/Supabase before launch so this success state reflects a real send.
    await new Promise((r) => setTimeout(r, 600));
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center animate-in fade-in-0 zoom-in-95 duration-300 ease-out">
        <CheckCircle2 className="size-10 text-accent" />
        <p className="font-heading text-lg font-bold">Solicitud enviada</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Recibimos tu información. Nuestro equipo se pondrá en contacto contigo lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input id="nombre" {...register("nombre")} placeholder="Tu nombre" />
          {errors.nombre ? <p className="text-xs text-destructive">{errors.nombre.message}</p> : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" {...register("telefono")} placeholder="300 000 0000" />
          {errors.telefono ? <p className="text-xs text-destructive">{errors.telefono.message}</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" type="email" {...register("email")} placeholder="nombre@correo.com" />
        {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
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
            <SelectTrigger id="servicioSlug" className="w-full">
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
          {errors.servicioSlug ? (
            <p className="text-xs text-destructive">{errors.servicioSlug.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ubicacion">Ciudad / ubicación del proyecto</Label>
          <Input id="ubicacion" {...register("ubicacion")} placeholder="Barranquilla, Atlántico" />
          {errors.ubicacion ? <p className="text-xs text-destructive">{errors.ubicacion.message}</p> : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="presupuesto">Presupuesto aproximado (opcional)</Label>
          <Input id="presupuesto" {...register("presupuesto")} placeholder="$ COP" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mensaje">Cuéntanos sobre tu proyecto</Label>
        <Textarea id="mensaje" rows={4} {...register("mensaje")} placeholder="Describe el alcance, el espacio o el tipo de obra que necesitas" />
        {errors.mensaje ? <p className="text-xs text-destructive">{errors.mensaje.message}</p> : null}
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-muted p-4">
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" className="mt-0.5 size-4 accent-primary" {...register("tratamientoDatos")} />
          <span className="text-muted-foreground">
            Autorizo a INGECAR LTDA. el tratamiento de mis datos personales conforme a la{" "}
            <Link href="/legal/politica-tratamiento-datos" className="text-primary underline underline-offset-2">
              Política de Tratamiento de Datos Personales
            </Link>
            , de acuerdo con la Ley 1581 de 2012.
          </span>
        </label>
        {errors.tratamientoDatos ? (
          <p className="text-xs text-destructive">{errors.tratamientoDatos.message}</p>
        ) : null}

        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" className="mt-0.5 size-4 accent-primary" {...register("comunicacionesMarketing")} />
          <span className="text-muted-foreground">
            Quiero recibir comunicaciones comerciales y novedades de INGECAR.
          </span>
        </label>
      </div>

      <Button type="submit" variant="cta" size="lg" className="h-12 rounded-lg text-base" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar solicitud"}
      </Button>
    </form>
  );
}
