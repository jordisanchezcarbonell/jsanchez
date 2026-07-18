import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jordisanchezweb.es',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://jordisanchezweb.es/gracias/',
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
