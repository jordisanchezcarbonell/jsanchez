import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { notePostPath, notesRoutes } from '../../data/blog';

const site = 'https://www.jordisanchezweb.es';
const feedPath = notesRoutes.feed;
const channelTitle = 'Notas — Jordi Sánchez';
const channelDescription =
  'Notas prácticas sobre construir y proteger aplicaciones web y móviles: seguridad, APIs, React, Next.js y NestJS.';

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
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.section === 'general')).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const items = posts
    .map((post) => {
      const url = `${site}${notePostPath(post.id)}`;

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
    <link>${site}${notesRoutes.index}</link>
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
