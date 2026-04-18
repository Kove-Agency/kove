"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Globe,
  Rocket,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  /** Colonnes occupées sur lg+ (asymétrique Bento 2.0). */
  span: 1 | 2;
  /** Card flagship : padding XL + visuel supplémentaire. */
  featured?: boolean;
  /** Ligne visuelle brute (exemples courts). */
  highlights?: string[];
};

const services: Service[] = [
  {
    icon: ShoppingCart,
    title: "Boutiques Shopify qui vendent",
    description:
      "Thèmes custom, checkout raccourci, panier qui convertit. Pas un template déguisé — un asset qui tourne pendant que vous dormez.",
    features: ["Shopify custom", "Checkout 2 étapes", "Stripe · Apple Pay"],
    highlights: [
      "Sélyne → huile de massage premium, panier moyen +38%",
      "Liquid + sections modulaires éditables sans dev",
      "A/B testing natif via Shopify",
    ],
    span: 2,
    featured: true,
  },
  {
    icon: Globe,
    title: "Sites vitrines premium",
    description:
      "Votre meilleur commercial, disponible 24/7. Confiance instantanée, SEO intégré, score PageSpeed 95+.",
    features: ["Next.js / Webflow", "SEO on-page", "CMS éditable"],
    span: 1,
  },
  {
    icon: Rocket,
    title: "Landing pages qui convertissent",
    description:
      "Une page, un objectif, zéro distraction. Chaque section pensée pour guider vers l'action, chaque pixel testable.",
    features: ["A/B test ready", "Analytics branché", "Copy CRO"],
    span: 1,
  },
  {
    icon: RefreshCw,
    title: "Refontes sans downtime",
    description:
      "Votre site actuel vous coûte des clients — design daté, mobile cassé, vitesse catastrophique. On reconstruit sans interrompre votre trafic ni perdre votre SEO.",
    features: ["Audit complet", "Migration par étapes", "Redirections 301"],
    highlights: [
      "Zéro baisse de ranking après migration",
      "Staging complet avant bascule",
    ],
    span: 2,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="section-light section-curve relative overflow-hidden py-28 lg:py-36"
    >
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const colSpan =
              service.span === 2 ? "lg:col-span-2" : "lg:col-span-1";
            const padding = service.featured
              ? "p-8 lg:p-12"
              : "p-7 lg:p-9";

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: "easeOut" as const,
                }}
                className={`card-light group relative flex flex-col overflow-hidden ${colSpan} ${padding}`}
              >
                {service.featured && (
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
                )}

                <div className="relative mb-6 flex items-center justify-between">
                  <div
                    className={`flex items-center justify-center rounded-2xl bg-[#0f0f0f] text-white ${
                      service.featured ? "h-14 w-14" : "h-12 w-12"
                    }`}
                  >
                    <Icon
                      size={service.featured ? 22 : 20}
                      strokeWidth={1.75}
                    />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[#0f0f0f]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0f0f0f]"
                  />
                </div>

                <h3
                  className={`relative font-heading font-medium tracking-tight text-[#0f0f0f] ${
                    service.featured
                      ? "text-[26px] lg:text-[30px] leading-[1.1]"
                      : "text-[22px] leading-tight"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`relative mt-3 flex-1 leading-relaxed text-emphasis-light ${
                    service.featured ? "text-[15px] lg:text-[16px]" : "text-[14px]"
                  }`}
                >
                  {service.description}
                </p>

                {service.highlights && (
                  <ul className="relative mt-6 space-y-2.5 border-t border-[#0f0f0f]/[0.06] pt-5">
                    {service.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#4c4d56]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-[#0f0f0f]/10 bg-[#0f0f0f]/[0.03] px-2.5 py-1 text-[11px] font-medium text-[#0f0f0f]/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
