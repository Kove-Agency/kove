"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import {
  MessageSquare,
  Palette,
  Code,
  Rocket,
  CheckCircle2,
  Circle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TechLines } from "@/components/tech-lines";
import { useAutoPause } from "@/lib/use-auto-pause";

/* ------------------------------------------------------------------ */
/* MOCKUPS — one per step                                              */
/* ------------------------------------------------------------------ */

function MockupShell({ title, status, children }: { title: string; status: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/90 overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-[11px] text-white/50">{title}</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {status}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function BriefMockup() {
  return (
    <MockupShell title="Brief · Nouveau projet" status="En cours">
      <div className="space-y-3.5">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" as const }}
          className="flex items-start gap-3"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
            K
          </div>
          <div className="rounded-xl rounded-tl-sm bg-white/[0.04] px-4 py-2.5 text-[13px] text-white/70">
            Décrivez-moi votre projet en quelques lignes.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.35, ease: "easeOut" as const }}
          className="flex items-start justify-end gap-3"
        >
          <div className="rounded-xl rounded-tr-sm bg-accent/20 px-4 py-2.5 text-[13px] text-white">
            Marque de vêtements premium, besoin d&apos;un e-commerce Shopify.
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-white/50">
            V
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.35, ease: "easeOut" as const }}
          className="flex items-start gap-3"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
            K
          </div>
          <div className="rounded-xl rounded-tl-sm bg-white/[0.04] px-4 py-2.5 text-[13px] text-white/70">
            Parfait. Cible, budget, lancement souhaité&nbsp;?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5"
        >
          <span className="flex-1 text-[13px] text-white/40">Tapez votre réponse…</span>
          <ArrowRight size={14} className="text-accent/60" />
        </motion.div>
      </div>
    </MockupShell>
  );
}

function DesignMockup() {
  return (
    <MockupShell title="Design · Maquette v1" status="Validation">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" as const }}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4"
      >
        {/* header mock */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded-full bg-white/[0.12]" />
          <div className="flex gap-3">
            <div className="h-2 w-10 rounded-full bg-white/[0.07]" />
            <div className="h-2 w-10 rounded-full bg-white/[0.07]" />
            <div className="h-2 w-10 rounded-full bg-white/[0.07]" />
          </div>
        </div>

        {/* hero banner mock */}
        <div className="relative h-24 overflow-hidden rounded-xl bg-gradient-to-br from-accent/30 via-accent/10 to-transparent">
          <div className="absolute inset-4 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="h-2.5 w-32 rounded-full bg-white/50" />
              <div className="h-2 w-20 rounded-full bg-white/30" />
            </div>
            <div className="h-6 w-20 rounded-full bg-white/80" />
          </div>
        </div>

        {/* grid products */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.35 }}
              className="h-14 rounded-lg bg-white/[0.05]"
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.35 }}
        className="mt-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-[12px] text-white/55">
          <Palette size={12} className="text-accent/70" />
          3 variantes proposées
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-white/55">Ajuster</span>
          <span className="rounded-full bg-accent/25 px-3 py-1 text-[11px] font-medium text-accent">Valider ✓</span>
        </div>
      </motion.div>
    </MockupShell>
  );
}

function DevMockup() {
  const tasks = [
    { label: "Structure & routing", done: true },
    { label: "Design system & composants", done: true },
    { label: "Animations Framer Motion", done: true },
    { label: "Intégration contenu", done: true },
    { label: "SEO & métadonnées", done: true },
    { label: "Tests responsive", loading: true },
    { label: "Optimisation PageSpeed", done: false },
  ];

  return (
    <MockupShell title="Production · En cours" status="Processing">
      <div className="space-y-1">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              "loading" in task && task.loading ? "bg-accent/[0.06] border border-accent/15" : ""
            }`}
          >
            {"loading" in task && task.loading ? (
              <Loader2 size={15} className="shrink-0 text-accent animate-spin" />
            ) : task.done ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.08 + 0.1, type: "spring", stiffness: 360 }}
              >
                <CheckCircle2 size={15} className="shrink-0 text-green-400" />
              </motion.div>
            ) : (
              <Circle size={15} className="shrink-0 text-white/20" />
            )}
            <span
              className={`flex-1 text-[13px] ${
                task.done
                  ? "text-white/55"
                  : "loading" in task && task.loading
                    ? "text-white/85"
                    : "text-white/30"
              }`}
            >
              {task.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
        className="mt-4 pt-4 border-t border-white/[0.06]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-white/50">Progression</span>
          <span className="text-[11px] font-mono font-medium text-accent">83%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: "83%" }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" as const }}
          />
        </div>
      </motion.div>
    </MockupShell>
  );
}

function DeployMockup() {
  return (
    <MockupShell title="Déploiement · Terminé" status="En ligne">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, duration: 0.4, ease: "easeOut" as const }}
        className="rounded-xl border border-green-500/20 bg-green-500/[0.06] p-4"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2 size={14} className="text-green-400" />
          </div>
          <p className="text-[13px] font-medium text-green-400">Votre site est en ligne</p>
        </div>
        <p className="mt-2 text-[11px] text-white/50">votresite.com · Déployé il y a 2 min</p>
      </motion.div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "PageSpeed", value: 97 },
          { label: "SEO", value: 100 },
          { label: "Accessibilité", value: 95 },
        ].map((m, idx) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + idx * 0.1, duration: 0.35 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"
          >
            <p className="font-heading text-[22px] font-semibold text-green-400">{m.value}</p>
            <p className="mt-0.5 text-[10px] text-white/55">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
        className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-2.5 text-[12px] text-white/60"
      >
        <span>✓ SSL actif</span>
        <span>✓ Analytics</span>
        <span>✓ Sitemap</span>
      </motion.div>
    </MockupShell>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                */
/* ------------------------------------------------------------------ */

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  duration: string;
  short: string;
  description: string;
  Mockup: React.ComponentType;
}

const STEPS: Step[] = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Brief",
    duration: "15 min",
    short: "On comprend votre projet",
    description:
      "Un seul échange pour cadrer objectifs, cible, inspirations et contraintes. Vous repartez avec un devis chiffré sous 24h.",
    Mockup: BriefMockup,
  },
  {
    icon: Palette,
    step: "02",
    title: "Design",
    duration: "24h",
    short: "Maquette sur mesure",
    description:
      "On conçoit une direction visuelle unique dans Figma. Vous validez chaque écran avant une seule ligne de code.",
    Mockup: DesignMockup,
  },
  {
    icon: Code,
    step: "03",
    title: "Production",
    duration: "48-72h",
    short: "Développement IA-assisté",
    description:
      "Votre maquette prend vie. Code optimisé, animations fluides, responsive pixel-perfect. Vous suivez en live.",
    Mockup: DevMockup,
  },
  {
    icon: Rocket,
    step: "04",
    title: "Livraison",
    duration: "J+0",
    short: "Site en ligne, optimisé",
    description:
      "Déploiement, performances, SEO, analytics. Site livré clé en main, support 30 jours inclus.",
    Mockup: DeployMockup,
  },
];

const STEP_DURATION_MS = 6500;
const RESUME_AFTER_MS = 15000;
const TICK_MS = 40;

/* Direction-aware slide variants — spring physics, no linear easing */
const SPRING = { type: "spring" as const, stiffness: 180, damping: 26, mass: 0.9 };

const infoVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 28,
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: SPRING,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -28,
    filter: "blur(8px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  }),
};

const mockupVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 48,
    y: 8,
    scale: 0.97,
    rotateY: dir * 4,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { ...SPRING, stiffness: 160 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -48,
    y: -8,
    scale: 0.97,
    rotateY: dir * -4,
    filter: "blur(10px)",
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  }),
};

export function Process() {
  const [[active, direction], setActiveDir] = useState<[number, number]>([0, 1]);
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const offscreenPaused = useAutoPause(sectionRef);
  const paused = userPaused || offscreenPaused;

  const goTo = useCallback((i: number) => {
    setActiveDir(([prev]) => {
      if (i === prev) return [prev, 0];
      // Shortest-path direction (wrap-around aware)
      const n = STEPS.length;
      const forward = (i - prev + n) % n;
      const backward = (prev - i + n) % n;
      return [i, forward <= backward ? 1 : -1];
    });
    setProgress(0);
    setUserPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setUserPaused(false), RESUME_AFTER_MS);
  }, []);

  useEffect(() => {
    if (paused) return;
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + (TICK_MS / STEP_DURATION_MS) * 100;
        if (next >= 100) {
          setActiveDir(([prev]) => [(prev + 1) % STEPS.length, 1]);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(tick);
  }, [paused]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  // Gentle parallax on the mockup while the section scrolls past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mockupParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const CurrentMockup = STEPS[active].Mockup;
  const CurrentIcon = STEPS[active].icon;

  // Glow follows the active step across the tabs
  const glowLeft = useMemo(
    () => `${((active + 0.5) / STEPS.length) * 100}%`,
    [active],
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-dark section-curve relative overflow-hidden py-28 lg:py-36"
    >
      <TechLines variant="default" />
      {/* Ambient glow that shifts position based on active step */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[80px]"
        style={{ willChange: "left" }}
        animate={{ left: glowLeft }}
        transition={{ type: "spring", stiffness: 60, damping: 22 }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header — compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent/80">
            Process
          </span>
          <h2 className="mt-3 font-heading text-[clamp(1.75rem,3.8vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
            Du brief au live, <em className="heading-italic">en temps réel</em>.
          </h2>
        </motion.div>

        {/* Tabs — text only, underline slides between them with spring */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
          className="mt-10 lg:mt-14"
        >
          <div className="mx-auto max-w-3xl">
            <div className="relative flex items-stretch justify-between gap-1 sm:gap-3">
              {STEPS.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "todo";
                return (
                  <button
                    key={s.step}
                    onClick={() => goTo(i)}
                    className="group relative flex-1 pb-4 pt-2 text-center"
                    aria-current={state === "active" ? "step" : undefined}
                  >
                    <motion.span
                      animate={{
                        color:
                          state === "active"
                            ? "#3b82f6"
                            : state === "done"
                              ? "rgba(255,255,255,0.55)"
                              : "rgba(255,255,255,0.35)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="block font-mono text-[10px] tracking-[0.22em]"
                    >
                      {s.step}
                    </motion.span>
                    <motion.span
                      animate={{
                        color:
                          state === "active"
                            ? "rgb(255,255,255)"
                            : state === "done"
                              ? "rgba(255,255,255,0.7)"
                              : "rgba(255,255,255,0.45)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="mt-1 block text-[13px] font-medium sm:text-[14px]"
                    >
                      {s.title}
                    </motion.span>
                  </button>
                );
              })}

              {/* Shared underline — slides with spring physics (transform-only) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.55)]"
                style={{ width: `${100 / STEPS.length}%`, willChange: "transform" }}
                animate={{ x: `${active * 100}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              />
              {/* Progress within the active tab (scaleX instead of width) */}
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] origin-left rounded-full bg-white/25"
                style={{ width: `${100 / STEPS.length}%`, willChange: "transform, opacity" }}
                animate={{
                  x: `${active * 100}%`,
                  scaleX: progress / 100,
                  opacity: paused ? 0 : 0.6,
                }}
                transition={{
                  x: { type: "spring", stiffness: 220, damping: 28 },
                  scaleX: { duration: 0.2, ease: "linear" },
                  opacity: { duration: 0.2 },
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Preview panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
          className="mt-14"
        >
          <motion.div
            layout
            className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
            style={{ perspective: "1400px" }}
          >
            {/* Left — step info */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={`info-${active}`}
                  custom={direction}
                  variants={infoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.85, rotate: -8 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 20 }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10"
                    >
                      <CurrentIcon size={18} className="text-accent" />
                    </motion.div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono tracking-[0.2em] text-white/60">
                      STEP {STEPS[active].step}
                    </span>
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 22 }}
                      className="rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-[11px] font-medium text-accent"
                    >
                      {STEPS[active].duration}
                    </motion.span>
                  </div>
                  <h3 className="mt-6 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                    {STEPS[active].short}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                    {STEPS[active].description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="flex items-center gap-2 text-[12px] text-white/50">
                      <span className="font-mono tabular-nums">
                        {String(active + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 bg-white/20" />
                      <span className="font-mono tabular-nums">04</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — mockup */}
            <motion.div
              className="relative will-change-transform"
              style={{ y: mockupParallaxY, transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={`mockup-${active}`}
                  custom={direction}
                  variants={mockupVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <CurrentMockup />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
