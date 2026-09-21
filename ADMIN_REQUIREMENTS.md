# Admin Panel Requirements

## Current Status
✅ Admin panel exists at `/admin/`
✅ Password authentication: `rereeu`
✅ Two tabs: Domains, Affiliate Links
✅ CRUD operations working
✅ Cloudflare Workers API deployed

## New Features Needed

### 1. Domain Matching Tab
**Purpose:** Map purchased domains to product categories

**UI:**
- Input field: "Actual Domain" (e.g., bestestoomstrijkijzer.nl)
- Dropdown: "Maps to Category" (from existing domains)
- Status indicator: DNS configured / Pending
- Actions: Edit, Delete

**Storage:** 
- KV key: `domain_mappings`
- Format: `{"bestestoomstrijkijzer.nl": "stoomstrijkijzer", ...}`

**Worker Logic:**
- Check request hostname
- Lookup in domain_mappings
- Load corresponding category data
- Serve correct products

### 2. Sortable/Filterable Table (Homepage)
**Features:**
- Sort by: Score, Price, Brand
- Filter by: Price range, Score range, Brand
- Search box for model names
- Responsive design

**Implementation:**
- Client-side JavaScript
- No backend needed
- Use existing product data

### 3. Knowledge Base (Per Domain)
**Structure:**
```
/content/{domain_id}/
  products.json (✅ exists)
  keywords.json (NEW)
  topical-map.json (NEW)
  url-structure.json (NEW)
  content/ (NEW)
    article-1.md
    article-2.md
```

**Admin UI:**
- Tab: "Knowledge Base"
- Per-domain content management
- Import keywords (CSV/JSON)
- Generate topical maps
- Manage URL structures

### 4. Keyword Tool Integration
**Features:**
- Import keywords from CSV
- Associate with domains
- Track rankings
- Generate content ideas

**Data Format:**
```json
{
  "keywords": [
    {
      "keyword": "beste stoomstrijkijzer",
      "volume": 1000,
      "difficulty": 45,
      "intent": "commercial",
      "url": "/beste-stoomstrijkijzer"
    }
  ]
}
```

## Implementation Plan

### Phase 1: Domain Matching (HIGH PRIORITY)
1. Add "Domain Matching" tab to admin
2. Create domain_mappings KV storage
3. Update Cloudflare Worker to check mappings
4. Test with real domains

### Phase 2: Sortable Table (HIGH PRIORITY)
1. Add sorting controls to homepage table
2. Add filter inputs
3. Add search box
4. Implement client-side filtering

### Phase 3: Knowledge Base (MEDIUM PRIORITY)
1. Create file structure
2. Add admin UI for content management
3. Build keyword importer
4. Create topical map generator

### Phase 4: URL Structure (MEDIUM PRIORITY)
1. Define URL patterns
2. Build dynamic routing
3. Generate pages from templates

## Technical Stack
- **Admin:** Vanilla JS + Tailwind CSS
- **Storage:** Cloudflare KV
- **API:** Cloudflare Workers
- **Frontend:** Astro SSG
- **Styling:** Tailwind CSS 4

## Next Steps
1. ✅ Document requirements
2. ⏳ Implement Domain Matching
3. ⏳ Implement Sortable Table
4. ⏳ Build Knowledge Base structure
5. ⏳ Create Keyword Tool

