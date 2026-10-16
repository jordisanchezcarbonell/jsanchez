import type { Locale } from '../i18n';

export interface StackGroup {
  title: string;
  items: string[];
}

export interface EducationItem {
  /** Year and institution, shown as the entry's meta line. */
  meta: string;
  name: string;
}

/**
 * Education and tooling, shared by the about page and the CV so a change lands in both.
 * Only verified items belong here.
 */
const stackGroups: Record<Locale, StackGroup[]> = {
  es: [
    { title: 'Frontend y móvil', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Expo', 'Angular', 'Sass', 'CSS'] },
    { title: 'Backend y contenido', items: ['Node.js', 'NestJS', 'APIs REST', 'Strapi', 'Drupal 7/8', 'Autenticación'] },
    { title: 'Calidad y entrega', items: ['Jest', 'Selenium', 'New Relic', 'Docker', 'CI/CD', 'Testing', 'Bug fixing'] },
    { title: 'Integraciones', items: ['SAP', 'Pagos', '3D Secure', 'CMS headless', 'Python', 'Automatización'] },
  ],
  en: [
    { title: 'Frontend and mobile', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Expo', 'Angular', 'Sass', 'CSS'] },
    { title: 'Backend and content', items: ['Node.js', 'NestJS', 'REST APIs', 'Strapi', 'Drupal 7/8', 'Authentication'] },
    { title: 'Quality and delivery', items: ['Jest', 'Selenium', 'New Relic', 'Docker', 'CI/CD', 'Testing', 'Bug fixing'] },
    { title: 'Integrations', items: ['SAP', 'Payments', '3D Secure', 'Headless CMS', 'Python', 'Automation'] },
  ],
};

const education: Record<Locale, EducationItem[]> = {
  es: [
    { meta: '2020 · Centro de Estudios Politécnicos', name: 'Desarrollo de Aplicaciones Web' },
    { meta: '2020 · Centro de Estudios Politécnicos', name: 'Desarrollo de Aplicaciones Multiplataforma' },
    { meta: 'Cisco', name: 'Certificación en Ethical Hacking' },
  ],
  en: [
    { meta: '2020 · Centro de Estudios Politécnicos', name: 'Web Application Development (vocational higher diploma)' },
    { meta: '2020 · Centro de Estudios Politécnicos', name: 'Multiplatform Application Development (vocational higher diploma)' },
    { meta: 'Cisco', name: 'Ethical Hacking certification' },
  ],
};

const profileCopy: Record<Locale, string[]> = {
  es: [
    'Trabajo bien en el punto donde se encuentran producto, frontend y sistemas. Puedo construir una interfaz, entender el contrato de una API, seguir un error entre servicios y acompañar una funcionalidad hasta producción.',
    'Mi experiencia combina desarrollo de nuevas capacidades con mantenimiento, testing, resolución de incidencias y colaboración con equipos multidisciplinares.',
  ],
  en: [
    'I am at my best where product, frontend and systems meet. I can build an interface, understand an API contract, trace a bug across services and see a feature through to production.',
    'My experience combines building new capabilities with maintenance, testing, incident resolution and collaboration with cross-functional teams.',
  ],
};

export function getProfileCopy(locale: Locale): string[] {
  return profileCopy[locale];
}

export function getStackGroups(locale: Locale): StackGroup[] {
  return stackGroups[locale];
}

export function getEducation(locale: Locale): EducationItem[] {
  return education[locale];
}
