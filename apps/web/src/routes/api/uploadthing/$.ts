import { env } from "@CLTH/env/server";
import { createFileRoute } from "@tanstack/react-router";
import { createRouteHandler } from "uploadthing/server";

import { uploadRouter } from "@/server/uploadthing";

const handlers = createRouteHandler({
  router: uploadRouter,
  config: { token: env.UPLOADTHING_TOKEN },
});

export const Route = createFileRoute("/api/uploadthing/$")({
  server: {
    handlers: {
      GET: ({ request }) => handlers(request),
      POST: ({ request }) => handlers(request),
    },
  },
});
