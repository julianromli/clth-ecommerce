import { auth } from "@CLTH/auth";

import { verifyAdminSessionFromRequest } from "./admin-session";

export async function createContext({ req }: { req: Request }) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const adminSession = verifyAdminSessionFromRequest(req);

  return {
    auth: null,
    session,
    adminSession,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
