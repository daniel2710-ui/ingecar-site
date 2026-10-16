"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "cn";

/**
 * Scroll-scrubbed image reveal: a bottom-up clip-path wipe + gentle scale
 * settle, tied 1:1 to scroll position (not autoplayed, not pinned) so it
 * never slows the user down on the way to a CTA further down the page.
 *
 * Used only for the homepage's featured-portfolio cards — this is the
 * site's one "signature" scroll move, not a pattern to repeat on every grid.
 */
export function CinematicReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !imageRef.current) return;

      gsap.set(imageRef.current, {
        clipPath: "inset(0% 0% 18% 0%)",
        scale: 1.08,
        transformOrigin: "center bottom",
      });

      gsap.to(imageRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 0.6,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={imageRef} className="size-full">
        {children}
      </div>
    </div>
  );
}
