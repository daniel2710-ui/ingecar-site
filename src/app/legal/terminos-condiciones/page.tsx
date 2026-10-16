import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso",
};

export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Términos y Condiciones de Uso
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualización: octubre de 2026. Documento sujeto a revisión legal.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground/85">
        <p>
          El acceso y uso de este sitio web, propiedad de {siteConfig.nombreCompleto}, implica la
          aceptación de los presentes términos y condiciones.
        </p>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">1. Objeto del sitio</h2>
          <p className="mt-2">
            Este sitio web tiene como propósito informar sobre los servicios de ingeniería,
            construcción y remodelación de {siteConfig.nombre}, así como facilitar el contacto y
            la solicitud de cotizaciones.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">2. Uso del sitio</h2>
          <p className="mt-2">
            El usuario se compromete a utilizar el sitio y sus formularios de manera lícita,
            proporcionando información veraz y absteniéndose de realizar actividades que puedan
            dañar, inutilizar o sobrecargar el sitio.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">3. Cotizaciones</h2>
          <p className="mt-2">
            Las cotizaciones solicitadas a través del sitio son estimaciones preliminares sujetas
            a confirmación mediante visita técnica o revisión detallada del proyecto. No
            constituyen una oferta comercial vinculante hasta su confirmación formal.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">4. Propiedad intelectual</h2>
          <p className="mt-2">
            Los contenidos, imágenes, textos y marca de {siteConfig.nombre} son de su propiedad y
            no pueden ser reproducidos sin autorización previa.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">5. Contacto</h2>
          <p className="mt-2">
            Para consultas sobre estos términos, escríbenos a {siteConfig.email}.
          </p>
        </div>
      </div>
    </article>
  );
}
