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
 * Reserved for single featured/hero images (homepage portfolio cards,
 * project and article detail pages) — never for every thumbnail in a
 * dense grid, where it would turn into visual noise.
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
