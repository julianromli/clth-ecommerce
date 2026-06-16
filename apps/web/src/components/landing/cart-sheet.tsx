import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash, X } from "lucide-react";

import { formatIDR } from "@/utils/format";

import { useCart } from "./cart-context";

export default function CartSheet() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-[90vw] md:w-[400px] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="font-heading text-xl font-semibold text-brand-dark">
            Your Cart ({items.length})
          </h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="-mr-2 p-2 text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-gray-500">
              <p className="text-center text-lg">Your cart is nicely empty.</p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="font-medium text-brand-dark underline transition-opacity hover:opacity-80"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="pr-4 text-sm leading-snug font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 transition-colors hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{formatIDR(item.price)}</p>

                    <div className="mt-auto flex w-fit items-center rounded-full border border-gray-200">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex w-8 justify-center p-2 text-gray-500 transition-colors hover:text-gray-900"
                      >
                        <Minus size={12} strokeWidth={2.2} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex w-8 justify-center p-2 text-gray-500 transition-colors hover:text-gray-900"
                      >
                        <Plus size={12} strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-gray-100 bg-gray-50 p-6">
            <div className="mb-2 flex items-center justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatIDR(cartTotal)}</p>
            </div>
            <p className="pb-2 text-center text-xs text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-full bg-brand-dark py-4 text-center font-medium text-white transition-colors hover:bg-[#1f2821]"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
