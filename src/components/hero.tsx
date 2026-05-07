"use client";

import { motion } from "framer-motion";
import { MetalFx } from "metal-fx";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { TechLines } from "@/components/tech-lines";
import { AnimatedShaderBackground } from "@/components/ui/animated-shader-background";
import { AnimatedCTA } from "@/components/ui/animated-cta";
import { HeroReviews } from "@/components/hero-reviews";

const t = { duration: 0.7, ease: "easeOut" as const };

interface HeroProps {
  /** Jour de livraison calculé serveur (J+2, ex: "dimanche"). */
  deliveryDay: string;
}

export function Hero({ deliveryDay }: HeroProps) {
  return (
    <section className="section-dark section-curve relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
      {/* WebGL aurora shader — full-bleed background */}
      <AnimatedShaderBackground />
      {/* Legibility overlay — lighter on top (mobile) so the animation reads immediately */}
      <div aria-hidden="true" className="hero-overlay" />
      {/* Minimalist cyan rails with travelling nodes */}
      <TechLines variant="dense" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0 }}
          className="flex justify-center"
        >
          <span className="pill pill-outline-dark">
            <span className="live-dot" />
            <span className="ml-1">3 places restantes ce mois-ci</span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.1 }}
          className="mx-auto mt-7 max-w-5xl text-center font-heading text-[clamp(2.5rem,7vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white sm:mt-8"
        >
          <span className="text-grad-fade-dark">Votre site premium,</span>
          <br />
          <span className="text-white">livré </span>
          <em className="heading-italic">avant {deliveryDay}</em>
          <span className="text-white">.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-center text-[16px] leading-relaxed text-emphasis-dark sm:mt-7 sm:max-w-2xl sm:text-[17px] lg:text-[19px]"
        >
          Design premium, code optimisé, livré en 48–72h grâce à notre stack IA.
          Pas de templates. Pas de compromis.
        </motion.p>

        {/* CTAs — Pulsor-style animated buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.32 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:mt-10"
        >
          <MetalFx preset="chromatic" variant="button">
            <AnimatedCTA
              href="#contact"
              variant="solid"
              icon={<ArrowUpRight size={16} strokeWidth={2} />}
              iconMotion="diagonal"
            >
              Réserver un appel
            </AnimatedCTA>
          </MetalFx>
          <AnimatedCTA
            href="#portfolio"
            variant="outline"
            icon={<PlayCircle size={16} strokeWidth={1.6} />}
            iconMotion="slide"
          >
            Voir nos réalisations
          </AnimatedCTA>
        </motion.div>

        {/* Social proof — cycling project reviews (Pulsor-style) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.5 }}
          className="mt-12 lg:mt-14"
        >
          <HeroReviews />
        </motion.div>

        {/* Minimal trust strip */}
        <motion.ul
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.62 }}
          className="mx-auto mt-14 flex max-w-3xl items-center justify-center divide-x divide-white/[0.08] text-center lg:mt-20"
        >
          {[
            { value: "48h", label: "première maquette" },
            { value: "95+", label: "score PageSpeed" },
            { value: "7j", label: "livraison max" },
          ].map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center px-5 sm:px-10"
            >
              <span className="font-heading text-[22px] font-semibold tracking-tight text-white sm:text-[28px] lg:text-[32px]">
                {stat.value}
              </span>
              <span className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/50 sm:text-[11px]">
                {stat.label}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
