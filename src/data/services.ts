export interface ServiceItem {
  title: string;
  description: string;
  scope: string[];
}

export const services: ServiceItem[] = [
  {
    title: 'Desarrollo React y Next.js',
    description:
      'Implementación de nuevas funcionalidades, arquitectura de interfaz y evolución de aplicaciones existentes con TypeScript.',
    scope: ['Frontend de producto', 'SSR y SSG', 'Rendimiento', 'Accesibilidad'],
  },
  {
    title: 'Desarrollo Full-Stack',
    description:
      'Trabajo coordinado entre interfaz, lógica de servidor y servicios externos para entregar recorridos completos.',
    scope: ['Next.js', 'Node.js', 'NestJS', 'Autenticación'],
  },
  {
    title: 'Integraciones API',
    description:
      'Conexión con servicios de negocio, sistemas empresariales y proveedores externos, incluyendo diagnóstico y mantenimiento.',
    scope: ['REST', 'Pagos', 'SAP', 'Automatización'],
  },
  {
    title: 'Strapi y CMS headless',
    description:
      'Modelado de contenido e integración de plataformas editoriales desacopladas para equipos que necesitan autonomía.',
    scope: ['Strapi', 'Content modeling', 'APIs', 'Next.js'],
  },
  {
    title: 'Mantenimiento y evolución',
    description:
      'Resolución de incidencias, reducción de deuda técnica y desarrollo incremental sobre aplicaciones ya operativas.',
    scope: ['Bug fixing', 'Testing', 'Refactoring', 'CI/CD'],
  },
  {
    title: 'React Native',
    description:
      'Desarrollo y evolución de aplicaciones móviles conectadas a APIs, con foco en flujos consistentes y código mantenible.',
    scope: ['React Native', 'Expo', 'TypeScript', 'APIs'],
  },
  {
    title: 'Colaboración con agencias',
    description:
      'Refuerzo técnico para equipos que necesitan capacidad adicional, ownership de una parte del proyecto o interlocución directa.',
    scope: ['Entrega por fases', 'Code review', 'Integración en equipo', 'Documentación'],
  },
  {
    title: 'Desarrollo de producto',
    description:
      'Acompañamiento técnico desde la definición de una funcionalidad hasta su puesta en producción y evolución.',
    scope: ['Descubrimiento técnico', 'Implementación', 'Calidad', 'Despliegue'],
  },
];
