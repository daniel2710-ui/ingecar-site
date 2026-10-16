"use client";

import { Children, type ReactNode } from "react";
import { cn } from "cn";
import { useReveal } from "@/lib/use-reveal";

/**
 * Wraps a set of siblings (grid cards, hero text blocks) and staggers their
 * entrance once the group enters the viewport. One observer per group,
 * not per child. Respects prefers-reduced-motion via motion-reduce:.
 */
export function RevealGroup({
  children,
  className,
  itemClassName,
  stagger = 70,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
}) {
  const { ref, visible } = useReveal();
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          // Observe the first item's box, not the group container — the
          // container may render with `display: contents` (see hero usage),
          // which generates no box for IntersectionObserver to measure.
          ref={i === 0 ? ref : undefined}
          style={{ transitionDelay: visible ? `${i * stagger}ms` : "0ms" }}
          className={cn(
            "transition-[opacity,transform] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none motion-reduce:translate-y-0",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            itemClassName
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
