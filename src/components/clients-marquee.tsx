"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Trust logos marquee — real client brands delivered by Kove.
 *
 * Logos are pre-normalised to white silhouettes on transparent PNG
 * (see /public/logos/trust/). Rendered at ~55% opacity to keep the row
 * visually discreet under the hero; lifts to ~90% on hover per item.
 */

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Per-logo scale factor to normalise optical weight across different aspect ratios. */
  scale: number;
};

const LOGOS: Logo[] = [
  { src: "/logos/trust/client-1.png", alt: "Vach'et Nous", width: 600, height: 187, scale: 1.05 },
  { src: "/logos/trust/client-2.png", alt: "Sélyne", width: 263, height: 75, scale: 0.95 },
  { src: "/logos/trust/client-3.png", alt: "Orbit Labs", width: 280, height: 80, scale: 1 },
  { src: "/logos/trust/client-4.png", alt: "Extrad Solution", width: 280, height: 80, scale: 1 },
];

export function ClientsMarquee() {
  return (
    <section className="section-dark relative overflow-hidden border-y border-white/[0.04] py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-[1280px] px-6"
      >
        <p className="mb-8 text-center text-[10.5px] uppercase tracking-[0.22em] text-white/40 sm:text-[11px]">
          Ils nous ont confié leur marque
        </p>

        <div className="relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent sm:w-24" />

          <div className="animate-marquee flex items-center gap-14 whitespace-nowrap sm:gap-20 lg:gap-24">
            {[...Array(2)].map((_, setIdx) => (
              <div
                key={setIdx}
                aria-hidden={setIdx === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-14 sm:gap-20 lg:gap-24"
              >
                {LOGOS.map((logo) => (
                  <div
                    key={`${setIdx}-${logo.alt}`}
                    className="relative flex h-10 shrink-0 items-center sm:h-12 lg:h-14"
                    style={{ transform: `scale(${logo.scale})` }}
                    title={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={setIdx === 0 ? logo.alt : ""}
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                      className="h-full w-auto object-contain opacity-55 transition-opacity duration-300 hover:opacity-90"
                      style={{ maxHeight: "100%" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
