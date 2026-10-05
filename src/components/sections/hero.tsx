"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/lib/content/types";

/**
 * Distinct abstract backdrops per hero slide, standing in for real worship
 * photography until the church supplies verified imagery via the CMS.
 * Cycled by slide index (modulo) so any number of future slides is covered.
 */
const BACKGROUND_VARIANTS = [
  {
    gradient: "from-[#1f1315] via-[#170f11] to-[#0c0e11]",
    blobA: "right-[-10%] top-[-15%] h-[75%] w-[75%] bg-anglican-red/40",
    blobB: "bottom-[-15%] left-[-10%] h-[55%] w-[55%] bg-sky-500/25",
  },
  {
    gradient: "from-[#161b21] via-[#12151a] to-[#0c0e11]",
    blobA: "left-1/2 top-[-10%] h-[70%] w-[70%] -translate-x-1/2 bg-sky-500/30",
    blobB: "bottom-[-20%] right-[-10%] h-[60%] w-[60%] bg-anglican-red/30",
  },
  {
    gradient: "from-[#1c1013] via-[#150d10] to-[#0c0e11]",
    blobA: "left-[-10%] top-[-15%] h-[65%] w-[65%] bg-anglican-red/35",
    blobB: "bottom-[-15%] right-[-5%] h-[55%] w-[55%] bg-sky-500/20",
  },
  {
    gradient: "from-[#141019] via-[#120f16] to-[#0c0e11]",
    blobA: "left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 bg-anglican-red/25",
    blobB: "right-[-15%] top-[-10%] h-[50%] w-[50%] bg-sky-500/25",
  },
];

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    reduceMotion ? [] : [Autoplay({ delay: 7000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const variant = BACKGROUND_VARIANTS[selected % BACKGROUND_VARIANTS.length];

  return (
    <section className="relative isolate flex h-screen items-center overflow-hidden bg-[#111418]">
      {/* Abstract atmosphere, changes with the active slide. */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-b", variant.gradient)} />
            <div className={cn("absolute rounded-full blur-[140px]", variant.blobA)} />
            <div className={cn("absolute rounded-full blur-[160px]", variant.blobB)} />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 64px)",
          }}
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                <div className="max-w-3xl">
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sky-200 backdrop-blur-sm"
                  >
                    {slide.eyebrow}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="mt-6 text-balance font-heading text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/75"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="mt-10 flex flex-wrap items-center gap-4"
                  >
                    <Button size="lg" asChild className="group h-12 px-6 text-base">
                      <Link href={slide.primaryCta.href}>
                        {slide.primaryCta.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="h-12 border-white/30 bg-white/5 px-6 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                    >
                      <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="mt-14 flex items-center gap-5">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous slide"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                  aria-current={i === selected}
                  className="p-1.5"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-all duration-300",
                      i === selected ? "w-8 bg-white" : "w-3 bg-white/30"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next slide"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: reduceMotion ? 0 : [0, 8, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: reduceMotion ? undefined : { duration: 1.8, repeat: Infinity },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
