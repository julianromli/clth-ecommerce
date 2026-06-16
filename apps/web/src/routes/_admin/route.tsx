import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminLayout } from "@/components/admin/admin-layout";
import { getAdminSession } from "@/functions/admin-auth";

export const Route = createFileRoute("/_admin")({
  component: AdminLayoutRoute,
  beforeLoad: async ({ location }) => {
    const session = await getAdminSession();

    if (!session.authenticated) {
      throw redirect({
        to: "/admin/login",
        search: { redirect: location.href },
      });
    }

    return { adminSession: true };
  },
});

function AdminLayoutRoute() {
  return <AdminLayout />;
}
