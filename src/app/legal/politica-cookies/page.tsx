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
          Este sitio web puede utilizar cookies y tecnologías similares para mejorar la
          experiencia de navegación, analizar el tráfico y medir el desempeño de campañas.
        </p>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">¿Qué son las cookies?</h2>
          <p className="mt-2">
            Son pequeños archivos que se almacenan en tu dispositivo al visitar el sitio,
            permitiendo recordar preferencias y analizar el uso del sitio de forma agregada.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Tipos de cookies utilizadas</h2>
          <p className="mt-2">
            Cookies técnicas necesarias para el funcionamiento del sitio, y cookies analíticas que
            nos ayudan a entender cómo los visitantes interactúan con el contenido.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Gestión de cookies</h2>
          <p className="mt-2">
            Puedes configurar tu navegador para rechazar cookies o eliminar las existentes. Ten en
            cuenta que esto puede afectar algunas funcionalidades del sitio.
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
