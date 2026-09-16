# Bste Platform - Deployment Status

## ✅ Completed

### GitHub Repository
- **URL:** https://github.com/Misto123/Bste
- **Status:** Public repository created and pushed
- **Branch:** main

### Vercel Deployment (Preview/Testing)
- **URL:** https://bste-platform.vercel.app
- **Status:** ✅ LIVE
- **Inspector:** https://vercel.com/bram-1592s-projects/bste-platform/DfjDPdzsbmFLr2uTmpFz5GikSGtT
- **Auto-deploy:** Enabled (on push to main)

### Local Development
- **Status:** ✅ Working
- **URL:** http://localhost:4321/
- **Command:** `npm run dev`

## 🔄 Next Steps (Manual Setup Required)

### 1. Cloudflare Authentication

```bash
cd /Users/northsea/ClaudeProjects/Bste
wrangler login
```

This will open a browser to authenticate with Cloudflare.

### 2. Create Cloudflare Pages Project

```bash
# After wrangler login
wrangler pages project create bste

# Deploy
wrangler pages deploy dist --project-name=bste
```

### 3. Create KV Namespace for Admin Panel

```bash
# Production
wrangler kv:namespace create "DOMAINS_KV"

# Copy the ID and add to wrangler.toml:
# [[kv_namespaces]]
# binding = "DOMAINS_KV"
# id = "your_kv_id_here"
```

### 4. Deploy Cloudflare Workers

```bash
npm run deploy:workers
```

### 5. Set Admin Secret

```bash
# Generate secret
openssl rand -base64 32

# Set in worker
wrangler secret put ADMIN_SECRET
# Paste the generated secret when prompted
```

### 6. Add Your Domains to Cloudflare

For each domain you want to use:

1. Go to https://dash.cloudflare.com
2. Click "Add site"
3. Enter domain name (e.g., example1.nl)
4. Select Free plan
5. Update nameservers at your registrar
6. Wait for activation (~5 min)

### 7. Configure Custom Domains in Pages

1. Go to Cloudflare Pages project
2. Click "Custom domains"
3. Add each domain: example1.nl, example2.nl, etc.

### 8. Setup GitHub Actions Secrets

Add these secrets to your GitHub repo (Settings → Secrets → Actions):

```bash
# Get Cloudflare credentials
wrangler whoami  # Shows account ID

# Get Vercel credentials (already working)
# From: https://vercel.com/account/tokens
```

Required secrets:
- `CLOUDFLARE_API_TOKEN` - From https://dash.cloudflare.com/profile/api-tokens
- `CLOUDFLARE_ACCOUNT_ID` - From wrangler whoami
- `VERCEL_TOKEN` - From Vercel dashboard
- `VERCEL_ORG_ID` - From .vercel/project.json
- `VERCEL_PROJECT_ID` - From .vercel/project.json

## 📝 Adding New Domains

### Step 1: Update Configuration

Edit `src/config/domains.json`:

```json
{
  "id": "new-domain",
  "domain": "newdomain.nl",
  "locale": "nl",
  "category": "electronics",
  "meta": {
    "title": "New Domain Title",
    "description": "Description here"
  }
}
```

### Step 2: Add Content

Create `src/content/new-domain/products.json`:

```json
[
  {
    "id": "product-1",
    "rank": 1,
    "brand": "Brand",
    "model": "Model",
    "score": 8.5,
    "price": 999
  }
]
```

### Step 3: Commit & Push

```bash
git add .
git commit -m "Add new domain: newdomain.nl"
git push
```

Auto-deploys to Vercel immediately. After Cloudflare setup, will deploy there too.

## 🔗 Current Live URLs

- **Vercel:** https://bste-platform.vercel.app
- **GitHub:** https://github.com/Misto123/Bste
- **Local:** http://localhost:4321/

## 📚 Documentation

- Full deployment guide: `docs/DEPLOYMENT.md`
- README: `README.md`

## 💡 Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production

# Deploy (after Cloudflare auth)
npm run deploy:cf        # Deploy to Cloudflare Pages
npm run deploy:workers   # Deploy Workers

# Git
git status               # Check changes
git add .                # Stage changes
git commit -m "message"  # Commit
git push                 # Push to GitHub (auto-deploys)
```

## ⚡ Current Architecture

```
GitHub (source)
    ↓
[On push to main]
    ↓
├─→ Vercel (auto-deploy) ✅ WORKING
│   └─→ https://bste-platform.vercel.app
│
└─→ Cloudflare Pages (needs setup)
    └─→ Cloudflare Workers (needs setup)
        └─→ Multi-domain routing
```

## 🎯 What Works Now

- ✅ Git repository
- ✅ Vercel preview deployments
- ✅ Auto-deploy on push
- ✅ Local development
- ✅ Beautiful Astro site
- ✅ Product comparison table
- ✅ Dutch content
- ✅ Responsive design

## 🔧 What Needs Setup

- ⏳ Cloudflare authentication
- ⏳ Cloudflare Pages deployment
- ⏳ Cloudflare Workers
- ⏳ Custom domains
- ⏳ Admin panel
- ⏳ GitHub Actions secrets

## 🚀 Ready to Test

Visit: https://bste-platform.vercel.app

You should see the beautiful product comparison page with the Bosch, Siemens, and Miele washing machines!
