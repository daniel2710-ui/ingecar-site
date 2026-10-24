"use client";

import { useReveal } from "@/lib/use-reveal";
import { cn } from "cn";

/**
 * Grayscale-to-color reveal for team/group photography — adapted from the
 * duotone color-pop treatment observed on gridfly.framer.website (there it's
 * a static pre-edited cutout; here it's a one-time scroll-triggered filter
 * transition, since we only have unedited photos). Settles in desaturated,
 * resolves to full color once in view.
 */
export function DuotoneReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[filter] duration-[900ms] ease-[var(--ease-out)] motion-reduce:filter-none motion-reduce:transition-none",
        visible ? "grayscale-0" : "grayscale",
        className
      )}
    >
      {children}
    </div>
  );
}
