"use client";

import { motion } from "framer-motion";
import { Cpu, Gem, Gauge, HeadphonesIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const differentiators: {
  icon: LucideIcon;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
}[] = [
  {
    icon: Cpu,
    title: "IA-Powered",
    metric: "10x",
    metricLabel: "plus rapide",
    description:
      "Ce qui prend 3 semaines ailleurs, on le livre en 72h. Notre stack IA accélère chaque étape sans sacrifier la qualité.",
  },
  {
    icon: Gem,
    title: "Zéro template",
    metric: "100%",
    metricLabel: "sur mesure",
    description:
      "Chaque pixel est intentionnel. On ne recycle pas — on crée. Votre site ne ressemblera à aucun autre.",
  },
  {
    icon: Gauge,
    title: "Ultra-rapide",
    metric: "95+",
    metricLabel: "PageSpeed",
    description:
      "Vos visiteurs n'attendent pas. Chargement en moins de 2s, SEO natif, accessibilité intégrée.",
  },
  {
    icon: HeadphonesIcon,
    title: "On reste là",
    metric: "30j",
    metricLabel: "de support",
    description:
      "Le lancement, c'est le début. Support technique, modifs, conseils stratégiques — on vous accompagne.",
  },
];

export function WhyUs() {
  return (
    <section className="section-light section-curve relative overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center"
        >
          <span className="pill pill-outline-light">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f0f0f]" />
            Pourquoi Kove
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl font-heading text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
            <span className="text-grad-fade-light">Pas juste une agence.</span>
            <br />
            Un <em className="heading-italic">avantage compétitif</em>.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: "easeOut" as const,
              }}
              className="card-light flex flex-col p-7 lg:p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f0f0f] text-white">
                <item.icon size={20} strokeWidth={1.75} />
              </div>

              <div className="mb-4 flex items-baseline gap-2">
                <span className="font-heading text-[44px] font-medium leading-none tracking-tight text-[#0f0f0f]">
                  {item.metric}
                </span>
                <span className="text-[13px] text-[#5e5f6e]">
                  {item.metricLabel}
                </span>
              </div>

              <h3 className="font-heading text-[18px] font-semibold text-[#0f0f0f]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-emphasis-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
