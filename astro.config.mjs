import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rohit.niwav.in',
  integrations: [sitemap()],
});
