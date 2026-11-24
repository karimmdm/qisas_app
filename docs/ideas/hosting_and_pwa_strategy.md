# Hosting & Deployment: GitHub Pages Fast Track

## Problem Statement
How might we host and distribute the Qisas Arabic Grammar Analyzer to students with zero friction, zero hosting cost, and instant automated deployments directly from our existing GitHub repository?

## Recommended Direction: GitHub Pages via GitHub Actions
Deploy directly to **GitHub Pages** (`https://karimmdm.github.io/qisas_app/`) using a GitHub Actions automated workflow.

### Why GitHub Pages First:
1. **Zero Setup Friction**: The repository is already hosted at `github.com/karimmdm/qisas_app`. No new accounts, tokens, or external dashboard connections are required.
2. **Fully Self-Contained App**: The application bundles all 63 chapters directly into the compiled JavaScript chunks. With `base: './'`, it requires zero runtime backend servers or dynamic API calls.
3. **Automated CI/CD**: Every push to `master` automatically triggers GitHub's official `actions/deploy-pages` to build and publish the latest version in ~60 seconds.
4. **PWA & Custom Domain Ready**: GitHub Pages provides free SSL (`https://`), supports custom domain mapping (`qisas.app`) whenever desired, and fully supports service workers for offline PWA functionality.

## Key Assumptions to Validate
- [ ] **Subpath Asset Resolution**: Verify that setting `base: './'` in `vite.config.ts` correctly resolves all JS, CSS, and font assets under `https://karimmdm.github.io/qisas_app/`.
- [ ] **One-Click Page Enablement**: Verify that in GitHub repository Settings -> Pages, selecting "GitHub Actions" as the source deploys the site without error.
- [ ] **Cross-Device Local Storage**: Verify that student progress remains saved across browser sessions via `localStorage`.

## MVP Scope (What's In)
- Configure relative asset paths (`base: './'`) in `vite.config.ts`.
- Automated GitHub Actions workflow (`.github/workflows/deploy.yml`) using Node 20 and official GitHub Pages deployment actions.
- Live public URL at `https://karimmdm.github.io/qisas_app/`.

## Not Doing (and Why)
- **No External CDN Provider (Cloudflare/Vercel) for now**: Keeps the entire development lifecycle inside GitHub without managing third-party accounts or webhook authorizations.
- **No Server/Database Backend**: Keeps operational cost at $0.00 and eliminates database maintenance or downtime.
- **No Complex SSR / Hydration**: Pure client-side SPA matches the interactive quiz format and guarantees fast page transitions.

## Next Steps
1. Add `base: './'` to `vite.config.ts`.
2. Create `.github/workflows/deploy.yml`.
3. Push to `master`.
4. In GitHub repo Settings -> Pages, set Source to **GitHub Actions**.
