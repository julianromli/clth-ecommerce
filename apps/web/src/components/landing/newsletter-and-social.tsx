import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerChild } from "@/components/motion/stagger";

const socialImages = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2126&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
];

export default function NewsletterAndSocial() {
  return (
    <section
      id="journal"
      className="mx-auto w-full max-w-[1440px] border-t border-gray-100 bg-white px-6 py-20 md:px-12 md:py-24"
    >
      <div className="flex flex-col justify-between gap-16 lg:flex-row lg:gap-8">
        <Reveal className="flex w-full flex-col justify-center lg:w-[45%]">
          <p className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Stay in the loop
          </p>
          <p className="mb-8 max-w-sm text-lg leading-relaxed text-gray-900 md:text-xl">
            Subscribe for 10% off your first order and be the first to know about new arrivals.
          </p>

          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <Stagger className="contents" delayChildren={0.1} stagger={0.04}>
              <StaggerChild className="flex-grow">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3.5 text-[15px] transition-colors placeholder:text-gray-400 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                  required
                />
              </StaggerChild>
              <StaggerChild>
                <button
                  type="submit"
                  className="w-full whitespace-nowrap rounded-lg bg-brand-dark px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1E2721] sm:w-auto"
                >
                  Subscribe
                </button>
              </StaggerChild>
            </Stagger>
          </form>
        </Reveal>

        <Stagger className="flex w-full gap-4 md:gap-6 lg:w-[55%]" stagger={0.06}>
          {socialImages.map((imgUrl, index) => (
            <StaggerChild key={imgUrl} variant="scale" className="flex-1">
              <a
                href="#journal"
                className="group relative block aspect-square overflow-hidden rounded-xl bg-gray-100 md:aspect-[4/5]"
              >
                <img
                  src={imgUrl}
                  alt={`Instagram feed image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </a>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
