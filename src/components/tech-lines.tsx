/**
 * <TechLines /> — minimalist cyan frame around dark sections
 *
 * Usage:
 *   <section className="section-dark relative overflow-hidden">
 *     <TechLines />
 *     ...
 *   </section>
 *
 * A single thin cyan outline with discrete corner brackets.
 * Variants tune the brightness / inset of the frame.
 */

type Variant = "default" | "dense" | "soft";

interface TechLinesProps {
  variant?: Variant;
  /** Kept for API compatibility — corners are always rendered. */
  corners?: boolean;
  className?: string;
}

export function TechLines({ variant = "default", className = "" }: TechLinesProps) {
  const variantClass =
    variant === "dense"
      ? "techlines-dense"
      : variant === "soft"
        ? "techlines-soft"
        : "";

  return (
    <div
      className={`techlines-wrap hidden lg:block ${variantClass} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="techlines-node left" />
      <span className="techlines-node right" />
    </div>
  );
}
