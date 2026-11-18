import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Jordi Sánchez'),
    category: z.string(),
    // `local` belongs to the negocios-locales vertical (/negocios-locales/blog/).
    // `general` belongs to the full-stack brand blog (/notas/). Defaults to `local`
    // so the existing vertical posts keep working without a frontmatter change.
    section: z.enum(['general', 'local']).default('local'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
