import type { APIRoute } from 'astro';

export const prerender = true;

function robotsTxt(site: URL | undefined): string {
	const origin = site?.href ?? 'https://www.sportykore.com/';
	const sitemapUrl = new URL('sitemap-index.xml', origin).href;

	return `# Sportykore — grassroots football competitions in Nigeria
User-agent: *
Allow: /
Disallow: /api/
Disallow: /thanks

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${sitemapUrl}
`;
}

export const GET: APIRoute = ({ site }) => {
	return new Response(robotsTxt(site), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400',
		},
	});
};
