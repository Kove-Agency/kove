"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Globe, Rocket, RefreshCw, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Boutiques Shopify qui vendent pendant que vous dormez. Checkout optimisé, design qui convertit, paiement fluide.",
    features: ["Shopify / Custom", "Checkout optimisé", "+40% conversion"],
  },
  {
    icon: Globe,
    title: "Sites vitrines",
    description:
      "Votre meilleur commercial, disponible 24h/24. Design sur mesure qui inspire confiance dès la première seconde.",
    features: ["Design sur mesure", "SEO intégré", "Score 95+"],
  },
  {
    icon: Rocket,
    title: "Landing pages",
    description:
      "Pages de conversion qui transforment le trafic en clients. Chaque élément testé, chaque pixel optimisé.",
    features: ["A/B test ready", "Analytics", "Conversion max"],
  },
  {
    icon: RefreshCw,
    title: "Refontes",
    description:
      "Votre site actuel vous coûte des clients. On le transforme en machine à convertir, sans interruption.",
    features: ["Audit complet", "Migration douce", "Zéro downtime"],
  },
];

export function Services() {
  return (
    <section id="services" className="section-light section-curve relative overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="pill pill-outline-light">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f0f0f]" />
              Services
            </span>
            <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
              <span className="text-grad-fade-light">Un site pour chaque</span>
              <br />
              <em className="heading-italic">objectif</em> business.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-emphasis-light lg:text-right lg:text-[17px]">
            Pas de templates. Chaque projet est conçu de zéro pour votre marque,
            avec un pipeline IA qui accélère sans sacrifier la qualité.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" as const }}
              className="card-light group flex flex-col p-7 lg:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f0f0f] text-white">
                  <service.icon size={20} strokeWidth={1.75} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#0f0f0f]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0f0f0f]"
                />
              </div>

              <h3 className="font-heading text-[22px] font-medium tracking-tight text-[#0f0f0f]">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-emphasis-light">
                {service.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[#0f0f0f]/10 bg-[#0f0f0f]/[0.03] px-2.5 py-1 text-[11px] font-medium text-[#0f0f0f]/70"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
