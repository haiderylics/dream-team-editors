# Dream Team Editors

React 19 / Vite static portfolio. Production output is `dist/`; no application server or database required.

## Local development

Use Node 22.22.2 (see `.node-version`) and npm.

```sh
npm ci
npm run dev
npm run check
npm run preview
```

`npm run check` runs ESLint, Vitest and the production build with SEO generation. GitHub Actions repeats these checks on pushes and pull requests. Commit package-lock.json; keep environment secrets, node_modules and dist out of Git.

## Netlify after GitHub upload

1. Import the GitHub repository into Netlify. Select this project folder as the base directory.
2. Choose production branch `main`. netlify.toml sets build command `npm run build`, publish directory `dist`, and Node `22.22.2`.
3. Set `SITE_URL=https://your-real-domain` in the Production build environment. Until a custom domain is ready, Netlify automatically provides its stable site URL through `URL`.
4. Set `VITE_CONTACT_ENABLED=true` after FormSubmit recipient activation.
5. Deploy, then configure the custom domain in Netlify. Update SITE_URL and rebuild whenever the public origin changes.
6. Verify canonical metadata, /robots.txt, /sitemap.xml, missing-page HTTP 404, response headers, mobile navigation, media viewer and actual enquiry receipt.

Netlify production builds use SITE_URL first, then URL. Deploy previews, branch deploys and development contexts remain noindex even when URLs are inherited. Deploy-specific URLs are never used as canonicals. Local builds without an origin remain noindex.

public/_headers supplies security headers and immutable caching for hashed assets. Inline styles support React/GSAP animation; scripts are restricted to this origin and contact requests to FormSubmit. public/404.html handles unknown pages. No SPA catch-all redirect is required for this single-page portfolio with anchor navigation.

Official references: [Netlify configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/), [build environment variables](https://docs.netlify.com/build/configure-builds/environment-variables/).

## Contact delivery

The form submits via AJAX to FormSubmit for editors.dreamteam@gmail.com. The recipient must activate the confirmation email. A previous setup request reported activation pending; actual inbox delivery remains unverified. On the final domain, send a controlled enquiry and confirm receipt before launch.

Failures, rejected responses, activation requirements and timeouts retain the brief and offer email/WhatsApp fallback. Set VITE_CONTACT_ENABLED=false to disable sending at build time. VITE variables are public client code: never put credentials in them.

## Content approval before launch

Edit src/data/content.js for the central content.

- Four team profiles and AI-generated portraits are temporary and visibly labelled.
- Testimonials are sample copy awaiting approval. Stock reels are labelled concepts.
- Confirm the 10+ years, 750+ projects and interpretation of 160+ clients.
- Replace stock media with approved work where available; retain ASSET-LICENSES.txt.
- Facebook has no configured URL. Instagram and WhatsApp use supplied studio details.

Real identities, endorsements and achievements have not been invented. The existing design and sections are preserved. See QA-REPORT.md for current verification and remaining checks.

## Structure

- src/App.jsx: layout, navigation, services, reels and footer.
- src/components/: contact form, media viewer, testimonials, counters and team.
- src/data/: content and responsive image dimensions.
- public/media/: local licensed assets. Fonts bundle locally.
- scripts/seo.mjs and seo-config.mjs: build metadata and indexing policy.
- tests/: form, media, studio interactions and deployment SEO.

qa.html and screenshots are development references, excluded from the Vite entry build. Historical QA records are not guarantees for the current revision.
