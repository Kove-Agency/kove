"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
  priceUpfront: number;
  priceSplit: number;
  buttonText: string;
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
    priceUpfront: 890,
    priceSplit: 330,
    buttonText: "Réserver ma place",
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
    priceUpfront: 1890,
    priceSplit: 660,
    buttonText: "Lancer mon projet",
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
    priceUpfront: 3490,
    priceSplit: 1200,
    buttonText: "Discuter du projet",
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

/* ------------------------------------------------------------------ */
/* PRICING SWITCH                                                      */
/* ------------------------------------------------------------------ */

function PricingSwitch({
  value,
  onChange,
}: {
  value: "upfront" | "split";
  onChange: (v: "upfront" | "split") => void;
}) {
  return (
    <div className="relative z-10 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl">
      {[
        { id: "upfront" as const, label: "Comptant", badge: "-10%" },
        { id: "split" as const, label: "3× sans frais" },
      ].map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative z-10 flex h-11 items-center gap-2 rounded-full px-5 text-[13px] font-medium transition-colors duration-300",
              active ? "text-white" : "text-white/55 hover:text-white/80",
            )}
          >
            {active && (
              <motion.span
                layoutId="pricing-switch-pill"
                className="absolute inset-0 -z-0 rounded-full bg-gradient-to-t from-[#2563eb] via-[#3b82f6] to-[#60a5fa] shadow-[0_0_0_1px_rgba(59,130,246,0.45),0_10px_28px_-8px_rgba(59,130,246,0.55)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{opt.label}</span>
            {opt.badge && (
              <span className="relative rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"upfront" | "split">("upfront");

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
            Pas de devis à rallonge, pas de surprise. Vous choisissez un plan, on démarre dans les 48h.
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={sectionRef}
            customVariants={revealVariants}
            className="mt-10 flex justify-center"
          >
            <PricingSwitch value={mode} onChange={setMode} />
          </TimelineContent>
        </div>

        {/* Plans */}
        <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
          {PLANS.map((plan, index) => {
            const Icon = plan.icon;
            const Animation = plan.Animation;
            const price = mode === "upfront" ? plan.priceUpfront : plan.priceSplit;
            return (
              <TimelineContent
                key={plan.id}
                as="div"
                animationNum={3 + index}
                timelineRef={sectionRef}
                customVariants={revealVariants}
              >
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 backdrop-blur-xl transition-all duration-500 lg:p-10",
                    plan.popular
                      ? "border-accent/35 bg-gradient-to-b from-accent/[0.09] via-white/[0.02] to-transparent shadow-[0_40px_100px_-30px_rgba(59,130,246,0.35)]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.035]",
                  )}
                >
                  {plan.popular && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                  )}

                  {/* Animated illustration — what the plan delivers */}
                  <div className="relative mb-6">
                    <Animation />
                    {plan.popular && (
                      <span className="absolute -top-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[11px] font-medium text-accent backdrop-blur-md">
                        <Sparkles size={11} />
                        Populaire
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-300",
                        plan.popular
                          ? "border-accent/30 bg-accent/15 text-accent"
                          : "border-white/[0.08] bg-white/[0.03] text-white/70",
                      )}
                    >
                      <Icon size={16} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-heading text-[28px] font-medium leading-none tracking-[-0.02em] text-white">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="font-heading text-[52px] font-medium leading-none tracking-[-0.04em] text-white">
                      <NumberFlow
                        value={price}
                        format={{ useGrouping: true }}
                        transformTiming={{ duration: 650, easing: "cubic-bezier(0.22,0.61,0.36,1)" }}
                      />
                      <span className="ml-1 text-[28px] text-white/80">€</span>
                    </span>
                    <span className="text-[13px] text-white/45">
                      {mode === "upfront" ? "HT" : "× 3 mois"}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-white/40">
                    {mode === "upfront"
                      ? "Paiement unique · -10% inclus"
                      : `Soit ${plan.priceSplit * 3}€ HT au total`}
                  </p>

                  {/* CTA */}
                  <button
                    className={cn(
                      "pill mt-8 w-full justify-center gap-2 py-4 text-[14px]",
                      plan.popular ? "pill-solid-accent" : "pill-outline-dark hover:bg-white/[0.08]",
                    )}
                  >
                    {plan.buttonText}
                    <ArrowRight size={15} />
                  </button>

                  {/* Features */}
                  <div className="mt-8 border-t border-white/[0.06] pt-6">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                      {plan.includesTitle}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              plan.popular
                                ? "bg-accent/20 text-accent"
                                : "bg-white/[0.06] text-white/70",
                            )}
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span className="text-[13.5px] leading-relaxed text-white/70">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TimelineContent>
            );
          })}
        </div>

        {/* Trust bar */}
        <TimelineContent
          as="div"
          animationNum={7}
          timelineRef={sectionRef}
          customVariants={revealVariants}
          className="mt-16 flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:flex-row md:gap-10"
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
