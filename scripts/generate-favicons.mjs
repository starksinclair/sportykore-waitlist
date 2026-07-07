/**
 * Regenerates PNG/ICO favicon fallbacks from public/favicon.svg.
 * Run: npm run favicons
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public/favicon.svg');
const svg = readFileSync(svgPath);

const outputs = [
	{ path: join(root, 'public/favicon-16x16.png'), size: 16 },
	{ path: join(root, 'public/favicon-32x32.png'), size: 32 },
	{ path: join(root, 'public/apple-touch-icon.png'), size: 180 },
	{ path: join(root, 'public/android-chrome-192x192.png'), size: 192 },
	{ path: join(root, 'public/android-chrome-512x512.png'), size: 512 },
];

for (const { path, size } of outputs) {
	await sharp(svg).resize(size, size).png().toFile(path);
	console.log(`Wrote ${path} (${size}×${size})`);
}

// Minimal ICO with embedded PNG frames (Vista+ format).
const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
writeFileSync(join(root, 'public/favicon.ico'), encodeIco([png16, png32]));
console.log(`Wrote ${join(root, 'public/favicon.ico')}`);

/** @param {Buffer[]} images */
function encodeIco(images) {
	const count = images.length;
	const headerSize = 6;
	const entrySize = 16;
	const offset = headerSize + entrySize * count;
	let dataOffset = offset;
	const entries = [];

	for (const img of images) {
		const width = img.readUInt32BE(16);
		const height = img.readUInt32BE(20);
		entries.push({
			width: width >= 256 ? 0 : width,
			height: height >= 256 ? 0 : height,
			size: img.length,
			offset: dataOffset,
			data: img,
		});
		dataOffset += img.length;
	}

	const buf = Buffer.alloc(dataOffset);
	buf.writeUInt16LE(0, 0);
	buf.writeUInt16LE(1, 2);
	buf.writeUInt16LE(count, 4);

	let entryOffset = headerSize;
	for (const entry of entries) {
		buf.writeUInt8(entry.width, entryOffset);
		buf.writeUInt8(entry.height, entryOffset + 1);
		buf.writeUInt8(0, entryOffset + 2);
		buf.writeUInt8(0, entryOffset + 3);
		buf.writeUInt16LE(1, entryOffset + 4);
		buf.writeUInt16LE(32, entryOffset + 6);
		buf.writeUInt32LE(entry.size, entryOffset + 8);
		buf.writeUInt32LE(entry.offset, entryOffset + 12);
		entryOffset += entrySize;
	}

	let bodyOffset = offset;
	for (const entry of entries) {
		entry.data.copy(buf, bodyOffset);
		bodyOffset += entry.data.length;
	}

	return buf;
}
