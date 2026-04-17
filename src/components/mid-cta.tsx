"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

export function MidCTA() {
  return (
    <section className="section-dark relative overflow-hidden py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
          <div className="flex gap-0.5" aria-label="Note 4.9 sur 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className="fill-accent text-accent" />
            ))}
          </div>
          <span className="text-[12px] font-medium text-white/85">
            4.9/5 · +40 projets livrés
          </span>
        </div>

        <h3 className="mt-6 font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
          <span className="text-grad-fade-dark">Pas besoin d&apos;attendre</span>{" "}
          <em className="heading-italic">3 mois</em> pour voir votre site en ligne.
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-emphasis-dark">
          72h chrono. Brief, maquette, développement, mise en ligne. On prend 2
          projets de plus ce mois-ci.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            className="pill pill-glass-accent gap-2.5 px-6 py-3.5 text-[14px]"
          >
            <span className="live-dot" />
            <span className="relative z-10">Réserver mon appel</span>
            <ArrowRight size={14} className="relative z-10" />
          </a>
          <a
            href="#pricing"
            className="pill pill-glass px-6 py-3.5 text-[14px]"
          >
            <span className="relative z-10">Voir les tarifs</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
