# Checklist de preparación para producción

Estado al cierre de esta auditoría (`eff644e` → `94c8324` en `design/premium-upgrade`, árbol de trabajo limpio).

## ✅ Listo

- [x] Vulnerabilidades críticas y altas: **ninguna encontrada** en toda la auditoría.
- [x] Único hallazgo confirmado (severidad media, divulgación de privacidad): **corregido y verificado dos veces** (verificador independiente + segunda auditoría de regresión).
- [x] `tsc --noEmit`, `npm run lint`, `npm run build` limpios tras el fix.
- [x] Build de producción: 34/34 rutas, Partial Prerendering intacto.
- [x] Headers de seguridad (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options) verificados con `curl` contra un build de producción real, en ruta estática y en ruta PPR.
- [x] Cero secretos en el código o en el historial completo de git (ambas ramas, 30 commits).
- [x] Cero vulnerabilidades high/critical en dependencias (en cualquier alcance de `npm audit`).
- [x] Formularios: validación, límites de longitud y honeypot funcionando y verificados con repros reales.
- [x] Sin regresiones conocidas introducidas por el fix de esta auditoría.
- [x] Riesgos residuales declarados explícitamente (ver `SECURITY_AUDIT.md`), ninguno oculto.

## ⏳ Pendiente de tu decisión o de acceso externo (no se puede completar desde aquí)

- [ ] **Confirmar el modo de despliegue en Hostinger** (Node/VPS vs. hosting estático compartido) — bloqueante, determina si el sitio tal como está construido funciona ahí sin modificar `next.config.ts`. Ver `CLOUDFLARE_HOSTINGER.md`.
- [ ] Una vez desplegado: `curl -I` contra el dominio real para confirmar que los headers efectivamente llegan a producción (plan exacto en `security-audit/NEEDS-VALIDATION.md` dentro de la corrida del skill, resumido en `CLOUDFLARE_HOSTINGER.md`).
- [ ] Activar WAF, HTTPS obligatorio, y modo TLS "Full (strict)" en Cloudflare (requiere panel).
- [ ] Confirmar certificado TLS válido en el origen de Hostinger antes de activar "Full (strict)" en Cloudflare.
- [ ] MFA en las cuentas de Cloudflare y Hostinger que administran el sitio.
- [ ] Preservar los registros MX del dominio actual antes de cualquier cambio de nameservers al migrar de cPanel a Hostinger (no tocado en esta sesión, por instrucción explícita).
- [ ] Revisión jurídica profesional de los puntos listados en `PRIVACY_COMPLIANCE.md` antes de considerar el texto legal como definitivo.
- [ ] Archivar o actualizar `/Users/mymac/INGECAR/BLUEPRINT.md` (fuera de este repositorio) — todavía nombra Vercel/Supabase/Prisma de una fase de planeación anterior a la arquitectura realmente construida; puede confundir a quien lo lea después.

## 💡 Opcional — limpieza técnica de bajo riesgo (no bloqueante)

Ver la lista completa con justificación en `SECURITY_FIXES.md` § "Hallazgos de endurecimiento no aplicados":
- `dynamicParams = false` explícito en las dos rutas `[slug]`.
- Mover `shadcn` de `dependencies` a `devDependencies` en `package.json`.
- Eliminar los 5 SVG de plantilla de `create-next-app` sin usar en `public/`.
- Ampliar `.gitignore` con `*.key`, `credentials*`, `id_rsa*`, `.npmrc`.

## Nunca se afirma

Que el sitio sea 100% invulnerable, que el cumplimiento legal esté certificado, o que una medida que requiere un panel externo ya esté aplicada. Cada ítem de este checklist refleja exactamente lo que se verificó con evidencia reproducible — ver `SECURITY_TEST_RESULTS.md` para el detalle de cada prueba.
