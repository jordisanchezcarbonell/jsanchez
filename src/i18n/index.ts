export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Pages that exist in both languages. Spanish-only pages (clubs, blog, legal) are not listed. */
export const routes = {
  home: { es: '/', en: '/en/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  services: { es: '/servicios/', en: '/en/services/' },
  about: { es: '/sobre-mi/', en: '/en/about/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  cv: { es: '/cv/', en: '/en/cv/' },
  thanks: { es: '/gracias/', en: '/en/thanks/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export function getLocale(currentLocale: string | undefined): Locale {
  return currentLocale === 'en' ? 'en' : defaultLocale;
}

export function localePath(route: RouteKey, locale: Locale): string {
  return routes[route][locale];
}

/** Localized path of a single project case study, nested under the projects route. */
export function projectPath(slug: string, locale: Locale): string {
  return `${routes.projects[locale]}${slug}/`;
}

/** The slug of a project case study pathname, or undefined when it is not one. */
function projectSlugFrom(normalized: string): string | undefined {
  for (const locale of locales) {
    const base = routes.projects[locale];
    if (!normalized.startsWith(base) || normalized === base) continue;

    const slug = normalized.slice(base.length, -1);
    if (slug && !slug.includes('/')) return slug;
  }

  return undefined;
}

/** Translated counterparts of a pathname, or undefined when the page only exists in one language. */
export function alternatesFor(pathname: string): Record<Locale, string> | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const staticRoute = Object.values(routes).find(
    (route) => route.es === normalized || route.en === normalized,
  );
  if (staticRoute) return staticRoute;

  // Case studies are generated from the same data in both languages, so they always pair up.
  const slug = projectSlugFrom(normalized);
  return slug ? { es: projectPath(slug, 'es'), en: projectPath(slug, 'en') } : undefined;
}

export const htmlLang: Record<Locale, string> = { es: 'es', en: 'en' };
export const ogLocale: Record<Locale, string> = { es: 'es_ES', en: 'en_GB' };
