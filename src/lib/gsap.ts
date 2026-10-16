"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Single registration point — importing this module anywhere is enough;
// gsap no-ops a repeat registerPlugin call, but we still only want one
// call site so plugin config (if any gets added later) lives in one place.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
