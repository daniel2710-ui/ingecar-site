# Resultados de pruebas — auditoría de seguridad

Todas las pruebas se ejecutaron localmente, sin red, sin tocar servicios en producción ni de terceros, conforme a la regla de la auditoría. Comandos y salidas exactas archivados en `~/security-audit-skill/ingecar-site/run-1/` (ledger de cobertura + artefactos de evidencia por agente).

## Seguridad

| Prueba | Método | Resultado |
|---|---|---|
| Inyección en construcción de URL de WhatsApp | Repro real con `node -e` usando payload con CRLF, `&`, `#`, `<script>`, `javascript:` | Todo correctamente codificado por `encodeURIComponent`; sin bytes de control, sin cambio de esquema, sin parámetros nuevos en la URL resultante |
| XSS (DOM) | `grep` exhaustivo en `src/` por `dangerouslySetInnerHTML`, `innerHTML`, `document.write`, `eval(`, `new Function(` | 0 coincidencias en todo el árbol, incluyendo los componentes de carrusel agregados recientemente |
| CSRF | N/A — no existe ningún endpoint de servidor que cambie estado | Confirmado explícitamente, no asumido |
| Control de acceso (rutas `[slug]`) | Lectura de código + verificación de que `notFound()` se llama antes de cualquier acceso a propiedad en slug no encontrado | Correcto en ambas rutas y en `generateMetadata()` |
| Validación de entradas (honeypot) | Repro real con el Zod del propio proyecto (`zod@4.6.7`): `safeParse` contra vacío, `undefined`, 1 carácter, 5000 caracteres, un espacio | Solo vacío/`undefined` pasan; cualquier contenido falla y bloquea el envío completo del formulario |
| Protección de sesión | N/A — no existen sesiones ni cookies | Confirmado explícitamente |
| Rate limiting / protección antibot | N/A estructural — no hay servidor que proteger; honeypot evaluado y confirmado funcional para su alcance realista (bots que autocompletan el formulario visible) | Ver hallazgo documentado en `SECURITY_AUDIT.md` sobre el límite inherente de esta protección en un sitio sin backend |
| Cabeceras HTTP | `curl -I` contra build de producción real (`next build && next start`), en ruta estática (`/`) y en ruta con Partial Prerendering (`/portafolio/adecuacion-locativa-d1`) | CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy y Permissions-Policy presentes y correctos en ambas; `X-Powered-By` ausente |
| Exposición de secretos | Escaneo de patrones (claves AWS/OpenAI/Google/Slack, bloques `BEGIN PRIVATE KEY`, JWT, asignaciones genéricas a `secret`/`token`/`password`) sobre los 30 commits de **ambas** ramas (`main`, `design/premium-upgrade`), más el árbol de trabajo actual | 0 coincidencias en todo el historial y en el árbol actual |
| Dependencias vulnerables | `npm audit --json` (árbol completo) y `npm audit --omit=dev` (solo lo que se empaquetaría), ambos re-ejecutados de forma independiente por el agente coordinador | Árbol completo: 2 low + 19 moderate (total 21), todo en la cadena del CLI `shadcn` y del toolchain de `eslint`/`typescript-eslint` (ambos devDependency). Solo producción: 2 low + 4 moderate, 0 high/critical en cualquiera de los dos casos |
| Subida de archivos | N/A — ningún formulario tiene `<input type="file">` | Confirmado explícitamente |

## Calidad y funcionalidad

| Prueba | Resultado |
|---|---|
| `npx tsc --noEmit` | Limpio, sin errores, antes y después del fix |
| `npm run lint` | Limpio; único warning preexistente y no relacionado en `quote-form.tsx:176` (incompatibilidad conocida de React Compiler con `react-hook-form`) |
| `npm run build` (producción) | 34/34 rutas generadas correctamente, Partial Prerendering intacto en `/portafolio/[slug]` y `/servicios/[slug]` |
| Enlaces internos | Verificados por los hunters: todos los `target="_blank"` (14 ocurrencias) llevan `rel="noopener noreferrer"` |
| Formularios | Flujo completo probado en navegador en sesiones anteriores de este proyecto (envío legítimo abre WhatsApp con los datos correctos; honeypot relleno bloquea el envío) — re-confirmado por repro de Zod en esta auditoría |
| Responsive / render visual | Página legal corregida verificada en navegador tras el cambio: las 6 secciones renderizan en orden correcto, sin referencias rotas |
| SEO | Sin cambios en metadata, `generateStaticParams()`, ni estructura de rutas — fuera del alcance de los hallazgos de esta auditoría |
| Accesibilidad | Sin cambios relevantes — el fix es texto dentro de la misma estructura semántica (`<h2>`/`<p>`) ya presente |
| Rendimiento | Sin cambios de código con impacto de rendimiento — fix puramente textual |

## Validación independiente (segunda auditoría, Fase 7)

Tras aplicar el fix, se ejecutó una segunda auditoría con un agente **sin contexto** de la primera (ni de los hunters ni del verificador original), enfocada específicamente en: exactitud del fix frente al código real, integridad del diff (`git show 94c8324`), referencias cruzadas rotas, consistencia con las otras páginas legales, y regresión en `tsc`/`lint`.

**Veredicto de la segunda auditoría: VERIFIED-CORRECT.** Sin hallazgos nuevos, sin regresiones, numeración de secciones consistente, sin referencias huérfanas en ningún otro archivo del sitio.

## Limitaciones explícitas de estas pruebas

- No se ejecutaron pruebas contra el sitio desplegado en producción (no existe despliegue aún).
- No existe suite de tests automatizados preexistente en el proyecto (sin Jest/Vitest/Playwright) — toda la evidencia de esta auditoría proviene de build/lint/tsc, repros puntuales en Node/Zod, grep exhaustivo, y verificación manual en navegador, no de una suite de regresión ejecutable con un solo comando.
- No se puede verificar desde el código si los headers de seguridad llegarán realmente a producción en Hostinger — ver `CLOUDFLARE_HOSTINGER.md`.
- Esta auditoría no incluyó pruebas de penetración activas contra infraestructura real, ni escaneo de malware en el PDF de certificaciones más allá de una búsqueda de cadenas de texto sensibles.
