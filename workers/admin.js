// Cloudflare Worker Admin Panel
// Manage domains, content, and affiliate links via API

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Authentication check - support both long secret and simple password
    const authHeader = request.headers.get('Authorization');
    const validAuth = authHeader === `Bearer ${env.ADMIN_SECRET}` || authHeader === 'Bearer rereeu';
    
    if (!validAuth) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders
      });
    }

    // API Routes - Domains
    if (path === '/api/domains' && request.method === 'GET') {
      return handleGetDomains(env, corsHeaders);
    }

    if (path === '/api/domains' && request.method === 'POST') {
      return handleCreateDomain(request, env, corsHeaders);
    }

    if (path.startsWith('/api/domains/') && request.method === 'PUT') {
      return handleUpdateDomain(request, env, corsHeaders);
    }

    if (path.startsWith('/api/domains/') && request.method === 'DELETE') {
      return handleDeleteDomain(request, env, corsHeaders);
    }

    // API Routes - Affiliate Links
    if (path === '/api/affiliate-links' && request.method === 'GET') {
      return handleGetAffiliateLinks(env, corsHeaders);
    }

    if (path === '/api/affiliate-links' && request.method === 'POST') {
      return handleCreateAffiliateLink(request, env, corsHeaders);
    }

    if (path.startsWith('/api/affiliate-links/') && request.method === 'PUT') {
      return handleUpdateAffiliateLink(request, env, corsHeaders);
    }

    if (path.startsWith('/api/affiliate-links/') && request.method === 'DELETE') {
      return handleDeleteAffiliateLink(request, env, corsHeaders);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};

// Domain Handlers
async function handleGetDomains(env, corsHeaders) {
  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  return jsonResponse(domains, 200, corsHeaders);
}

async function handleCreateDomain(request, env, corsHeaders) {
  const body = await request.json();
  
  if (!body.domain || !body.id) {
    return jsonResponse({ error: 'Missing required fields' }, 400, corsHeaders);
  }

  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  domains.push(body);
  await env.DOMAINS_KV.put('domains', JSON.stringify(domains));

  return jsonResponse({ success: true, domain: body }, 201, corsHeaders);
}

async function handleUpdateDomain(request, env, corsHeaders) {
  const domainId = request.url.split('/').pop();
  const body = await request.json();
  
  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  const index = domains.findIndex(d => d.id === domainId);
  
  if (index === -1) {
    return jsonResponse({ error: 'Domain not found' }, 404, corsHeaders);
  }

  domains[index] = { ...domains[index], ...body };
  await env.DOMAINS_KV.put('domains', JSON.stringify(domains));

  return jsonResponse({ success: true, domain: domains[index] }, 200, corsHeaders);
}

async function handleDeleteDomain(request, env, corsHeaders) {
  const domainId = request.url.split('/').pop();
  
  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  const filtered = domains.filter(d => d.id !== domainId);
  
  if (filtered.length === domains.length) {
    return jsonResponse({ error: 'Domain not found' }, 404, corsHeaders);
  }

  await env.DOMAINS_KV.put('domains', JSON.stringify(filtered));
  return jsonResponse({ success: true }, 200, corsHeaders);
}

// Affiliate Link Handlers
async function handleGetAffiliateLinks(env, corsHeaders) {
  const links = await env.DOMAINS_KV.get('affiliate_links', { type: 'json' }) || [];
  return jsonResponse(links, 200, corsHeaders);
}

async function handleCreateAffiliateLink(request, env, corsHeaders) {
  const body = await request.json();
  
  if (!body.id || !body.domain || !body.targetUrl) {
    return jsonResponse({ error: 'Missing required fields: id, domain, targetUrl' }, 400, corsHeaders);
  }

  const links = await env.DOMAINS_KV.get('affiliate_links', { type: 'json' }) || [];
  
  // Add metadata
  body.createdAt = new Date().toISOString();
  body.clicks = 0;
  
  links.push(body);
  await env.DOMAINS_KV.put('affiliate_links', JSON.stringify(links));

  return jsonResponse({ success: true, link: body }, 201, corsHeaders);
}

async function handleUpdateAffiliateLink(request, env, corsHeaders) {
  const linkId = request.url.split('/').pop();
  const body = await request.json();
  
  const links = await env.DOMAINS_KV.get('affiliate_links', { type: 'json' }) || [];
  const index = links.findIndex(l => l.id === linkId);
  
  if (index === -1) {
    return jsonResponse({ error: 'Affiliate link not found' }, 404, corsHeaders);
  }

  links[index] = { ...links[index], ...body, updatedAt: new Date().toISOString() };
  await env.DOMAINS_KV.put('affiliate_links', JSON.stringify(links));

  return jsonResponse({ success: true, link: links[index] }, 200, corsHeaders);
}

async function handleDeleteAffiliateLink(request, env, corsHeaders) {
  const linkId = request.url.split('/').pop();
  
  const links = await env.DOMAINS_KV.get('affiliate_links', { type: 'json' }) || [];
  const filtered = links.filter(l => l.id !== linkId);
  
  if (filtered.length === links.length) {
    return jsonResponse({ error: 'Affiliate link not found' }, 404, corsHeaders);
  }

  await env.DOMAINS_KV.put('affiliate_links', JSON.stringify(filtered));
  return jsonResponse({ success: true }, 200, corsHeaders);
}

function jsonResponse(data, status = 200, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
