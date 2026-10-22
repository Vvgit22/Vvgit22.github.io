import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../public/media');
const files = existsSync(dir) ? readdirSync(dir) : [];
const size = (f) => (existsSync(join(dir, f)) ? statSync(join(dir, f)).size : null);
const mb = (b) => (b == null ? '—' : (b / 1e6).toFixed(2) + ' MB');

const slots = [
  ['Job OS walkthrough', ['job-os-demo.mp4', 'job-os-demo-poster.webp']],
  ['Polaron pitch', ['polaron-pitch.mp4', 'polaron-pitch-poster.webp']],
  ['ReQuest game video', ['request-game.mp4', 'request-game-poster.webp']],
  [
    'ReQuest hardware photos',
    ['request-photo-1.jpg', 'request-photo-1.webp', 'request-photo-2.jpg', 'request-photo-2.webp', 'request-photo-3.jpg', 'request-photo-3.webp'],
  ],
  ['Home portrait', ['portrait.jpg', 'portrait.webp']],
];

console.log('Media slots (public/media):\n');
for (const [name, candidates] of slots) {
  const present = candidates.filter((f) => files.includes(f));
  console.log(` ${name}: ${present.length ? 'present — ' + present.map((f) => `${f} (${mb(size(f))})`).join(', ') : 'missing'}`);
}
const extras = files.filter((f) => /^polaron-extra-.+\.(png|jpg|webp)$/.test(f));
console.log(` Polaron extra figures: ${extras.length ? extras.map((f) => `${f} (${mb(size(f))})`).join(', ') : 'none'}`);

const LIMIT = 25e6;
let fail = false;
for (const f of files) {
  if (f === 'README.md') continue;
  const s = size(f);
  if (s > LIMIT) {
    console.error(`\nOVER LIMIT: ${f} is ${mb(s)} (max 25 MB)`);
    fail = true;
  }
}
process.exit(fail ? 1 : 0);
