import { normalizePhoneToE164 } from './phone';

export const roleOptions = [
	'fan',
	'organizer',
	'player',
	'coach',
	'academy',
	'club',
	'school',
	'other',
] as const;

export type ContactRole = (typeof roleOptions)[number];

export interface ContactSubmission {
	name: string;
	email: string;
	phone: string;
	role: ContactRole;
	message: string;
}

export interface ContactValidationResult {
	data?: ContactSubmission;
	fieldErrors: Partial<Record<keyof ContactSubmission, string>>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+[1-9]\d{7,14}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function readString(value: unknown) {
	return typeof value === 'string' ? value.trim() : '';
}

export function validateContactSubmission(payload: unknown): ContactValidationResult {
	if (!isRecord(payload)) {
		return {
			fieldErrors: {
				name: 'Enter your full name.',
				email: 'Enter your email address.',
				phone: 'Enter your phone number.',
				role: 'Choose how you take part in local football.',
				message: 'Tell us what you need help with.',
			},
		};
	}

	const name = readString(payload.name);
	const email = readString(payload.email).toLowerCase();
	const phone = normalizePhoneToE164(readString(payload.phone));
	const role = readString(payload.role) as ContactRole;
	const message = readString(payload.message);
	const fieldErrors: ContactValidationResult['fieldErrors'] = {};

	if (!name) {
		fieldErrors.name = 'Enter your full name.';
	}

	if (!email) {
		fieldErrors.email = 'Enter your email address.';
	} else if (!emailPattern.test(email)) {
		fieldErrors.email = 'Enter a valid email address.';
	}

	if (!phone) {
		fieldErrors.phone = 'Enter a valid phone number, e.g. 0803 123 4567.';
	} else if (!phonePattern.test(phone)) {
		fieldErrors.phone = 'Enter a valid phone number, e.g. 0803 123 4567.';
	}

	if (!role) {
		fieldErrors.role = 'Choose how you take part in local football.';
	} else if (!roleOptions.includes(role)) {
		fieldErrors.role = 'Choose a valid role.';
	}

	if (!message) {
		fieldErrors.message = 'Tell us what you need help with.';
	} else if (message.length > 1200) {
		fieldErrors.message = 'Keep your message under 1,200 characters.';
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
			message,
		},
		fieldErrors,
	};
}
