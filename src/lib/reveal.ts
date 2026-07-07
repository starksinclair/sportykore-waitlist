/**
 * Scroll motion utilities (WEBSITE_BUILD_BRIEF.md §6): one shared
 * IntersectionObserver for rise-and-fade reveals via `data-reveal`,
 * plus a restrained rAF-throttled parallax for `data-parallax`.
 * Transforms and opacity only — never layout properties.
 */

const prefersReducedMotion = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveals(): void {
	const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

	if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
		elements.forEach((el) => el.classList.add('is-revealed'));
		return;
	}

	initParallax();
	if (elements.length === 0) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				const delay = el.dataset.revealDelay;
				if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
				el.classList.add('is-revealed');
				observer.unobserve(el);
			}
		},
		{ threshold: 0.25, rootMargin: '0px 0px -5% 0px' },
	);

	elements.forEach((el) => observer.observe(el));
}

/** Phones drift a few px slower than scroll — desktop only, transform-only. */
function initParallax(): void {
	const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
	if (elements.length === 0) return;
	if (!window.matchMedia('(min-width: 1024px)').matches) return;

	let ticking = false;

	const update = () => {
		ticking = false;
		const viewportCenter = window.innerHeight / 2;
		for (const el of elements) {
			const rect = el.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
			const elementCenter = rect.top + rect.height / 2;
			const offset = Math.max(
				-14,
				Math.min(14, (elementCenter - viewportCenter) * 0.05),
			);
			el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
		}
	};

	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(update);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	update();
}
