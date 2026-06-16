import { MagnifyingGlass, User, Tote } from '@phosphor-icons/react';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { setIsCartOpen, items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-6 bg-white sticky top-0 z-30">
      {/* Brand */}
      <div className="flex-1">
        <a href="/" className="text-2xl font-bold font-heading tracking-tight text-brand-dark">
          CLTH&deg;
        </a>
      </div>

      {/* Center Links (Desktop) */}
      <div className="hidden md:flex items-center justify-center space-x-10 text-[15px] font-medium text-gray-800">
        <a href="#" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-1">Shop</a>
        <a href="#" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-1">Collections</a>
        <a href="#" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-1">About us</a>
        <a href="#" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-1">Sustainability</a>
        <a href="#" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-1">Journal</a>
      </div>

      {/* Right Icons */}
      <div className="flex-1 flex justify-end items-center space-x-6 text-brand-dark">
        <button aria-label="Search" className="hover:opacity-70 transition-opacity">
          <MagnifyingGlass size={22} weight="light" />
        </button>
        <button aria-label="User Account" className="hover:opacity-70 transition-opacity">
          <User size={22} weight="light" />
        </button>
        <button 
          aria-label="Shopping Bag" 
          className="hover:opacity-70 transition-opacity relative"
          onClick={() => setIsCartOpen(true)}
        >
          <Tote size={22} weight="light" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brand-dark text-white rounded-full flex items-center justify-center text-[10px] w-4 h-4 font-semibold shadow-sm">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
