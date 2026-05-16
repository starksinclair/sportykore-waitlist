import type { APIRoute } from 'astro';
import { appendWaitlistRow } from '../../lib/google-sheets';
import { validateWaitlistSubmission } from '../../lib/waitlist';

export const prerender = false;

function json(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});
}

export const POST: APIRoute = async ({ request, url }) => {
	let payload: unknown;

	try {
		payload = await request.json();
	} catch {
		return json(
			{
				ok: false,
				fieldErrors: {},
				formError: 'We could not read your submission. Please try again.',
			},
			400,
		);
	}

	const validation = validateWaitlistSubmission(payload);

	if (!validation.data) {
		return json(
			{
				ok: false,
				fieldErrors: validation.fieldErrors,
			},
			400,
		);
	}

	try {
		const source = url.hostname === 'localhost' ? 'waitlist.sportykore.com' : url.host;
		await appendWaitlistRow(validation.data, source);
	} catch (error) {
		console.error('Failed to append waitlist row', error);

		return json(
			{
				ok: false,
				fieldErrors: {},
				formError: 'We could not join you to the waitlist right now. Please try again shortly.',
			},
			500,
		);
	}

	return json({
		ok: true,
		redirectTo: '/thanks',
	});
};

export const ALL: APIRoute = () =>
	json(
		{
			ok: false,
			fieldErrors: {},
			formError: 'Method not allowed.',
		},
		405,
	);
