export default function NewsletterAndSocial() {
  const socialImages = [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop", // Green leaf
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2126&auto=format&fit=crop", // Ocean waves
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop"  // Clothing rack
  ];

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 w-full bg-white max-w-[1440px] mx-auto border-t border-gray-100">
      <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
        
        {/* Newsletter */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">Stay in the loop</p>
          <p className="text-lg md:text-xl text-gray-900 mb-8 max-w-sm leading-relaxed">
            Subscribe for 10% off your first order and be the first to know about new arrivals.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors placeholder:text-gray-400"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-3.5 bg-[#2A362D] text-white rounded-lg font-medium text-[15px] hover:bg-[#1E2721] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        
        {/* Social Feed */}
        <div className="w-full lg:w-[55%] flex gap-4 md:gap-6">
          {socialImages.map((imgUrl, idx) => (
            <a key={idx} href="#" className="group flex-1 relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 block">
              <img 
                src={imgUrl} 
                alt={`Instagram feed image ${idx + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
}
