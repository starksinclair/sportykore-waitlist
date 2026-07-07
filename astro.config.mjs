// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

// Canonical domain is env-driven so the later move to sportykore.com is a
// one-variable change (WEBSITE_BUILD_BRIEF.md §9).
const site = process.env.PUBLIC_SITE_URL ?? 'https://www.sportykore.com';

/** @param {string} pageUrl */
function pathnameOf(pageUrl) {
	return new URL(pageUrl).pathname.replace(/\/$/, '') || '/';
}

// https://astro.build/config
export default defineConfig({
	site,
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	integrations: [
		sitemap({
			filter: (page) => {
				const path = pathnameOf(page);
				return path !== '/thanks' && !path.startsWith('/api');
			},
			serialize(item) {
				const path = pathnameOf(item.url);
				const lastmod = new Date().toISOString();
				item.lastmod = lastmod;

				if (path === '/') {
					item.priority = 1.0;
					item.changefreq = ChangeFreqEnum.WEEKLY;
					return item;
				}

				if (path === '/players' || path === '/organizers' || path === '/faq') {
					item.priority = 0.8;
					item.changefreq = ChangeFreqEnum.WEEKLY;
					return item;
				}

				if (path === '/privacy' || path === '/terms') {
					item.priority = 0.3;
					item.changefreq = ChangeFreqEnum.YEARLY;
					return item;
				}

				item.priority = 0.5;
				item.changefreq = ChangeFreqEnum.MONTHLY;
				return item;
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
