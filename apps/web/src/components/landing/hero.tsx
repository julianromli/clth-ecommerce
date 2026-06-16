import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="shop" className="w-full bg-white px-4 pb-12 md:px-8">
      <div className="relative h-[600px] w-full overflow-hidden rounded-2xl md:h-[720px] md:rounded-[2rem]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white md:justify-center md:p-16 lg:p-24">
          <div className="mb-12 max-w-2xl md:mb-0">
            <h1 className="font-heading mb-6 text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl">
              Wear the adventure.
              <br />
              Live the journey.
            </h1>
            <p className="mb-10 max-w-lg text-lg text-white/90 md:text-xl">
              Sustainable apparel inspired by nature, made for everywhere.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#collections"
                className="rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Shop now
              </a>
              <a
                href="#collections"
                className="rounded-full border border-white bg-transparent px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Explore collection
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 flex items-center space-x-3">
          <button
            type="button"
            aria-label="Previous slide"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={20} strokeWidth={1.7} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-gray-900 transition-colors hover:bg-gray-100"
          >
            <ArrowRight size={20} strokeWidth={1.7} />
          </button>
        </div>

        <div className="absolute right-10 bottom-10 hidden flex-col items-center md:flex">
          <span className="mb-3 text-sm text-white/80">Scroll down</span>
          <a
            href="#collections"
            aria-label="Scroll down"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowDown size={20} strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </section>
  );
}
