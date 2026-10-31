# Cambios implementados — auditoría de seguridad

Este documento traza cada cambio real aplicado al código durante esta auditoría, con su justificación. Para el historial completo de endurecimiento de sesiones anteriores (headers HTTP, honeypot, límites de longitud, `npm audit fix`, correcciones legales previas), ver los commits `e505eb8` y posteriores en el historial de git — este documento cubre específicamente lo producido por la auditoría formal `security-audit` de esta sesión.

## Cambio 1 — Política de Tratamiento de Datos: revela a WhatsApp/Meta como destinatario real

**Archivo**: `src/app/legal/politica-tratamiento-datos/page.tsx`
**Commit**: `94c8324`
**Hallazgo que corrige**: `privacy-policy-undisclosed-whatsapp-third-party-transmission` (confirmado, severidad media)

**Qué cambió**:
- Se agregó la sección "3. Transmisión a terceros", nombrando explícitamente a WhatsApp (operado por WhatsApp LLC / Meta Platforms, Inc.) como el destinatario real de los datos enviados por ambos formularios, con mención de la posible transferencia internacional de datos implicada.
- Se reescribió la sección "Conservación y seguridad" (ahora "5.") para que no implique que INGECAR almacena o asegura los datos con sistemas propios — ya que no existe backend alguno. Ahora describe con precisión que la conservación ocurre dentro de la cuenta de WhatsApp Business del equipo, y que el ejercicio de derechos de supresión depende de las herramientas de WhatsApp.
- Las secciones siguientes se renumeraron en cascada (3→4 "Derechos del titular", 4→5 "Conservación y seguridad", 5→6 "Contacto") sin romper ninguna referencia — se verificó que ningún otro archivo del sitio cita números de sección de esta política.

**Por qué**: la política original describía un modelo convencional de "la empresa recolecta y almacena tus datos", pero el sitio no tiene servidor ni base de datos — es un defecto real de exactitud en la divulgación frente al comportamiento verificable del código, no una opinión de estilo.

**Alcance del cambio**: puramente documental/de texto. No se modificó el mecanismo de envío de los formularios (ya era técnicamente correcto — `encodeURIComponent` aplicado correctamente, sin inyección posible — el problema era exclusivamente que la política no lo reflejaba con precisión).

**Verificación**: ver `SECURITY_TEST_RESULTS.md`. Resumen: `tsc`/`lint`/`build` limpios, 34/34 rutas, headers HTTP confirmados por `curl` en ruta estática y en ruta PPR tras el cambio, texto renderizado verificado en navegador, y una segunda pasada de auditoría independiente (agente sin contexto del primero) confirmó **VERIFIED-CORRECT** sin regresiones.

**Advertencia explícita**: este es un **borrador de texto legal para revisión profesional**, no una certificación de cumplimiento de la Ley 1581 de 2012. Ver `PRIVACY_COMPLIANCE.md` para los puntos que requieren validación jurídica antes de publicarse como definitivos.

## Hallazgo no corregido en código: alcance de headers en producción (`needs_validation`)

No se aplicó ningún cambio de código para el hallazgo `deployment-target-headers-reachability-unknown` porque **no es un defecto de código** — el `next.config.ts` ya está correcto y verificado; el bloqueo es puramente un hecho de despliegue no determinable desde el repositorio (ver `CLOUDFLARE_HOSTINGER.md`). Siguiendo la regla explícita de esta auditoría de no afirmar haber resuelto algo que requiere acceso a un panel externo, este hallazgo queda documentado con su plan de validación exacto, pendiente de que el sitio esté desplegado.

## Hallazgos de endurecimiento (`hardening`) identificados pero no aplicados en código esta sesión

Por disciplina de "corrección mínima" (Fase 8 del encargo: no corregir automáticamente hallazgos no confirmados que puedan introducir riesgo nuevo, y no hacer refactorizaciones no relacionadas), los siguientes quedan documentados como mejoras opcionales de bajo riesgo, no como hallazgos de seguridad:

- `src/components/site/quote-form.tsx` — el campo `servicioSlug` del esquema Zod no tiene `.max()` (impacto nulo: solo afecta al propio usuario si se fuerza vía consola, ya que la UI solo permite seleccionar de una lista fija).
- `src/app/servicios/[slug]/page.tsx` y `src/app/portafolio/[slug]/page.tsx` — agregar `export const dynamicParams = false;` haría que la garantía de "solo slugs del conjunto cerrado" sea estructural (aplicada por el framework) en vez de depender de que cada punto de consulta futuro recuerde verificar `null` antes de usar el resultado. Hoy el código ya maneja esto correctamente — es una mejora preventiva, no una corrección de un fallo existente.
- `package.json` — `shadcn` sigue listado en `dependencies` en vez de `devDependencies` (sin impacto real: nunca se importa en `src/`, por lo que Next.js nunca lo empaqueta).
- `public/{file,globe,next,vercel,window}.svg` — iconos de plantilla de `create-next-app` sin usar en ninguna parte; limpieza cosmética, no riesgo.
- `.gitignore` — agregar patrones explícitos para `*.key`, `credentials*`, `id_rsa*`, `.npmrc` (ninguno de estos existe hoy en el repositorio ni en su historial; es prevención, no corrección de una fuga ya ocurrida).

Ninguno de estos fue aplicado en código esta sesión porque ninguno corrige un hallazgo confirmado — se documentan aquí para que el equipo decida si los quiere programar como limpieza técnica futura.
