# Netlify hosting switch — 29 October 2026

- netlify.toml sets npm run build, dist and Node 22.22.2. Shared security/cache headers remain in public/_headers.
- Netlify CONTEXT now determines preview noindex; production uses SITE_URL then the stable Netlify URL.
- Updated environment example and deployment instructions in README.md.
- Lint: 0 errors, 0 warnings. Vite build and SEO generation passed.
- Full suite: 21 tests passed in 4 files using vitest run --pool=threads --maxWorkers=1. The first default-pool attempt hit worker-startup timeouts; the retry completed successfully.
- No GitHub upload or Netlify deployment performed. Existing content, email-delivery, browser-QA and dependency-audit limitations below still apply.

---

# Production preparation — 29 October 2026

## Verified in this revision

- ESLint: 0 errors, 0 warnings (direct ESLint API because the shell helper is unavailable).
- Vitest: 18 tests passed in 4 files, including 5 new deployment SEO tests.
- Vite production build: passed, 1600 modules transformed. SEO generation then completed successfully.
- Generated preview HTML includes noindex; robots.txt disallows crawling when SITE_URL is unset.
- SEO self-checks cover production origin normalization, preview exclusion and invalid/credential-bearing URLs.
- Configured literal media paths in content.js exist in public/media.
- Netlify _headers and 404.html are included in dist.
- package.json and lockfile Node requirements are synchronized; .node-version selects 22.22.2.

## Prepared

Netlify security headers, hashed asset caching, a real missing-page document, GitHub Actions validation, expanded secret/build exclusions, production/preview indexing rules, social sharing images and a Netlify deployment guide.

## Dependency audit limitation

The production dependency audit was attempted, but the npm registry advisory endpoint was unreachable from this environment. No clean vulnerability result is claimed. GitHub CI includes `npm audit --omit=dev --audit-level=high` so the connected runner must verify this before release.

## Still required for public launch

- Set the actual SITE_URL in Netlify Production and verify the deployed canonical, sitemap, headers and HTTP 404.
- Activate FormSubmit as mailbox owner and verify a real enquiry arrives. Automated form responses are mocked.
- Approve or replace demo team profiles, AI portraits, sample testimonials and stock client-work concepts; verify achievement claims. Existing labelled sections remain pending the owner’s content choice.
- Current browser visual/mobile/Safari testing has not been performed. No Lighthouse or accessibility certification is claimed.
- GitHub upload and Netlify publishing are intentionally deferred to the next requested phase.

---

# Historical QA records

The following notes describe earlier revisions and must not be read as current checks.

# Validation report — Dream Team Editors

## Contact integration — 20 October 2026

- 13 tests pass across 3 files. Form tests cover API acceptance, HTTP and network failures, retry, native validation, rejected HTTP 200 responses and activation pending.
- Live setup request reached FormSubmit: HTTP 200, success false, activation-required response confirming an activation email was sent. Mailbox-owner activation and post-activation inbox delivery remain unverified.
- Email and WhatsApp supplied by user are configured in footer/contact/structured data. Only Instagram and Facebook remain in the footer; Instagram links to the exact supplied profile URL.
- Five marquee names expanded as requested. Browser visual QA is unavailable for this revision.


## Follow-up visual revision — 9 October 2026

- Hero showreel button/caption and achievement globe removed from markup.
- Footer wordmark changes only color paint; typography dimensions remain unchanged.
- Four generated fictional portraits visually inspected and optimized as 900px WebP images, with labels identifying placeholder content.
- Lint passes. Production build is run by the publishing workflow. No new browser visual QA is claimed.

## Earlier revision — 9 October 2026

- ESLint passes with no warnings; 11 automated tests pass in 3 files.
- New tests verify testimonial selection, previous/next wraparound and arrow-key controls, all four profile expand/collapse controls, and final counter values for reduced motion.
- Navigation is Services, Testimonials, Achievements, Meet Us, Contact Us; Work/About/Process links were removed and the hero CTA now targets Services.
- The four requested sections are absent from the rendered page.
- Updated layout includes responsive breakpoints and a scrollable mobile menu. Browser visual QA was unavailable in this session; previous viewport results below apply only to the older revision.
- Stats follow screenshot values; 160+ is interpreted as clients. Team profiles and testimonials remain labelled placeholders.

## Historical validation — 29 September 2026

The checks below describe the prior version, including sections since removed.

## Build and source

- `npm run build`: passed; static `dist/` generated.
- `npm run lint`: passed with no source errors.
- `npm test`: 8 tests passed in 2 test files.
- Asset references inspected: no missing configured media. Browser inspection reported no broken loaded images.
- Static Netlify form detection markup contains all required field names and honeypot.
- Title, description, OpenGraph, Twitter metadata and Organization JSON-LD are present.
- Preview robots/noindex behavior and sitemap generation are implemented. A deployment origin is required to populate canonical/sitemap URLs.

## Automated behavior tests

1. Successful form submission URL-encodes fields and includes the correct Netlify identity.
2. HTTP failure retains the entered enquiry and supports a successful retry.
3. Demo mode transmits nothing and does not falsely report a successful send.
4. Native validation blocks an empty form.
5. Network failure retains the project brief and shows the error state.
6. Ambient video is deferred until visible, and pauses out of view.
7. Reduced-motion preference prevents ambient video loading/autoplay.
8. The explicit pause control prevents video autoplay.

Form network responses in these tests are mocked; they verify UI and request construction, not live Netlify delivery.

## Browser checks

- Desktop hero and reel layouts visually inspected in Chromium.
- Responsive document widths checked at 360, 390, 430, 768, 1024, 1440 and 1920 pixels: no horizontal document overflow.
- 390-pixel layout inspected visually; mobile menu opens/closes, Escape works, section navigation works.
- Portfolio filtering selects the correct category; expansion displays all eight projects.
- Video lightbox opens and plays the 12-second stock clip; closes and restores focus.
- Reel next control advances its active index; alignment checked after correction.
- Photography expansion displays all 16 records; next-image control and Escape dismissal work.
- Native comparison range changes the split and accessible value via keyboard.
- Contact fields accept a valid enquiry and display the truthful preview response.
- No application console errors observed. Unrelated browser-extension metadata errors were excluded.

## Performance measures applied

- Local WebP photos with responsive source widths; hero image receives priority.
- Six optimized MP4 files: three clips and their three portrait crops; no third-party video embeds.
- Ambient video loading is visibility-gated and honors reduced motion/data-saving preferences.
- Below-fold images are lazy; photography initially renders eight photos.
- Local Latin font subsets; no font provider request at runtime.
- GSAP and React vendor chunks; the form is a separate lazy-loaded chunk.
- Production media folder: approximately 7.6 MB, not all requested on page load.
- Build output: approximately 136 KB total compressed JavaScript including the form chunk, and 9.5 KB compressed CSS, excluding fonts and media.

## Remaining checks after deployment

- Verify production domain, canonical and sitemap URLs.
- Confirm Netlify Forms detection and one real controlled submission.
- Configure email notification recipients in Netlify.
- Replace demo contact details, stock work, sample testimonials and unverified stats.
- Review final client media on a physical iPhone/Android device and Safari.

This is a validated frontend preview, not a claim of a live production deployment, measured Lighthouse score or formal accessibility certification.
