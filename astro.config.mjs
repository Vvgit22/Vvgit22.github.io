// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return (
          path !== '/request/' &&
          !path.startsWith('/portfolio-office') &&
          !path.startsWith('/polaron/results')
        );
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
