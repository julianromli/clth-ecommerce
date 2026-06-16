import { generateReactHelpers } from "@uploadthing/react";

import type { UploadRouter } from "@/server/uploadthing";

function isLocalUploadThingRequest(input: RequestInfo | URL): boolean {
  const href = input.toString();
  if (href.startsWith("/api/uploadthing")) return true;
  if (typeof window !== "undefined") {
    return href.startsWith(`${window.location.origin}/api/uploadthing`);
  }
  return false;
}

export const { useUploadThing } = generateReactHelpers<UploadRouter>({
  url: "/api/uploadthing",
  fetch: (input, init) => {
    if (isLocalUploadThingRequest(input)) {
      return fetch(input, { ...init, credentials: "include" });
    }
    return fetch(input, init);
  },
});
