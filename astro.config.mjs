import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.jordisanchezweb.es',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        page !== 'https://www.jordisanchezweb.es/gracias/' &&
        !page.startsWith('https://www.jordisanchezweb.es/demos/'),
      namespaces: {
        news: false,
        video: false,
        xhtml: false,
      },
    }),
  ],
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
