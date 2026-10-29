import { describe, expect, it } from "vitest";
import { seoOrigin } from "../scripts/seo-config.mjs";
describe("deployment SEO", () => {
  it("keeps unconfigured builds unindexed", () => expect(seoOrigin({})).toBe(""));
  it("uses the configured production origin", () => expect(seoOrigin({ SITE_URL: "https://studio.example/path", CONTEXT: "production" })).toBe("https://studio.example"));
  it("falls back to the stable Netlify site URL", () => expect(seoOrigin({ URL: "https://studio.netlify.app", CONTEXT: "production", DEPLOY_PRIME_URL: "https://hash--studio.netlify.app" })).toBe("https://studio.netlify.app"));
  it.each(["deploy-preview", "branch-deploy", "dev", "preview-server"])("keeps %s unindexed despite inherited URLs", (CONTEXT) => expect(seoOrigin({ CONTEXT, SITE_URL: "https://studio.example", URL: "https://studio.netlify.app" })).toBe(""));
  it("rejects unsafe URLs and credentials", () => {
    for (const SITE_URL of ["javascript:alert(1)", "https://user:pass@example.com", "invalid"]) expect(() => seoOrigin({ SITE_URL })).toThrow();
  });
});
