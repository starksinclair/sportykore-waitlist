/** Canonical site origin — keep in sync with astro.config `site`. */
export function getSiteOrigin() {
	const raw = import.meta.env.PUBLIC_SITE_URL ?? 'https://www.sportykore.com';
	return new URL(raw).origin;
}

/** Absolute page URL for structured data (BreadcrumbList, etc.). */
export function absoluteUrl(pathname: string) {
	return new URL(pathname, `${getSiteOrigin()}/`).href;
}
