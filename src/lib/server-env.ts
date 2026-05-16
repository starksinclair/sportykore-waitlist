/**
 * Read secrets set in hosting (e.g. Vercel dashboard) at runtime.
 * Prefer `process.env` over `import.meta.env` — Vite can bake `import.meta.env` at build time,
 * leaving production values missing even when Vercel env is correct.
 */
export function envServer(key: string): string | undefined {
	if (typeof process !== 'undefined' && process.env[key] !== undefined && process.env[key] !== '') {
		return process.env[key];
	}

	const viteEnv = (
		import.meta as ImportMeta & { env: Record<string, string | boolean | undefined> }
	).env[key];
	if (typeof viteEnv === 'string' && viteEnv !== '') {
		return viteEnv;
	}

	return undefined;
}

export function requireEnvServer(key: string): string {
	const value = envServer(key);
	if (!value) {
		throw new Error(`Missing environment variable: ${key}`);
	}
	return value;
}
