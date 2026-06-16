import { ArrowRight } from '@phosphor-icons/react';

export default function Categories() {
  const categories = [
    {
      title: "Men",
      imageUrl: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Women",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    },
    {
      title: "Outerwear",
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1964&auto=format&fit=crop",
    },
    {
      title: "Accessories",
      imageUrl: "https://images.unsplash.com/photo-1575428652377-a2d80b2273fd?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 w-full bg-white text-center">
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">Shop by category</p>
      <h2 className="text-3xl md:text-[40px] font-semibold font-heading text-gray-900 mb-16">Explore our collections</h2>
      
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {categories.map((category, idx) => (
          <a key={idx} href="#" className="group flex flex-col items-center">
            <div className="w-full aspect-square rounded-full overflow-hidden mb-6 bg-gray-100 flex-shrink-0">
              <img 
                src={category.imageUrl} 
                alt={category.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{category.title}</h3>
            <span className="flex items-center text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
              Shop now <ArrowRight size={14} className="ml-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
