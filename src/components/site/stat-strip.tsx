import { StatCounter } from "@/components/site/stat-counter";

const stats = [
  { num: "1992", desc: "Año de constitución" },
  { num: "163", desc: "Referencias contractuales" },
  { num: "Nacional", desc: "Cobertura en Colombia" },
];

export function StatStrip() {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-xl bg-surface-dark px-6 py-8 sm:grid-cols-3 sm:px-10">
      {stats.map((s) => (
        <div key={s.desc}>
          <StatCounter
            value={s.num}
            className="font-data text-2xl font-medium text-surface-dark-foreground sm:text-3xl"
          />
          <p className="mt-1 text-xs text-surface-dark-muted sm:text-sm">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
