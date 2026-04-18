"use client";

import { motion } from "framer-motion";
import { Cpu, Gem, Gauge, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Differentiator = {
  icon: LucideIcon;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
};

const differentiators: Differentiator[] = [
  {
    icon: Cpu,
    title: "Stack IA intégrée",
    metric: "10×",
    metricLabel: "plus rapide qu'en agence",
    description:
      "Ce qui prend 3 semaines chez les autres, on le livre en 72h. Pas de magie — juste Claude, Cursor, et un pipeline affûté. La qualité ne bouge pas, le délai s'effondre.",
  },
  {
    icon: Gem,
    title: "Zéro template, zéro copie",
    metric: "100%",
    metricLabel: "design sur mesure",
    description:
      "Chaque pixel est pensé pour votre marque. Pas de thème Shopify déguisé, pas de template Webflow repeint. Votre site ne ressemblera à aucun autre — parce qu'il n'a pas été construit comme un autre.",
  },
  {
    icon: Gauge,
    title: "Performance native",
    metric: "95+",
    metricLabel: "score PageSpeed mobile",
    description:
      "Vos visiteurs n'attendent pas. Chargement sous 2s, Core Web Vitals au vert, SEO et accessibilité intégrés dès le jour 1 — pas bricolés après coup.",
  },
  {
    icon: Headphones,
    title: "Support réel après le lancement",
    metric: "30j",
    metricLabel: "de suivi inclus",
    description:
      "Le lancement, c'est le début — pas la fin. Modifs, bugs, conseils stratégiques : pendant 30 jours vous écrivez, on répond dans la journée. Ensuite, maintenance au mois si vous voulez qu'on reste.",
  },
];

export function WhyUs() {
  return (
    <section className="section-light section-curve relative overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="max-w-3xl"
        >
          <span className="pill pill-outline-light">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f0f0f]" />
            Pourquoi Kove
          </span>
          <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
            <span className="text-grad-fade-light">Pas juste une agence.</span>
            <br />
            Un <em className="heading-italic">avantage compétitif</em>.
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-emphasis-light lg:text-[17px]">
            Quatre raisons concrètes pour lesquelles les marques qui nous
            choisissent ne retournent plus jamais vers une agence classique.
          </p>
        </motion.div>

        <div className="mt-14 divide-y divide-[#0f0f0f]/[0.08] lg:mt-20">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.55,
                  ease: "easeOut" as const,
                }}
                className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[auto_1fr_1.4fr] lg:items-center lg:gap-14 lg:py-10"
              >
                {/* Metric block — the "outcome" */}
                <div className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-1 lg:min-w-[160px]">
                  <span className="font-heading text-[clamp(2.75rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-[#0f0f0f]">
                    {item.metric}
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-[#5e5f6e] lg:text-[11.5px]">
                    {item.metricLabel}
                  </span>
                </div>

                {/* Title + icon */}
                <div className="flex items-start gap-4">
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0f0f0f]/10 bg-[#0f0f0f]/[0.03] text-[#0f0f0f] lg:inline-flex">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-[22px] font-medium leading-[1.2] tracking-tight text-[#0f0f0f] lg:text-[24px]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-emphasis-light lg:text-[16px]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
