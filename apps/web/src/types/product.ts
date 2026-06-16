import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@CLTH/api/routers/index";

export type Product = inferRouterOutputs<AppRouter>["products"]["listActive"][number];
