import { ImageIcon } from "lucide-react";
import { cn } from "cn";

const tones = [
  "bg-[#E7E4DA]",
  "bg-[#DCE3DB]",
  "bg-[#E3DCD3]",
  "bg-[#D9E0DC]",
];

export function PlaceholderImage({
  label,
  tone = 0,
  className,
}: {
  label?: string;
  tone?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 text-[#8A8578]",
        tones[tone % tones.length],
        className
      )}
    >
      <ImageIcon className="size-7 opacity-60" strokeWidth={1.5} />
      {label ? (
        <span className="px-3 text-center text-xs font-medium opacity-70">
          {label}
        </span>
      ) : null}
      <span className="absolute top-2 right-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#8A8578] uppercase">
        Foto pendiente
      </span>
    </div>
  );
}
