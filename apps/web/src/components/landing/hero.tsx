import { ArrowDown } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import { RevealOnMount } from "@/components/motion/reveal";
import { DURATION, EASE_EMPHASIZED, EASE_PREMIUM } from "@/lib/motion/tokens";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="shop" className="w-full bg-white px-4 pb-12 md:px-8">
      <div className="relative h-[600px] w-full overflow-hidden rounded-2xl md:h-[720px] md:rounded-[2rem]">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="hero-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          <m.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white md:justify-center md:p-16 lg:p-24">
          <div className="mb-12 max-w-2xl md:mb-0">
            <h1 className="font-heading mb-6 text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl">
              <RevealOnMount as="span" variant="fadeUpEmphasized" className="block">
                Wear the adventure.
              </RevealOnMount>
              <RevealOnMount as="span" variant="fadeUpEmphasized" delay={0.08} className="block">
                Live the journey.
              </RevealOnMount>
            </h1>
            <RevealOnMount delay={0.18} variant="fadeUp">
              <p className="mb-10 max-w-lg text-lg text-white/90 md:text-xl">
                Sustainable apparel inspired by nature, made for everywhere.
              </p>
            </RevealOnMount>
            <m.div
              className="flex flex-wrap items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { delayChildren: 0.28, staggerChildren: 0.05 },
                },
              }}
            >
              <m.a
                href="#collections"
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: DURATION.standard, ease: EASE_PREMIUM },
                  },
                }}
                className="rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Shop now
              </m.a>
              <m.a
                href="#collections"
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: DURATION.standard, ease: EASE_EMPHASIZED },
                  },
                }}
                className="rounded-full border border-white bg-transparent px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Explore collection
              </m.a>
            </m.div>
          </div>
        </div>

        <div className="absolute right-10 bottom-10 hidden flex-col items-center md:flex">
          <RevealOnMount delay={0.5} variant="fadeIn">
            <span className="mb-3 text-sm text-white/80">Scroll down</span>
          </RevealOnMount>
          <RevealOnMount delay={0.55} variant="scaleIn">
            <a
              href="#collections"
              aria-label="Scroll down"
              className="scroll-indicator-bounce flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowDown size={20} strokeWidth={1.7} />
            </a>
          </RevealOnMount>
        </div>
      </div>
    </section>
  );
}
