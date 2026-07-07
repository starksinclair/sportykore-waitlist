/**
 * Regenerates public/og/og-default.png (1200×630) from brand copy + matchday card.
 * Run: npm run og:image
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;

const CARD_CROP = { left: 205, top: 98, width: 990, height: 465 };
const CARD_TARGET_WIDTH = 700;

const paths = {
	pacifico: join(root, 'public/fonts/pacifico-400.woff2'),
	playfair: join(root, 'public/fonts/playfair-var.woff2'),
	openSans: join(root, 'public/fonts/open-sans-var.woff2'),
	cardSource: join(root, 'public/og/matchday-card-source.png'),
	output: join(root, 'public/og/og-default.png'),
};

function fontDataUrl(filePath) {
	const buf = readFileSync(filePath);
	return `data:application/font-woff2;base64,${buf.toString('base64')}`;
}

function buildBackgroundSvg() {
	return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purpleWash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2c0c54" stop-opacity="0.5"/>
      <stop offset="65%" stop-color="#121212" stop-opacity="1"/>
    </linearGradient>
    <pattern id="stripes" width="28.28" height="28.28" patternUnits="userSpaceOnUse" patternTransform="rotate(-45 0 0)">
      <rect width="18" height="28.28" fill="#121212"/>
      <rect x="18" width="2" height="28.28" fill="#e6a817" fill-opacity="0.05"/>
      <rect x="20" width="8.28" height="28.28" fill="#121212"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#121212"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#stripes)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#purpleWash)"/>
</svg>`;
}

function buildTextSvg(fonts) {
	const { pacifico, playfair, openSans } = fonts;

	return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Pacifico';
        src: url('${pacifico}') format('woff2');
        font-weight: 400;
      }
      @font-face {
        font-family: 'Playfair';
        src: url('${playfair}') format('woff2');
        font-weight: 700;
      }
      @font-face {
        font-family: 'OpenSans';
        src: url('${openSans}') format('woff2');
        font-weight: 700;
      }
    </style>
  </defs>
  <text
    x="600"
    y="42"
    text-anchor="middle"
    fill="#FBE9B8"
    font-family="OpenSans, sans-serif"
    font-size="13"
    font-weight="700"
    letter-spacing="3.2"
  >LOOKING AFTER THE LITTLE MAN</text>
  <text
    x="600"
    y="108"
    text-anchor="middle"
    fill="#E6A817"
    font-family="Pacifico, cursive"
    font-size="62"
  >Sportykore</text>
  <text
    x="600"
    y="152"
    text-anchor="middle"
    fill="rgba(255,255,255,0.88)"
    font-family="Playfair, serif"
    font-size="26"
    font-weight="700"
  >Where local competitions gather.</text>
</svg>`;
}

async function main() {
	const fonts = {
		pacifico: fontDataUrl(paths.pacifico),
		playfair: fontDataUrl(paths.playfair),
		openSans: fontDataUrl(paths.openSans),
	};

	const background = await sharp(Buffer.from(buildBackgroundSvg())).png().toBuffer();

	const cardMeta = await sharp(paths.cardSource)
		.extract(CARD_CROP)
		.resize({ width: CARD_TARGET_WIDTH })
		.png()
		.toBuffer({ resolveWithObject: true });

	const cardTop = 168;
	const cardLeft = Math.round((WIDTH - cardMeta.info.width) / 2);

	const text = await sharp(Buffer.from(buildTextSvg(fonts))).png().toBuffer();

	await sharp(background)
		.composite([
			{ input: cardMeta.data, top: cardTop, left: cardLeft },
			{ input: text, top: 0, left: 0 },
		])
		.png()
		.toFile(paths.output);

	const outMeta = await sharp(paths.output).metadata();
	console.log(`Wrote ${paths.output} (${outMeta.width}×${outMeta.height})`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
