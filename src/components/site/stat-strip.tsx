const stats = [
  { num: "1992", desc: "Año de constitución" },
  { num: "163", desc: "Referencias contractuales" },
  { num: "OHSAS 18001", desc: "Certificación 2011" },
  { num: "Nacional", desc: "Cobertura en Colombia" },
];

export function StatStrip() {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-xl bg-primary px-6 py-8 sm:grid-cols-4 sm:px-10">
      {stats.map((s) => (
        <div key={s.desc}>
          <p className="font-data text-2xl font-medium text-white sm:text-3xl">{s.num}</p>
          <p className="mt-1 text-xs text-primary-foreground/65 sm:text-sm">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
