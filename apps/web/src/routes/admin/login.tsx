import { Button } from "@CLTH/ui/components/button";
import { Input } from "@CLTH/ui/components/input";
import { Label } from "@CLTH/ui/components/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { adminLogin } from "@/functions/admin-auth";

import { z } from "zod";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await adminLogin({ data: { token } });
      toast.success("Logged in");
      await navigate({ to: redirect ?? "/admin" });
    } catch {
      toast.error("Invalid admin token");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F8F8] px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">CLTH Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your admin token to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Admin token</Label>
            <Input
              id="token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Enter admin token"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
