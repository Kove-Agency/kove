"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  ShoppingCart,
  Globe,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

const projects: {
  title: string;
  type: string;
  typeIcon: LucideIcon;
  description: string;
  tags: string[];
  url: string;
  gradient: string;
}[] = [
  {
    title: "Maison Blanc",
    type: "E-commerce",
    typeIcon: ShoppingCart,
    description:
      "Boutique de mobilier haut de gamme. Design épuré, expérience d'achat fluide, taux de conversion +40% après refonte.",
    tags: ["Shopify", "Design Premium", "Animé"],
    url: "#",
    gradient: "from-blue-500/15 via-transparent to-purple-500/10",
  },
  {
    title: "NovaTech",
    type: "Landing Page",
    typeIcon: Rocket,
    description:
      "Plateforme SaaS B2B. Landing page d'acquisition avec un taux de conversion 3x supérieur au benchmark du secteur.",
    tags: ["Next.js", "SaaS", "A/B testé"],
    url: "#",
    gradient: "from-cyan-500/15 via-transparent to-blue-500/10",
  },
  {
    title: "Studio Aura",
    type: "Site Vitrine",
    typeIcon: Globe,
    description:
      "Portfolio interactif pour une agence créative. Animations sur mesure, navigation immersive, score PageSpeed 98.",
    tags: ["Onepage", "Interactif", "Animé"],
    url: "#",
    gradient: "from-purple-500/15 via-transparent to-pink-500/10",
  },
  {
    title: "FreshMarket",
    type: "E-commerce",
    typeIcon: ShoppingCart,
    description:
      "Alimentation bio en ligne. Catalogue de 500+ produits, checkout optimisé, livraison intégrée.",
    tags: ["Shopify Plus", "Multi-produits", "Performance"],
    url: "#",
    gradient: "from-green-500/15 via-transparent to-cyan-500/10",
  },
];

function BrowserMockup({ gradient }: { gradient: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a0a0a] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="ml-2 h-5 flex-1 rounded-md bg-white/[0.04] sm:max-w-[240px]" />
      </div>
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} p-6 sm:p-8`}>
        <div className="mb-8 flex items-center justify-between">
          <div className="h-3 w-20 rounded-full bg-white/[0.08]" />
          <div className="hidden gap-4 sm:flex">
            <div className="h-2.5 w-12 rounded-full bg-white/[0.05]" />
            <div className="h-2.5 w-12 rounded-full bg-white/[0.05]" />
            <div className="h-2.5 w-12 rounded-full bg-white/[0.05]" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-5 w-3/4 rounded-full bg-white/[0.08]" />
          <div className="h-5 w-1/2 rounded-full bg-white/[0.06]" />
          <div className="mt-4 h-3 w-2/3 rounded-full bg-white/[0.04]" />
        </div>
        <div className="mt-6 flex gap-3">
          <div className="h-8 w-24 rounded-full bg-accent/25" />
          <div className="h-8 w-24 rounded-full bg-white/[0.06]" />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-white/[0.04]" />
          <div className="h-16 rounded-lg bg-white/[0.04]" />
          <div className="h-16 rounded-lg bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? projects.length - 1 : a - 1));
  const next = () => setActive((a) => (a === projects.length - 1 ? 0 : a + 1));

  const project = projects[active];

  return (
    <section id="portfolio" className="section-dark section-curve relative overflow-hidden py-28 lg:py-36">
      <TechLines variant="default" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="pill pill-outline-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Réalisations
            </span>
            <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              <span className="text-grad-fade-dark">Des résultats,</span>
              <br />
              pas des <em className="heading-italic">promesses</em>.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-emphasis-dark lg:text-right lg:text-[17px]">
            Chaque projet livré a été pensé pour convertir. On mesure les
            résultats, on itère, on optimise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mt-14 lg:mt-20"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex-1 lg:flex-[1.2]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" as const }}
                >
                  <BrowserMockup gradient={project.gradient} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-6 lg:flex-[0.8]">
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <ChevronUp size={16} className="text-white/70" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <ChevronDown size={16} className="text-white/70" />
                </button>
                <span className="ml-2 font-mono text-xs text-white/40">
                  {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" as const }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                      <project.typeIcon size={15} className="text-accent" />
                    </div>
                    <span className="text-[13px] font-medium text-accent">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="font-heading text-[32px] font-medium leading-tight tracking-tight text-white lg:text-[38px]">
                    {project.title}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[12px] font-medium text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-emphasis-dark">
                    {project.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href={project.url} className="pill pill-outline-dark">
                      Détails du projet
                      <ArrowUpRight size={14} />
                    </a>
                    <a href={project.url} className="pill pill-solid-accent">
                      Voir le site live
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12 flex gap-3 overflow-x-auto pb-2">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300 ${
                  i === active
                    ? "border-accent/35 bg-accent/[0.08]"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <p className={`text-[11px] font-medium uppercase tracking-wider ${i === active ? "text-accent" : "text-white/50"}`}>
                  {p.type}
                </p>
                <p className={`mt-1 text-[14px] font-semibold ${i === active ? "text-white" : "text-white/80"}`}>
                  {p.title}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
