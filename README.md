# Bste - Multi-Domain Astro Platform

Beautiful, content-focused platform for managing 10+ domain names with a shared Astro template.

## Architecture

- **Frontend:** Astro + Tailwind CSS v4
- **Routing:** Cloudflare Workers (multi-domain)
- **Hosting:** Cloudflare Pages (production) + Vercel (preview/testing)
- **i18n:** Dutch + English support
- **Content:** JSON-based data structure

## Project Structure

```
src/
  config/
    domains.json          # Domain configurations
  content/
    {domain-id}/
      products.json       # Domain-specific content
  i18n/
    translations.json     # Language strings
  layouts/
    Layout.astro         # Base layout
  pages/
    index.astro          # Main page
  styles/
    global.css           # Tailwind imports
workers/
  router.js              # Multi-domain routing
  admin.js               # Admin panel API
```

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server (Vercel preview)
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy:cf

# Deploy Workers
npm run deploy:workers
```

## Adding a New Domain

1. Add domain config to `src/config/domains.json`:

```json
{
  "id": "new-domain",
  "domain": "example.nl",
  "locale": "nl",
  "category": "electronics",
  "meta": {
    "title": "Domain Title",
    "description": "Description"
  }
}
```

2. Create content folder: `src/content/new-domain/products.json`

3. Push to main - auto-deploys via GitHub Actions

## Environment Variables

### Vercel (Preview)
```
# No setup needed - auto-deploys on PR
```

### Cloudflare (Production)

Required secrets in GitHub:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Admin Panel

Worker needs KV namespace:
```bash
wrangler kv:namespace create "DOMAINS_KV"
```

Set `ADMIN_SECRET` in worker environment.

## Domain Setup in Cloudflare

1. Add domain to Cloudflare account
2. Point DNS A/CNAME to Cloudflare Pages
3. Add domain in Worker routes (wrangler.toml)
4. Configure custom domain in Pages project

## Multi-Domain Routing

The Cloudflare Worker (`workers/router.js`) routes requests based on hostname:

```
example1.nl → domain config 1 → render with content 1
example2.nl → domain config 2 → render with content 2
```

All domains share the same Astro template but load different content from `src/content/{domain-id}/`.

## Admin API

Manage domains via REST API (requires Bearer token):

```bash
# List domains
curl -H "Authorization: Bearer SECRET" https://admin.example.workers.dev/api/domains

# Create domain
curl -X POST -H "Authorization: Bearer SECRET" \
  -d '{"id":"new","domain":"new.nl"}' \
  https://admin.example.workers.dev/api/domains

# Update domain
curl -X PUT -H "Authorization: Bearer SECRET" \
  -d '{"theme":{"primary":"#ff0000"}}' \
  https://admin.example.workers.dev/api/domains/new

# Delete domain
curl -X DELETE -H "Authorization: Bearer SECRET" \
  https://admin.example.workers.dev/api/domains/new
```

## Design Reference

Based on: `bestewasdroogcombinatieconsumentenbond.nl`

- Clean data-driven layout
- Product comparison tables
- Charts/infographics
- Professional Dutch content
- Sticky navigation
- FAQ sections

## Tech Stack Rationale

- **Astro:** Static generation, fast page loads, component islands
- **Tailwind v4:** Modern utility-first CSS, smaller bundle
- **Cloudflare Workers:** Edge routing, zero-latency domain switching
- **Cloudflare Pages:** Global CDN, instant deploys
- **Vercel:** Preview deployments for PRs

## Development Workflow

1. Create feature branch
2. Make changes (add domains, update content)
3. Push → auto-deploy to Vercel preview
4. Merge to main → auto-deploy to Cloudflare production

## Performance

- **First Load:** < 1s (static HTML)
- **LCP:** < 1.2s
- **CLS:** < 0.1
- **Edge cached:** Yes (Cloudflare CDN)

## License

Proprietary - © 2026 Bste

## Support

Contact: your-email@example.com
