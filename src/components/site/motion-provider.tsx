"use client";

import { MotionConfig } from "motion/react";

/**
 * Sitewide reduced-motion gate for every `motion.*` component: `"user"`
 * makes Motion automatically honor `prefers-reduced-motion` (crossfades
 * instead of transform/layout animations) without a per-component check.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
