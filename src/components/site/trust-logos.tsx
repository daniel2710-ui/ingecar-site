import { clientesAutorizados } from "@/lib/data/clientes";

export function TrustLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
      {clientesAutorizados.map((c) => (
        <span
          key={c.nombre}
          className="font-heading text-lg font-bold text-foreground/35 sm:text-xl"
        >
          {c.nombre}
        </span>
      ))}
    </div>
  );
}
