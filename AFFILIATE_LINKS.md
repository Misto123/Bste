# ✅ Affiliate Link Management - LIVE!

## 🎉 New Features Added

Your admin panel now includes **full affiliate link management** with /out/ redirect links!

---

## 🔐 Login Fixed

**Simple Password:** `rereeu`

You can now login with just `rereeu` (no more long secret needed!)

**Login URL:** https://bste.pages.dev/admin/

---

## 🎯 New Admin Panel Features

### Two Tabs:
1. **Domains** - Manage your product category domains
2. **Affiliate Links** - Manage affiliate links for each domain

---

## 💰 How to Add Affiliate Links

### Step 1: Login
1. Go to https://bste.pages.dev/admin/
2. Enter password: `rereeu`
3. Click "Login"

### Step 2: Switch to Affiliate Links Tab
Click the "Affiliate Links" button in the top navigation

### Step 3: Add New Affiliate Link
Click "+ Add Affiliate Link"

### Step 4: Fill in Details

**Link ID:** Unique identifier (e.g., `bol-philips-dst2010`)
- This becomes your /out/ URL: `/out/bol-philips-dst2010`

**Domain:** Select which domain this link belongs to
- bestestoomstrijkijzerconsumentenbond.nl
- bestewasmachineconsumentenbond.nl
- bestesmartphoneconsumentenbond.nl

**Product/Page:** Description (e.g., "Philips DST2010" or "Homepage")

**Target URL:** Your full affiliate URL
- Example: `https://partner.bol.com/click/click?p=2&t=url&s=1234&f=TXL&url=https%3A%2F%2Fwww.bol.com%2F...`

**Button Text:** Text for the button (default: "Bekijk prijs")

**Notes:** Internal notes (not shown to users)

### Step 5: Save
Click "Save Affiliate Link"

---

## 🔗 How /out/ Links Work

### What You Get:
When you create an affiliate link with ID `bol-philips-dst2010`, you get:

**Short URL:** `/out/bol-philips-dst2010`

**Full URL:** `https://yoursite.nl/out/bol-philips-dst2010`

### How It Works:
1. User clicks your link: `/out/bol-philips-dst2010`
2. System redirects to your affiliate URL
3. Click is tracked automatically
4. Opens in new tab (target="_blank")
5. Has rel="nofollow" for SEO

### SEO-Safe:
- ✅ No-follow links (won't affect SEO)
- ✅ Opens in new tab
- ✅ Clean /out/ URLs
- ✅ Click tracking built-in

---

## 📊 Click Tracking

Each affiliate link automatically tracks:
- **Clicks:** Number of times clicked
- **Created:** When link was added
- **Updated:** Last modification date

View stats in the Affiliate Links tab!

---

## 💡 Example Use Cases

### 1. Product Comparison Button
```html
<a href="/out/bol-philips-dst2010" target="_blank" rel="nofollow">
  Bekijk prijs →
</a>
```

### 2. Multiple Retailers
Create separate links for each retailer:
- `/out/bol-philips-dst2010`
- `/out/amazon-philips-dst2010`
- `/out/coolblue-philips-dst2010`

### 3. Homepage Banner
```html
<a href="/out/top-pick-2024" target="_blank" rel="nofollow">
  Bekijk onze #1 keuze →
</a>
```

---

## 🎨 Integration in Your Site

### In Product Cards:
```html
<div class="product-card">
  <h3>Philips DST2010</h3>
  <p>Score: 8.5</p>
  <p>€24.99</p>
  <a 
    href="/out/bol-philips-dst2010" 
    target="_blank" 
    rel="nofollow"
    class="btn btn-primary"
  >
    Bekijk prijs
  </a>
</div>
```

### In Comparison Tables:
```html
<tr>
  <td>Philips DST2010</td>
  <td>8.5</td>
  <td>€24.99</td>
  <td>
    <a href="/out/bol-philips-dst2010" target="_blank" rel="nofollow">
      Kopen →
    </a>
  </td>
</tr>
```

---

## 🔧 Manage Affiliate Links

### View All Links
- See all affiliate links across all domains
- View click counts
- See target URLs

### Edit Links
- Click "Edit" on any link
- Update URL, button text, notes
- Changes apply immediately

### Delete Links
- Click "Delete" to remove
- Confirmation required
- /out/ URLs stop working

---

## 📋 Best Practices

### 1. Use Descriptive IDs
❌ Bad: `/out/link1`
✅ Good: `/out/bol-philips-dst2010`

### 2. Include Retailer Name
Makes it easy to manage multiple retailers:
- `/out/bol-{product}`
- `/out/amazon-{product}`
- `/out/coolblue-{product}`

### 3. Test Links After Creation
Click the /out/ link to verify it redirects correctly

### 4. Track Performance
Check click counts regularly in admin panel

### 5. Update Dead Links
If affiliate program changes URLs, update in admin panel

---

## 🌐 Current Setup

**Live URLs:**
- **Admin Panel:** https://bste.pages.dev/admin/
- **Latest Deploy:** https://ab2867ca.bste.pages.dev/admin/
- **API:** https://bste-admin.contact-461.workers.dev

**Features:**
- ✅ Domain management
- ✅ Affiliate link management
- ✅ /out/ redirect links
- ✅ Click tracking
- ✅ No-follow links
- ✅ Target blank (new tab)
- ✅ Simple password login

---

## 🚀 Quick Start

### Add Your First Affiliate Link:

1. **Login:** https://bste.pages.dev/admin/ with password `rereeu`
2. **Switch to "Affiliate Links" tab**
3. **Click "+ Add Affiliate Link"**
4. **Fill in:**
   - Link ID: `bol-philips-dst2010`
   - Domain: `bestestoomstrijkijzerconsumentenbond.nl`
   - Product: `Philips DST2010`
   - Target URL: `https://partner.bol.com/click/...` (your affiliate URL)
   - Button Text: `Bekijk prijs`
5. **Click "Save Affiliate Link"**
6. **Test it:** Visit `https://yoursite.nl/out/bol-philips-dst2010`

---

## 💰 Monetization Ready

You can now:
- ✅ Add affiliate links to all products
- ✅ Track which products get clicks
- ✅ Manage multiple retailers per product
- ✅ Update links without touching code
- ✅ A/B test different button texts
- ✅ See which domains perform best

---

## 📚 Documentation

All saved in your project:
- `ADMIN_LIVE.md` - Admin panel guide
- `CREDENTIALS.md` - Login credentials
- `AFFILIATE_LINKS.md` - This guide

---

## 🎯 Next Steps

1. **Test the admin panel** - Add a test affiliate link
2. **Add real affiliate links** - For your products
3. **Update Astro templates** - Add /out/ links to product cards
4. **Track performance** - Monitor clicks in admin panel

---

**Status:** 🟢 AFFILIATE SYSTEM LIVE  
**Admin:** https://bste.pages.dev/admin/  
**Password:** `rereeu`

## 🎉 Start monetizing your comparison sites now!
