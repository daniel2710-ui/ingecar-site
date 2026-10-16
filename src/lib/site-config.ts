export const siteConfig = {
  nombre: "INGECAR LTDA.",
  nombreCompleto: "Ingeniería del Caribe LTDA.",
  email: "gerencia.ingecarltda@gmail.com",
  // Placeholder — INGECAR must provide the real WhatsApp Business number before launch.
  whatsappNumero: "573000000000",
  ciudad: "Barranquilla, Colombia",
  horario: "Lunes a viernes, 8:00 a.m. – 5:00 p.m.",
};

export function whatsappLink(mensaje?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumero}`;
  if (!mensaje) return base;
  return `${base}?text=${encodeURIComponent(mensaje)}`;
}
