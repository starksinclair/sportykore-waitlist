import { google } from 'googleapis';
import type { WaitlistSubmission } from './waitlist';
import { envServer, requireEnvServer } from './server-env';

interface ServiceAccountCredentials {
	client_email: string;
	private_key: string;
}

function parseServiceAccountJson(raw: string): ServiceAccountCredentials {
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw.trim());
	} catch {
		throw new Error(
			'Service account credential must be valid JSON (paste the full Google Cloud key object, use Base64 on Vercel if quotes break).',
		);
	}

	if (typeof parsed !== 'object' || parsed === null) {
		throw new Error('Service account credential JSON must be an object.');
	}

	const client_email = 'client_email' in parsed ? String((parsed as ServiceAccountCredentials).client_email) : '';
	const private_key = 'private_key' in parsed ? String((parsed as ServiceAccountCredentials).private_key) : '';

	if (!client_email || !private_key) {
		throw new Error('Service account JSON must include client_email and private_key.');
	}

	return {
		client_email,
		private_key: private_key.replace(/\\n/g, '\n'),
	};
}

function getServiceAccountCredentials(): ServiceAccountCredentials {
	const base64Payload = envServer('GOOGLE_SERVICE_ACCOUNT_BASE64');
	if (base64Payload) {
		let decoded: string;
		try {
			decoded = Buffer.from(base64Payload.trim(), 'base64').toString('utf8');
		} catch {
			throw new Error('GOOGLE_SERVICE_ACCOUNT_BASE64 is not valid Base64.');
		}
		return parseServiceAccountJson(decoded);
	}

	const jsonPayload = envServer('GOOGLE_SERVICE_ACCOUNT');
	if (jsonPayload) {
		return parseServiceAccountJson(jsonPayload);
	}

	const client_email = requireEnvServer('GOOGLE_CLIENT_EMAIL');
	const private_key = requireEnvServer('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');

	return { client_email, private_key };
}

export async function appendWaitlistRow(submission: WaitlistSubmission, source: string) {
	const { client_email, private_key } = getServiceAccountCredentials();
	const spreadsheetId = requireEnvServer('GOOGLE_SHEETS_SPREADSHEET_ID');
	const sheetName = requireEnvServer('GOOGLE_SHEETS_SHEET_NAME');

	const auth = new google.auth.JWT({
		email: client_email,
		key: private_key,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	await sheets.spreadsheets.values.append({
		spreadsheetId,
		range: `'${sheetName.replace(/'/g, "''")}'!A:F`,
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
