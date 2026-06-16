export default function Sustainability() {
  return (
    <section className="px-6 md:px-12 py-12 w-full bg-white max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-brand-light">
        {/* Left Image (People in nature) */}
        <div className="w-full md:w-1/2 h-[400px] md:h-auto relative">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop" 
            alt="Couple in nature" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Content */}
        <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-widest text-[#5C6E52] uppercase mb-4">Sustainability</p>
          <h2 className="text-3xl md:text-5xl font-semibold font-heading text-brand-dark mb-6 leading-tight">
            Good for the planet.<br />
            Good for you.
          </h2>
          <p className="text-[15px] md:text-base text-gray-700 mb-10 max-w-md leading-relaxed">
            We use organic, recycled, and low-impact materials to create apparel that cares.
          </p>
          <div>
            <button className="px-8 py-3.5 bg-brand-dark text-white rounded-full font-medium text-[15px] hover:bg-[#1f2821] transition-colors shadow-sm">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
