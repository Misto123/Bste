// Cloudflare Worker for multi-domain routing
// Routes incoming requests to the correct domain configuration

import domains from '../src/config/domains.json';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Find matching domain config
    const domainConfig = domains.domains.find(d => d.domain === hostname);

    if (!domainConfig) {
      return new Response('Domain not configured', { status: 404 });
    }

    // Fetch from Cloudflare Pages deployment
    const pagesUrl = `${env.PAGES_URL}${url.pathname}${url.search}`;
    
    const response = await fetch(pagesUrl, {
      headers: {
        ...request.headers,
        'X-Domain-ID': domainConfig.id,
        'X-Locale': domainConfig.locale,
        'X-Category': domainConfig.category,
      }
    });

    // Clone response and add custom headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Domain', domainConfig.domain);
    newResponse.headers.set('X-Powered-By', 'Cloudflare Workers + Astro');

    return newResponse;
  }
};
