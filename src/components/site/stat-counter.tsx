"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/lib/use-reveal";

function useCountUp(target: number, visible: boolean, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const id = window.setTimeout(() => setValue(target), 0);
      return () => window.clearTimeout(id);
    }

    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);

  return value;
}

/**
 * Counts up to a verified figure once, on first view. Non-numeric values
 * (certification names, "Nacional") render as plain static text — nothing
 * to count. Screen readers get the real value immediately via a visually
 * hidden element, independent of the animation, per the brief's explicit
 * accessibility requirement — they never have to track a ticking number.
 */
export function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null;
  const animated = useCountUp(numeric ?? 0, visible);

  if (numeric === null) {
    return (
      <p ref={ref} className={className}>
        {value}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      <span aria-hidden="true">{animated}</span>
      <span className="sr-only">{value}</span>
    </p>
  );
}
