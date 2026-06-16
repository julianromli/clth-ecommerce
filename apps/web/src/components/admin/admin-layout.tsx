import { Button } from "@CLTH/ui/components/button";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Package } from "lucide-react";

import { adminLogout } from "@/functions/admin-auth";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/product", label: "Products", icon: Package, exact: false },
] as const;

export function AdminLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    await router.navigate({ to: "/admin/login", search: { redirect: undefined } });
  };

  return (
    <div className="flex min-h-screen bg-[#F8F8F8] font-sans text-[#1A1A1A]">
      <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-[#F8F8F8] px-4 py-6">
        <div className="mb-8 px-2">
          <p className="text-sm font-semibold tracking-tight">CLTH</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-gray-900 [&.active]:bg-white [&.active]:font-medium [&.active]:text-gray-900 [&.active]:shadow-sm"
            >
              <item.icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          type="button"
          variant="ghost"
          className="mt-4 justify-start gap-2 text-gray-600"
          onClick={() => handleLogout()}
        >
          <LogOut size={16} />
          Log out
        </Button>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
