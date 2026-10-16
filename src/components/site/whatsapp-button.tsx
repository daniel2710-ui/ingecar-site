import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hola, quiero más información sobre los servicios de INGECAR.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95 motion-safe:hover:scale-105"
      style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}
    >
      <MessageCircle className="size-7" fill="white" strokeWidth={0} />
    </a>
  );
}
