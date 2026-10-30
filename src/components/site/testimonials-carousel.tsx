"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { cn } from "cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/site/testimonial-card";
import type { Testimonio } from "@/lib/data/testimonios";

/** Testimonial carousel with pill-style pagination: the active dot elongates. */
export function TestimonialsCarousel({ testimonios }: { testimonios: Testimonio[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onStoreChange);
      return () => api.off("select", onStoreChange);
    },
    [api]
  );
  const selected = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  );

  return (
    <div>
      <Carousel setApi={setApi} opts={{ align: "start", loop: false }}>
        <CarouselContent>
          {testimonios.map((t, i) => (
            <CarouselItem key={i} className="basis-[88%] sm:basis-1/2 lg:basis-1/3">
              <TestimonialCard testimonio={t} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {testimonios.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonios.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir al testimonio ${i + 1}`}
              aria-current={selected === i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-[var(--ease-out)]",
                selected === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
