import { Button } from "@CLTH/ui/components/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { formatIDR } from "@/utils/format";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/_admin/admin/product/")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const trpc = useTRPC();
  const productsQuery = useQuery(trpc.products.list.queryOptions());

  const archiveMutation = useMutation(
    trpc.products.archive.mutationOptions({
      onSuccess: () => {
        toast.success("Product archived");
        productsQuery.refetch();
      },
      onError: (error) => toast.error(error.message),
    }),
  );

  return (
    <div className="px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <Link
          to="/admin/product/new"
          className="inline-flex h-8 items-center justify-center bg-primary px-2.5 text-xs font-medium text-primary-foreground"
        >
          Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productsQuery.data?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-gray-900">{formatIDR(product.price)}</td>
                <td className="px-6 py-4 capitalize text-gray-600">{product.status}</td>
                <td className="px-6 py-4 capitalize text-gray-600">
                  {product.stockStatus.replace("_", " ")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      to="/admin/product/$id"
                      params={{ id: product.id }}
                      className="inline-flex h-7 items-center border border-border px-2.5 text-xs"
                    >
                      Edit
                    </Link>
                    {product.status !== "archived" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => archiveMutation.mutate({ id: product.id })}
                      >
                        Archive
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!productsQuery.data?.length && !productsQuery.isLoading ? (
          <p className="px-6 py-10 text-center text-sm text-gray-500">No products found.</p>
        ) : null}
      </div>
    </div>
  );
}
