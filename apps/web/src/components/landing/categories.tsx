import { ArrowRight } from "lucide-react";
import { m } from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerChild } from "@/components/motion/stagger";

const categories = [
  {
    title: "Men",
    imageUrl:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Women",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
  },
  {
    title: "Outerwear",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1964&auto=format&fit=crop",
  },
  {
    title: "Accessories",
    imageUrl: "https://i.pinimg.com/1200x/91/3e/90/913e90cb14101aa3f63c60ccbb126bcf.jpg",
  },
];

export default function Categories() {
  return (
    <section id="collections" className="w-full bg-white px-6 py-16 text-center md:px-12 md:py-24">
      <Reveal className="mb-16">
        <p className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
          Shop by category
        </p>
        <h2 className="font-heading text-3xl font-semibold text-gray-900 md:text-[40px]">
          Explore our collections
        </h2>
      </Reveal>

      <Stagger
        className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4"
        stagger={0.06}
      >
        {categories.map((category) => (
          <StaggerChild key={category.title} variant="scale">
            <a href="#shop" className="group flex flex-col items-center">
              <div className="mb-6 aspect-square w-full flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">{category.title}</h3>
              <span className="flex items-center text-sm text-gray-500 transition-colors group-hover:text-gray-900">
                Shop now{" "}
                <m.span
                  className="ml-1 inline-flex"
                  initial={false}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={14} />
                </m.span>
              </span>
            </a>
          </StaggerChild>
        ))}
      </Stagger>
    </section>
  );
}
