import { createFileRoute } from "@tanstack/react-router";

import Checkout from "@/components/landing/checkout";
import { StoreLayout } from "@/components/landing/store-layout";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <StoreLayout>
      <Checkout />
    </StoreLayout>
  );
}
