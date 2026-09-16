# Bste Platform Setup Guide

Complete guide for deploying your multi-domain platform to Cloudflare and Vercel.

## Prerequisites

- Node.js 20+
- Git
- Cloudflare account
- Vercel account
- GitHub account

## 1. Initial Setup

```bash
cd /Users/northsea/ClaudeProjects/Bste
npm install
```

## 2. Vercel Setup (Preview/Testing)

### Create Vercel Project

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework Preset: **Astro**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Install Command: `npm ci`

### Get Vercel Credentials

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Get project info
vercel project ls
```

Note your:
- `VERCEL_TOKEN` (from https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` (from `.vercel/project.json`)
- `VERCEL_PROJECT_ID` (from `.vercel/project.json`)

## 3. Cloudflare Pages Setup (Production)

### Install Wrangler

```bash
npm i -g wrangler
wrangler login
```

### Create Pages Project

```bash
# Build first
npm run build

# Create project
wrangler pages project create bste

# Deploy
wrangler pages deploy dist --project-name=bste
```

Note your Pages URL: `https://bste.pages.dev`

### Get Cloudflare Credentials

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Create API Token with permissions:
   - Cloudflare Pages: Edit
   - Workers Scripts: Edit
   - Account Settings: Read
3. Note your Account ID from dashboard

## 4. Cloudflare Workers Setup

### Create KV Namespace

```bash
# Production
wrangler kv:namespace create "DOMAINS_KV"

# Development
wrangler kv:namespace create "DOMAINS_KV" --preview
```

Add KV binding to `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "DOMAINS_KV"
id = "your_kv_id_here"
preview_id = "your_preview_kv_id_here"
```

### Deploy Workers

```bash
npm run deploy:workers
```

## 5. Domain Configuration

### Add Domains to Cloudflare

For each domain (e.g., `example1.nl`, `example2.nl`):

1. Go to Cloudflare dashboard
2. Add site → Enter domain
3. Select Free plan
4. Update nameservers at your registrar
5. Wait for activation (usually < 5 minutes)

### Configure Custom Domains in Pages

1. Go to Pages project → Custom domains
2. Add each domain: `example1.nl`, `example2.nl`, etc.
3. Cloudflare auto-provisions SSL certificates

### Configure Worker Routes

Update `wrangler.toml` with your domains:

```toml
[[env.production.routes]]
pattern = "example1.nl/*"
zone_name = "example1.nl"

[[env.production.routes]]
pattern = "example2.nl/*"
zone_name = "example2.nl"
```

Then redeploy:

```bash
npm run deploy:workers
```

## 6. GitHub Actions Setup

Add secrets to your GitHub repository:

1. Go to repo → Settings → Secrets and variables → Actions
2. Add repository secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## 7. Test the Setup

### Test Vercel Preview

```bash
git checkout -b test-branch
# Make a change
git add .
git commit -m "test"
git push origin test-branch
```

Create PR → Vercel auto-deploys preview

### Test Cloudflare Production

```bash
git checkout main
git merge test-branch
git push origin main
```

GitHub Actions auto-deploys to Cloudflare

### Test Multi-Domain Routing

Visit each domain:
- `https://example1.nl` → Shows content for domain 1
- `https://example2.nl` → Shows content for domain 2

## 8. Adding New Domains

### Add to Configuration

Edit `src/config/domains.json`:

```json
{
  "id": "new-domain",
  "domain": "newdomain.nl",
  "locale": "nl",
  "category": "electronics",
  "meta": {
    "title": "New Domain Title",
    "description": "Description"
  }
}
```

### Add Content

Create `src/content/new-domain/products.json`:

```json
[
  {
    "id": "product-1",
    "name": "Product Name",
    "score": 8.5,
    "price": 999
  }
]
```

### Deploy

```bash
git add .
git commit -m "Add new domain: newdomain.nl"
git push origin main
```

Auto-deploys via GitHub Actions.

### Configure in Cloudflare

1. Add `newdomain.nl` to Cloudflare (see step 5)
2. Add custom domain in Pages
3. Update Worker routes in `wrangler.toml`
4. Redeploy workers: `npm run deploy:workers`

## 9. Admin Panel Setup

### Set Admin Secret

```bash
# Generate secure secret
openssl rand -base64 32

# Add to worker
wrangler secret put ADMIN_SECRET
# Paste the generated secret
```

### Test Admin API

```bash
# List domains
curl -H "Authorization: Bearer YOUR_SECRET" \
  https://admin.YOUR_WORKER.workers.dev/api/domains

# Create domain
curl -X POST \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"id":"test","domain":"test.nl","locale":"nl"}' \
  https://admin.YOUR_WORKER.workers.dev/api/domains
```

## 10. Monitoring & Maintenance

### Check Deployment Status

- Vercel: https://vercel.com/dashboard
- Cloudflare Pages: https://dash.cloudflare.com → Pages
- Workers: https://dash.cloudflare.com → Workers

### View Analytics

- Cloudflare Analytics: Dashboard → Analytics
- Vercel Analytics: Dashboard → Analytics

### Update Content

Content updates auto-deploy on push to main:

```bash
# Edit content
vim src/content/domain-id/products.json

# Commit & push
git add .
git commit -m "Update products"
git push
```

## Troubleshooting

### Build fails on Vercel

Check Node version in `package.json` matches Vercel settings.

### Worker routing not working

1. Verify domain is active in Cloudflare
2. Check Worker routes in `wrangler.toml`
3. Check Worker logs: `wrangler tail`

### Domain not loading content

1. Check `src/config/domains.json` has correct domain
2. Verify content folder exists: `src/content/{domain-id}/`
3. Check browser console for errors

### Pages deployment fails

```bash
# Check build locally
npm run build

# Check output
ls -la dist/
```

## Cost Estimate

### Cloudflare (10 domains)
- Pages: Free (500 builds/month)
- Workers: Free (100k requests/day)
- Domains: ~€10/year each = €100/year total

### Vercel
- Hobby (free): Unlimited previews
- Pro ($20/month): If you need more

**Total:** ~€100-240/year for 10 domains

## Next Steps

1. Clone this for production use
2. Add your actual domains
3. Customize the Astro theme
4. Add more content types
5. Set up monitoring/alerts

## Support

Questions? Open an issue or contact support.
