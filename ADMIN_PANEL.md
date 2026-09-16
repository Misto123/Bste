# 🎉 Admin Panel Deployed!

## ✅ Access Your Admin Panel

**URL:** https://bste.pages.dev/admin/

**Latest Deployment:** https://189336e0.bste.pages.dev/admin/

---

## 🔐 Login Credentials

**Admin Secret:** `YvM/enYgAgfpEwWugHPYRAdrU0FK0Bq3BAdTHER7vYA=`

Copy this secret and paste it in the login screen.

---

## 📋 Admin Panel Features

### ✅ Domain Management
- **View all domains** - See all configured domains in a list
- **Add new domain** - Create new domain configurations
- **Edit domain** - Update existing domain settings
- **Delete domain** - Remove domains from the system

### 📊 Domain Fields
Each domain has:
- **Domain ID** - Unique identifier (e.g., `stoomstrijkijzer`)
- **Domain Name** - Full domain (e.g., `bestestoomstrijkijzerconsumentenbond.nl`)
- **Locale** - Language (nl/en)
- **Category** - Product category
- **Meta Title** - SEO title
- **Meta Description** - SEO description

---

## 🚀 How to Use

### 1. Login
1. Go to https://bste.pages.dev/admin/
2. Paste admin secret: `YvM/enYgAgfpEwWugHPYRAdrU0FK0Bq3BAdTHER7vYA=`
3. Click "Login"

### 2. View Domains
You'll see all configured domains:
- ✅ stoomstrijkijzer (bestestoomstrijkijzerconsumentenbond.nl)
- ✅ wasmachine (bestewasmachineconsumentenbond.nl)
- ✅ smartphone (bestesmartphoneconsumentenbond.nl)

### 3. Add New Domain
1. Click "+ Add Domain"
2. Fill in:
   - Domain ID (e.g., `droger`)
   - Domain Name (e.g., `bestedrogerconsumentenbond.nl`)
   - Locale (nl/en)
   - Category (e.g., `droger`)
   - Meta Title
   - Meta Description
3. Click "Save"

### 4. Edit Domain
1. Click "Edit" on any domain card
2. Update fields
3. Click "Save"

### 5. Delete Domain
1. Click "Delete" on any domain card
2. Confirm deletion

---

## 🔗 API Endpoints

The admin panel connects to:

**Base URL:** https://bste-admin.contact-461.workers.dev/api

**Endpoints:**
- `GET /domains` - List all domains
- `POST /domains` - Create new domain
- `PUT /domains/{id}` - Update domain
- `DELETE /domains/{id}` - Delete domain

**Authentication:** Bearer token in Authorization header

---

## 📱 Mobile Friendly

The admin panel is fully responsive and works on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile phones

---

## 🔒 Security

**Admin Secret Required:**
- All API calls require authentication
- Secret stored in Cloudflare Worker environment
- No domains can be modified without the secret

**To Change Admin Secret:**
```bash
cd /Users/northsea/ClaudeProjects/Bste
export CLOUDFLARE_API_TOKEN=your_token_here
export CLOUDFLARE_ACCOUNT_ID=your_account_id_here
echo "NEW_SECRET_HERE" | wrangler secret put ADMIN_SECRET --config wrangler-admin.toml
```

**Note:** See `CREDENTIALS.md` (local only) for actual credentials.

---

## 🎯 Current Status

**Live URLs:**
- **Admin Panel:** https://bste.pages.dev/admin/
- **Main Site:** https://bste.pages.dev/
- **Admin API:** https://bste-admin.contact-461.workers.dev/api/domains

**Configured Domains:** 3
- stoomstrijkijzer (18 products)
- wasmachine (18 products)
- smartphone (18 products)

**Data Storage:** Cloudflare KV (DOMAINS_KV)

---

## 💡 Next Steps

### 1. Test Admin Panel
- Login and view domains
- Try editing a domain
- Add a test domain

### 2. Add Real Domains
When ready to add more product categories:
1. Login to admin panel
2. Click "+ Add Domain"
3. Fill in category details
4. Save

### 3. Purchase Domains
Once you're happy with the setup:
1. Buy domains at OpenProvider/Cloudflare
2. Point DNS to Cloudflare Pages
3. Domains go live!

---

## 🐛 Troubleshooting

**"Unauthorized" Error:**
- Check you're using the correct admin secret
- Make sure you copied the full secret (no extra spaces)

**Can't See Domains:**
- Check browser console for errors
- Try refreshing the page
- Verify API is accessible at https://bste-admin.contact-461.workers.dev/api/domains

**Connection Error:**
- Check internet connection
- Verify Cloudflare Workers are deployed
- Check worker logs: `wrangler tail bste-admin`

---

## 📚 Documentation

- `CREDENTIALS.md` - All credentials (local only)
- `LIVE_DEPLOYMENT.md` - Deployment status
- `DOMAINS_CONFIGURED.md` - Domain setup guide

---

**Deployed:** 2026-09-16  
**Status:** 🟢 LIVE & WORKING  
**Access:** https://bste.pages.dev/admin/
