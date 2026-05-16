import { google } from 'googleapis';
import type { WaitlistSubmission } from './waitlist';

function readRequiredEnv(name: string) {
	const value = import.meta.env[name];

	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}

	return value;
}

export async function appendWaitlistRow(submission: WaitlistSubmission, source: string) {
	const clientEmail = readRequiredEnv('GOOGLE_CLIENT_EMAIL');
	const privateKey = readRequiredEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');
	const spreadsheetId = readRequiredEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
	const sheetName = readRequiredEnv('GOOGLE_SHEETS_SHEET_NAME');

	const auth = new google.auth.JWT({
		email: clientEmail,
		key: privateKey,
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
