import { protectedProcedure, publicProcedure, router } from "../index";
import { productsRouter } from "./products";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  products: productsRouter,
});
export type AppRouter = typeof appRouter;
