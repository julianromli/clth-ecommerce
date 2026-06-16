import { createHmac, timingSafeEqual } from "node:crypto";

import { env } from "@CLTH/env/server";

export const ADMIN_COOKIE_NAME = "clth-admin-session";
const SESSION_TTL_SECONDS = 60 * 60 * 24;

function signExpiry(expiry: number): string {
  return createHmac("sha256", env.ADMIN_TOKEN).update(String(expiry)).digest("hex");
}

export function createAdminSessionValue(): string {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const signature = signExpiry(expiry);
  return `${expiry}.${signature}`;
}

export function verifyAdminSessionValue(value: string | null | undefined): boolean {
  if (!value) return false;

  const [expiryPart, signature] = value.split(".");
  if (!expiryPart || !signature) return false;

  const expiry = Number(expiryPart);
  if (!Number.isFinite(expiry)) return false;

  const now = Math.floor(Date.now() / 1000);
  if (expiry < now) return false;

  const expected = signExpiry(expiry);
  if (expected.length !== signature.length) return false;

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export function readAdminCookieFromHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(/;\s*/)) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq);
    if (name === ADMIN_COOKIE_NAME) {
      return part.slice(eq + 1);
    }
  }

  return null;
}

export function verifyAdminSessionFromRequest(request: Request): boolean {
  const cookie = readAdminCookieFromHeader(request.headers.get("cookie"));
  return verifyAdminSessionValue(cookie);
}

export function buildAdminCookieHeader(value: string, secure: boolean): string {
  const parts = [
    `${ADMIN_COOKIE_NAME}=${value}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    "SameSite=Lax",
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function buildClearAdminCookieHeader(secure: boolean): string {
  const parts = [
    `${ADMIN_COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function verifyAdminToken(token: string): boolean {
  const expected = env.ADMIN_TOKEN;
  if (token.length !== expected.length) return false;

  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
