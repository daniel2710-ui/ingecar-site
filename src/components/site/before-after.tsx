"use client";

import { useState } from "react";
import { cn } from "cn";

/**
 * Accessible before/after comparison slider. Backed by a native range input
 * for keyboard/screen-reader support; the visual split uses clip-path so it
 * stays GPU-cheap. Panels are styled placeholders (no real project photography
 * exists yet) — swap PanelBefore/PanelAfter for next/image once photos land.
 */
export function BeforeAfter({
  label,
  beforeLabel = "Antes",
  afterLabel = "Después",
  className,
}: {
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [value, setValue] = useState(50);

  return (
    <div className={cn("relative select-none overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#E2E7E1] text-[#6E7A74]">
        <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase">
          {afterLabel} · Foto pendiente
        </span>
        {label ? <span className="px-3 text-center text-xs font-medium opacity-70">{label}</span> : null}
      </div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#DCE6DF] text-[#6E7A74]"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase">
          {beforeLabel} · Foto pendiente
        </span>
      </div>

      {/* Divider handle, purely visual — follows the range input's value */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 3 1 8l4 5M11 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Comparar antes y después${label ? `: ${label}` : ""}`}
        className="absolute inset-0 h-full w-full cursor-grab appearance-none bg-transparent opacity-0 active:cursor-grabbing"
      />
    </div>
  );
}
