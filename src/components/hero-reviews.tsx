"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

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
  /** Placeholder portrait (pravatar seeded). */
  avatar: string;
  /** Short project-type tag. */
  tag: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Boutique Shopify livrée clé en main, parcours d'achat raccourci, design épuré.",
    project: "Sélyne",
    avatar: "https://i.pravatar.cc/80?img=47",
    tag: "E-commerce Shopify",
  },
  {
    quote:
      "Landing SaaS livrée en 72h, prête à convertir du trafic payant dès le jour 1.",
    project: "Orbit Labs",
    avatar: "https://i.pravatar.cc/80?img=32",
    tag: "Landing SaaS",
  },
  {
    quote:
      "Vitrine gastronomique animée, réservation Zenchef intégrée, zéro friction.",
    project: "Vach'et Nous",
    avatar: "https://i.pravatar.cc/80?img=12",
    tag: "Site vitrine",
  },
  {
    quote:
      "Site B2B multilingue, positionnement premium discret, performance maximale.",
    project: "Extrad Solution",
    avatar: "https://i.pravatar.cc/80?img=5",
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
  const [paused, setPaused] = useState(false);

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
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.avatar}
                alt={`Projet ${r.project}`}
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-9 w-9 shrink-0 rounded-full border border-white/10 object-cover"
              />
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
                  i === index ? "w-5 bg-white/70" : "w-1 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </motion.div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
