# Auditoría de seguridad — INGECAR LTDA. (sitio corporativo)

**Metodología**: skill `security-audit` (Cloudflare), perfil `deep`. Agentes investigadores independientes por subsistema + verificadores independientes y escépticos para cada hallazgo candidato, con rastro de cobertura verificable (`coverage-ledger.json`) y hallazgos estructurados y validados contra schema (`findings.json`).
**Corrida completa**: `~/security-audit-skill/ingecar-site/run-1/` (artefactos formales del skill: `run-metadata.json`, `architecture.md`, `coverage-ledger.json`, `findings.json`, `REPORT.md`, `FINDINGS-DETAIL.md`, `NEEDS-VALIDATION.md`). Este documento es el resumen orientado al equipo de INGECAR; los artefactos formales son la fuente de verdad verificable.
**Rama auditada**: `design/premium-upgrade` (no se tocó `main`). **Commit base**: `eff644ec870c07058a64a1ad6a1e8ea96f15b92e`. Árbol de trabajo limpio al iniciar.

## Arquitectura real (determina qué aplica y qué no)

Este es un sitio **100% estático** (Next.js 16 App Router): sin rutas de API, sin middleware, sin Server Actions, sin base de datos, sin autenticación, sin cookies propias, sin scripts de terceros ni analítica. Las dos únicas rutas dinámicas (`/servicios/[slug]`, `/portafolio/[slug]`) se resuelven contra listas locales cerradas, definidas en código, con `generateStaticParams()`. Los dos únicos formularios del sitio nunca contactan un servidor propio: arman un enlace de WhatsApp del lado del cliente y lo abren con `window.open`.

Esta arquitectura elimina por construcción la mayoría de la superficie de ataque clásica de aplicaciones web: no hay SQLi/NoSQLi posible (no hay base de datos), no hay CSRF posible (no hay endpoint que cambie estado en un servidor), no hay IDOR posible (no hay recursos con identificadores de acceso controlado), no hay sesión que fijar o robar (no hay sesión). El trabajo real de esta auditoría se concentró en: inyección del lado del cliente (XSS/construcción de URLs), cabeceras HTTP/CSP, control de acceso de las rutas dinámicas, cadena de suministro de dependencias, exposición de secretos, y exactitud de la divulgación de privacidad frente al comportamiento real del código.

## Cobertura

11 unidades de cobertura, todas cerradas (`covered` o `candidate`, ninguna `planned`/`deferred`/`blocked`). Dos pasadas de crítica de cobertura: la primera encontró un hueco real (la exclusión inicial de `CLOUD-AND-DEPLOYMENT.md` citaba un documento que aún no existía) y se corrigió agregando la unidad 11; la segunda pasada final confirmó cobertura completa sin huecos adicionales.

| Subsistema | Clase de ataque | Resultado |
|---|---|---|
| Formularios (cotización, contacto) | XSS / construcción de URL (WhatsApp) | Sin hallazgos — `encodeURIComponent` aplicado correctamente una sola vez |
| Formularios | Lógica de negocio / honeypot antispam | Sin hallazgos — honeypot verificado con repro real de Zod |
| Cabeceras HTTP (`next.config.ts`) | Inyección de cabeceras de respuesta, CSP | Sin hallazgos — CSP correctamente alcanzada, sin fuentes/scripts externos sin declarar |
| Cabeceras HTTP | Clickjacking | Sin hallazgos — `frame-ancestors`/`X-Frame-Options` consistentes, sin uso de iframes en el sitio |
| Rutas dinámicas `[slug]` | Control de acceso | Sin hallazgos — conjunto cerrado, `notFound()` correcto, comparación estricta |
| Dependencias (`package.json`) | Confusión de origen/namespace | Sin hallazgos — todas las dependencias resuelven contra el registro oficial de npm con hashes de integridad |
| Dependencias | Inclusión accidental en el build | Sin hallazgos — `public/` solo contiene activos intencionales |
| Secretos (historial git completo, ambas ramas) | Credenciales expuestas | Sin hallazgos — 0 coincidencias en 30 commits |
| Privacidad/legal (Ley 1581 de 2012) | Exactitud de divulgación | **1 hallazgo confirmado (medio) — corregido en esta sesión** |
| Código general (barrido tipo IA) | Exposiciones obvias | Sin hallazgos |
| Despliegue (agregada por la crítica de cobertura) | Alcance real de headers en producción | **1 hallazgo `needs_validation` — ver CLOUDFLARE_HOSTINGER.md** |

## Hallazgos

### 1. [CONFIRMADO — Medio] Política de Tratamiento de Datos no revelaba a WhatsApp/Meta como destinatario real

La política nunca mencionaba a WhatsApp ni a Meta como receptor de los datos, y su sección de "Conservación y seguridad" afirmaba que INGECAR conservaba los datos con sus propias medidas de seguridad — cuando en realidad el sitio no tiene backend: el 100% de los datos enviados por ambos formularios va directo a WhatsApp vía `window.open()`. Confirmado de forma independiente por dos agentes sin contexto compartido entre sí. **Corregido en esta sesión** (commit `94c8324`, verificado sin regresiones) — ver `SECURITY_FIXES.md` y `PRIVACY_COMPLIANCE.md`.

### 2. [NEEDS_VALIDATION] Alcance real de los headers de seguridad en producción

No es determinable desde el código si Hostinger servirá el sitio como proceso Node (`next start`, que sí aplica los headers de `next.config.ts`) o como export estático (que nunca los aplicaría). Un documento de planeación temprana (`BLUEPRINT.md`, fuera de este repositorio) todavía nombra a Vercel como hosting. Ver `CLOUDFLARE_HOSTINGER.md` para el plan de validación exacto una vez desplegado.

## Riesgo residual declarado explícitamente

- `script-src`/`style-src` de la CSP incluyen `'unsafe-inline'` sin nonces — hoy sin impacto real (cero `dangerouslySetInnerHTML`/`eval` en todo el código), pero es defensa en profundidad reducida si en el futuro se agrega algún script inline. Usar nonces exigiría desactivar el Partial Prerendering de todo el sitio — decisión ya documentada, no un descuido.
- La cadena de dependencias del CLI `shadcn` tiene 2 hallazgos "low" + hasta 4 "moderate" (según se incluyan devDependencies) en `npm audit` — nunca importados en `src/`, nunca empaquetados en el sitio publicado. Riesgo aceptado.
- El modo real de despliegue en Hostinger no está confirmado (ver hallazgo 2).
- `.gitignore` no cubre explícitamente `*.key`/`credentials*`/`id_rsa*`/`.npmrc` (sí cubre `.env*`/`*.pem`). Ningún archivo de ese tipo existe hoy en el repositorio ni en su historial — es endurecimiento preventivo, no una brecha activa.
- Esta auditoría **no certifica cumplimiento legal** — ver `PRIVACY_COMPLIANCE.md`.

**Nunca se afirma que el sitio sea 100% invulnerable.** Esto es el estado verificado hoy, sobre la arquitectura actual, con la evidencia que se detalla en cada documento de esta carpeta.
