# 🚀 CLOUDFLARE WORKERS SETUP - COMPLETE GUIDE

## ✅ What's Been Done

### 1. Domain Configuration Updated ✅
- **Main Domain Added:** consumentenoverzicht.nl
- **Colors Updated:** #1e73be (blue from consumentenbeste.nl)
- **Shops Added:** Amazon.nl, Bol.com, Coolblue
- **Favicon Created:** Blue CB logo matching consumentenbeste.nl

### 2. Cloudflare Worker Created ✅
- **File:** `worker/index.js`
- **Features:** Complete API for domain/affiliate/shop management
- **Based on:** EMD 2.0 pattern for quick domain setup

---

## 📋 Setup Instructions

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler

# Or use the one already in your project
cd /Users/northsea/ClaudeProjects/Bste
npm install wrangler --save-dev
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

### Step 3: Create KV Namespace

```bash
# Production KV
wrangler kv:namespace create "BSTE_KV"

# Preview KV (for testing)
wrangler kv:namespace create "BSTE_KV" --preview
```

**Output will be:**
```
✨  Success!
Add the following to your wrangler.toml:
{ binding = "BSTE_KV", id = "abc123..." }
```

### Step 4: Update wrangler.toml

Replace `YOUR_KV_NAMESPACE_ID` and `YOUR_PREVIEW_KV_ID` with the IDs from Step 3.

### Step 5: Set Admin Secret

```bash
wrangler secret put ADMIN_SECRET
# Enter: rereeu (or your chosen password)
```

### Step 6: Deploy Worker

```bash
wrangler deploy
```

**Output:**
```
✨  Success! Uploaded 1 file
🌎  https://bste-admin.your-subdomain.workers.dev
```

### Step 7: Update Admin Panel API URL

Update `public/admin/index.html`:

```javascript
// Change this line:
const API_BASE = 'https://bste-admin.contact-461.workers.dev/api';

// To your new worker URL:
const API_BASE = 'https://bste-admin.YOUR-SUBDOMAIN.workers.dev/api';
```

---

## 🎯 Current Configuration

### Domains (src/config/domains.json)

```json
{
  "domains": [
    {
      "id": "consumentenoverzicht",
      "domain": "consumentenoverzicht.nl",
      "isMainDomain": true,
      "theme": {
        "primary": "#1e73be",
        "secondary": "#1634b9",
        "accent": "#13165d"
      }
    },
    {
      "id": "stoomstrijkijzer",
      "domain": "bestestoomstrijkijzerconsumentenbond.nl"
    },
    {
      "id": "wasmachine",
      "domain": "bestewasmachineconsumentenbond.nl"
    },
    {
      "id": "smartphone",
      "domain": "bestesmartphoneconsumentenbond.nl"
    }
  ],
  "shops": [
    {
      "id": "amazon-nl",
      "name": "Amazon.nl",
      "domain": "amazon.nl",
      "enabled": true
    },
    {
      "id": "bol-com",
      "name": "Bol.com",
      "domain": "bol.com"
    },
    {
      "id": "coolblue",
      "name": "Coolblue",
      "domain": "coolblue.nl"
    }
  ]
}
```

### Colors (Updated to match consumentenbeste.nl)

```css
:root {
  --primary: oklch(0.52 0.15 250); /* #1e73be blue */
  --secondary: oklch(0.42 0.18 260); /* #1634b9 darker blue */
}
```

---

## 🔧 API Endpoints

### Domains
- `GET /api/domains` - List all domains
- `POST /api/domains` - Add new domain
- `PUT /api/domains/:id` - Update domain
- `DELETE /api/domains/:id` - Delete domain

### Affiliates
- `GET /api/affiliates` - List affiliate links
- `POST /api/affiliates` - Add affiliate link
- `PUT /api/affiliates/:id` - Update affiliate link
- `DELETE /api/affiliates/:id` - Delete affiliate link

### Google Scholar
- `GET /api/scholar` - Get settings
- `PUT /api/scholar` - Update settings

### Shops
- `GET /api/shops` - List shops

---

## 📊 Data Structure

### Domain Object
```json
{
  "id": "stoomstrijkijzer",
  "domain": "bestestoomstrijkijzerconsumentenbond.nl",
  "locale": "nl",
  "category": "stoomstrijkijzer",
  "category_nl": "Stoomstrijkijzers",
  "meta": {
    "title": "Beste Stoomstrijkijzer 2026",
    "description": "...",
    "keywords": ["stoomstrijkijzer", "test"]
  },
  "theme": {
    "primary": "#1e73be",
    "secondary": "#1634b9"
  },
  "data": {
    "productCount": 18,
    "brands": ["Philips", "Tefal"],
    "priceRange": { "min": 24.99, "max": 380.00 }
  }
}
```

### Affiliate Link Object
```json
{
  "id": "amazon-strijkijzer-123",
  "productId": "product-123",
  "shop": "amazon-nl",
  "url": "https://amazon.nl/...",
  "price": "49.99",
  "lastChecked": "2026-09-22T12:00:00Z"
}
```

### Shop Object
```json
{
  "id": "amazon-nl",
  "name": "Amazon.nl",
  "domain": "amazon.nl",
  "affiliateTag": "your-tag-20",
  "logo": "/images/shops/amazon.svg",
  "enabled": true
}
```

---

## 🎨 Visual Assets Created

### Favicon
- **File:** `public/favicon.svg`
- **Design:** Blue "CB" logo
- **Colors:** #1e73be (matching consumentenbeste.nl)

### Shop Logos
- **Amazon:** `public/images/shops/amazon.svg` (Orange #FF9900)
- **Bol.com:** `public/images/shops/bol.svg` (Blue #0000A4)
- **Coolblue:** `public/images/shops/coolblue.svg` (Blue #0290E7)

---

## 🚀 Quick Domain Setup (EMD 2.0 Style)

### Add New Domain via API

```bash
curl -X POST https://bste-admin.YOUR-SUBDOMAIN.workers.dev/api/domains \
  -H "Authorization: Bearer rereeu" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "koffiezetapparaat",
    "domain": "bestekoffiezetapparaatconsumentenbond.nl",
    "locale": "nl",
    "category": "koffiezetapparaat",
    "category_nl": "Koffiezetapparaten",
    "meta": {
      "title": "Beste Koffiezetapparaat 2026",
      "description": "Vind het beste koffiezetapparaat",
      "keywords": ["koffiezetapparaat", "test"]
    },
    "theme": {
      "primary": "#1e73be",
      "secondary": "#1634b9"
    }
  }'
```

### Add via Admin Panel

1. Go to https://bste.pages.dev/admin/
2. Login with password: `rereeu`
3. Click "Domains" tab
4. Click "+ Add Domain"
5. Fill in form
6. Click "Save"

---

## 📝 Next Steps

### 1. Deploy Worker ⏳
```bash
cd /Users/northsea/ClaudeProjects/Bste
wrangler deploy
```

### 2. Sync Data to KV
- Current domains in `src/config/domains.json`
- Need to be synced to Cloudflare KV
- Can use admin panel or API

### 3. Update Admin Panel
- Change API_BASE URL to your worker
- Test all functionality

### 4. Add Product Data
- Import actual product data
- Use API to manage products
- Link to affiliate shops

---

## 🔍 Testing

### Test Worker Locally
```bash
wrangler dev
```

Visit: http://localhost:8787/api/domains

### Test API Endpoints
```bash
# List domains
curl -H "Authorization: Bearer rereeu" \
  http://localhost:8787/api/domains

# Add domain
curl -X POST -H "Authorization: Bearer rereeu" \
  -H "Content-Type: application/json" \
  -d '{"id":"test","domain":"test.nl"}' \
  http://localhost:8787/api/domains
```

---

## 💡 EMD 2.0 Pattern Benefits

### Quick Setup:
1. **Add domain** via API/admin
2. **Auto-generate** pages from template
3. **Deploy** to Cloudflare Pages
4. **Done!** New domain live in minutes

### Scalability:
- Central domain management
- Consistent theming
- Easy bulk operations
- Version control

### Flexibility:
- Per-domain customization
- A/B testing support
- Multi-locale ready
- Shop integration

---

## 📊 Current Status

### ✅ Complete:
- [x] Main domain added (consumentenoverzicht.nl)
- [x] Colors updated (#1e73be blue)
- [x] Favicon created
- [x] Shop logos created
- [x] Amazon.nl added
- [x] Worker code written
- [x] wrangler.toml configured
- [x] API endpoints ready

### ⏳ Pending:
- [ ] Deploy worker to Cloudflare
- [ ] Create KV namespace
- [ ] Set admin secret
- [ ] Update admin panel API URL
- [ ] Sync domain data to KV
- [ ] Test all API endpoints
- [ ] Add product data
- [ ] Configure DNS for domains

---

## 🎯 Deployment Checklist

### Before Deployment:
1. ✅ Worker code ready
2. ✅ wrangler.toml configured
3. ⏳ Cloudflare account ready
4. ⏳ KV namespace created
5. ⏳ Admin secret set

### After Deployment:
1. ⏳ Update admin panel API URL
2. ⏳ Test all endpoints
3. ⏳ Sync domain data
4. ⏳ Add product data
5. ⏳ Configure DNS
6. ⏳ Deploy pages

---

## 🔧 Troubleshooting

### Worker Not Deploying?
```bash
# Check wrangler version
wrangler --version

# Update if needed
npm install -g wrangler@latest

# Re-login
wrangler logout
wrangler login
```

### KV Not Working?
```bash
# List KV namespaces
wrangler kv:namespace list

# Test KV operations
wrangler kv:key put --binding=BSTE_KV "test" "value"
wrangler kv:key get --binding=BSTE_KV "test"
```

### API Errors?
- Check CORS headers
- Verify Authorization header
- Check KV namespace ID
- Test with curl first

---

## 📚 Resources

**Cloudflare Docs:**
- https://developers.cloudflare.com/workers/
- https://developers.cloudflare.com/kv/

**Wrangler CLI:**
- https://developers.cloudflare.com/workers/wrangler/

**This Project:**
- Worker: `worker/index.js`
- Config: `wrangler.toml`
- Domains: `src/config/domains.json`
- Admin: `public/admin/index.html`

---

## ✅ Summary

**What's Ready:**
- ✅ consumentenoverzicht.nl (main domain) added
- ✅ Colors matching consumentenbeste.nl (#1e73be)
- ✅ Favicon with CB logo
- ✅ Amazon.nl + other shops configured
- ✅ Cloudflare Worker ready to deploy
- ✅ EMD 2.0 pattern for quick domain setup

**Next: Deploy the worker!** 🚀

```bash
cd /Users/northsea/ClaudeProjects/Bste
wrangler deploy
```
