import Link from "next/link";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { servicios } from "@/lib/data/servicios";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const year = 2026;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading text-lg font-bold">{siteConfig.nombre}</p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              {siteConfig.nombreCompleto}
            </p>
            <p className="mt-4 font-data text-xs text-primary-foreground/60">
              Desde 1992
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Servicios</p>
            <ul className="mt-3 space-y-2">
              {servicios.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                  >
                    {s.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Empresa</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/nosotros" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/portafolio" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/certificaciones" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                  Certificaciones
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Contacto</p>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MessageCircle className="mt-0.5 size-4 shrink-0" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">
                  WhatsApp Business
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-foreground break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Clock className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.horario}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © {year} {siteConfig.nombre} · {siteConfig.ciudad}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/legal/politica-tratamiento-datos" className="text-xs text-primary-foreground/60 hover:text-primary-foreground">
              Tratamiento de datos
            </Link>
            <Link href="/legal/terminos-condiciones" className="text-xs text-primary-foreground/60 hover:text-primary-foreground">
              Términos y condiciones
            </Link>
            <Link href="/legal/politica-cookies" className="text-xs text-primary-foreground/60 hover:text-primary-foreground">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
