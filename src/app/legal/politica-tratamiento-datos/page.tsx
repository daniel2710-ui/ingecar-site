import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos Personales",
};

export default function PoliticaDatosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Política de Tratamiento de Datos Personales
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualización: octubre de 2026. Documento sujeto a revisión legal.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-foreground/85">
        <p>
          {siteConfig.nombreCompleto} ({siteConfig.nombre}), identificada como responsable del
          tratamiento de datos personales, da cumplimiento a lo dispuesto en la Ley 1581 de 2012,
          el Decreto 1377 de 2013 y demás normas que la reglamenten o complementen, en relación
          con la protección de datos personales de sus clientes, usuarios y visitantes del sitio
          web.
        </p>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            1. Información que recopilamos
          </h2>
          <p className="mt-2">
            Recopilamos datos como nombre, correo electrónico, número de teléfono, ubicación del
            proyecto, presupuesto estimado y, cuando el usuario los adjunta voluntariamente,
            fotografías o documentos relacionados con la solicitud de cotización.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            2. Finalidad del tratamiento
          </h2>
          <p className="mt-2">
            Los datos recolectados se utilizan para gestionar solicitudes de cotización,
            coordinar visitas técnicas, dar seguimiento comercial a oportunidades de negocio, y,
            únicamente cuando el titular lo autoriza expresamente, enviar comunicaciones
            comerciales y novedades.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            3. Derechos del titular
          </h2>
          <p className="mt-2">
            Como titular de los datos, tienes derecho a conocer, actualizar, rectificar y
            suprimir tu información, así como a revocar la autorización otorgada, mediante
            solicitud enviada a {siteConfig.email}.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            4. Conservación y seguridad
          </h2>
          <p className="mt-2">
            Los datos se conservan durante el tiempo necesario para cumplir con la finalidad para
            la que fueron recolectados y las obligaciones legales aplicables, con medidas técnicas
            y organizativas razonables para proteger su confidencialidad.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            5. Contacto
          </h2>
          <p className="mt-2">
            Para ejercer tus derechos o resolver inquietudes sobre el tratamiento de tus datos,
            escríbenos a {siteConfig.email}.
          </p>
        </div>
      </div>
    </article>
  );
}
