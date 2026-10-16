/**
 * The local-business vertical (barber shops, salons, beauty centres, sports clubs) keeps its own
 * prefix, navigation and SEO so it does not dilute the full-stack positioning at the root.
 * It is Spanish-only: this audience is local, so these routes are not translated.
 */
export const localBusinessRoutes = {
  home: '/negocios-locales/',
  examples: '/negocios-locales/ejemplos/',
  blog: '/negocios-locales/blog/',
  clubs: '/negocios-locales/clubes/',
  demoBarbershop: '/negocios-locales/demos/taller-33/',
  blogFeed: '/negocios-locales/blog/rss.xml',
} as const;

/** Nav shown on the vertical's pages, instead of the full-stack navigation. */
export const localBusinessNav = [
  { href: localBusinessRoutes.examples, label: 'Ejemplos' },
  { href: localBusinessRoutes.clubs, label: 'Clubes' },
  { href: localBusinessRoutes.blog, label: 'Blog' },
] as const;

export function localBusinessPostPath(id: string): string {
  return `${localBusinessRoutes.blog}${id}/`;
}
