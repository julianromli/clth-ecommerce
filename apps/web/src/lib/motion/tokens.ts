export const EASE_PREMIUM = [0.4, 0, 0.2, 1] as const;
export const EASE_EMPHASIZED = [0.05, 0.7, 0.1, 1] as const;
export const EASE_EXIT = [0.3, 0, 1, 1] as const;
export const EASE_BOUNCE = [0.175, 0.885, 0.32, 1.275] as const;

export const DURATION = {
  quick: 0.2,
  standard: 0.35,
  slow: 0.5,
} as const;

export const STAGGER = {
  fast: 0.04,
  standard: 0.05,
  relaxed: 0.06,
} as const;

export const VIEWPORT = {
  once: true,
  margin: "-80px" as const,
};
