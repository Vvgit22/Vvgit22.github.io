import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const mediaDir = join(process.cwd(), 'public/media');

function files(): string[] {
  try {
    return readdirSync(mediaDir);
  } catch {
    return [];
  }
}

export function mediaExists(name: string): boolean {
  return files().includes(name);
}

export function mediaMatching(pattern: RegExp): string[] {
  return files()
    .filter((f) => pattern.test(f))
    .sort()
    .map((f) => `/media/${f}`);
}

export const requestPhotos = () =>
  mediaMatching(/^request-photo-[123]\.(jpg|webp)$/);
export const polaronExtras = () =>
  mediaMatching(/^polaron-extra-.+\.(png|jpg|webp)$/);
export const portrait = () =>
  mediaMatching(/^portrait\.(jpg|webp)$/)[0] ?? null;
