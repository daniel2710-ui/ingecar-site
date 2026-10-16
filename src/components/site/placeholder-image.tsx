import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "cn";

const tones = [
  "bg-[#E6ECE8]",
  "bg-[#DCE6DF]",
  "bg-[#E2E7E1]",
  "bg-[#D8E2DC]",
];

const FACET = 56;

export function PlaceholderImage({
  label,
  tone = 0,
  faceted = false,
  src,
  className,
}: {
  label?: string;
  tone?: number;
  /** Cuts one corner diagonally with a brand-green wedge, echoing the logo's
   * faceted diamond mark. Reserve for the hero — this is the brand's one
   * recognizable geometric signature, not a pattern to repeat everywhere. */
  faceted?: boolean;
  /** Real photograph path (public/). Falls back to the "Foto pendiente"
   * placeholder when omitted — never invent a photo for a project that
   * doesn't have one. */
  src?: string;
  className?: string;
}) {
  const clip = faceted
    ? { clipPath: `polygon(0 0, 100% 0, 100% 100%, ${FACET}px 100%, 0 calc(100% - ${FACET}px))` }
    : undefined;

  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={clip}>
        <Image src={src} alt={label ?? ""} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        {faceted ? <FacetWedge /> : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 text-[#6E7A74]",
        tones[tone % tones.length],
        className
      )}
      style={clip}
    >
      <ImageIcon className="size-7 opacity-60" strokeWidth={1.5} />
      {label ? (
        <span className="px-3 text-center text-xs font-medium opacity-70">
          {label}
        </span>
      ) : null}
      <span className="absolute top-2 right-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#6E7A74] uppercase">
        Foto pendiente
      </span>
      {faceted ? <FacetWedge /> : null}
    </div>
  );
}

function FacetWedge() {
  return (
    <span
      aria-hidden="true"
      className="absolute bottom-0 left-0"
      style={{
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `0 0 ${FACET}px ${FACET}px`,
        borderColor: `transparent transparent var(--primary) transparent`,
      }}
    />
  );
}
