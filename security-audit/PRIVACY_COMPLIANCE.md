# Evaluación de privacidad — Ley 1581 de 2012

**No se certifica cumplimiento legal definitivo.** Este documento es una evaluación técnica (exactitud del código frente a lo que se declara) más una lista de puntos que requieren revisión por un abogado especializado en protección de datos antes de considerarse definitivos. Ningún dato jurídico de INGECAR fue inventado — donde faltaba información (identidad legal, finalidades específicas), se usó únicamente lo ya presente en el código existente.

## Lo que se auditó

| Documento/mecanismo | Archivo | Estado |
|---|---|---|
| Política de Tratamiento de Datos Personales | `src/app/legal/politica-tratamiento-datos/page.tsx` | **Corregida esta sesión** — ver abajo |
| Política de Cookies | `src/app/legal/politica-cookies/page.tsx` | Revisada, exacta frente al código (confirmado: cero cookies/rastreadores en todo el sitio) |
| Términos y Condiciones | `src/app/legal/terminos-condiciones/page.tsx` | Revisada, sin claims falsos detectados |
| Checkbox de consentimiento (`tratamientoDatos`) | `quote-form.tsx`, `contacto/page.tsx` | Revisado — correcto |
| Checkbox de comunicaciones comerciales (`comunicacionesMarketing`) | `quote-form.tsx` | Revisado — correcto |

## Hallazgo corregido: divulgación de WhatsApp/Meta como destinatario

**Antes**: la Política de Tratamiento de Datos no mencionaba a WhatsApp ni a Meta en ningún punto, y afirmaba que los datos "se conservan... con medidas técnicas y organizativas razonables" de INGECAR — pero el sitio no tiene servidor propio: el 100% de los datos enviados por los formularios va directo a WhatsApp.

**Después** (commit `94c8324`): se agregó la sección "3. Transmisión a terceros", nombrando explícitamente a WhatsApp (WhatsApp LLC / Meta Platforms, Inc.) como destinatario, señalando la posible transferencia internacional de datos implicada, y corrigiendo la sección de conservación para que no implique almacenamiento propio inexistente.

**Texto propuesto** (ya aplicado en el código, reproducido aquí para revisión legal en un solo lugar):

> **3. Transmisión a terceros**
> INGECAR LTDA. no cuenta con un servidor o base de datos propia para almacenar las solicitudes enviadas por estos formularios. Al hacer clic en "Enviar", tu navegador arma un enlace de WhatsApp con los datos que diligenciaste y los transmite directamente a WhatsApp (servicio operado por WhatsApp LLC / Meta Platforms, Inc.), que los entrega a la cuenta de WhatsApp Business de nuestro equipo. Esta transmisión puede implicar una transferencia internacional de datos, y el tratamiento posterior de tu información dentro de WhatsApp se rige por la política de privacidad de ese servicio, no por esta.
>
> **5. Conservación y seguridad**
> Una vez recibida en nuestra cuenta de WhatsApp, conservamos tu información durante el tiempo necesario para cumplir con la finalidad para la que fue recolectada y las obligaciones legales aplicables. Como no operamos un sistema propio de almacenamiento para estas solicitudes, el ejercicio de tus derechos de supresión sobre esa copia depende también de las herramientas que WhatsApp pone a disposición de nuestra cuenta.

## Puntos que requieren revisión jurídica profesional (no resueltos aquí, por diseño)

Estos son juicios legales, no defectos de código — se listan explícitamente para que un abogado los resuelva, en vez de que el código asuma una respuesta:

1. **¿La transmisión vía `wa.me` constituye "transferencia internacional" bajo el Art. 26 de la Ley 1581, y si es así, qué excepción la legitima** (ej. autorización expresa del titular) ante la ausencia de Cláusulas Contractuales Estándar o Reglas Corporativas Vinculantes con WhatsApp/Meta? El texto propuesto usa lenguaje condicional ("puede implicar") precisamente para no prejuzgar esta pregunta.
2. **¿Incrustar el mensaje completo (nombre, teléfono, correo, detalle del proyecto) como parámetro de una URL (`?text=...`) cumple el estándar de "medidas técnicas y organizativas razonables"** que exige la ley, dado que ese dato puede quedar en el historial del navegador del visitante? Esto es una decisión de arquitectura (usar un enlace `wa.me` en vez de, por ejemplo, la API de WhatsApp Business vía un backend propio) que excede el alcance de un ajuste de texto.
3. **¿El checkbox de autorización actual (`tratamientoDatos`, obligatorio, vinculado a esta política) sigue siendo suficiente** ahora que la política revela expresamente el destino WhatsApp/Meta, o requiere lenguaje adicional específico sobre esa transferencia?
4. La frase ya existente en `politica-cookies/page.tsx` ("Algunos botones del sitio te redirigen a WhatsApp u otros servicios externos...") queda duplicada en espíritu con la nueva sección 3 de la política de tratamiento de datos. No es una contradicción, pero un abogado podría preferir consolidar ambas menciones o referenciarlas cruzadamente — se dejó así deliberadamente (cambio mínimo, no se tocó la política de cookies) para no alterar un documento que ya era exacto.
5. **Dirección de contacto del responsable** (`gerencia.ingecarltda@gmail.com`, usada en toda la política como canal para ejercer derechos) es una cuenta de Gmail personal/genérica en vez de un correo de dominio corporativo dedicado a privacidad — válido legalmente, pero un abogado o el equipo de INGECAR podría preferir un canal dedicado (ej. `datos@ingecarltda.com`) para procesos de solicitudes de derechos ARCO más trazables.
6. Verificación de que la identificación del responsable ("Ingeniería del Caribe LTDA. (INGECAR LTDA.)") y las referencias normativas (Ley 1581 de 2012, Decreto 1377 de 2013) sean las correctas y completas para la naturaleza jurídica actual de la empresa — esto no se puede confirmar desde el código, solo se preservó lo que ya estaba.

## Lo que ya estaba correcto (confirmado, no requiere cambio)

- El checkbox `tratamientoDatos` es obligatorio y **no viene premarcado** (sin `defaultValue` que lo fuerce a `true`).
- El checkbox `comunicacionesMarketing` es opcional, separado del anterior, y **su valor por defecto es explícitamente `false`** (no premarcado) — cumple el principio de que el consentimiento para comunicaciones comerciales debe ser independiente del consentimiento necesario para atender la solicitud.
- La Política de Cookies afirma correctamente que el sitio no usa cookies ni rastreadores — verificado de forma exhaustiva e independiente (grep por los nombres de todas las herramientas de analítica/tracking comunes: Google Analytics, Meta Pixel, Hotjar, Clarity, PostHog, Segment, Mixpanel, Plausible, Vercel Analytics, además de `document.cookie`/`localStorage`/`sessionStorage` — cero coincidencias en todo el código).
- Los formularios no tienen capacidad de adjuntar archivos, y la política ya no afirma lo contrario (corrección de una sesión anterior, re-verificada en esta auditoría).
