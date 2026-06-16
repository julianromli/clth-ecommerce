import { generateReactHelpers } from "@uploadthing/react";

import type { UploadRouter } from "@/server/uploadthing";

export const { useUploadThing } = generateReactHelpers<UploadRouter>({
  url: "/api/uploadthing",
  fetch: (input, init) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
});
