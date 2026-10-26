export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-25";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jtaypzbk";

/** True only when a real project id is configured, so the app can
 *  gracefully fall back to built-in content when Sanity isn't reachable. */
export const sanityConfigured = Boolean(projectId);
