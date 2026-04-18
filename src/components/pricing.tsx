"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Check, Rocket, Sparkles, Zap, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { TechLines } from "@/components/tech-lines";
import {
  LandingAnim,
  VitrineAnim,
  EcommerceAnim,
} from "@/components/pricing-animations";

/* ------------------------------------------------------------------ */
/* PLANS                                                               */
/* ------------------------------------------------------------------ */

type Plan = {
  id: string;
  name: string;
  icon: typeof Rocket;
  Animation: React.ComponentType;
  tagline: string;
  priceFrom: number;
  features: string[];
  includesTitle: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Landing",
    icon: Zap,
    Animation: LandingAnim,
    tagline: "Pour valider une offre rapidement, capter des leads, ou lancer un produit.",
    priceFrom: 890,
    features: [
      "1 page responsive premium",
      "Design sur mesure Figma",
      "Animations Framer Motion",
      "Formulaire + intégration CRM",
      "SEO de base (metas, sitemap)",
      "Livraison sous 72h",
    ],
    includesTitle: "Inclus dans Landing :",
  },
  {
    id: "pro",
    name: "Vitrine",
    icon: Sparkles,
    Animation: VitrineAnim,
    tagline: "Pour construire une marque crédible et convertir vos visiteurs en clients.",
    priceFrom: 1890,
    popular: true,
    features: [
      "Jusqu'à 7 pages sur mesure",
      "Direction artistique complète",
      "Animations micro-interactions",
      "Blog intégré (Sanity/Notion)",
      "SEO technique avancé",
      "Analytics + Hotjar setup",
      "Livraison sous 7 jours",
    ],
    includesTitle: "Tout de Landing, plus :",
  },
  {
    id: "business",
    name: "E-commerce",
    icon: Rocket,
    Animation: EcommerceAnim,
    tagline: "Pour scaler votre marque, automatiser votre stack et maximiser le CA.",
    priceFrom: 3490,
    features: [
      "Shopify 2.0 ou Next Commerce",
      "Design e-commerce sur mesure",
      "Fiches produits optimisées",
      "Intégrations paiement & livraison",
      "Dashboard admin personnalisé",
      "Optimisation conversion (CRO)",
      "Livraison sous 2 semaines",
    ],
    includesTitle: "Tout de Vitrine, plus :",
  },
];

const UNIFIED_CTA_LABEL = "Discuter de mon projet";
const UNIFIED_CTA_HREF = "#contact";

/* ------------------------------------------------------------------ */
/* PLAN CARD                                                           */
/* ------------------------------------------------------------------ */

const featureListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.18 },
  },
};

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const Icon = plan.icon;
  const Animation = plan.Animation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 240, damping: 22 } }}
        whileTap={{ scale: 0.985 }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 backdrop-blur-xl transition-[border-color,background,box-shadow] duration-500 lg:p-10",
          plan.popular
            ? "border-accent/35 bg-gradient-to-b from-accent/[0.09] via-white/[0.02] to-transparent shadow-[0_40px_100px_-30px_rgba(59,130,246,0.35)]"
            : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04] hover:shadow-[0_30px_80px_-40px_rgba(255,255,255,0.18)]",
        )}
      >
        {/* Breathing accent halo — popular only */}
        {plan.popular && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          </>
        )}

        {/* Cursor-following spotlight — non-popular cards */}
        {!plan.popular && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(255,255,255,0.06), transparent 60%)",
            }}
          />
        )}

        {/* Animated illustration — what the plan delivers */}
        <div className="relative mb-6">
          <Animation />
          {plan.popular && (
            <motion.span
              layoutId="popular-badge"
              className="absolute -top-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[11px] font-medium text-accent backdrop-blur-md"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={11} />
              Populaire
            </motion.span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.55 } }}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-300",
              plan.popular
                ? "border-accent/30 bg-accent/15 text-accent"
                : "border-white/[0.08] bg-white/[0.03] text-white/70",
            )}
          >
            <Icon size={16} strokeWidth={2.2} />
          </motion.div>
          <h3 className="font-heading text-[28px] font-medium leading-none tracking-[-0.02em] text-white">
            {plan.name}
          </h3>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">{plan.tagline}</p>

        {/* Price — "À partir de" framing */}
        <div className="mt-8">
          <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
            À partir de
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-heading text-[52px] font-medium leading-none tracking-[-0.04em] text-white">
              <NumberFlow
                value={plan.priceFrom}
                format={{ useGrouping: true }}
                transformTiming={{ duration: 650, easing: "cubic-bezier(0.22,0.61,0.36,1)" }}
              />
              <span className="ml-1 text-[28px] text-white/80">€</span>
            </span>
            <span className="text-[13px] text-white/45">HT</span>
          </div>
          <p className="mt-1 text-[11.5px] text-white/40">
            Tarif indicatif · Devis personnalisé sous 24h
          </p>
        </div>

        {/* Unified CTA — all plans lead to the same contact funnel */}
        <motion.a
          href={UNIFIED_CTA_HREF}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className={cn(
            "pill mt-8 w-full justify-center gap-2 py-4 text-[14px]",
            plan.popular ? "pill-solid-accent" : "pill-outline-dark hover:bg-white/[0.08]",
          )}
        >
          {UNIFIED_CTA_LABEL}
          <motion.span
            className="inline-flex"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <ArrowRight size={15} />
          </motion.span>
        </motion.a>

        {/* Features */}
        <div className="mt-8 border-t border-white/[0.06] pt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            {plan.includesTitle}
          </p>
          <motion.ul
            variants={featureListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-5 space-y-3"
          >
            {plan.features.map((f) => (
              <motion.li
                key={f}
                variants={featureItemVariants}
                className="flex items-start gap-3"
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 480, damping: 18 }}
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    plan.popular
                      ? "bg-accent/20 text-accent"
                      : "bg-white/[0.06] text-white/70",
                  )}
                >
                  <Check size={11} strokeWidth={3} />
                </motion.span>
                <span className="text-[13.5px] leading-relaxed text-white/70">{f}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.18,
        duration: 0.55,
        ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", `${e.clientX - r.left}px`);
    t.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-dark section-curve relative overflow-hidden py-28 lg:py-36"
    >
      <TechLines variant="dense" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[160px]" />

      <div className="relative mx-auto max-w-[1240px] px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <TimelineContent
            as="span"
            animationNum={0}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            className="pill pill-outline-dark mx-auto"
          >
            <span className="live-dot" />
            Tarifs transparents
          </TimelineContent>

          <h2 className="mt-6 font-heading text-[clamp(2.25rem,6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 38,
                delay: 0.1,
              }}
            >
              Un plan pour chaque
            </VerticalCutReveal>{" "}
            <em className="heading-italic">ambition</em>.
          </h2>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-emphasis-dark lg:text-[17px]"
          >
            Chaque projet est unique. Ces tarifs couvrent 80% des cas — pour le reste, on en discute en 15 minutes.
          </TimelineContent>
        </div>

        {/* Plans */}
        <div
          className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6"
          onMouseMove={handleCardMouseMove}
        >
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Disclaimer — sets expectation that cards are starting points */}
        <TimelineContent
          as="p"
          animationNum={6}
          timelineRef={sectionRef}
          customVariants={revealVariants}
          className="mx-auto mt-8 max-w-2xl text-center text-[12.5px] leading-relaxed text-white/45"
        >
          Tarifs indicatifs hors taxes. Chaque projet fait l&apos;objet d&apos;un devis sur mesure envoyé sous 24h après le premier échange.
        </TimelineContent>

        {/* Trust bar */}
        <TimelineContent
          as="div"
          animationNum={7}
          timelineRef={sectionRef}
          customVariants={revealVariants}
          className="mt-10 flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:flex-row md:gap-10"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="text-[14px] font-medium text-white">4.9/5</span>
            <span className="text-[13px] text-white/45">· basé en France</span>
          </div>
          <span className="hidden h-6 w-px bg-white/10 md:block" />
          <div className="flex items-center gap-2 text-[13px] text-white/55">
            <Check size={14} className="text-accent" />
            Acompte 50%, solde à la livraison
          </div>
          <span className="hidden h-6 w-px bg-white/10 md:block" />
          <div className="flex items-center gap-2 text-[13px] text-white/55">
            <Check size={14} className="text-accent" />
            Support 30 jours inclus
          </div>
        </TimelineContent>
      </div>
    </section>
  );
}
