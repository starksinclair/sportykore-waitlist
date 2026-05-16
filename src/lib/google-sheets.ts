import { google } from 'googleapis';
import type { WaitlistSubmission } from './waitlist';

function readRequiredEnv(name: string): string {
	const value = import.meta.env[name];

	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}

	return value;
}

interface ServiceAccountCredentials {
	client_email: string;
	private_key: string;
}

function getServiceAccountCredentials(): ServiceAccountCredentials {
	const bundled = import.meta.env.GOOGLE_SERVICE_ACCOUNT;

	if (bundled && typeof bundled === 'string') {
		let parsed: unknown;
		try {
			parsed = JSON.parse(bundled.trim()) as Record<string, unknown>;
		} catch {
			throw new Error(
				'GOOGLE_SERVICE_ACCOUNT must be valid JSON (paste the full Google Cloud service account key object).',
			);
		}

		const client_email =
			typeof parsed === 'object' && parsed !== null && 'client_email' in parsed
				? String((parsed as ServiceAccountCredentials).client_email)
				: '';
		const private_key =
			typeof parsed === 'object' && parsed !== null && 'private_key' in parsed
				? String((parsed as ServiceAccountCredentials).private_key).replace(/\\n/g, '\n')
				: '';

		if (!client_email || !private_key) {
			throw new Error(
				'GOOGLE_SERVICE_ACCOUNT JSON must include client_email and private_key.',
			);
		}

		return { client_email, private_key };
	}

	const client_email = readRequiredEnv('GOOGLE_CLIENT_EMAIL');
	const private_key = readRequiredEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');

	return { client_email, private_key };
}

export async function appendWaitlistRow(submission: WaitlistSubmission, source: string) {
	const { client_email, private_key } = getServiceAccountCredentials();
	const spreadsheetId = readRequiredEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
	const sheetName = readRequiredEnv('GOOGLE_SHEETS_SHEET_NAME');

	const auth = new google.auth.JWT({
		email: client_email,
		key: private_key,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	await sheets.spreadsheets.values.append({
		spreadsheetId,
		range: `${sheetName}!A:F`,
		valueInputOption: 'USER_ENTERED',
		insertDataOption: 'INSERT_ROWS',
		requestBody: {
			values: [
				[
					new Date().toISOString(),
					submission.name,
					submission.email,
					submission.phone,
					submission.role,
					source,
				],
			],
		},
	});
}
