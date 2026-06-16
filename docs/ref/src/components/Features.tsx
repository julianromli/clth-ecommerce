import { Leaf, Package, ShieldCheck, ArrowsClockwise } from '@phosphor-icons/react';

export default function Features() {
  const features = [
    {
      icon: <Leaf size={28} weight="light" />,
      title: "Sustainable Materials",
      description: "Better for the planet"
    },
    {
      icon: <Package size={28} weight="light" />,
      title: "Free Shipping",
      description: "On orders over $100"
    },
    {
      icon: <ShieldCheck size={28} weight="light" />,
      title: "Built to Last",
      description: "Quality you can trust"
    },
    {
      icon: <ArrowsClockwise size={28} weight="light" />,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <section className="py-8 md:py-16 px-6 md:px-12 w-full bg-white border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-800">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-[13px] text-gray-500 mt-0.5">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
