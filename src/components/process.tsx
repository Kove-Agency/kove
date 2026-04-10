"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgress(0);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  // Auto-advance loop — ALWAYS in order, cleanly reset between steps
  useEffect(() => {
    if (paused) return;
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + (TICK_MS / STEP_DURATION_MS) * 100;
        if (next >= 100) {
          setActive((a) => (a + 1) % STEPS.length);
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

  const CurrentMockup = STEPS[active].Mockup;
  const CurrentIcon = STEPS[active].icon;

  return (
    <section
      id="process"
      className="section-dark section-curve relative overflow-hidden py-28 lg:py-36"
    >
      <TechLines variant="default" />
      <div className="pointer-events-none absolute right-[10%] top-1/4 h-[440px] w-[440px] rounded-full bg-accent/[0.05] blur-[140px]" />

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

        {/* Horizontal pipeline — always shows all 4 steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
          className="mt-14 lg:mt-20"
        >
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-6 h-[2px] rounded-full bg-white/[0.06]" />
            <motion.div
              className="absolute left-0 top-6 h-[2px] rounded-full bg-gradient-to-r from-accent via-accent to-cyan-400"
              initial={false}
              animate={{
                width: `${(active / (STEPS.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" as const }}
            />

            {/* Nodes */}
            <div className="relative grid grid-cols-4 gap-2">
              {STEPS.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "todo";
                const Icon = s.icon;
                return (
                  <button
                    key={s.step}
                    onClick={() => goTo(i)}
                    className="group flex flex-col items-center gap-3 text-center"
                  >
                    <div className="relative">
                      {state === "active" && (
                        <motion.div
                          layoutId="process-halo"
                          className="absolute -inset-2 rounded-full bg-accent/15 blur-md"
                          transition={{ type: "spring", stiffness: 260, damping: 28 }}
                        />
                      )}
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                          state === "active"
                            ? "border-accent bg-accent text-white shadow-[0_0_0_4px_rgba(59,130,246,0.18)]"
                            : state === "done"
                              ? "border-accent/60 bg-accent/20 text-white"
                              : "border-white/25 bg-white/[0.04] text-white group-hover:border-white/50 group-hover:bg-white/[0.08]"
                        }`}
                      >
                        {state === "done" ? (
                          <CheckCircle2 size={20} strokeWidth={2.4} />
                        ) : (
                          <Icon size={18} strokeWidth={2.2} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className={`font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 ${
                          state === "active"
                            ? "text-accent"
                            : state === "done"
                              ? "text-accent/80"
                              : "text-white/80"
                        }`}
                      >
                        STEP {s.step}
                      </span>
                      <span
                        className={`text-[13px] font-medium transition-colors duration-300 sm:text-[14px] ${
                          state === "active"
                            ? "text-white"
                            : state === "done"
                              ? "text-white"
                              : "text-white group-hover:text-white"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`hidden text-[11px] sm:block ${
                          state === "active" ? "text-white/75" : "text-white/60"
                        }`}
                      >
                        {s.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auto-advance progress bar under the row */}
          <div className="mx-auto mt-8 h-[2px] w-[160px] overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-accent/80 transition-[width] ease-linear"
              style={{
                width: `${paused ? 100 : progress}%`,
                transitionDuration: `${TICK_MS}ms`,
              }}
            />
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
          <div className="grid gap-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:p-10">
            {/* Left — step info */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${active}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" as const }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                      <CurrentIcon size={18} className="text-accent" />
                    </div>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono tracking-[0.2em] text-white/60">
                      STEP {STEPS[active].step}
                    </span>
                    <span className="rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-1 text-[11px] font-medium text-accent">
                      {STEPS[active].duration}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                    {STEPS[active].short}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                    {STEPS[active].description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="flex items-center gap-2 text-[12px] text-white/50">
                      <span className="font-mono">{String(active + 1).padStart(2, "0")}</span>
                      <span className="h-px w-8 bg-white/20" />
                      <span className="font-mono">04</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — mockup */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`mockup-${active}`}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" as const }}
                >
                  <CurrentMockup />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
