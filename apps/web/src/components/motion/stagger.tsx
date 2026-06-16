import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { fadeUpReduced, staggerContainer, staggerItem, staggerItemScale } from "@/lib/motion/variants";
import { STAGGER, VIEWPORT } from "@/lib/motion/tokens";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
};

export function Stagger({ children, className, delayChildren = 0, stagger = STAGGER.standard }: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: VIEWPORT.once, margin: VIEWPORT.margin }}
      variants={staggerContainer(delayChildren, stagger)}
    >
      {children}
    </m.div>
  );
}

type StaggerChildProps = {
  children: ReactNode;
  className?: string;
  variant?: "fadeUp" | "scale";
};

export function StaggerChild({ children, className, variant = "fadeUp" }: StaggerChildProps) {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeUpReduced : variant === "scale" ? staggerItemScale : staggerItem;

  return (
    <m.div className={className} variants={variants}>
      {children}
    </m.div>
  );
}
