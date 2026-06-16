import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ProductForm } from "@/components/admin/product-form";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/_admin/admin/product/$id")({
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  const trpc = useTRPC();
  const productQuery = useQuery(trpc.products.getById.queryOptions({ id }));

  if (productQuery.isLoading) {
    return <p className="px-8 py-8 text-sm text-gray-500">Loading product...</p>;
  }

  if (!productQuery.data) {
    return <p className="px-8 py-8 text-sm text-gray-500">Product not found.</p>;
  }

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit product</h1>
        <p className="mt-1 text-sm text-gray-500">{productQuery.data.name}</p>
      </div>
      <ProductForm mode="edit" product={productQuery.data} />
    </div>
  );
}
