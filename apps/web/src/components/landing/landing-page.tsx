import type { Product } from "@/types/product";
import BestSellers from "./best-sellers";
import Categories from "./categories";
import Features from "./features";
import Hero from "./hero";
import NewsletterAndSocial from "./newsletter-and-social";
import { StoreLayout } from "./store-layout";
import Sustainability from "./sustainability";

type LandingPageProps = {
  products: Product[];
};

export default function LandingPage({ products }: LandingPageProps) {
  return (
    <StoreLayout>
      <Hero />
      <Features />
      <Categories />
      <BestSellers products={products} />
      <Sustainability />
      <NewsletterAndSocial />
    </StoreLayout>
  );
}
