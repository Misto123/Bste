// Cloudflare Worker for Bste Multi-Domain Management
// Based on EMD 2.0 pattern - Quick domain setup

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, hostname } = url;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Auth check
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (pathname.startsWith('/api/') && token !== env.ADMIN_SECRET) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // === API ROUTES ===

    // GET /api/domains - List all domains
    if (pathname === '/api/domains' && request.method === 'GET') {
      const domains = await env.BSTE_KV.get('domains', 'json') || [];
      return new Response(JSON.stringify(domains), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // POST /api/domains - Add new domain
    if (pathname === '/api/domains' && request.method === 'POST') {
      const body = await request.json();
      const domains = await env.BSTE_KV.get('domains', 'json') || [];
      
      // Add new domain
      domains.push({
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      await env.BSTE_KV.put('domains', JSON.stringify(domains));
      
      return new Response(JSON.stringify({ success: true, domain: body }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // PUT /api/domains/:id - Update domain
    if (pathname.startsWith('/api/domains/') && request.method === 'PUT') {
      const domainId = pathname.split('/').pop();
      const body = await request.json();
      const domains = await env.BSTE_KV.get('domains', 'json') || [];
      
      const index = domains.findIndex(d => d.id === domainId);
      if (index === -1) {
        return new Response(JSON.stringify({ error: 'Domain not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      domains[index] = {
        ...domains[index],
        ...body,
        updatedAt: new Date().toISOString()
      };
      
      await env.BSTE_KV.put('domains', JSON.stringify(domains));
      
      return new Response(JSON.stringify({ success: true, domain: domains[index] }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // DELETE /api/domains/:id - Delete domain
    if (pathname.startsWith('/api/domains/') && request.method === 'DELETE') {
      const domainId = pathname.split('/').pop();
      const domains = await env.BSTE_KV.get('domains', 'json') || [];
      
      const filtered = domains.filter(d => d.id !== domainId);
      await env.BSTE_KV.put('domains', JSON.stringify(filtered));
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // GET /api/affiliates - List affiliate links
    if (pathname === '/api/affiliates' && request.method === 'GET') {
      const affiliates = await env.BSTE_KV.get('affiliate_links', 'json') || [];
      return new Response(JSON.stringify(affiliates), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // POST /api/affiliates - Add affiliate link
    if (pathname === '/api/affiliates' && request.method === 'POST') {
      const body = await request.json();
      const affiliates = await env.BSTE_KV.get('affiliate_links', 'json') || [];
      
      affiliates.push({
        ...body,
        createdAt: new Date().toISOString()
      });
      
      await env.BSTE_KV.put('affiliate_links', JSON.stringify(affiliates));
      
      return new Response(JSON.stringify({ success: true, affiliate: body }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // PUT /api/affiliates/:id - Update affiliate link
    if (pathname.startsWith('/api/affiliates/') && request.method === 'PUT') {
      const affiliateId = pathname.split('/').pop();
      const body = await request.json();
      const affiliates = await env.BSTE_KV.get('affiliate_links', 'json') || [];
      
      const index = affiliates.findIndex(a => a.id === affiliateId);
      if (index === -1) {
        return new Response(JSON.stringify({ error: 'Affiliate not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      
      affiliates[index] = {
        ...affiliates[index],
        ...body,
        updatedAt: new Date().toISOString()
      };
      
      await env.BSTE_KV.put('affiliate_links', JSON.stringify(affiliates));
      
      return new Response(JSON.stringify({ success: true, affiliate: affiliates[index] }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // DELETE /api/affiliates/:id - Delete affiliate link
    if (pathname.startsWith('/api/affiliates/') && request.method === 'DELETE') {
      const affiliateId = pathname.split('/').pop();
      const affiliates = await env.BSTE_KV.get('affiliate_links', 'json') || [];
      
      const filtered = affiliates.filter(a => a.id !== affiliateId);
      await env.BSTE_KV.put('affiliate_links', JSON.stringify(filtered));
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // GET /api/scholar - Get Google Scholar settings
    if (pathname === '/api/scholar' && request.method === 'GET') {
      const settings = await env.BSTE_KV.get('google_scholar_settings', 'json');
      return new Response(JSON.stringify(settings || {
        isListed: false,
        paperLinks: [],
        lastUpdated: null
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // PUT /api/scholar - Update Google Scholar settings
    if (pathname === '/api/scholar' && request.method === 'PUT') {
      const body = await request.json();
      
      if (typeof body.isListed !== 'boolean') {
        return new Response(JSON.stringify({ error: 'Invalid data' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      await env.BSTE_KV.put('google_scholar_settings', JSON.stringify(body));
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Settings saved successfully'
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // GET /api/shops - List shops
    if (pathname === '/api/shops' && request.method === 'GET') {
      const shops = await env.BSTE_KV.get('shops', 'json') || [];
      return new Response(JSON.stringify(shops), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Default response
    return new Response('Bste API - Multi-Domain Management', {
      headers: { 'Content-Type': 'text/plain', ...corsHeaders }
    });
  }
};
