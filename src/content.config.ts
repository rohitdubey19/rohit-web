import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One collection per section. Each post is content/<section>/<slug>/index.md (images beside it)
// or content/<section>/<slug>.md. Sources and what they may send: SOURCES.md.
const post = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string().optional(),
  source: z.string(), // owner project, as listed in SOURCES.md
  draft: z.boolean().default(false),
});

const section = (name: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./content/${name}` }),
    schema: post,
  });

export const collections = {
  travel: section('travel'),
  writing: section('writing'),
  notes: section('notes'),
};
