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
  thanks: { es: '/gracias/', en: '/en/thanks/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export function getLocale(currentLocale: string | undefined): Locale {
  return currentLocale === 'en' ? 'en' : defaultLocale;
}

export function localePath(route: RouteKey, locale: Locale): string {
  return routes[route][locale];
}

/** Translated counterparts of a pathname, or undefined when the page only exists in one language. */
export function alternatesFor(pathname: string): Record<Locale, string> | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return Object.values(routes).find((route) => route.es === normalized || route.en === normalized);
}

export const htmlLang: Record<Locale, string> = { es: 'es', en: 'en' };
export const ogLocale: Record<Locale, string> = { es: 'es_ES', en: 'en_GB' };
