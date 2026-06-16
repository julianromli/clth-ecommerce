import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { DURATION, EASE_PREMIUM } from "@/lib/motion/tokens";

export default function Sustainability() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sustainability"
      className="mx-auto w-full max-w-[1440px] bg-white px-6 py-12 md:px-12"
    >
      <div className="flex flex-col overflow-hidden rounded-3xl bg-brand-light md:flex-row">
        <Reveal variant="slideFromLeft" className="relative h-[400px] w-full md:h-auto md:w-1/2">
          <m.div
            className="h-full w-full overflow-hidden"
            style={isDesktop ? { y: imageY } : undefined}
          >
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
              alt="Couple in nature"
              className="h-full w-full object-cover"
            />
          </m.div>
        </Reveal>

        <div className="flex w-full flex-col justify-center p-10 md:w-1/2 md:p-16 lg:p-24">
          <Reveal variant="slideFromRight" delay={0.1}>
            <p className="mb-4 text-xs font-semibold tracking-widest text-[#5C6E52] uppercase">
              Sustainability
            </p>
            <h2 className="font-heading mb-6 text-3xl leading-tight font-semibold text-brand-dark md:text-5xl">
              Good for the planet.
              <br />
              Good for you.
            </h2>
            <p className="mb-10 max-w-md text-[15px] leading-relaxed text-gray-700 md:text-base">
              We use organic, recycled, and low-impact materials to create apparel that cares.
            </p>
            <m.a
              href="#about"
              className="inline-block rounded-full bg-brand-dark px-8 py-3.5 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2821]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.standard, ease: EASE_PREMIUM, delay: 0.15 }}
            >
              Learn more
            </m.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
