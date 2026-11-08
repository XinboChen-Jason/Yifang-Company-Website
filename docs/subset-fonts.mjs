// Run manually only when approved public copy changes. No site text leaves this machine.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import subsetFont from 'subset-font';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const source = await readFile('src/data/site.ts', 'utf8') + await readFile('src/pages/index.astro', 'utf8');
const ascii = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 /&.,—·→↓';
const text = [...new Set((source.match(/[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/gu) || []).join('') + ascii)].sort().join('');
const fonts = [
  { family: 'Noto Sans SC', licenseSourceSha256: '1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9', name: 'noto-sans-sc-subset', commit: '2894aab31764f10f29c421bdfd2340d3b382d384', directory: 'notosanssc', file: 'NotoSansSC[wght].ttf', blob: 'fb0637bafbcd804fe32152370a1225990745b4bc', text },
  { family: 'Inter', licenseSourceSha256: '5b9321a4298cfeb6b34354164a1c3afc3db114569984c502b9b35d988fd58c57', name: 'inter-subset', commit: 'e1d6480102fed30739fead0faee463101f892c8f', directory: 'inter', file: 'Inter[opsz,wght].ttf', blob: '047c92f6e2212473dc436020afed689527076d44', text: ascii },
];
await mkdir('public/fonts', { recursive: true });
const records = [];
for (const font of fonts) {
  const root = `https://raw.githubusercontent.com/google/fonts/${font.commit}/ofl/${font.directory}/`;
  const url = root + encodeURIComponent(font.file);
  const local = process.argv.includes('--local-source');
  const response = local ? null : await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (response && !response.ok) throw Error(`Public font download failed: ${response.status}`);
  const original = local ? await readFile('docs/font-source/' + (font.family === 'Inter' ? 'inter.ttf' : 'noto.ttf')) : Buffer.from(await response.arrayBuffer());
  const gitBlob = createHash('sha1').update(`blob ${original.length}\0`).update(original).digest('hex');
  if (gitBlob !== font.blob) throw Error('Font differs from verified public Git blob.');
  const bytes = await subsetFont(original, font.text, { targetFormat: 'woff2', variationAxes: { wght: { min: 400, max: 700 }, ...(font.family === 'Inter' ? { opsz: 14 } : {}) }, preserveNameIds: [0, 7, 8, 9, 13, 14] });
  const licenseResponse = local ? null : await fetch(root + 'OFL.txt', { signal: AbortSignal.timeout(30000) });
  if (licenseResponse && !licenseResponse.ok) throw Error('Public OFL download failed.');
  const licenseInput = local ? await readFile('public/fonts/' + font.name + '-OFL.txt') : Buffer.from(await licenseResponse.arrayBuffer());
  if (!local && hash(licenseInput) !== font.licenseSourceSha256) throw Error('OFL differs from pinned source.');
  // Whitespace normalization only; all copyright and OFL terms remain intact.
  const license = Buffer.from(licenseInput.toString('utf8').replace(/[ \t]+$/gm, '').replace(/\r\n/g, '\n'));
  const path = `public/fonts/${font.name}.woff2`, licensePath = `public/fonts/${font.name}-OFL.txt`;
  await writeFile(path, bytes);
  await writeFile(licensePath, license);
  records.push({ family: font.family, path, bytes: bytes.length, sha256: hash(bytes), source: url, sourceSha256: hash(original), sourceGitBlob: gitBlob, characters: font.text, license: { path: licensePath, source: root + 'OFL.txt', sourceSha256: font.licenseSourceSha256, sha256: hash(license) } });
}
await writeFile('docs/font-assets.json', JSON.stringify({ schemaVersion: 1, generator: 'subset-font@2.4.0 / local HarfBuzz WASM; retains OFL names and notices', fonts: records }, null, 2) + '\n');
console.log(records.map(({ family, bytes, sha256 }) => ({ family, bytes, sha256 })));
