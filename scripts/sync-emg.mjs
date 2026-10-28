// Copies the EMG demo bundle from the emg-gesture-decoder repo into the
// portfolio. EMG_REPO env var overrides the source path.
//   node scripts/sync-emg.mjs
import { cpSync, copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const EMG = process.env.EMG_REPO ?? '/Users/raduvadanici/Projects/emg-gesture-decoder';
const SITE = join(EMG, 'artifacts/site');
const OUT = 'public/emg';

mkdirSync(join(OUT, 'models'), { recursive: true });
mkdirSync(join(OUT, 'figures'), { recursive: true });
mkdirSync(join(OUT, 'ort'), { recursive: true });
mkdirSync('src/data', { recursive: true });

for (const f of ['demo.bin', 'demo.json']) copyFileSync(join(SITE, f), join(OUT, f));
for (const f of ['seen.onnx', 'seen.meta.json', 'unseen.onnx', 'unseen.meta.json'])
  copyFileSync(join(SITE, 'models', f), join(OUT, 'models', f));
copyFileSync(join(SITE, 'results.json'), 'src/data/emg-results.json');
copyFileSync(join(SITE, 'demo.json'), 'src/data/emg-demo.json');
try { copyFileSync(join(SITE, 'summary.json'), 'src/data/emg-summary.json'); } catch {}
try { copyFileSync(join(EMG, 'artifacts/experiments/causal_v1/timing.json'), 'src/data/emg-timing.json'); } catch {}

// ONNX Runtime wasm backend (runtime, not our asset budget): ORT 1.30's
// wasm backend loads the jsep build; copied from node_modules so the
// pinned package version decides which files ship.
const ORT = 'node_modules/onnxruntime-web/dist';
for (const f of ['ort-wasm-simd-threaded.jsep.mjs', 'ort-wasm-simd-threaded.jsep.wasm'])
  copyFileSync(join(ORT, f), join(OUT, 'ort', f));

console.log(`emg assets synced from ${SITE}`);
