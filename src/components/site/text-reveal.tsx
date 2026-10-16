"use client";

import { useReveal } from "@/lib/use-reveal";
import { cn } from "cn";

/**
 * Masked vertical reveal for a headline — the text rises into view behind
 * an overflow-hidden edge, once, on first appearance. Wraps inline content
 * inside the real heading tag (no DOM text splitting), so screen readers
 * and SEO crawlers see the heading exactly as written.
 */
export function TextReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();

  return (
    <span ref={ref} className={cn("block overflow-hidden", className)}>
      <span
        style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
        className={cn(
          "block transition-[transform,opacity] duration-[var(--duration-editorial)] ease-[var(--ease-out)] motion-reduce:transition-none motion-reduce:translate-y-0",
          visible ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
        )}
      >
        {children}
      </span>
    </span>
  );
}
