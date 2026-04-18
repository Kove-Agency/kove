"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pulsor-inspired animated CTA.
 *
 * — Marching-ants dashed border (SVG viewBox + stroke-dashoffset loop).
 * — Per-character vertical flip on hover (stagger driven by index).
 * — Optional icon with diagonal / slide motion on hover.
 *
 * Single-element implementation: the interactive element (`<a>` or `<button>`)
 * IS the group container — no nested wrappers that could misalign on mobile
 * or create halo/tap-highlight bleed.
 */

type Variant = "solid" | "outline";

interface AnimatedCTAProps {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  icon?: ReactNode;
  /** Slide style for the icon on hover: "diagonal" (arrow-up-right) or "slide" (horizontal). */
  iconMotion?: "diagonal" | "slide";
  className?: string;
  ariaLabel?: string;
}

const STAGGER_MS = 22;
const TRANS_MS = 420;
const EASING = "cubic-bezier(0.65, 0.04, 0.36, 1)";

function StaggerLabel({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <span className="relative inline-flex items-center whitespace-pre leading-none">
      {chars.map((c, i) => {
        const display = c === " " ? "\u00A0" : c;
        const style = {
          transitionDelay: `${i * STAGGER_MS}ms`,
          transitionDuration: `${TRANS_MS}ms`,
          transitionTimingFunction: EASING,
          transitionProperty: "transform",
        } as const;
        return (
          <span
            key={`${c}-${i}`}
            className="relative inline-block overflow-hidden align-middle"
            style={{ height: "1em", lineHeight: 1 }}
            aria-hidden={i > 0 ? "true" : undefined}
          >
            <span
              className="block group-hover:-translate-y-full"
              style={style}
            >
              {display}
            </span>
            <span
              className="absolute left-0 top-full block group-hover:-translate-y-full"
              style={style}
            >
              {display}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function AnimatedIcon({
  icon,
  motion,
}: {
  icon: ReactNode;
  motion: "diagonal" | "slide";
}) {
  const outClass =
    motion === "diagonal"
      ? "group-hover:-translate-y-full group-hover:translate-x-full"
      : "group-hover:translate-x-full";
  const inClass =
    motion === "diagonal"
      ? "translate-y-full -translate-x-full group-hover:translate-y-0 group-hover:translate-x-0"
      : "-translate-x-full group-hover:translate-x-0";

  return (
    <span className="relative inline-flex h-[1em] w-[1em] shrink-0 items-center justify-center overflow-hidden text-[1.15em] leading-none">
      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-[360ms] ease-[cubic-bezier(0.65,0.04,0.36,1)] ${outClass}`}
      >
        {icon}
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-[360ms] ease-[cubic-bezier(0.65,0.04,0.36,1)] ${inClass}`}
      >
        {icon}
      </span>
    </span>
  );
}

function DashedBorder({ opacity }: { opacity: number }) {
  // viewBox with explicit inset (x=0.5/y=0.5) keeps the 1px stroke fully inside
  // the container no matter the rendered size. preserveAspectRatio="none"
  // stretches the rect; vectorEffect keeps the stroke width a stable 1px.
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 300 56"
      preserveAspectRatio="none"
    >
      <rect
        x="0.5"
        y="0.5"
        width="299"
        height="55"
        rx="28"
        ry="28"
        fill="none"
        stroke="currentColor"
        strokeOpacity={opacity}
        strokeWidth="1"
        strokeDasharray="3 5"
        vectorEffect="non-scaling-stroke"
        style={{ animation: "dash-march 1.8s linear infinite" }}
      />
    </svg>
  );
}

export function AnimatedCTA({
  children,
  href,
  onClick,
  variant = "solid",
  icon,
  iconMotion = "diagonal",
  className = "",
  ariaLabel,
}: AnimatedCTAProps) {
  const surface =
    variant === "solid"
      ? "bg-[#0A0A0A] text-white hover:bg-[#141417]"
      : "bg-white text-[#0A0A0A] hover:bg-white/95";

  const borderOpacity = variant === "solid" ? 0.6 : 0.45;

  const shared = cn(
    "group relative inline-flex h-[56px] w-full max-w-[280px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 text-[14.5px] font-medium tracking-[-0.01em] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:min-w-[220px]",
    surface,
    className,
  );

  const tapHighlight = { WebkitTapHighlightColor: "transparent" } as const;

  const content = (
    <>
      <DashedBorder opacity={borderOpacity} />
      <span className="relative z-10 inline-flex items-center">
        <StaggerLabel text={children} />
      </span>
      {icon && (
        <span className="relative z-10 inline-flex items-center">
          <AnimatedIcon icon={icon} motion={iconMotion} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel ?? children}
        className={shared}
        style={tapHighlight}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? children}
      className={shared}
      style={tapHighlight}
    >
      {content}
    </button>
  );
}
