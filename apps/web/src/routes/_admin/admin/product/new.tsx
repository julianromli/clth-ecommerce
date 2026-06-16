import { createFileRoute } from "@tanstack/react-router";

import { ProductForm } from "@/components/admin/product-form";

export const Route = createFileRoute("/_admin/admin/product/new")({
  component: NewProductPage,
});

function NewProductPage() {
  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">New product</h1>
        <p className="mt-1 text-sm text-gray-500">Add a new product to the catalog</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
