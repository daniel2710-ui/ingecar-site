import type { NextConfig } from "next";

// Sin scripts/estilos de terceros, sin analítica, sin fuentes externas (next/font
// autohospeda los .woff2) y sin cookies — todo el contenido sale del propio origen.
// Nonces habrían exigido renderizado dinámico en toda la web (incompatible con el
// Partial Prerendering que ya usan /portafolio/[slug] y /servicios/[slug], según la
// propia documentación de Next.js), así que se usa el enfoque estático recomendado
// para apps sin scripts inline propios ni de terceros.
const isDev = process.env.NODE_ENV === "development";
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    agentUpgrade: "security",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          // Sin `includeSubDomains` ni `preload`: no está confirmado que todos los
          // subdominios del dominio final sirvan HTTPS, y `preload` es prácticamente
          // irreversible una vez un navegador lo adopta. Ampliar esto es una decisión
          // de despliegue, no de código — ver informe.
          { key: "Strict-Transport-Security", value: "max-age=15552000" },
        ],
      },
    ];
  },
};

export default nextConfig;
