import type { Variants } from "motion/react";

import { DURATION, EASE_BOUNCE, EASE_EMPHASIZED, EASE_EXIT, EASE_PREMIUM, STAGGER } from "./tokens";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.standard, ease: EASE_PREMIUM },
  },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.quick },
  },
};

export const fadeUpEmphasized: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_EMPHASIZED },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.standard, ease: EASE_PREMIUM },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_PREMIUM },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_PREMIUM },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.standard, ease: EASE_PREMIUM },
  },
};

export const staggerContainer = (delayChildren = 0, stagger = STAGGER.standard): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren: stagger,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.standard, ease: EASE_PREMIUM },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.standard, ease: EASE_PREMIUM },
  },
};

export const drawerOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: EASE_PREMIUM } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_EXIT } },
};

export const drawerPanelLeft = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { duration: DURATION.standard, ease: EASE_EMPHASIZED } },
  exit: { x: "-100%", transition: { duration: 0.25, ease: EASE_EXIT } },
};

export const drawerPanelRight = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: DURATION.standard, ease: EASE_EMPHASIZED } },
  exit: { x: "100%", transition: { duration: 0.25, ease: EASE_EXIT } },
};

export const cartItemExit = {
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.25, ease: EASE_EXIT },
  },
};

export const badgePop = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { duration: 0.2, ease: EASE_BOUNCE } },
  exit: { scale: 0, transition: { duration: 0.15 } },
};
