// Client-safe helpers (no server-only imports)
export const ADMIN_DOMAIN = "admin.local";
export const usernameToEmail = (u: string) => `${u.trim().toLowerCase()}@${ADMIN_DOMAIN}`;
export const emailToUsername = (e: string) => (e ?? "").replace(`@${ADMIN_DOMAIN}`, "");
