# vvgit22.github.io

Personal portfolio of Vadim Vadanici — static Astro site on GitHub Pages.

- `npm install` then `npm run dev` to work locally; `npm run build` for a production build.
- To add a project: drop a `.md` file in `src/content/projects/` (see the schema in `src/content.config.ts`) and add a thumbnail in `public/thumbs/`.
- CV PDFs live in `public/cv/`; update them there.
- Push to `main` deploys via `.github/workflows/deploy.yml` to https://vvgit22.github.io.
