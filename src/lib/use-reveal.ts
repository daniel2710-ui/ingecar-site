"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport, then disconnects.
 * Used to trigger entrance motion without a scroll listener.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(rootMargin = "0px 0px -40px 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver support — show content immediately rather than
    // leaving it permanently hidden.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );
    observer.observe(el);

    // Safety net: if the observer never fires (tab backgrounded at mount,
    // a sizing edge case, etc.), never leave content stuck invisible.
    const fallback = window.setTimeout(() => setVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [rootMargin]);

  return { ref, visible };
}
