import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { localBusinessPostPath, localBusinessRoutes } from '../../../data/local-business';

const site = 'https://www.jordisanchezweb.es';
const feedPath = `${localBusinessRoutes.blog}rss.xml`;
const channelTitle = 'Blog · Negocios locales — Jordi Sánchez';
const channelDescription =
  'Guías prácticas sobre páginas web, reservas online y SEO local para negocios que viven de su agenda.';

/** Escapes the five XML entities so post copy cannot break the feed. */
function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const items = posts
    .map((post) => {
      const url = `${site}${localBusinessPostPath(post.id)}`;

      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <category>${escapeXml(post.data.category)}</category>
      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const lastBuildDate = posts[0]?.data.publishDate.toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${site}${localBusinessRoutes.blog}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>es-ES</language>${lastBuildDate ? `\n    <lastBuildDate>${lastBuildDate}</lastBuildDate>` : ''}
    <atom:link href="${site}${feedPath}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
