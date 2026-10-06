import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Self-hosted variable fonts. Astro generates metric-adjusted fallbacks for them,
// so swapping from the fallback to the web font does not shift the layout.
// Only the latin subset is served: the site content (es/ca) uses no latin-ext glyphs.
const latin = [
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+0304',
  'U+0308',
  'U+0329',
  'U+2000-206F',
  'U+20AC',
  'U+2122',
  'U+2191',
  'U+2193',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD',
];

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
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: latin,
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: latin,
          },
        ],
      },
    },
  ],
});
