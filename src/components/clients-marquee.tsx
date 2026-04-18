"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Trust logos marquee — real client brands delivered by Kove.
 *
 * Logos pre-normalised to white silhouettes on transparent PNG (see
 * /public/logos/trust/). The section "cups" into the following light
 * section via `section-curve` for a clean, 8lab-style transition.
 */

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const LOGOS: Logo[] = [
  { src: "/logos/trust/client-1.png", alt: "Vach'et Nous", width: 600, height: 187 },
  { src: "/logos/trust/client-2.png", alt: "Sélyne", width: 263, height: 75 },
  { src: "/logos/trust/client-3.png", alt: "Orbit Labs", width: 280, height: 80 },
  { src: "/logos/trust/client-4.png", alt: "Extrad Solution", width: 280, height: 80 },
];

export function ClientsMarquee() {
  return (
    <section className="section-dark section-curve relative overflow-hidden py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-[1280px] px-6"
      >
        <p className="mb-10 text-center text-[10.5px] uppercase tracking-[0.22em] text-white/40 sm:text-[11px]">
          Ils nous ont confié leur marque
        </p>

        <div className="relative">
          {/* Horizontal edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent sm:w-28" />

          <div
            className="animate-marquee flex items-center gap-16 whitespace-nowrap sm:gap-24 lg:gap-28"
            style={{ willChange: "transform" }}
          >
            {[...Array(2)].map((_, setIdx) => (
              <div
                key={setIdx}
                aria-hidden={setIdx === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-16 sm:gap-24 lg:gap-28"
              >
                {LOGOS.map((logo) => (
                  <div
                    key={`${setIdx}-${logo.alt}`}
                    className="relative flex h-12 shrink-0 items-center sm:h-14 lg:h-16"
                    title={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={setIdx === 0 ? logo.alt : ""}
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                      className="h-full w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-95"
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
