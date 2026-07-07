// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Canonical domain is env-driven so the later move to sportykore.com is a
// one-variable change (WEBSITE_BUILD_BRIEF.md §9).
const site = process.env.PUBLIC_SITE_URL ?? 'https://waitlist.sportykore.com';

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
			// /thanks is noindex — keep it out of the sitemap.
			filter: (page) => !new URL(page).pathname.startsWith('/thanks'),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
