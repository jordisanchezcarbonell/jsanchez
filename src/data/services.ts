import type { Locale } from '../i18n';

export interface ServiceItem {
  /** Anchor id on /servicios/ */
  slug: string;
  title: string;
  description: string;
  scope: string[];
}

export const services: ServiceItem[] = [
  {
    slug: 'react-nextjs',
    title: 'Desarrollo React y Next.js',
    description:
      'Implementación de nuevas funcionalidades, arquitectura de interfaz y evolución de aplicaciones existentes con TypeScript.',
    scope: ['Frontend de producto', 'SSR y SSG', 'Rendimiento', 'Accesibilidad'],
  },
  {
    slug: 'full-stack',
    title: 'Desarrollo Full-Stack',
    description:
      'Trabajo coordinado entre interfaz, lógica de servidor y servicios externos para entregar recorridos completos.',
    scope: ['Next.js', 'Node.js', 'NestJS', 'Autenticación'],
  },
  {
    slug: 'integraciones-api',
    title: 'Integraciones API',
    description:
      'Conexión con servicios de negocio, sistemas empresariales y proveedores externos, incluyendo diagnóstico y mantenimiento.',
    scope: ['REST', 'Pagos', 'SAP', 'Automatización'],
  },
  {
    slug: 'strapi-cms-headless',
    title: 'Strapi y CMS headless',
    description:
      'Modelado de contenido e integración de plataformas editoriales desacopladas para equipos que necesitan autonomía.',
    scope: ['Strapi', 'Content modeling', 'APIs', 'Next.js'],
  },
  {
    slug: 'mantenimiento',
    title: 'Mantenimiento y evolución',
    description:
      'Resolución de incidencias, reducción de deuda técnica y desarrollo incremental sobre aplicaciones ya operativas.',
    scope: ['Bug fixing', 'Testing', 'Refactoring', 'CI/CD'],
  },
  {
    slug: 'react-native',
    title: 'React Native',
    description:
      'Desarrollo y evolución de aplicaciones móviles conectadas a APIs, con foco en flujos consistentes y código mantenible.',
    scope: ['React Native', 'Expo', 'TypeScript', 'APIs'],
  },
  {
    slug: 'agencias',
    title: 'Colaboración con agencias',
    description:
      'Refuerzo técnico para equipos que necesitan capacidad adicional, ownership de una parte del proyecto o interlocución directa.',
    scope: ['Entrega por fases', 'Code review', 'Integración en equipo', 'Documentación'],
  },
  {
    slug: 'producto',
    title: 'Desarrollo de producto',
    description:
      'Acompañamiento técnico desde la definición de una funcionalidad hasta su puesta en producción y evolución.',
    scope: ['Descubrimiento técnico', 'Implementación', 'Calidad', 'Despliegue'],
  },
];

const servicesEn: Record<string, Pick<ServiceItem, 'title' | 'description' | 'scope'>> = {
  'react-nextjs': {
    title: 'React and Next.js development',
    description:
      'New features, interface architecture and ongoing evolution of existing applications, built with TypeScript.',
    scope: ['Product frontend', 'SSR and SSG', 'Performance', 'Accessibility'],
  },
  'full-stack': {
    title: 'Full-stack development',
    description:
      'Coordinated work across interface, server logic and external services to ship complete user journeys.',
    scope: ['Next.js', 'Node.js', 'NestJS', 'Authentication'],
  },
  'integraciones-api': {
    title: 'API integrations',
    description:
      'Connecting business services, enterprise systems and third-party providers, including diagnosis and maintenance.',
    scope: ['REST', 'Payments', 'SAP', 'Automation'],
  },
  'strapi-cms-headless': {
    title: 'Strapi and headless CMS',
    description:
      'Content modelling and integration of decoupled editorial platforms for teams that need autonomy.',
    scope: ['Strapi', 'Content modelling', 'APIs', 'Next.js'],
  },
  mantenimiento: {
    title: 'Maintenance and evolution',
    description:
      'Incident resolution, technical debt reduction and incremental development on applications already in production.',
    scope: ['Bug fixing', 'Testing', 'Refactoring', 'CI/CD'],
  },
  'react-native': {
    title: 'React Native',
    description:
      'Building and evolving API-connected mobile apps, focused on consistent flows and maintainable code.',
    scope: ['React Native', 'Expo', 'TypeScript', 'APIs'],
  },
  agencias: {
    title: 'Agency partnerships',
    description:
      'Technical support for teams that need extra capacity, ownership of part of a project or a direct technical counterpart.',
    scope: ['Phased delivery', 'Code review', 'Team integration', 'Documentation'],
  },
  producto: {
    title: 'Product development',
    description:
      'Technical partnership from defining a feature through to shipping it to production and evolving it.',
    scope: ['Technical discovery', 'Implementation', 'Quality', 'Deployment'],
  },
};

export function getServices(locale: Locale): ServiceItem[] {
  if (locale === 'es') return services;
  return services.map((service) => ({ ...service, ...servicesEn[service.slug] }));
}
