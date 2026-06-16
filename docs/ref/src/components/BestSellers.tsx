import { Heart, ArrowRight, Star, Plus } from '@phosphor-icons/react';
import { useCart } from '../contexts/CartContext';
import { formatIDR } from '../utils/format';

export default function BestSellers() {
  const { addItem } = useCart();
  
  const products = [
    {
      id: "prod-t1",
      title: "CLTH Classic Tee",
      price: 590000,
      rating: 5,
      reviews: 128,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      colors: ['#4A5D4E', '#F2F1EC', '#2B2B2B']
    },
    {
      id: "prod-h1",
      title: "Coastal Hoodie",
      price: 1190000,
      rating: 4.5,
      reviews: 96,
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1965&auto=format&fit=crop",
      colors: ['#DED8CF', '#4A5D4E', '#E4A562']
    },
    {
      id: "prod-j1",
      title: "Wanderer Jacket",
      price: 1950000,
      rating: 4.5,
      reviews: 74,
      imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      colors: ['#2B2B2B', '#1E293B', '#F8FAFC']
    },
    {
      id: "prod-b1",
      title: "Explorer Backpack",
      price: 1350000,
      rating: 5,
      reviews: 53,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
      colors: ['#767A60', '#A99B83', '#2B2B2B']
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 w-full bg-white max-w-[1440px] mx-auto border-t border-gray-100 pt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">Best Sellers</p>
          <h2 className="text-3xl md:text-[40px] font-semibold font-heading text-gray-900 leading-none">Our most loved styles</h2>
        </div>
        <a href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mt-6 md:mt-0 transition-colors">
          View all products <ArrowRight size={16} className="ml-1.5" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, idx) => (
          <div key={idx} className="group cursor-pointer flex flex-col h-full relative">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-5">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <button aria-label="Add to wishlist" className="absolute top-4 right-4 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white transition-colors z-10">
                <Heart size={20} weight="regular" className="text-gray-700 hover:text-red-500 transition-colors" />
              </button>
              
              {/* Add to Cart Overlay */}
              <div className="absolute left-4 right-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl });
                  }}
                  className="w-full bg-white/95 backdrop-blur-sm text-brand-dark py-3 rounded-full font-medium text-[14px] flex items-center justify-center space-x-2 hover:bg-white shrink-0 hover:shadow-md transition-all active:scale-95"
                >
                  <Plus size={16} weight="bold" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
            
            <div className="flex space-x-1.5 mb-3">
              {product.colors.map((color, cIdx) => (
                <div 
                  key={cIdx} 
                  className={`w-3.5 h-3.5 rounded-full border ${color === '#F8FAFC' || color === '#F2F1EC' || color === '#DED8CF' ? 'border-gray-300' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <h3 className="text-[15px] font-medium text-gray-900 mb-1 group-hover:underline underline-offset-4 decoration-1">{product.title}</h3>
            
            <div className="flex items-center justify-between mt-auto pt-1">
              <span className="text-[15px] text-gray-700">{formatIDR(product.price)}</span>
              <div className="flex items-center">
                <div className="flex text-gray-900 space-x-0.5">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star 
                      key={sIdx} 
                      size={12} 
                      weight={sIdx < Math.floor(product.rating) ? "fill" : "regular"} 
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1.5">({product.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
