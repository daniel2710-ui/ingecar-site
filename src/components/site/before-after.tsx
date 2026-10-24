"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "cn";

/**
 * Accessible before/after comparison slider. Backed by a native range input
 * for keyboard/screen-reader support; the visual split uses clip-path so it
 * stays GPU-cheap. Pass srcAntes/srcDespues for real project photography;
 * falls back to the placeholder panels when a project doesn't have one yet
 * (never invent a photo for a project that doesn't have real photography).
 */
export function BeforeAfter({
  label,
  beforeLabel = "Antes",
  afterLabel = "Después",
  srcAntes,
  srcDespues,
  className,
}: {
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  srcAntes?: string;
  srcDespues?: string;
  className?: string;
}) {
  const [value, setValue] = useState(50);

  return (
    <div className={cn("relative select-none overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#E2E7E1] text-[#6E7A74]">
        {srcDespues ? (
          <Image
            src={srcDespues}
            alt={label ? `${label} — después` : "Después"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase">
              {afterLabel} · Foto pendiente
            </span>
            {label ? <span className="px-3 text-center text-xs font-medium opacity-70">{label}</span> : null}
          </>
        )}
      </div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#DCE6DF] text-[#6E7A74]"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        {srcAntes ? (
          <Image
            src={srcAntes}
            alt={label ? `${label} — antes` : "Antes"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase">
            {beforeLabel} · Foto pendiente
          </span>
        )}
      </div>

      {/* Input comes before the handle in DOM order so peer-focus-visible below
          can target it (peer only ever selects a following sibling). It still
          receives every pointer/touch/keyboard event even though the handle
          paints on top, because the handle is pointer-events-none. */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Comparar antes y después${label ? `: ${label}` : ""}`}
        className="peer absolute inset-0 h-full w-full cursor-grab appearance-none bg-transparent opacity-0 active:cursor-grabbing"
      />

      {/* Divider handle, purely visual — follows the range input's value.
          peer-focus-visible gives keyboard users a visible focus state,
          since the real input underneath is fully transparent. */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md ring-2 ring-transparent transition-shadow duration-150 peer-focus-visible:ring-ring">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 3 1 8l4 5M11 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
