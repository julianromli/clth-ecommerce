import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

import { formatIDR } from "@/utils/format";

import { useCart } from "./cart-context";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setCheckoutComplete(true);
  };

  const shippingCost = items.length > 0 ? 50000 : 0;
  const grandTotal = cartTotal + shippingCost;

  if (checkoutComplete) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-20 text-center md:px-12">
        <h1 className="font-heading mb-4 text-4xl font-semibold text-brand-dark">
          Thank you for your order!
        </h1>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          We've received your order and are getting it ready. We'll email you once it ships.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-3.5 font-medium text-white transition-colors hover:bg-[#1E2721]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-12 md:py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back to Shop
      </Link>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
        <div className="lg:w-3/5">
          <h1 className="font-heading mb-8 text-3xl font-semibold text-brand-dark">Checkout</h1>

          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-10">
            <section>
              <h2 className="mb-4 text-xl font-medium text-gray-900">Contact Information</h2>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] transition-colors focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                  placeholder="hello@example.com"
                />
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-medium text-gray-900">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] transition-colors focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] transition-colors focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] transition-colors focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                    placeholder="Street name and house number"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] transition-colors focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] transition-colors focus:border-brand-dark focus:ring-1 focus:ring-brand-dark focus:outline-none"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-medium text-gray-900">Payment</h2>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                This is a demo store. No real payment will be processed.
              </div>
            </section>

            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full rounded-lg bg-brand-dark px-10 py-4 text-lg font-medium text-white transition-colors hover:bg-[#1E2721] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            >
              Pay {formatIDR(grandTotal)}
            </button>
          </form>
        </div>

        <div className="lg:w-2/5">
          <div className="sticky top-24 rounded-2xl bg-gray-50 p-6 lg:p-8">
            <h2 className="mb-6 text-xl font-medium text-gray-900">Order Summary</h2>

            {items.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                <div className="max-h-[40vh] space-y-4 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-white">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-[10px] font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-0.5 text-sm text-gray-500">{formatIDR(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatIDR(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>{formatIDR(shippingCost)}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-gray-200 pt-4">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-semibold text-brand-dark">
                    {formatIDR(grandTotal)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
