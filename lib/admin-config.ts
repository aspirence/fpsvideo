// Shared admin auth constants (safe for both middleware/edge and server).
export const ADMIN_COOKIE = "fps_admin";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
export const ADMIN_TOKEN =
  process.env.ADMIN_TOKEN || "fps-admin-session-7f3a2c91d4";
