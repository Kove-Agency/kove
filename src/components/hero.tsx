"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TechLines } from "@/components/tech-lines";
import { AnimatedShaderBackground } from "@/components/ui/animated-shader-background";

const t = { duration: 0.7, ease: "easeOut" as const };

// Curated avatar set — real faces from pravatar.cc (free, CORS-friendly).
// Seeds are fixed so the same 4 faces render every time.
const avatars = [
  { src: "https://i.pravatar.cc/80?img=47", alt: "Client Maison Blanc" },
  { src: "https://i.pravatar.cc/80?img=32", alt: "Client NovaTech" },
  { src: "https://i.pravatar.cc/80?img=12", alt: "Client Studio Aura" },
  { src: "https://i.pravatar.cc/80?img=5",  alt: "Client FreshMarket" },
];

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

        {/* CTAs — liquid glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.32 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:mt-10"
        >
          <a
            href="#contact"
            className="pill pill-glass-accent gap-2.5 px-6 py-3.5 text-[14px]"
          >
            <span className="live-dot" />
            <span className="relative z-10">Lancer mon projet</span>
          </a>
          <a
            href="#portfolio"
            className="pill pill-glass px-6 py-3.5 text-[14px]"
          >
            <span className="relative z-10">Voir nos réalisations</span>
          </a>
        </motion.div>

        {/* Social proof — compact glass card with real avatars + rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.42 }}
          className="mt-10 flex justify-center lg:mt-12"
        >
          <div className="social-glass">
            <div className="avatar-stack flex items-center">
              {avatars.map((a, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={a.src}
                  src={a.src}
                  alt={a.alt}
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                  style={{ zIndex: 10 - i }}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-[13px] text-white/90">
              <div className="flex gap-0.5" aria-label="Note 4.9 sur 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5</span>
              <span className="hidden text-white/55 sm:inline">
                · +40 projets livrés
              </span>
            </div>
          </div>
        </motion.div>

        {/* Minimal trust strip — replaces the old heavy "stats bar".
            Inline, ultra-clean, mobile-friendly. */}
        <motion.ul
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.56 }}
          className="mx-auto mt-14 flex max-w-3xl items-center justify-center divide-x divide-white/[0.08] text-center lg:mt-20"
        >
          {[
            { value: "48h", label: "livraison moyenne" },
            { value: "95+", label: "score PageSpeed" },
            { value: "100%", label: "satisfaction client" },
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
