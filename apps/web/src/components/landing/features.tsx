import { Leaf, Package, RefreshCw, ShieldCheck } from "lucide-react";
import { m } from "motion/react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerChild } from "@/components/motion/stagger";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Leaf size={28} strokeWidth={1.5} />,
    title: "Sustainable Materials",
    description: "Better for the planet",
  },
  {
    icon: <Package size={28} strokeWidth={1.5} />,
    title: "Free Shipping",
    description: "On orders over Rp 1.500.000",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: "Built to Last",
    description: "Quality you can trust",
  },
  {
    icon: <RefreshCw size={28} strokeWidth={1.5} />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export default function Features() {
  return (
    <section className="w-full border-b border-gray-100 bg-white px-6 py-8 md:px-12 md:py-16">
      <Reveal>
        <Stagger className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {features.map((feature) => (
            <StaggerChild key={feature.title} variant="scale">
              <div className="flex items-center justify-center space-x-4 md:justify-start">
                <m.div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-800"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </m.div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-0.5 text-[13px] text-gray-500">{feature.description}</p>
                </div>
              </div>
            </StaggerChild>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
}
