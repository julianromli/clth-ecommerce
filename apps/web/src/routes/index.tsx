import { createFileRoute } from '@tanstack/react-router'
import LandingPage from "@/components/landing/landing-page";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const products = await context.queryClient.fetchQuery(
      context.trpc.products.listActive.queryOptions(),
    );

    return { products };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return <LandingPage products={products} />;
}
