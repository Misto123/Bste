// Cloudflare Worker Admin Panel
// Manage domains and content via API

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Authentication check
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${env.ADMIN_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    // API Routes
    if (path === '/api/domains' && request.method === 'GET') {
      return handleGetDomains(env);
    }

    if (path === '/api/domains' && request.method === 'POST') {
      return handleCreateDomain(request, env);
    }

    if (path.startsWith('/api/domains/') && request.method === 'PUT') {
      return handleUpdateDomain(request, env);
    }

    if (path.startsWith('/api/domains/') && request.method === 'DELETE') {
      return handleDeleteDomain(request, env);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleGetDomains(env) {
  // ponytail: read from KV when persistence needed
  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  return jsonResponse(domains);
}

async function handleCreateDomain(request, env) {
  const body = await request.json();
  
  // Validate
  if (!body.domain || !body.id) {
    return jsonResponse({ error: 'Missing required fields' }, 400);
  }

  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  domains.push(body);
  await env.DOMAINS_KV.put('domains', JSON.stringify(domains));

  return jsonResponse({ success: true, domain: body }, 201);
}

async function handleUpdateDomain(request, env) {
  const domainId = request.url.split('/').pop();
  const body = await request.json();
  
  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  const index = domains.findIndex(d => d.id === domainId);
  
  if (index === -1) {
    return jsonResponse({ error: 'Domain not found' }, 404);
  }

  domains[index] = { ...domains[index], ...body };
  await env.DOMAINS_KV.put('domains', JSON.stringify(domains));

  return jsonResponse({ success: true, domain: domains[index] });
}

async function handleDeleteDomain(request, env) {
  const domainId = request.url.split('/').pop();
  
  const domains = await env.DOMAINS_KV.get('domains', { type: 'json' }) || [];
  const filtered = domains.filter(d => d.id !== domainId);
  
  if (filtered.length === domains.length) {
    return jsonResponse({ error: 'Domain not found' }, 404);
  }

  await env.DOMAINS_KV.put('domains', JSON.stringify(filtered));
  return jsonResponse({ success: true });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
