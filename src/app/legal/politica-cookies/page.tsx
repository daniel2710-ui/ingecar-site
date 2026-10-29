import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Cookies",
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">Política de Cookies</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualización: octubre de 2026. Documento sujeto a revisión legal.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground/85">
        <p>
          Actualmente este sitio web <strong>no utiliza cookies propias ni de terceros</strong>:
          no incorpora herramientas de analítica, publicidad ni rastreo. Esta política se publica
          de forma preventiva y se actualizará si en el futuro se incorpora alguna tecnología de
          este tipo, informando previamente a los visitantes según corresponda.
        </p>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">¿Qué son las cookies?</h2>
          <p className="mt-2">
            Son pequeños archivos que un sitio web puede almacenar en tu dispositivo al visitarlo,
            para recordar preferencias o analizar el uso del sitio. Como se indica arriba, este
            sitio no las utiliza en este momento.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Enlaces a WhatsApp y otros servicios</h2>
          <p className="mt-2">
            Algunos botones del sitio te redirigen a WhatsApp u otros servicios externos. Una vez
            sales de nuestro sitio, el tratamiento de tus datos y el uso de cookies se rige por la
            política de privacidad propia de ese servicio, no por la nuestra.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Gestión de cookies</h2>
          <p className="mt-2">
            Si en el futuro se incorporan cookies, podrás configurar tu navegador para rechazarlas
            o eliminarlas. Ten en cuenta que esto puede afectar algunas funcionalidades del sitio.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Contacto</h2>
          <p className="mt-2">
            Para más información sobre esta política, escríbenos a {siteConfig.email}.
          </p>
        </div>
      </div>
    </article>
  );
}
