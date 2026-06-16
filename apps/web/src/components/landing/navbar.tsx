import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

import { useCart } from "./cart-context";

const links = [
  { href: "#shop", label: "Shop" },
  { href: "#collections", label: "Collections" },
  { href: "#about", label: "About us" },
  { href: "#sustainability", label: "Sustainability" },
  { href: "#journal", label: "Journal" },
];

export default function Navbar() {
  const { setIsCartOpen, items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-30 flex items-center justify-between bg-white px-6 py-5 md:px-12">
        <div className="flex flex-1 items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            className="text-brand-dark transition-opacity hover:opacity-70 md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.7} />
          </button>
          <a href="/" className="font-heading text-2xl font-bold tracking-tight text-brand-dark">
            CLTH&deg;
          </a>
        </div>

      <div className="hidden items-center justify-center space-x-10 text-[15px] font-medium text-gray-800 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="underline-offset-4 transition-colors hover:text-brand-dark hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-end space-x-5 text-brand-dark md:space-x-6">
        <button type="button" aria-label="Search" className="transition-opacity hover:opacity-70">
          <Search size={22} strokeWidth={1.7} />
        </button>
        <button
          type="button"
          aria-label="Shopping bag"
          className="relative transition-opacity hover:opacity-70"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag size={22} strokeWidth={1.7} />
          {totalItems > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-dark text-[10px] font-semibold text-white shadow-sm">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100%,320px)] transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <span className="font-heading text-xl font-bold tracking-tight text-brand-dark">CLTH&deg;</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="-mr-2 p-2 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-3 text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50 hover:text-brand-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
