"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ElementType, type ComponentProps, type RefObject } from "react";

interface TimelineContentProps<T extends ElementType> {
  as?: T;
  animationNum: number;
  /** Ref on the parent/container whose viewport entry triggers the animation */
  timelineRef: RefObject<HTMLElement | null>;
  /** Framer-motion variants keyed by "hidden" / "visible" (custom = index) */
  customVariants: Variants;
  once?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type Props<T extends ElementType> = TimelineContentProps<T> &
  Omit<ComponentProps<T>, keyof TimelineContentProps<T>>;

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum,
  timelineRef,
  customVariants,
  once = true,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as || "div") as ElementType;
  const localRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(timelineRef, { once, margin: "-80px" });
  // Use timelineRef viewport state if provided, fallback to local
  const fallbackInView = useInView(localRef, { once, margin: "-80px" });
  const active = timelineRef?.current ? isInView : fallbackInView;

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      ref={(node: HTMLElement | null) => {
        localRef.current = node;
      }}
      custom={animationNum}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={customVariants}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
