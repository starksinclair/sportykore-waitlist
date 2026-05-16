// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://waitlist.sportykore.com',
	output: 'server',
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
	},
});
