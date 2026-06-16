import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { formatIDR } from "@/utils/format";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/_admin/admin/")({
  component: AdminDashboardPage,
});

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function AdminDashboardPage() {
  const trpc = useTRPC();
  const statsQuery = useQuery(trpc.products.stats.queryOptions());
  const recentQuery = useQuery(trpc.products.recent.queryOptions());

  const stats = statsQuery.data;

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your product catalog</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total" value={stats?.total ?? 0} />
        <StatCard label="Active" value={stats?.active ?? 0} />
        <StatCard label="Draft" value={stats?.draft ?? 0} />
        <StatCard label="Archived" value={stats?.archived ?? 0} />
        <StatCard label="Out of stock" value={stats?.outOfStock ?? 0} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Recent products</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentQuery.data?.length ? (
            recentQuery.data.map((product) => (
              <Link
                key={product.id}
                to="/admin/product/$id"
                params={{ id: product.id }}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatIDR(product.price)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{product.status}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="px-6 py-8 text-sm text-gray-500">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
