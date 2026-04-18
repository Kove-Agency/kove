"use client";

import { ReactNode } from "react";

/**
 * Pulsor-inspired animated CTA.
 *
 * — Dashed border that marches around the button (SVG stroke-dashoffset loop).
 * — Per-character label with a vertical flip on hover (stagger driven by index).
 * — Optional icon with diagonal swap on hover (slides out top-right, replacement
 *   slides in from bottom-left).
 *
 * Usage:
 *   <AnimatedCTA href="#contact" icon={<ArrowUpRight size={16} />} variant="solid">
 *     Réserver un appel
 *   </AnimatedCTA>
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
    <span className="relative inline-flex items-baseline whitespace-pre leading-none">
      {chars.map((c, i) => {
        const display = c === " " ? "\u00A0" : c;
        const style = {
          transitionDelay: `${i * STAGGER_MS}ms`,
          transitionDuration: `${TRANS_MS}ms`,
          transitionTimingFunction: EASING,
          transitionProperty: "transform",
        };
        return (
          <span
            key={`${c}-${i}`}
            className="relative inline-block overflow-hidden"
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
  // Diagonal: arrow goes up-and-right, replacement enters from bottom-left.
  // Slide: arrow goes right, replacement enters from the left.
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

  const borderOpacity = variant === "solid" ? "opacity-60" : "opacity-45";

  const inner = (
    <span
      className={`group relative inline-flex h-[54px] min-w-[200px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 text-[14.5px] font-medium tracking-[-0.01em] transition-colors duration-300 ${surface} ${className}`}
    >
      {/* Animated dashed border */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${borderOpacity}`}
      >
        <svg
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="9999"
            ry="9999"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
            style={{ animation: "dash-march 1.8s linear infinite" }}
          />
        </svg>
      </span>

      <span className="relative z-10 inline-flex items-baseline">
        <StaggerLabel text={children} />
      </span>

      {icon && (
        <span className="relative z-10 inline-flex">
          <AnimatedIcon icon={icon} motion={iconMotion} />
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel ?? children}
        className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? children}
      className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
    >
      {inner}
    </button>
  );
}
