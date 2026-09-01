/**
 * Generates static assets for /download:
 * - public/download-qr.svg
 * - public/og/og-download.png
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const downloadUrl = 'https://sportykore.com/download';

const paths = {
	pacifico: join(root, 'public/fonts/pacifico-400.woff2'),
	playfair: join(root, 'public/fonts/playfair-var.woff2'),
	openSans: join(root, 'public/fonts/open-sans-var.woff2'),
	qr: join(root, 'public/download-qr.svg'),
	og: join(root, 'public/og/og-download.png'),
};

function fontDataUrl(filePath) {
	const buf = readFileSync(filePath);
	return `data:application/font-woff2;base64,${buf.toString('base64')}`;
}

function buildOgSvg(fonts) {
	return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'Pacifico'; src: url('${fonts.pacifico}') format('woff2'); font-weight: 400; }
      @font-face { font-family: 'Playfair'; src: url('${fonts.playfair}') format('woff2'); font-weight: 800; }
      @font-face { font-family: 'OpenSans'; src: url('${fonts.openSans}') format('woff2'); font-weight: 700; }
    </style>
    <linearGradient id="purpleWash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2C0C54"/>
      <stop offset="55%" stop-color="#121212"/>
      <stop offset="100%" stop-color="#3B1070"/>
    </linearGradient>
    <pattern id="stripes" width="28.28" height="28.28" patternUnits="userSpaceOnUse" patternTransform="rotate(-45 0 0)">
      <rect width="18" height="28.28" fill="#121212"/>
      <rect x="18" width="2" height="28.28" fill="#E6A817" fill-opacity="0.07"/>
      <rect x="20" width="8.28" height="28.28" fill="#121212"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#purpleWash)"/>
  <rect width="1200" height="630" fill="url(#stripes)" opacity="0.95"/>
  <circle cx="998" cy="178" r="126" fill="#E6A817" opacity="0.14"/>
  <rect x="80" y="86" width="1040" height="458" rx="42" fill="#F8F8FA" opacity="0.05" stroke="#F8F8FA" stroke-opacity="0.12"/>
  <text x="120" y="160" fill="#E6A817" font-family="Pacifico, cursive" font-size="58">Sportykore</text>
  <text x="120" y="234" fill="#FBE9B8" font-family="OpenSans, sans-serif" font-size="18" letter-spacing="4">GET THE APP</text>
  <text x="120" y="312" fill="#FFFFFF" font-family="Playfair, serif" font-size="62" font-weight="800">Run your league</text>
  <text x="120" y="382" fill="#FFFFFF" font-family="Playfair, serif" font-size="62" font-weight="800">from your phone.</text>
  <text x="122" y="446" fill="#FFFFFF" fill-opacity="0.72" font-family="OpenSans, sans-serif" font-size="24">Live scores, standings, match tools, and player profiles.</text>
  <rect x="824" y="228" width="220" height="64" rx="18" fill="#F2A900"/>
  <text x="934" y="269" text-anchor="middle" fill="#171717" font-family="OpenSans, sans-serif" font-size="20" font-weight="700">Download now</text>
  <text x="824" y="336" fill="#FFFFFF" fill-opacity="0.72" font-family="OpenSans, sans-serif" font-size="21">sportykore.com/download</text>
</svg>`;
}

async function main() {
	mkdirSync(join(root, 'public/og'), { recursive: true });

	const qrSvg = await QRCode.toString(downloadUrl, {
		type: 'svg',
		errorCorrectionLevel: 'M',
		margin: 2,
		color: {
			dark: '#2C0C54',
			light: '#F8F8FA',
		},
	});
	writeFileSync(paths.qr, qrSvg);

	const fonts = {
		pacifico: fontDataUrl(paths.pacifico),
		playfair: fontDataUrl(paths.playfair),
		openSans: fontDataUrl(paths.openSans),
	};

	await sharp(Buffer.from(buildOgSvg(fonts))).png().toFile(paths.og);
	console.log(`Wrote ${paths.qr}`);
	console.log(`Wrote ${paths.og}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

