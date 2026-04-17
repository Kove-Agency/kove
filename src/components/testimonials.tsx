"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Fondatrice, Maison Blanc",
    content:
      "On a lancé notre boutique en 3 jours. Résultat : +40% de conversion dès le premier mois. Le design est exactement ce qu'on voulait, sans aucun compromis. Kove a compris notre marque avant même qu'on termine le brief.",
    avatar: "https://i.pravatar.cc/120?img=47",
    metric: "+40% conv.",
  },
  {
    name: "Thomas Dubois",
    role: "CEO, NovaTech",
    content:
      "48h entre le brief et la mise en ligne. Notre landing page convertit 3x mieux que l'ancienne. On leur confie maintenant tous nos projets d'acquisition.",
    avatar: "https://i.pravatar.cc/120?img=32",
    metric: "3x acq.",
  },
];

export function Testimonials() {
  return (
    <section className="section-dark section-curve relative overflow-hidden py-24 lg:py-32">
      <TechLines variant="soft" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="pill pill-outline-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Témoignages
            </span>
            <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              <span className="text-grad-fade-dark">Ils ont lancé avec Kove.</span>
              <br />
              Ils ne reviendraient <em className="heading-italic">jamais</em> en arrière.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="text-[14px] font-medium text-white">4.9/5</span>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: "easeOut" as const,
              }}
              className="card-dark relative flex flex-col p-8 lg:p-10"
            >
              <Quote size={32} strokeWidth={1} className="mb-6 text-accent/30" />

              <p className="text-[17px] leading-relaxed text-white/85 lg:text-[19px]">
                « {t.content} »
              </p>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={`Photo de ${t.name}`}
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-white">{t.name}</p>
                    <p className="text-[12px] text-white/55">{t.role}</p>
                  </div>
                </div>
                <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
