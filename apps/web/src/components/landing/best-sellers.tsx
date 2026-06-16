import type { Product } from "@/types/product";
import { ArrowRight, Heart, Plus } from "lucide-react";
import { m } from "motion/react";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerChild } from "@/components/motion/stagger";
import { formatIDR } from "@/utils/format";

import { useCart } from "./cart-context";

type BestSellersProps = {
  products: Product[];
};

export default function BestSellers({ products }: BestSellersProps) {
  const { addItem } = useCart();

  return (
    <section className="mx-auto w-full max-w-[1440px] border-t border-gray-100 bg-white px-6 py-16 pt-10 md:px-12 md:py-24">
      <Stagger className="mb-12 flex flex-col justify-between md:flex-row md:items-end" stagger={0.05}>
        <div>
          <StaggerChild>
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Best Sellers
            </p>
          </StaggerChild>
          <StaggerChild>
            <h2 className="font-heading text-3xl leading-none font-semibold text-gray-900 md:text-[40px]">
              Our most loved styles
            </h2>
          </StaggerChild>
        </div>
        <StaggerChild>
          <a
            href="#collections"
            className="mt-6 flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 md:mt-0"
          >
            View all products <ArrowRight size={16} className="ml-1.5" />
          </a>
        </StaggerChild>
      </Stagger>

      {products.length === 0 ? (
        <Reveal>
          <p className="text-sm text-gray-500">No products available right now.</p>
        </Reveal>
      ) : (
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {products.map((product) => {
            const imageUrl = product.images[0];

            return (
              <StaggerChild key={product.id}>
                <ProductCard
                  product={product}
                  imageUrl={imageUrl}
                  onAddToCart={() =>
                    addItem({
                      id: product.id,
                      title: product.name,
                      price: product.price,
                      imageUrl: imageUrl ?? "",
                    })
                  }
                />
              </StaggerChild>
            );
          })}
        </Stagger>
      )}
    </section>
  );
}

function ProductCard({
  product,
  imageUrl,
  onAddToCart,
}: {
  product: Product;
  imageUrl: string | undefined;
  onAddToCart: () => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <m.div
      className="group relative flex h-full cursor-pointer flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : null}
        <m.button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-4 right-4 z-10 rounded-full bg-white/50 p-2 backdrop-blur-sm transition-colors hover:bg-white"
          onClick={(event) => {
            event.stopPropagation();
            setWishlisted((prev) => !prev);
          }}
          whileTap={{ scale: 1.2 }}
          transition={{ duration: 0.25, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
          <Heart
            size={20}
            strokeWidth={1.7}
            className={`transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-700 hover:text-red-500"}`}
          />
        </m.button>

        <div className="pointer-events-none absolute right-4 bottom-4 left-4 translate-y-12 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <m.button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart();
            }}
            className="flex w-full shrink-0 items-center justify-center space-x-2 rounded-full bg-white/95 py-3 text-[14px] font-medium text-brand-dark backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Plus size={16} strokeWidth={2.2} />
            <span>Add to cart</span>
          </m.button>
        </div>
      </div>

      {product.colors.length > 0 ? (
        <div className="mb-3 flex space-x-1.5">
          {product.colors.map((color) => (
            <div
              key={color}
              className={`h-3.5 w-3.5 rounded-full border ${
                color === "#F8FAFC" || color === "#F2F1EC" || color === "#DED8CF"
                  ? "border-gray-300"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ) : null}

      <h3 className="mb-1 text-[15px] font-medium text-gray-900 underline-offset-4 group-hover:underline">
        {product.name}
      </h3>

      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-[15px] text-gray-700">{formatIDR(product.price)}</span>
      </div>
    </m.div>
  );
}
