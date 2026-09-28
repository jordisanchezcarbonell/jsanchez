export interface ProjectCase {
  slug: string;
  title: string;
  area: string;
  problem: string;
  solution: string;
  contribution: string;
  technologies: string[];
  outcome: string;
  featured: boolean;
  url?: string;
  linkLabel?: string;
}

export const projects: ProjectCase[] = [
  {
    slug: 'primer-down',
    title: 'Primer Down',
    area: 'Producto editorial propio',
    problem:
      'Reunir equipos, competiciones, historia y actualidad del fútbol americano en una experiencia fiable, bilingüe y fácil de explorar.',
    solution:
      'Un archivo editorial bilingüe con Next.js, contenido estructurado en TypeScript, fichas conectadas, mapa interactivo, cronología, SEO y un sistema explícito de fuentes y verificación.',
    contribution:
      'Definición del producto, arquitectura frontend y de contenidos, diseño de la interfaz, modelado editorial, internacionalización, rendimiento y automatización de controles de integridad.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'i18n', 'SEO técnico'],
    outcome:
      'Proyecto público en evolución: 22 equipos, 11 competiciones, 23 hitos históricos y artículos bilingües respaldados por un registro central de fuentes.',
    featured: true,
    url: 'https://github.com/jordisanchezcarbonell/Gridiron-Spain',
    linkLabel: 'Ver código en GitHub',
  },
  {
    slug: 'plataforma-reservas',
    title: 'Plataforma de reservas',
    area: 'Producto web',
    problem:
      'Coordinar disponibilidad, identidad de usuario, idiomas y pagos dentro de un recorrido consistente y mantenible.',
    solution:
      'Una aplicación Next.js conectada a APIs de negocio, con autenticación, internacionalización y estados de reserva claramente definidos.',
    contribution:
      'Desarrollo y evolución de interfaces, integración de servicios, resolución de incidencias y coordinación de los flujos entre frontend y backend.',
    technologies: ['Next.js', 'TypeScript', 'APIs REST', 'Autenticación', 'i18n', 'Pagos'],
    outcome:
      'Caso anonimizado: se describe el alcance técnico sin publicar métricas, operaciones ni datos del cliente.',
    featured: true,
  },
  {
    slug: 'integraciones-empresariales',
    title: 'Integraciones empresariales',
    area: 'Sistemas conectados',
    problem:
      'Conectar aplicaciones de producto con sistemas corporativos y contenido estructurado sin trasladar su complejidad a la experiencia de usuario.',
    solution:
      'Capas de integración basadas en APIs, procesos controlados y modelos de contenido preparados para intercambiar información entre servicios.',
    contribution:
      'Implementación y mantenimiento de integraciones, automatización de tareas, diagnóstico de errores y trazabilidad entre sistemas.',
    technologies: ['SAP', 'Strapi', 'APIs REST', 'Node.js', 'Automatización', 'Docker'],
    outcome:
      'Caso anonimizado: los sistemas, endpoints y datos internos permanecen deliberadamente fuera de esta web.',
    featured: true,
  },
  {
    slug: 'pagos-3d-secure',
    title: 'Pagos y 3D Secure',
    area: 'Flujos críticos',
    problem:
      'Gestionar pagos con estados intermedios, autenticación reforzada y retornos externos sin romper el recorrido del usuario.',
    solution:
      'Un flujo de pago integrado en la aplicación, con validación de estados, tratamiento de errores y soporte para 3D Secure.',
    contribution:
      'Integración frontend, coordinación con APIs de pago, control de estados y resolución de incidencias en recorridos sensibles.',
    technologies: ['Next.js', 'TypeScript', 'APIs de pago', '3D Secure', 'Testing'],
    outcome:
      'Caso anonimizado: no se publican proveedores, volúmenes, credenciales ni reglas internas de negocio.',
    featured: true,
  },
  {
    slug: 'aplicaciones-moviles',
    title: 'Aplicaciones móviles',
    area: 'Producto móvil',
    problem:
      'Llevar funcionalidades de producto a móvil compartiendo criterios de calidad, autenticación y comunicación con APIs.',
    solution:
      'Aplicaciones React Native y Expo construidas con TypeScript y conectadas a los mismos servicios de negocio que la plataforma web.',
    contribution:
      'Desarrollo de pantallas y flujos, gestión de estado, integración de APIs, depuración y evolución funcional.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'APIs REST', 'Testing'],
    outcome:
      'Caso anonimizado: el portfolio se centra en el enfoque técnico y no identifica productos ni usuarios finales.',
    featured: false,
  },
  {
    slug: 'cms-headless',
    title: 'CMS y plataformas de contenido',
    area: 'Contenido estructurado',
    problem:
      'Permitir que equipos no técnicos gestionen contenido sin acoplar la experiencia pública al panel editorial.',
    solution:
      'Arquitecturas headless con Next.js y Strapi, modelos de contenido claros y consumo mediante APIs.',
    contribution:
      'Modelado e integración de contenido, implementación frontend y mantenimiento de los flujos entre CMS y aplicación.',
    technologies: ['Next.js', 'Strapi', 'Headless CMS', 'TypeScript', 'APIs REST'],
    outcome:
      'Caso anonimizado: no se muestran estructuras privadas, tokens, endpoints ni contenido de clientes.',
    featured: false,
  },
];
