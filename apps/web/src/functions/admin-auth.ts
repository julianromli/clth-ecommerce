import { env } from "@CLTH/env/server";
import {
  buildAdminCookieHeader,
  buildClearAdminCookieHeader,
  createAdminSessionValue,
  verifyAdminSessionFromRequest,
  verifyAdminToken,
} from "@CLTH/api/admin-session";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";

function isProduction() {
  return env.NODE_ENV === "production";
}

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const cookieHeader = getRequestHeader("cookie");
  const request = new Request("http://localhost", {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });

  return { authenticated: verifyAdminSessionFromRequest(request) };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    if (!verifyAdminToken(data.token)) {
      throw new Error("Invalid admin token");
    }

    const sessionValue = createAdminSessionValue();
    setResponseHeader(
      "Set-Cookie",
      buildAdminCookieHeader(sessionValue, isProduction()),
    );

    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  setResponseHeader("Set-Cookie", buildClearAdminCookieHeader(isProduction()));
  return { ok: true };
});
