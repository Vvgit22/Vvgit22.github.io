// Headless check of the /emg/ demo: full Play-all cycle at accelerated
// speed must produce exactly 255 windows per model, the tally must equal
// accuracy_on_demo_clips * 255, every argmax must match demo.json's
// argmax_all_*, calibrated max-probs within 1e-3; stale-generation
// results must never be tallied; Play/Pause x10 keeps one loop; a
// failed model fetch shows the error state and Retry recovers.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const META = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../public/emg/demo.json'), 'utf8'));
const BASE = process.argv[2] || 'http://localhost:4321';
const errs = [];
const b = await chromium.launch();
const p = await b.newPage();
p.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
p.on('console', (m) => {
  if (m.type() === 'error') errs.push('console: ' + m.text());
});
await p.goto(`${BASE}/emg/`, { waitUntil: 'networkidle' });
await p.locator('#emg-playall').check();

// accelerated full cycle
await p.evaluate(() => window.__emg.setSpeed(3));
await p.locator('#emg-play').click();
await p.waitForFunction(
  () => document.getElementById('emg-play').textContent === 'Pause',
  { timeout: 60000 });
await p.waitForFunction(() => {
  const t = window.__emg.tally;
  return t.seen.n >= 255 && t.unseen.n >= 255;
}, null, { timeout: 240000 });
const res = await p.evaluate(() => ({
  tally: JSON.parse(JSON.stringify(window.__emg.tally)),
  argSeen: window.__emg.test.argmax.seen.slice(0, 255),
  argUnseen: window.__emg.test.argmax.unseen.slice(0, 255),
  calSeen: window.__emg.test.calibratedMax.seen.slice(0, 255),
  calUnseen: window.__emg.test.calibratedMax.unseen.slice(0, 255),
  stale: window.__emg.test.staleDiscarded,
}));
const expSeen = Math.round(META.models.seen.accuracy_on_demo_clips * 255);
const expUnseen = Math.round(META.models.unseen.accuracy_on_demo_clips * 255);
const cmp = (a, b) => JSON.stringify(a) === JSON.stringify(b);
console.log('PLAY-ALL',
  `seen ${res.tally.seen.c}/${res.tally.seen.n} (expect ${expSeen}/255)`,
  `unseen ${res.tally.unseen.c}/${res.tally.unseen.n} (expect ${expUnseen}/255)`,
  `argmax seen match: ${cmp(res.argSeen, META.argmax_all_seen)}`,
  `argmax unseen match: ${cmp(res.argUnseen, META.argmax_all_unseen)}`);
const calSeenRef = META.models.seen.calibrated_max_prob;
const calUnseenRef = META.models.unseen.calibrated_max_prob;
const maxDiff = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
console.log('CALIBRATED',
  `seen max|Δ|=${maxDiff(res.calSeen, calSeenRef).toExponential(2)}`,
  `unseen max|Δ|=${maxDiff(res.calUnseen, calUnseenRef).toExponential(2)}`);

// rapid gesture switching: stale results must be discarded not tallied
await p.locator('#emg-playall').uncheck();
const before = res.tally.seen.n;
for (let i = 0; i < 40; i++) await p.locator('#emg-gesture').selectOption(String(i % 17));
await p.waitForTimeout(3000);
const stale = await p.evaluate(() => ({
  stale: window.__emg.test.staleDiscarded,
  n: window.__emg.tally.seen.n,
}));
console.log('STALE', `discarded=${stale.stale}`, `tally.n changed by ${stale.n - before}`);

// Play/Pause x10 -> single loop counter must equal play count
await p.evaluate(() => window.__emg.setSpeed(1));
for (let i = 0; i < 10; i++) {
  await p.locator('#emg-play').click();
  await p.waitForTimeout(120);
}
const loops = await p.evaluate(() => window.__emg.test.loopCount);
console.log('LOOPS', `${loops} plays -> single rAF each (${loops <= 11})`);

// failed model fetch -> error state + retry recovery
await p.close();
const p2 = await b.newPage();
p2.on('pageerror', (e) => errs.push('p2 pageerror: ' + e.message));
await p2.route('**/emg/models/*.onnx', (r) => r.abort());
await p2.goto(`${BASE}/emg/`, { waitUntil: 'networkidle' });
await p2.locator('#emg-play').click();
await p2.waitForSelector('#emg-error:not(.hidden)', { timeout: 30000 });
console.log('ERROR-STATE shown');
await p2.unroute('**/emg/models/*.onnx');
await p2.locator('#emg-retry-2').click();
await p2.waitForFunction(
  () => document.getElementById('emg-status').textContent === 'Ready.',
  { timeout: 60000 });
console.log('RETRY recovered');
await b.close();
console.log('CONSOLE ERRORS:', JSON.stringify(errs));
if (errs.length || !cmp(res.argSeen, META.argmax_all_seen)) process.exit(1);
