/**
 * The general blog (`/notas/`) is the full-stack brand's own publication: evergreen notes on
 * building and securing web apps, meant to attract search traffic to the core positioning.
 * It is Spanish-only and separate from the local-business vertical's blog, which lives under
 * `/negocios-locales/blog/`. Posts are told apart by the `section` field of the shared collection.
 */
export const notesRoutes = {
  index: '/notas/',
  feed: '/notas/rss.xml',
} as const;

export function notePostPath(id: string): string {
  return `${notesRoutes.index}${id}/`;
}
