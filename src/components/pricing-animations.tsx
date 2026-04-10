"use client";

/**
 * Pricing plan animations — Lottie-style motion illustrations powered
 * by Framer Motion. Each loop seamlessly and illustrates what the plan
 * delivers: a landing page being built, a multi-page vitrine, a live
 * e-commerce storefront.
 *
 * Design rules:
 *   - 112px tall, full width, consistent across all 3
 *   - Dark surface + accent blue + cyan highlights (brand Kove)
 *   - No external Lottie JSON, 100% React + framer-motion
 */

import { motion } from "framer-motion";
import { ShoppingCart, Check, MousePointer2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* SHARED                                                              */
/* ------------------------------------------------------------------ */

function BrowserChrome({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/[0.05] bg-black/40 px-2.5 py-1.5">
      <div className="h-1.5 w-1.5 rounded-full bg-red-500/55" />
      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/55" />
      <div className="h-1.5 w-1.5 rounded-full bg-green-500/55" />
      {label && (
        <div className="ml-2 flex h-[14px] flex-1 items-center justify-center rounded-[5px] bg-white/[0.04] px-2 text-[8px] font-mono font-medium tracking-tight text-white/35">
          {label}
        </div>
      )}
    </div>
  );
}

function AnimContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[130px] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#050505] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {/* Scan-line highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_60%)]" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. LANDING — single-page build + CTA click                          */
/* ------------------------------------------------------------------ */

export function LandingAnim() {
  const LOOP = 4.5; // seconds

  return (
    <AnimContainer>
      <BrowserChrome label="landing.com" />
      <div className="relative h-[calc(100%-22px)] px-3.5 pt-3">
        {/* Hero headline line 1 */}
        <motion.div
          className="h-[6px] origin-left rounded-full bg-gradient-to-r from-white/90 via-white/60 to-cyan-300/40"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1, 1, 0],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.18, 0.55, 0.85, 1],
          }}
          style={{ width: "78%" }}
        />
        {/* Hero headline line 2 */}
        <motion.div
          className="mt-2 h-[6px] origin-left rounded-full bg-white/30"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 0, 1, 1, 0],
            opacity: [0, 0, 1, 1, 0],
          }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.12, 0.28, 0.85, 1],
          }}
          style={{ width: "52%" }}
        />
        {/* Subcopy */}
        <motion.div
          className="mt-3 h-[3px] origin-left rounded-full bg-white/15"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 0, 1, 1, 0] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.22, 0.38, 0.85, 1],
          }}
          style={{ width: "66%" }}
        />
        <motion.div
          className="mt-1.5 h-[3px] origin-left rounded-full bg-white/12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 0, 1, 1, 0] }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.1,
            times: [0, 0.22, 0.38, 0.85, 1],
          }}
          style={{ width: "44%" }}
        />

        {/* CTA button */}
        <motion.div
          className="absolute bottom-3.5 left-3.5 flex h-6 items-center gap-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-3 text-[8px] font-semibold tracking-tight text-white shadow-[0_6px_18px_-6px_rgba(59,130,246,0.7)]"
          initial={{ scale: 0, opacity: 0, y: 4 }}
          animate={{
            scale: [0, 1, 1.04, 1, 1, 0],
            opacity: [0, 1, 1, 1, 1, 0],
            y: [4, 0, 0, 0, 0, 4],
          }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.38, 0.55, 0.6, 0.88, 1],
          }}
        >
          Réserver
          <span className="text-[9px]">→</span>
        </motion.div>

        {/* Cursor pointer — slides in, clicks, disappears */}
        <motion.div
          className="absolute text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          initial={{ x: 140, y: 60, opacity: 0 }}
          animate={{
            x: [140, 46, 42, 42, 140],
            y: [60, 68, 64, 64, 60],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            ease: [0.32, 0, 0.24, 1] as [number, number, number, number],
            times: [0, 0.48, 0.58, 0.85, 1],
          }}
        >
          <MousePointer2 size={14} strokeWidth={2} fill="white" />
        </motion.div>

        {/* Click ripple */}
        <motion.div
          className="absolute bottom-[13px] left-[52px] h-8 w-8 rounded-full border border-cyan-300/60"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 0, 1.6, 1.6],
            opacity: [0, 0, 0.8, 0, 0],
          }}
          transition={{
            duration: LOOP,
            repeat: Infinity,
            times: [0, 0.55, 0.58, 0.72, 1],
          }}
          style={{ x: "-50%", y: "-50%", transformOrigin: "center" }}
        />
      </div>
    </AnimContainer>
  );
}

/* ------------------------------------------------------------------ */
/* 2. VITRINE — multi-page navigation                                  */
/* ------------------------------------------------------------------ */

export function VitrineAnim() {
  const LOOP = 6;
  const NAV_LINKS = ["Accueil", "Projets", "Contact"];

  // Content layout per "page"
  const pages = [
    // Home: big hero + 3-col grid
    (
      <div key="home" className="space-y-1.5">
        <div className="h-[6px] w-[70%] rounded-full bg-gradient-to-r from-white/90 to-cyan-300/50" />
        <div className="h-[3px] w-[44%] rounded-full bg-white/25" />
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 rounded bg-white/[0.06]" />
          ))}
        </div>
      </div>
    ),
    // Projects: 2-col image grid
    (
      <div key="projects" className="grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-4 rounded bg-gradient-to-br from-white/[0.08] to-cyan-300/10"
          />
        ))}
      </div>
    ),
    // Contact: form lines + button
    (
      <div key="contact" className="space-y-1.5">
        <div className="h-3 rounded bg-white/[0.05]" />
        <div className="h-3 rounded bg-white/[0.05]" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-[50%] rounded bg-white/[0.05]" />
          <div className="h-3 w-[22%] rounded bg-gradient-to-r from-[#2563eb] to-[#3b82f6]" />
        </div>
      </div>
    ),
  ];

  return (
    <AnimContainer>
      <BrowserChrome label="agence.com" />

      {/* Mini nav bar */}
      <div className="relative border-b border-white/[0.05] px-3 py-2">
        <div className="relative flex items-center justify-center gap-3">
          {NAV_LINKS.map((link) => (
            <div
              key={link}
              className="relative z-10 rounded-full px-2 py-0.5 text-[7.5px] font-medium tracking-tight text-white/55"
            >
              {link}
            </div>
          ))}
          {/* Active pill — slides between positions */}
          <motion.div
            className="absolute inset-y-0 -z-0 rounded-full bg-gradient-to-r from-[#2563eb]/80 to-[#3b82f6]/70 shadow-[0_0_14px_rgba(59,130,246,0.5)]"
            initial={{ x: 0, width: 32 }}
            animate={{
              x: ["-50%", "-50%", "4%", "4%", "56%", "56%", "-50%"],
              width: [40, 40, 38, 38, 40, 40, 40],
            }}
            transition={{
              duration: LOOP,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              times: [0, 0.18, 0.28, 0.48, 0.58, 0.8, 1],
            }}
            style={{ left: "50%", top: 2, bottom: 2 }}
          />
        </div>
      </div>

      {/* Page content — cross-fades between the 3 pages */}
      <div className="relative px-3.5 pt-2.5">
        {pages.map((pageJsx, i) => {
          // Each page is visible for ~33% of the loop
          const start = i * 0.33;
          return (
            <motion.div
              key={i}
              className="absolute inset-x-3.5 top-2.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: [0, 0, 1, 1, 0, 0],
                y: [6, 6, 0, 0, -6, -6],
              }}
              transition={{
                duration: LOOP,
                repeat: Infinity,
                ease: "easeOut",
                times: [
                  0,
                  Math.max(0, start - 0.02),
                  start + 0.04,
                  start + 0.28,
                  start + 0.32,
                  1,
                ],
              }}
            >
              {pageJsx}
            </motion.div>
          );
        })}
      </div>
    </AnimContainer>
  );
}

/* ------------------------------------------------------------------ */
/* 3. E-COMMERCE — storefront with cart                                */
/* ------------------------------------------------------------------ */

export function EcommerceAnim() {
  const LOOP = 5;

  return (
    <AnimContainer>
      <BrowserChrome label="shop.com" />

      {/* Header bar with cart */}
      <div className="flex items-center justify-between border-b border-white/[0.05] px-3 py-1.5">
        <div className="h-[6px] w-10 rounded-full bg-gradient-to-r from-white/80 to-cyan-300/40" />
        <div className="relative">
          <ShoppingCart size={11} className="text-white/70" strokeWidth={2.2} />
          {/* Cart badge — counts up */}
          <motion.div
            className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#3b82f6] text-[7px] font-bold text-white shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 0, 1, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: LOOP,
              repeat: Infinity,
              times: [0, 0.16, 0.22, 0.4, 0.58, 0.76, 0.94, 1],
              ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
            }}
          >
            {/* Multi-stage label */}
            <motion.span
              initial={false}
              animate={{ opacity: [0, 0, 1, 1, 1, 1, 1, 0] }}
              transition={{
                duration: LOOP,
                repeat: Infinity,
                times: [0, 0.16, 0.22, 0.4, 0.58, 0.76, 0.94, 1],
              }}
            >
              3
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-3 gap-1.5 px-3 pt-2.5">
        {[0, 1, 2].map((i) => {
          const enter = 0.1 + i * 0.14;
          const checked = 0.3 + i * 0.16;
          return (
            <motion.div
              key={i}
              className="relative h-11 overflow-hidden rounded-md border border-white/[0.06] bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: [0, 0, 1, 1, 1, 0],
                y: [6, 6, 0, 0, 0, -4],
              }}
              transition={{
                duration: LOOP,
                repeat: Infinity,
                times: [0, enter - 0.02, enter + 0.04, 0.85, 0.9, 1],
                ease: "easeOut",
              }}
            >
              {/* Product image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-300/30 to-white/5" />
              </div>
              {/* Price tag */}
              <div className="absolute bottom-0.5 left-0.5 h-[3px] w-5 rounded-full bg-white/25" />
              {/* Checkmark when added */}
              <motion.div
                className="absolute right-0.5 top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#3b82f6] shadow-[0_0_6px_rgba(59,130,246,0.65)]"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: LOOP,
                  repeat: Infinity,
                  times: [0, checked - 0.02, checked + 0.03, 0.9, 1],
                  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                }}
              >
                <Check size={7} strokeWidth={4} className="text-white" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Checkout bar at bottom */}
      <motion.div
        className="absolute bottom-2 left-3 right-3 flex h-5 items-center justify-between rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-2.5 shadow-[0_4px_18px_-4px_rgba(59,130,246,0.7)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: [0, 0, 0, 1, 1, 0],
          y: [8, 8, 8, 0, 0, 8],
        }}
        transition={{
          duration: LOOP,
          repeat: Infinity,
          times: [0, 0.7, 0.78, 0.84, 0.92, 1],
          ease: "easeOut",
        }}
      >
        <span className="text-[7.5px] font-semibold tracking-tight text-white">
          Paiement
        </span>
        <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[7px] font-bold text-white">
          249€
        </span>
      </motion.div>
    </AnimContainer>
  );
}
