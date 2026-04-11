"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
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
      "Boutique de mobilier haut de gamme. Design épuré, taux de conversion +40% après refonte.",
    tags: ["Shopify", "Premium", "Animé"],
    url: "#",
    gradient: "from-blue-500/20 via-transparent to-purple-500/15",
  },
  {
    title: "NovaTech",
    type: "Landing Page",
    typeIcon: Rocket,
    description:
      "Plateforme SaaS B2B. Taux de conversion 3x supérieur au benchmark du secteur.",
    tags: ["Next.js", "SaaS", "A/B testé"],
    url: "#",
    gradient: "from-cyan-500/20 via-transparent to-blue-500/15",
  },
  {
    title: "Studio Aura",
    type: "Site Vitrine",
    typeIcon: Globe,
    description:
      "Portfolio interactif pour une agence créative. Animations sur mesure, PageSpeed 98.",
    tags: ["Onepage", "Interactif", "Animé"],
    url: "#",
    gradient: "from-purple-500/20 via-transparent to-pink-500/15",
  },
  {
    title: "FreshMarket",
    type: "E-commerce",
    typeIcon: ShoppingCart,
    description:
      "Alimentation bio en ligne. Catalogue 500+ produits, checkout optimisé, livraison intégrée.",
    tags: ["Shopify Plus", "Catalog", "Performance"],
    url: "#",
    gradient: "from-green-500/20 via-transparent to-cyan-500/15",
  },
];

function PreviewMockup({ gradient }: { gradient: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="ml-1.5 h-3.5 flex-1 rounded-sm bg-white/[0.04]" />
      </div>
      {/* Content */}
      <div className={`relative aspect-[16/9] bg-gradient-to-br ${gradient} p-4 sm:p-5`}>
        <div className="mb-4 flex items-center justify-between">
          <div className="h-2.5 w-14 rounded-full bg-white/[0.12]" />
          <div className="hidden gap-3 sm:flex">
            <div className="h-2 w-8 rounded-full bg-white/[0.06]" />
            <div className="h-2 w-8 rounded-full bg-white/[0.06]" />
            <div className="h-2 w-8 rounded-full bg-white/[0.06]" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-white/[0.1]" />
          <div className="h-3 w-1/2 rounded-full bg-white/[0.08]" />
        </div>
        <div className="mt-3 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-accent/30" />
          <div className="h-5 w-16 rounded-full bg-white/[0.06]" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-md bg-white/[0.05]" />
          <div className="h-10 rounded-md bg-white/[0.05]" />
          <div className="h-10 rounded-md bg-white/[0.05]" />
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
  const ProjectIcon = project.typeIcon;

  return (
    <section
      id="portfolio"
      className="section-dark section-curve relative overflow-hidden py-24 lg:py-28"
    >
      <TechLines variant="default" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Compact header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-10 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent/80">
            Réalisations
          </span>
          <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.8vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
            Des résultats, pas des <em className="heading-italic">promesses</em>.
          </h2>
        </motion.div>

        {/* Unified card — everything inside */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" as const }}
          className="relative rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl sm:p-6 lg:p-7"
        >
          {/* Preview mockup */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mockup-${active}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
              >
                <PreviewMockup gradient={project.gradient} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev/Next controls centered */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={prev}
              aria-label="Projet précédent"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] transition-all duration-200 hover:border-white/25 hover:bg-white/[0.07]"
            >
              <ChevronLeft size={15} className="text-white/75" />
            </button>
            <button
              onClick={next}
              aria-label="Projet suivant"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] transition-all duration-200 hover:border-white/25 hover:bg-white/[0.07]"
            >
              <ChevronRight size={15} className="text-white/75" />
            </button>
            <span className="ml-2 font-mono text-[11px] text-white/40">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Project info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${active}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="mt-5"
            >
              {/* Logo + title */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                  <ProjectIcon size={16} className="text-accent" />
                </div>
                <h3 className="font-heading text-[24px] font-medium leading-none tracking-[-0.02em] text-white sm:text-[28px]">
                  {project.title}
                </h3>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11.5px] font-medium text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-4 text-[13.5px] leading-relaxed text-white/65 sm:text-[14px]">
                {project.description}
              </p>

              {/* CTAs side-by-side */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a
                  href={project.url}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[13px] font-medium text-white/85 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  Détails du projet
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={project.url}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[13px] font-medium text-white/85 transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                >
                  Website live
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              aria-label={`Voir ${p.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
