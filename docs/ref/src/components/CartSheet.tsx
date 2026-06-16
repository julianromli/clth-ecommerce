import { X, Minus, Plus, Trash } from '@phosphor-icons/react';
import { useCart } from '../contexts/CartContext';
import { formatIDR } from '../utils/format';

export default function CartSheet() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Sheet */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] sm:w-[90vw] bg-white z-50 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-heading font-semibold text-brand-dark">Your Cart ({items.length})</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <p className="text-lg text-center">Your cart is nicely empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-brand-dark underline font-medium hover:opacity-80 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 text-sm leading-snug pr-4">{item.title}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{formatIDR(item.price)}</p>
                    
                    <div className="mt-auto flex items-center border border-gray-200 rounded-full w-fit">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 w-8 flex justify-center text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
                      >
                        <Minus size={12} weight="bold" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 w-8 flex justify-center text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Plus size={12} weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
            <div className="flex items-center justify-between text-base font-medium text-gray-900 mb-2">
              <p>Subtotal</p>
              <p>{formatIDR(cartTotal)}</p>
            </div>
            <p className="text-xs text-center text-gray-500 pb-2">Shipping and taxes calculated at checkout.</p>
            <button className="w-full py-4 bg-brand-dark text-white rounded-full font-medium hover:bg-[#1f2821] transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
