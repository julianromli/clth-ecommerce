import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { DURATION, EASE_EMPHASIZED, EASE_PREMIUM, VIEWPORT } from "@/lib/motion/tokens";
import type { Variants } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "fadeUp" | "fadeUpEmphasized" | "fadeIn" | "slideFromLeft" | "slideFromRight" | "scaleIn";
  as?: keyof typeof m;
  once?: boolean;
};

const variantMap: Record<NonNullable<RevealProps["variant"]>, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeUpEmphasized: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideFromLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration,
  variant = "fadeUp",
  as = "div",
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = m[as] as typeof m.div;
  const selected = variantMap[variant];

  const hidden = reducedMotion ? { opacity: 0 } : selected.hidden;
  const visible = reducedMotion ? { opacity: 1 } : selected.visible;

  const resolvedDuration =
    duration ??
    (variant === "fadeUpEmphasized" || variant === "slideFromLeft" || variant === "slideFromRight"
      ? DURATION.slow
      : DURATION.standard);

  const ease =
    variant === "fadeUpEmphasized" || variant === "slideFromLeft" || variant === "slideFromRight"
      ? EASE_EMPHASIZED
      : EASE_PREMIUM;

  return (
    <Component
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin: VIEWPORT.margin }}
      transition={{ duration: resolvedDuration, ease, delay }}
    >
      {children}
    </Component>
  );
}

type RevealOnMountProps = Omit<RevealProps, "once"> & {
  animate?: boolean;
};

export function RevealOnMount({
  children,
  className,
  delay = 0,
  duration,
  variant = "fadeUp",
  as = "div",
  animate = true,
}: RevealOnMountProps) {
  const reducedMotion = useReducedMotion();
  const Component = m[as] as typeof m.div;
  const selected = variantMap[variant];

  const hidden = reducedMotion ? { opacity: 0 } : selected.hidden;
  const visible = reducedMotion ? { opacity: 1 } : selected.visible;

  const resolvedDuration =
    duration ??
    (variant === "fadeUpEmphasized" ? DURATION.slow : DURATION.standard);

  const ease = variant === "fadeUpEmphasized" ? EASE_EMPHASIZED : EASE_PREMIUM;

  return (
    <Component
      className={className}
      initial={hidden}
      animate={animate ? visible : hidden}
      transition={{ duration: resolvedDuration, ease, delay }}
    >
      {children}
    </Component>
  );
}
