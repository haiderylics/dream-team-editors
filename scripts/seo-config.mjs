export function seoOrigin(env) {
  // Preview deployments must stay unindexed, even if a shared SITE_URL is set.
  if (env.CONTEXT && env.CONTEXT !== "production") return "";
  const candidate = env.SITE_URL || env.URL || "";
  if (!candidate) return "";
  const url = new URL(candidate);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password)
    throw new Error("SITE_URL must be an http(s) URL without credentials");
  return url.origin;
}
