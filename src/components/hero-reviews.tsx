"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { useAutoPause } from "@/lib/use-auto-pause";

/**
 * Cycling "hero reviews" block — Pulsor-style.
 *
 * Each card rotates every CYCLE_MS. Sub-elements (quote, avatar, name,
 * separator, stars) fade-in staggered by their `--index`.
 *
 * Content note: quotes are summarised outcomes from Kove's own delivered
 * projects, not fabricated client testimonials. Replace with verbatim client
 * quotes once collected (each entry's `quote` field).
 */

type Review = {
  /** Short sentence about what was delivered — replace with real client quote when collected. */
  quote: string;
  /** Real project name from Kove portfolio. */
  project: string;
  /** First letter of project — rendered in a brand-colored circle as placeholder until real client photos are collected. */
  initial: string;
  /** Short project-type tag. */
  tag: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Boutique Shopify livrée clé en main, parcours d'achat raccourci, design épuré.",
    project: "Sélyne",
    initial: "S",
    tag: "E-commerce Shopify",
  },
  {
    quote:
      "Landing SaaS livrée en 72h, prête à convertir du trafic payant dès le jour 1.",
    project: "Orbit Labs",
    initial: "O",
    tag: "Landing SaaS",
  },
  {
    quote:
      "Vitrine gastronomique animée, réservation Zenchef intégrée, zéro friction.",
    project: "Vach'et Nous",
    initial: "V",
    tag: "Site vitrine",
  },
  {
    quote:
      "Site B2B multilingue, positionnement premium discret, performance maximale.",
    project: "Extrad Solution",
    initial: "E",
    tag: "Services B2B",
  },
];

const CYCLE_MS = 5200;
const STAGGER = 0.055;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER,
      duration: 0.55,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

export function HeroReviews() {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenPaused = useAutoPause(containerRef);
  const paused = hoverPaused || offscreenPaused;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % REVIEWS.length),
      CYCLE_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  const r = REVIEWS[index];

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.article
          key={index}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center gap-5"
        >
          <motion.p
            variants={itemVariants}
            custom={0}
            className="max-w-[32ch] text-center text-[13.5px] leading-relaxed text-white/70 sm:text-[14.5px]"
          >
            « {r.quote} »
          </motion.p>

          <div className="flex items-center gap-4 sm:gap-5">
            <motion.div
              variants={itemVariants}
              custom={1}
              className="flex items-center gap-2.5"
            >
              <div
                role="img"
                aria-label={`Projet ${r.project}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
              >
                <span className="font-heading text-[15px] font-medium leading-none text-white/85 tracking-tight">
                  {r.initial}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[13px] font-medium leading-none text-white">
                  {r.project}
                </span>
                <span className="mt-1 text-[11px] leading-none text-white/45">
                  {r.tag}
                </span>
              </div>
            </motion.div>

            <motion.span
              variants={itemVariants}
              custom={2}
              className="h-8 w-px bg-white/10"
              aria-hidden="true"
            />

            <motion.div
              variants={itemVariants}
              custom={3}
              className="flex items-center gap-0.5"
              aria-label="Projet livré"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  strokeWidth={0}
                  className="fill-accent text-accent"
                />
              ))}
            </motion.div>
          </div>

          {/* Dots indicator */}
          <motion.div
            variants={itemVariants}
            custom={4}
            className="mt-1 flex items-center gap-1.5"
          >
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Afficher le projet ${REVIEWS[i].project}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-white/70"
                    : "w-1 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </motion.div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
