"use client";

import { motion } from "framer-motion";

const clients = [
  "Orbit Labs",
  "Sélyne",
  "Vach'et Nous",
  "Extrad Solution",
];

export function ClientsMarquee() {
  return (
    <section className="section-dark relative overflow-hidden border-y border-white/[0.04] py-10 lg:py-14">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-[1280px] px-6"
      >
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.18em] text-white/40">
          Ils nous font confiance
        </p>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0f0f0f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0f0f0f] to-transparent" />
          <div className="animate-marquee flex gap-16 whitespace-nowrap">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex shrink-0 gap-16">
                {clients.map((name) => (
                  <span
                    key={`${setIdx}-${name}`}
                    className="font-heading text-xl font-semibold text-white/[0.18] transition-colors hover:text-white/40"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
