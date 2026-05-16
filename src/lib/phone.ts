/**
 * Normalize phone input to E.164 for storage (Nigeria-first: 080…, 234…, 10-digit mobile).
 */
export function normalizePhoneToE164(input: string): string {
	const trimmed = input.trim();
	const digitsOnly = trimmed.replace(/\D/g, '');

	if (!digitsOnly) {
		return '';
	}

	// Explicit international +XXXXXXXX…
	if (trimmed.startsWith('+')) {
		const rest = trimmed.slice(1).replace(/\D/g, '');
		if (/^[1-9]\d{7,14}$/.test(rest)) {
			return `+${rest}`;
		}
		return '';
	}

	// Nigeria local: 0 + 10-digit mobile (e.g. 08012345678)
	if (/^0[7-9]\d{9}$/.test(digitsOnly)) {
		return `+234${digitsOnly.slice(1)}`;
	}

	// Nigeria without +: 234 + 10 digits
	if (/^234[1-9]\d{9}$/.test(digitsOnly)) {
		return `+${digitsOnly}`;
	}

	// 10-digit Nigerian mobile without country or leading 0 (e.g. 8012345678)
	if (/^[7-9]\d{9}$/.test(digitsOnly)) {
		return `+234${digitsOnly}`;
	}

	// Other countries: digits-only international (no leading 0)
	if (/^[1-9]\d{7,14}$/.test(digitsOnly)) {
		return `+${digitsOnly}`;
	}

	return '';
}

/** Pretty-print a normalized +234 number for display (easier to read / verify). */
export function formatPhoneDisplay(e164: string): string {
	if (!e164.startsWith('+234') || e164.length !== 14) {
		return e164;
	}
	const n = e164.slice(4);
	return `+234 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
}
