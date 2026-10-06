import primerDownScreenshot from '../assets/projects/primer-down.png';

/** Problema / Qué hice / Resultado. Leave `result` undefined until there is a real, publishable figure. */
export interface CaseStudy {
  problem: string;
  work: string;
  result?: string;
}

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
  demoUrl?: string;
  caseStudy?: CaseStudy;
  image?: ImageMetadata;
  imageAlt?: string;
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
    // TODO(Jordi): confirmar la URL de producción (gridiron-spain.vercel.app también sirve el proyecto).
    demoUrl: 'https://primer-down.vercel.app/es',
    image: primerDownScreenshot,
    imageAlt:
      'Portada de Primer Down: titular «El fútbol americano también vive aquí» sobre fondo oscuro, navegación por historia, equipos, mapa y competiciones, y botones para explorar equipos e historia.',
  },
  {
    slug: 'damascus-nice-guide',
    title: 'Damascus’s Nice Guide',
    area: 'Guía de viaje multilingüe',
    problem:
      'Ofrecer una guía clara y práctica para descubrir Niza durante EVO France sin perder el contexto de cada lugar.',
    solution:
      'Una guía web en inglés, español y francés con mapa de puntos de interés, recomendaciones y búsqueda de lugares cercanos.',
    contribution:
      'Desarrollo de la experiencia, internacionalización, contenidos estructurados y funcionalidades de mapa y geolocalización.',
    technologies: ['Next.js 16', 'TypeScript', 'i18n', 'Mapas', 'Geolocalización', 'Vercel'],
    outcome:
      'Guía pública desplegada para EVO France 2026, preparada para navegar desde móvil y en tres idiomas.',
    featured: false,
    url: 'https://damascus-nice-guide.vercel.app',
    linkLabel: 'Ver proyecto',
  },
  {
    slug: 'crypto-trading-dashboard',
    title: 'Crypto Trading Dashboard',
    area: 'Observabilidad de producto',
    problem:
      'Consultar el estado de un laboratorio de trading sin exponer controles que puedan ejecutar operaciones.',
    solution:
      'Un panel de observabilidad estrictamente de solo lectura, con datos de demostración o una réplica de Supabase protegida por RLS.',
    contribution:
      'Diseño e implementación de la arquitectura de datos, la interfaz de monitorización y límites explícitos de seguridad.',
    technologies: ['Next.js 16', 'TypeScript', 'Supabase', 'RLS', 'Testing', 'Vercel'],
    outcome:
      'Dashboard público que separa la visualización de datos de cualquier capacidad de control sobre el sistema.',
    featured: false,
    url: 'https://crypto-trading-dashboard-inky.vercel.app',
    linkLabel: 'Ver proyecto',
  },
  {
    slug: 'reservas',
    title: 'Reservas',
    area: 'Producto SaaS',
    problem:
      'Dar a pequeños restaurantes una forma sencilla de recibir y gestionar reservas online.',
    solution:
      'Un MVP con página pública por restaurante, disponibilidad por franjas, panel privado y notificaciones por correo.',
    contribution:
      'Construcción end-to-end de los flujos de reserva, autenticación, datos y validación de disponibilidad.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Zod', 'Resend'],
    outcome:
      'Demo desplegada de una plataforma de reservas con recorrido de cliente y gestión operativa.',
    featured: false,
    url: 'https://reservas-b.vercel.app',
    linkLabel: 'Ver proyecto',
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
    caseStudy: {
      problem:
        'Flujo de reserva con autenticación y disponibilidad repartidas entre varios servicios, lo que generaba errores difíciles de reproducir.',
      // TODO(Jordi): concretar qué hiciste, p. ej. capa de cliente tipada para la API, manejo de
      // estados de carga y error, tests E2E del recorrido crítico. Mientras tanto se usa `contribution`.
      work:
        'Desarrollo y evolución de interfaces, integración de servicios, resolución de incidencias y coordinación de los flujos entre frontend y backend.',
      // TODO(Jordi): resultado — métrica o hito real. Sin él se muestra `outcome` como contexto.
    },
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
    caseStudy: {
      problem:
        'Datos de marketing y contenido desincronizados entre SAP, el CMS y la web, con correcciones manuales.',
      work:
        'Integraciones con Strapi (lifecycle hooks y webhooks), actualizaciones masivas automatizadas y registro de cada sincronización para poder auditarla.',
      // TODO(Jordi): resultado, p. ej. «eliminadas N horas/semana de trabajo manual».
    },
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
    caseStudy: {
      problem:
        'Checkout con abandonos por errores intermitentes en la verificación 3DS y estados de pago inconsistentes entre frontend y pasarela.',
      work:
        'Modelé los estados del pago de forma explícita, gestioné el retorno del challenge 3DS y los reintentos, y añadí trazas para seguir cada transacción de punta a punta.',
      // TODO(Jordi): resultado, p. ej. «‑X % incidencias en pagos» o «diagnóstico de horas a minutos».
    },
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
