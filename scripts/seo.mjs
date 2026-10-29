import { readFile, writeFile } from "node:fs/promises";
import { seoOrigin } from "./seo-config.mjs";
const origin = seoOrigin(process.env);
let html = await readFile("dist/index.html", "utf8");
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dream Team Editors",
  email: "editors.dreamteam@gmail.com",
  telephone: "+923346364200",
  sameAs: ["https://www.instagram.com/dreamteam.editors"],
  description: "Video editing, photography and creative production.",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  ...(origin ? { url: origin } : {}),
};
const tags =
  (origin
    ? `<link rel="canonical" href="${origin}/"/><meta property="og:url" content="${origin}/"/><meta property="og:image" content="${origin}/media/coast.webp"/><meta name="twitter:image" content="${origin}/media/coast.webp"/>`
    : '<meta name="robots" content="noindex,nofollow"/>') +
  `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
html = html.replace("<!-- SEO_ORIGIN -->", tags);
await writeFile("dist/index.html", html);
await writeFile(
  "dist/robots.txt",
  origin
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? `<url><loc>${origin}/</loc></url>` : ""}</urlset>`,
);
console.log(
  origin
    ? `SEO origin configured: ${origin}`
    : "Preview SEO mode: noindex; set SITE_URL on production.",
);
