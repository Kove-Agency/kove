"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, Globe, Rocket, RefreshCw, Sparkles } from "lucide-react";
import { TechLines } from "@/components/tech-lines";
import { AnimatedShaderBackground } from "@/components/ui/animated-shader-background";

const t = { duration: 0.7, ease: "easeOut" as const };

const categories = [
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Globe, label: "Sites vitrines" },
  { icon: Rocket, label: "Landing pages" },
  { icon: RefreshCw, label: "Refontes" },
  { icon: Sparkles, label: "Branding" },
];

export function Hero() {
  return (
    <section className="section-dark section-curve relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* WebGL aurora shader — full-bleed background */}
      <AnimatedShaderBackground />
      {/* Legibility overlay: dims the shader so text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,12,0.35)_0%,rgba(10,10,12,0.72)_70%,rgba(10,10,12,0.92)_100%)]"
      />
      {/* Minimalist cyan frame on top */}
      <TechLines variant="dense" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0 }}
          className="flex justify-center"
        >
          <span className="pill pill-outline-dark">
            <span className="live-dot" />
            <span className="ml-1">3 places restantes ce mois-ci</span>
          </span>
        </motion.div>

        {/* Huge title with emphasis fade */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.1 }}
          className="mx-auto mt-8 max-w-5xl text-center font-heading text-[clamp(2.75rem,7vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white"
        >
          <span className="text-grad-fade-dark">Votre site premium,</span>
          <br />
          <span className="text-white">livré </span>
          <em className="heading-italic">avant vendredi</em>
          <span className="text-white">.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.2 }}
          className="mx-auto mt-7 max-w-2xl text-center text-[17px] leading-relaxed text-emphasis-dark lg:text-[19px]"
        >
          On conçoit des sites qui vendent — pas juste des sites qui existent.
          Design premium, code optimisé, livré en 48-72h grâce à notre stack IA.
        </motion.p>

        {/* CTA — white pill with live dot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.32 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a href="#contact" className="pill pill-solid-white gap-2.5 px-6 py-3.5 text-[14px]">
            <span className="live-dot" />
            <span>Lancer mon projet</span>
          </a>
          <a href="#portfolio" className="pill pill-outline-dark px-6 py-3.5 text-[14px]">
            Voir nos réalisations
          </a>
        </motion.div>

        {/* Social proof — avatars + rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.42 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5"
        >
          <div className="avatar-stack flex items-center">
            {["SM", "TD", "CM", "LB"].map((initials, i) => (
              <div
                key={initials}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 font-heading text-[11px] font-semibold text-white/85"
                style={{ zIndex: 10 - i }}
              >
                {initials}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[13px] text-white/80">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="font-medium text-white">4.9/5</span>
            <span className="text-white/55">· +40 projets livrés</span>
          </div>
        </motion.div>

        {/* Category pills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.55 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 lg:mt-16"
        >
          {categories.map((cat) => (
            <div key={cat.label} className="category-pill">
              <cat.icon size={15} strokeWidth={1.8} className="text-white/70" />
              <span>{cat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats bar — inline on dark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...t, delay: 0.7 }}
          className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-10 rounded-3xl border border-white/[0.06] bg-white/[0.02] px-8 py-6 backdrop-blur-sm sm:gap-16"
        >
          {[
            { value: "48h", label: "livraison moyenne" },
            { value: "95+", label: "score PageSpeed" },
            { value: "100%", label: "satisfaction client" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-10 sm:gap-16">
              {i > 0 && (
                <div className="hidden h-8 w-px bg-white/10 sm:block" />
              )}
              <div className="flex flex-col items-center">
                <span className="font-heading text-3xl font-semibold tracking-tight text-accent lg:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[12px] text-white/60">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
