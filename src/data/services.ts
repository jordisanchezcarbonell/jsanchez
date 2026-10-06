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
