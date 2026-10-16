import { cn } from "cn";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-data text-xs uppercase tracking-[0.08em] text-muted-foreground", className)}>
      {children}
    </p>
  );
}
