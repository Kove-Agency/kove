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
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

type Project = {
  title: string;
  domain: string;
  type: string;
  typeIcon: LucideIcon;
  description: string;
  tags: string[];
  url: string;
  screenshot: string;
};

const projects: Project[] = [
  {
    title: "Orbit Labs",
    domain: "orbit-labs-seven.vercel.app",
    type: "Landing SaaS",
    typeIcon: Rocket,
    description:
      "Agence UGC générée par IA. Pipeline de production de vidéos publicitaires automatisées, livrées en 24 à 72h — coût divisé par 10 versus créateurs humains.",
    tags: ["Next.js", "SaaS", "IA"],
    url: "https://orbit-labs-seven.vercel.app/",
    screenshot: "/portfolio/orbit-labs.jpg",
  },
  {
    title: "Sélyne",
    domain: "selyne.fr",
    type: "E-commerce Shopify",
    typeIcon: ShoppingCart,
    description:
      "Boutique beauté premium. Huile de massage anti-cellulite — design épuré, parcours d'achat raccourci, taux de conversion optimisé.",
    tags: ["Shopify", "Beauté", "Premium"],
    url: "https://selyne.fr/",
    screenshot: "/portfolio/selyne.jpg",
  },
  {
    title: "Vach'et Nous",
    domain: "vache-nous.webflow.io",
    type: "Site Vitrine",
    typeIcon: Utensils,
    description:
      "Restaurant gastronomique à Bordeaux. Site vitrine animé avec réservation Zenchef intégrée et expérience visuelle haut de gamme.",
    tags: ["Webflow", "Gastronomie", "Booking"],
    url: "https://vache-nous.webflow.io/",
    screenshot: "/portfolio/vache-nous.jpg",
  },
  {
    title: "Extrad Solution",
    domain: "extrad-solution.com",
    type: "Agence Services",
    typeIcon: Globe,
    description:
      "Agence de relocation internationale depuis Dubaï. Positionnement discret, premium, orienté haut de gamme — site Next.js, performance maximale.",
    tags: ["Next.js", "Premium", "B2B"],
    url: "https://extrad-solution.com/",
    screenshot: "/portfolio/extrad.jpg",
  },
];

function PreviewScreenshot({
  src,
  alt,
  domain,
}: {
  src: string;
  alt: string;
  domain: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="ml-1.5 flex h-4 flex-1 items-center justify-center rounded-sm bg-white/[0.04] px-2">
          <span className="truncate font-mono text-[10px] text-white/40">
            {domain}
          </span>
        </div>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
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
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[70px]" />

      <div className="relative mx-auto max-w-3xl px-6">
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
            Des résultats, pas des{" "}
            <em className="heading-italic">promesses</em>.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" as const }}
          className="relative rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md sm:p-6 lg:p-7"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mockup-${active}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
              >
                <PreviewScreenshot
                  src={project.screenshot}
                  alt={`Capture du site ${project.title}`}
                  domain={project.domain}
                />
              </motion.div>
            </AnimatePresence>
          </div>

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
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${active}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="mt-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                  <ProjectIcon size={16} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-[22px] font-medium leading-none tracking-[-0.02em] text-white sm:text-[26px]">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11.5px] uppercase tracking-[0.14em] text-white/45">
                    {project.type}
                  </p>
                </div>
              </div>

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

              <p className="mt-4 text-[13.5px] leading-relaxed text-white/65 sm:text-[14px]">
                {project.description}
              </p>

              <div className="mt-5">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[13px] font-medium text-white/85 transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                >
                  Voir le site en live
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              aria-label={`Voir ${p.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
