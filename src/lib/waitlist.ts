import { normalizePhoneToE164 } from './phone';

export const roleOptions = ['fan', 'organizer', 'player', 'coach', 'other'] as const;

export type WaitlistRole = (typeof roleOptions)[number];

export interface WaitlistSubmission {
	name: string;
	email: string;
	phone: string;
	role: WaitlistRole;
}

export interface WaitlistValidationResult {
	data?: WaitlistSubmission;
	fieldErrors: Partial<Record<keyof WaitlistSubmission, string>>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+[1-9]\d{7,14}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function readString(value: unknown) {
	return typeof value === 'string' ? value.trim() : '';
}

export function validateWaitlistSubmission(payload: unknown): WaitlistValidationResult {
	if (!isRecord(payload)) {
		return {
			fieldErrors: {
				name: 'Enter your full name.',
				email: 'Enter your email address.',
				phone: 'Enter your phone number.',
				role: 'Choose how you take part in local football.',
			},
		};
	}

	const name = readString(payload.name);
	const email = readString(payload.email).toLowerCase();
	const phone = normalizePhoneToE164(readString(payload.phone));
	const role = readString(payload.role) as WaitlistRole;
	const fieldErrors: WaitlistValidationResult['fieldErrors'] = {};

	if (!name) {
		fieldErrors.name = 'Enter your full name.';
	}

	if (!email) {
		fieldErrors.email = 'Enter your email address.';
	} else if (!emailPattern.test(email)) {
		fieldErrors.email = 'Enter a valid email address.';
	}

	if (!phone) {
		fieldErrors.phone = 'Enter a valid phone number — e.g. 0801 234 5678 or +234 801 234 5678.';
	} else if (!phonePattern.test(phone)) {
		fieldErrors.phone = 'Enter a valid phone number — e.g. 0801 234 5678 or +234 801 234 5678.';
	}

	if (!role) {
		fieldErrors.role = 'Choose how you take part in local football.';
	} else if (!roleOptions.includes(role)) {
		fieldErrors.role = 'Choose a valid role.';
	}

	if (Object.keys(fieldErrors).length > 0) {
		return { fieldErrors };
	}

	return {
		data: {
			name,
			email,
			phone,
			role,
		},
		fieldErrors,
	};
}
