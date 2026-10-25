import { getCollection } from 'astro:content';
import { SECTIONS, type Section } from './site';

export async function allPosts() {
  const lists = await Promise.all(
    (Object.keys(SECTIONS) as Section[]).map(async (section) =>
      (await getCollection(section, ({ data }) => !data.draft)).map((entry) => ({ section, entry })),
    ),
  );
  return lists.flat().sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}

export const postUrl = (section: Section, id: string) => `/${section}/${id.replace(/\/index$/, '')}/`;
