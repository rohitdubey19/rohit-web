import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_TAGLINE } from '../site';
import { allPosts, postUrl } from '../posts';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    site: context.site!,
    items: posts.map(({ section, entry }) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary,
      link: postUrl(section, entry.id),
    })),
  });
}
