import { ArrowRight, ArrowLeft, ArrowDown } from '@phosphor-icons/react';

export default function Hero() {
  return (
    <section className="px-4 md:px-8 pb-12 w-full bg-white">
      <div className="relative w-full h-[600px] md:h-[720px] rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop')" 
          }}
        >
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-8 md:p-16 lg:p-24 text-white">
          <div className="max-w-2xl mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold font-heading leading-tight mb-6">
              Wear the adventure.<br />Live the journey.
            </h1>
            <p className="text-lg md:text-xl font-sans mb-10 text-white/90 max-w-lg">
              Sustainable apparel inspired by nature, made for everywhere.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-8 py-3.5 bg-white text-gray-900 rounded-full font-medium text-[15px] hover:bg-gray-100 transition-colors">
                Shop now
              </button>
              <button className="px-8 py-3.5 bg-transparent border border-white text-white rounded-full font-medium text-[15px] hover:bg-white/10 transition-colors">
                Explore collection
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-8 flex items-center space-x-3">
          <button aria-label="Previous slide" className="w-[44px] h-[44px] rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
            <ArrowLeft size={20} weight="regular" />
          </button>
          <button aria-label="Next slide" className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors">
            <ArrowRight size={20} weight="regular" />
          </button>
        </div>

        {/* Scroll Down Hint (Desktop) */}
        <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center">
          <span className="text-white/80 text-sm mb-3">Scroll down</span>
          <button aria-label="Scroll down" className="w-[44px] h-[44px] rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
            <ArrowDown size={20} weight="regular" />
          </button>
        </div>
      </div>
    </section>
  );
}
