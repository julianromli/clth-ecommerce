/**
 * tRPC HTTP URL — relative in the browser, absolute during SSR (Node fetch requires it).
 */
export function getTrpcUrl() {
  const base =
    typeof window !== "undefined"
      ? ""
      : (process.env.BETTER_AUTH_URL ?? "http://localhost:3001");

  return `${base}/api/trpc`;
}
