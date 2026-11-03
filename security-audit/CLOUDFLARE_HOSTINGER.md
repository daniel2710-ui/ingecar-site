# Cloudflare + Hostinger — checklist de hardening para el despliegue

**No se realizó ningún cambio en paneles externos, DNS, nameservers ni registros de correo.** Este documento es exclusivamente de preparación/documentación, como lo exige el encargo. Nada aquí se "aplicó" — todo requiere acceso a Cloudflare/Hostinger que esta sesión no tiene.

## ⚠️ Decisión previa requerida: confirmar el modo de despliegue en Hostinger

Antes de cualquier otra configuración, hay que resolver esto (ver hallazgo `deployment-target-headers-reachability-unknown` en `SECURITY_AUDIT.md`):

Este sitio usa **Partial Prerendering** (`cacheComponents: true` en `next.config.ts`, activo en `/portafolio/[slug]` y `/servicios/[slug]`) y define cabeceras de seguridad propias vía `next.config.ts` → `headers()`. Ambas cosas **requieren que Next.js corra como proceso Node** (`next start` o equivalente) — **no funcionan** en un hosting compartido tipo cPanel que solo sirve archivos estáticos.

- Si Hostinger lo aloja como **VPS o plan con soporte Node.js** ejecutando `next start` (o `next build` + un proceso administrado como PM2): correcto, todo lo auditado aplica tal cual.
- Si Hostinger lo aloja como **hosting compartido/cPanel tradicional** sirviendo archivos estáticos: las rutas `/portafolio/[slug]` y `/servicios/[slug]` **no funcionarán en absoluto** (no es solo un problema de headers — el sitio se rompe visiblemente), y habría que exportar el sitio como estático (`output: "export"`), lo cual además **elimina** el Partial Prerendering y obligaría a quitar `cacheComponents: true`.

Se encontró un documento de planeación temprana (`/Users/mymac/INGECAR/BLUEPRINT.md`, fuera de este repositorio) que todavía nombra **Vercel** como hosting — de una fase de planeación anterior a la arquitectura simplificada que realmente se construyó (ese documento también describe Supabase/Prisma/un panel admin que nunca se implementaron). Vale la pena archivarlo o actualizarlo para que nadie lo siga como referencia vigente.

**Recomendación**: confirmar con Hostinger qué plan específico se contrató antes de continuar con el resto de este checklist, ya que cambia varias respuestas abajo.

> ✅ **Actualización**: confirmaste que el plan de Hostinger sí soporta Node.js — el bloqueante de arriba queda resuelto. La guía paso a paso de abajo asume eso.

## Guía paso a paso (orden exacto)

Sigue estos pasos en este orden. Cada uno dice exactamente dónde hacer clic (los nombres de menú pueden variar ligeramente si Cloudflare/Hostinger rediseñan su panel, pero la estructura general se mantiene). Ninguno de estos pasos lo puedo ejecutar yo — necesitas acceso a las cuentas reales.

### Paso 0 — Antes de tocar nada: respalda el correo

1. Entra al panel de DNS actual del dominio (donde esté hoy `ingecarltda.com`, probablemente el cPanel del hosting viejo o el panel del registrador).
2. Busca la sección **"Zone Editor" / "DNS Zone" / "Registros DNS"** y anota (captura de pantalla o copia en un documento) **todos los registros MX** y cualquier registro `TXT` relacionado con correo (SPF, DKIM, DMARC — suelen verse como `v=spf1...`, `v=DKIM1...`, `v=DMARC1...`). Esto es lo que protege que el correo de INGECAR no se caiga al migrar.
3. Guarda también los registros `A`/`CNAME` actuales por si necesitas comparar después.

**No continúes al paso 1 sin tener esto guardado.**

### Paso 1 — Sube el sitio a Hostinger primero, sin tocar DNS todavía

1. En el panel de Hostinger, crea/confirma el entorno Node.js (hPanel → **Sitios web** → tu sitio → **Avanzado** → **Node.js**, o el VPS si es ese el plan).
2. Configura el comando de arranque como `npm run build` seguido de `npm run start` (o `next start` directamente), con la carpeta del repo subida vía git o SFTP.
3. Verifica que el sitio responde correctamente usando la URL/IP temporal que Hostinger te da (algo como `tudominio.hostinger.com` o la IP directa) — **antes de apuntar el dominio real ahí**. Esto evita que `ingecarltda.com` quede caído mientras depuras el despliegue.
4. Con esa URL temporal, corre: `curl -I https://<url-temporal>/` y `curl -I https://<url-temporal>/portafolio/<un-slug-real>` y confirma que ves `Content-Security-Policy`, `Strict-Transport-Security`, etc. en la respuesta (la lista completa está en `PRODUCTION_READINESS.md`). Si no aparecen, el proceso no está corriendo como `next start` — revisa el paso 1.1 antes de seguir.

### Paso 2 — Agrega el dominio a Cloudflare (sin activar el proxy todavía)

1. En el dashboard de Cloudflare, **Agregar un sitio** → escribe `ingecarltda.com`.
2. Cloudflare va a **escanear automáticamente** los registros DNS existentes e importarlos. Compara esa lista contra lo que guardaste en el Paso 0 — si falta algo (sobre todo MX/TXT de correo), agrégalo manualmente ahora, antes de seguir.
3. Para el registro que apunta el dominio al sitio (normalmente un `A` o `CNAME` hacia la IP/host de Hostinger): créalo o edítalo para que apunte al **nuevo** sitio en Hostinger (del Paso 1), pero **todavía sin cambiar los nameservers** — así no afecta nada en vivo mientras terminas de configurar.
4. **Los registros MX y los TXT de correo (SPF/DKIM/DMARC) deben quedar en modo "Solo DNS" (ícono de nube gris, no naranja)** — nunca proxificados. Proxificar un MX rompe el correo.
5. El registro que apunta al sitio web (`A`/`CNAME`) sí puede quedar proxificado (nube naranja) una vez confirmes que todo funciona.

### Paso 3 — Cambia los nameservers (el corte real)

1. Cloudflare te da dos nameservers propios (algo como `xxx.ns.cloudflare.com`).
2. En el panel del **registrador** del dominio (donde se compró `ingecarltda.com` — puede o no ser el mismo Hostinger), reemplaza los nameservers actuales por los de Cloudflare.
3. El cambio puede tardar entre unos minutos y 24-48 horas en propagarse globalmente. Durante ese lapso, verifica con `curl -I https://ingecarltda.com/` cada cierto tiempo hasta ver que responde desde el nuevo sitio.
4. **Verifica el correo inmediatamente después de que propague**: manda y recibe un correo de prueba a una cuenta de `@ingecarltda.com`. Si falla, revisa que los MX/TXT del Paso 2 quedaron exactamente iguales a los del Paso 0 y en modo "Solo DNS".

### Paso 4 — SSL/TLS en Cloudflare

1. Dashboard de Cloudflare → tu dominio → **SSL/TLS** → **Overview**.
2. **No pongas "Full (strict)" todavía si Hostinger no tiene un certificado TLS válido propio** — primero confirma en el panel de Hostinger que el sitio tiene un certificado activo (Hostinger normalmente emite uno automático vía Let's Encrypt una vez el dominio apunta ahí). Mientras tanto, usa modo **"Full"** (sin "strict").
3. Una vez confirmes el certificado de origen válido (puedes verificarlo con `curl -I https://<ip-o-host-de-hostinger>/` localmente, buscando que no dé error de certificado), cambia a **"Full (strict)"**.
4. En la misma sección **SSL/TLS** → **Edge Certificates**: activa **"Always Use HTTPS"**.

### Paso 5 — WAF y protección de bots

1. Dashboard → tu dominio → **Security** → **WAF**.
2. Activa el **"Cloudflare Managed Ruleset"** (disponible en el plan Free) — déjalo en modo por defecto, no necesitas reglas personalizadas para este sitio (no hay backend/API que proteger con reglas específicas).
3. **Security** → **Bots**: si estás en plan Free, actívalo "Bot Fight Mode"; si tienes un plan pagado, "Super Bot Fight Mode". Esto frena scraping agresivo del sitio y del PDF de certificaciones.
4. **Importante**: después de activar esto, visita el sitio tú mismo desde un navegador normal (no solo `curl`) para confirmar que no te bloquea a ti ni rompe nada visualmente.

### Paso 6 — Asegura el origen (opcional pero recomendado)

1. Si el plan de Hostinger lo permite, restringe el firewall del servidor para aceptar tráfico solo desde los [rangos de IP de Cloudflare](https://www.cloudflare.com/ips/) — así nadie puede saltarse Cloudflare y golpear Hostinger directamente. Esto depende de qué controles de firewall expone tu plan específico de Hostinger; si no tienes esa opción, no es bloqueante, solo una capa extra.

### Paso 7 — MFA en las cuentas

1. Activa verificación en dos pasos en tu cuenta de **Cloudflare** (**My Profile** → **Authentication**).
2. Activa verificación en dos pasos en tu cuenta de **Hostinger** (hPanel → configuración de cuenta → Seguridad).

### Paso 8 — Verificación final

Corre exactamente esto y confirma que todo sale bien, antes de dar el sitio por "publicado de verdad":

```bash
curl -I https://ingecarltda.com/
curl -I https://ingecarltda.com/portafolio/<un-slug-real>
```

Busca en la respuesta: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`. Si todos aparecen en ambas rutas, el despliegue quedó exactamente como lo verificó la auditoría. Si falta alguno, revisa el Paso 1 (puede que no esté corriendo como `next start`) antes de nada más.

Avísame cuando tengas el dominio respondiendo (en la URL temporal de Hostinger o ya en el dominio real) y te ayudo a correr esta verificación.

---

## Checklist de referencia (detalle por ítem)

## Cloudflare

| Ítem | Estado | Notas |
|---|---|---|
| WAF (Web Application Firewall) | **Pendiente — requiere panel** | Activar el conjunto de reglas administradas de Cloudflare. Disponible en el plan Free con reglas básicas; reglas más granulares requieren Pro o superior. |
| Reglas administradas | **Pendiente — requiere panel** | Usar el ruleset OWASP gestionado por Cloudflare como punto de partida. |
| Reglas personalizadas contra patrones maliciosos | **Pendiente — requiere panel** | Dado que no hay backend ni endpoints de API, el valor principal aquí es filtrar tráfico de scraping/bots agresivo contra las páginas estáticas, no proteger lógica de servidor (no existe). |
| Protección DDoS | **Incluida por defecto en cualquier plan de Cloudflare** | No requiere configuración adicional para la protección L3/L4 básica. |
| Bot protection / Managed Challenge | **Pendiente — requiere panel** | Relevante principalmente para frenar scraping masivo del sitio o abuso del PDF de certificaciones (33.9 MB, costoso de servir repetidamente); no protege nada que un atacante pueda "explotar" ya que no hay lógica de servidor que abusar. |
| Rate limiting por endpoint | **No aplica en el sentido clásico** | No hay endpoints de API que proteger. Si se quiere, puede limitarse la tasa de solicitudes a `/docs/certificaciones-ingecar.pdf` para evitar consumo excesivo de ancho de banda. |
| Cloudflare Turnstile | **No aplica directamente** | No hay formulario que envíe datos a un servidor propio que proteger de bots — ambos formularios son 100% cliente→WhatsApp. Si se nota abuso de WhatsApp vía scripting directo del enlace `wa.me` (ver `SECURITY_AUDIT.md`), Turnstile no mitigaría eso, ya que el ataque no pasa por el sitio una vez se conoce el número público. |
| SSL/TLS — modo Full (strict) | **Pendiente — requiere panel** | Recomendado una vez el origen (Hostinger) tenga certificado TLS válido propio. Confirmar que Hostinger emite/renueva certificado (ver sección Hostinger abajo) antes de activar "Full (strict)" — si el origen no tiene TLS válido, "Full (strict)" rompe el sitio. |
| HTTPS obligatorio | **Pendiente — requiere panel** | Activar "Always Use HTTPS" en Cloudflare una vez el certificado de origen esté confirmado. |
| Protección de DNS | **Pendiente — requiere panel** | Asegurar que los registros DNS del dominio `ingecarltda.com` estén proxificados (ícono naranja) donde corresponda, para que el WAF/DDoS de Cloudflare realmente intercepte el tráfico. |
| DNSSEC | **Pendiente — requiere panel, y coordinación con el registrador del dominio** | Recomendado, pero de menor urgencia dado que este sitio no maneja datos sensibles de servidor. |
| HSTS | **Ya implementado en el código** (`next.config.ts`), `max-age=15552000`, sin `includeSubDomains` ni `preload` — ver razón en el propio comentario del código | **No ampliar** `includeSubDomains`/`preload` hasta confirmar que **todos** los subdominios de `ingecarltda.com` (incluyendo el correo existente, que debe preservarse según el encargo) sirven HTTPS correctamente. `preload` es prácticamente irreversible una vez un navegador lo adopta. |
| Protección contra bypass del proxy hacia el origen | **Pendiente — requiere panel** | Configurar el firewall de origen en Hostinger (si el plan lo permite) para aceptar tráfico solo desde los rangos de IP de Cloudflare, evitando que alguien golpee el servidor de Hostinger directamente saltándose Cloudflare. |
| Security Events / observabilidad | **Pendiente — requiere panel** | Revisar el log de eventos de seguridad de Cloudflare periódicamente una vez el WAF esté activo. |
| Caché segura / exclusión de contenido sensible | **Revisado — sin contenido sensible que excluir** | El sitio no tiene páginas con datos de usuario individuales, carritos, ni paneles — todo el contenido es público por diseño. El PDF de certificaciones es intencionalmente público. No se requiere "cache bypass" para ninguna ruta. |
| Compatibilidad con Googlebot y servicios legítimos | **Revisar al activar Bot Protection** | Confirmar que las reglas de bot management no bloqueen crawlers legítimos (Googlebot, Bingbot) — importante dado que SEO es un objetivo explícito del sitio. |

**Nota sobre el plan contratado**: no se puede determinar desde aquí qué funciones están disponibles en el plan de Cloudflare que la empresa tenga o vaya a contratar (Free vs. Pro vs. Business). WAF básico y DDoS L3/L4 están en el plan Free; reglas personalizadas avanzadas, Bot Management completo y algunas funciones de caché avanzada requieren planes de pago — **no se recomienda contratar nada sin aprobación explícita**, conforme a la regla "no uses servicios pagos sin aprobación".

## Hostinger

| Ítem | Estado | Notas |
|---|---|---|
| Confirmar modo de hosting (Node/VPS vs. compartido estático) | **Bloqueante — ver sección arriba** | Determina si el sitio tal como está construido (con PPR) puede funcionar ahí sin modificaciones. |
| Configuración segura de producción | **Pendiente — requiere acceso al servidor** | Si es Node/VPS: usar un gestor de procesos (PM2 o similar) con reinicio automático, usuario sin privilegios root para el proceso Node. |
| Actualizaciones del entorno | **Pendiente** | Mantener Node.js en una versión LTS soportada; este proyecto se desarrolló y probó con Node 20. |
| Protección de secretos | **No aplica actualmente** | El sitio no usa ninguna variable de entorno con secretos (`process.env` solo se usa para `NODE_ENV`, confirmado exhaustivamente en la auditoría). Si en el futuro se agrega algo que sí requiera secretos (ej. envío de correo transaccional), deben ir como variables de entorno del servidor, nunca en el código. |
| Permisos mínimos | **Pendiente — requiere acceso al panel** | El proceso que sirve el sitio no debería correr como usuario con privilegios administrativos del hosting. |
| Protección del servidor de origen | **Pendiente — ver "bypass del proxy" arriba** | Idealmente el servidor de Hostinger solo acepta tráfico de Cloudflare. |
| Certificados TLS | **Pendiente — requiere panel** | Confirmar que Hostinger emite/renueva automáticamente (Let's Encrypt u otro) y que el certificado cubre el dominio y los subdominios necesarios, incluyendo los usados por el correo existente. |
| MFA en cuentas administrativas | **Pendiente — requiere panel** | Activar MFA en la cuenta de Hostinger y en la cuenta de Cloudflare que administran el sitio. |
| Respaldos | **Pendiente — requiere panel** | Confirmar si Hostinger ofrece respaldos automáticos del hosting; dado que este sitio es 100% reproducible desde el repositorio git (sin base de datos ni estado del lado del servidor), el respaldo más importante en la práctica es el propio repositorio git, no el servidor. |
| Restauración | **Pendiente — requiere panel** | Documentar el procedimiento de rollback: dado que no hay base de datos, "restaurar" en la práctica es volver a desplegar un commit anterior del repositorio. |
| Registros de errores | **Pendiente — requiere acceso al servidor** | Confirmar dónde Hostinger expone los logs del proceso Node (si aplica) para poder diagnosticar errores 500 sin exponerlos públicamente (Next.js en modo producción ya no muestra stack traces a los visitantes por defecto — confirmado en la auditoría de código). |
| Monitoreo | **Pendiente — requiere panel** | Configurar alguna forma de monitoreo de uptime (Hostinger puede ofrecerlo, o un servicio externo gratuito tipo UptimeRobot). |
| Separación de entornos | **No aplica actualmente** | Sitio sin entorno de staging separado; dado que no hay base de datos ni estado persistente del lado del servidor, el riesgo de no tener staging es bajo — los cambios se pueden verificar con `npm run build` localmente antes de desplegar. |
| Prevención de exposición de servicios internos | **Confirmado desde el código — sin servicios internos que exponer** | No hay paneles de administración, no hay endpoints de API, no hay rutas de debug/health/metrics (verificado exhaustivamente, ver `SECURITY_AUDIT.md`). |

## Dominio y correo (`ingecarltda.com`)

Siguiendo la instrucción explícita del encargo: **no se tocó ningún registro DNS, nameserver, ni configuración de correo**, y se preserva la configuración de correo existente aunque no aparezcan cuentas visibles en el cPanel anterior (puede haber cuentas de correo activas no visibles en esta revisión). Antes de cualquier cambio de DNS/nameservers al migrar de cPanel a Hostinger:

1. Exportar/documentar los registros MX actuales del dominio **antes** de cualquier cambio de nameservers, para poder restaurarlos exactamente igual en el nuevo proveedor.
2. Confirmar con quien administra el correo de INGECAR que ninguna cuenta de correo existente se verá afectada por el cambio de hosting del sitio web.
3. Si se usa Cloudflare como proxy DNS, los registros MX deben quedar **sin proxificar** (DNS only / ícono gris), nunca proxificados — proxificar un registro MX rompe el correo.

Estos pasos requieren acceso real a los paneles de DNS/Hostinger/Cloudflare, que esta sesión no tiene — se documentan como guía para quien sí tenga ese acceso.
