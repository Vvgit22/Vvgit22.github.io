import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['live', 'video', 'in-progress', 'upcoming', 'card']),
    statusLabel: z.string(),
    period: z.string(),
    role: z.string(),
    team: z.string().optional(),
    tags: z.array(z.string()),
    links: z
      .object({
        repo: z.string().url().optional(),
        demo: z.string().optional(),
        video: z.string().optional(),
      })
      .optional(),
    thumbnail: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
