import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion/motion-provider";

import CartSheet from "./cart-sheet";
import { CartProvider } from "./cart-context";
import Footer from "./footer";
import Navbar from "./navbar";

export function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#F8F8F8] font-sans text-[#1A1A1A]">
        <div className="w-full flex-grow bg-white">
          <Navbar />
          {children}
        </div>
        <Footer />
        <CartSheet />
      </div>
    </CartProvider>
    </MotionProvider>
  );
}
