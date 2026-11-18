import cryptoDashboardScreenshot from '../assets/projects/crypto-trading-dashboard.png';
import damascusGuideScreenshot from '../assets/projects/damascus-nice-guide.png';
import primerDownScreenshot from '../assets/projects/primer-down.png';
import type { Locale } from '../i18n';

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
  /** Client work published without naming clients, systems or metrics. */
  anonymized?: true;
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
    area: 'Producto propio',
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
    demoUrl: 'https://primerdown.jordisanchezweb.es/es',
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
    image: damascusGuideScreenshot,
    imageAlt:
      'Portada de The EVO France Food Guide: titular sobre fondo azul, presentación del autor, selector de idioma y navegación por mapa, comida local, brunch e itinerarios.',
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
    // TODO(Jordi): restaurar `url: 'https://crypto-trading-dashboard-inky.vercel.app'` y
    // `linkLabel: 'Ver proyecto'` cuando el despliegue vuelva a responder (2026-11-18: error 500).
    image: cryptoDashboardScreenshot,
    imageAlt:
      'Panel Trading Lab en modo solo lectura: cabecera con estado del sistema, tarjetas de equity, PnL abierto y drawdown máximo, y una curva de equity sobre fondo oscuro.',
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
      'MVP de plataforma de reservas que cubre el recorrido del cliente y la gestión diaria del restaurante.',
    featured: false,
    // TODO(Jordi): restaurar `url: 'https://reservas-b.vercel.app'` y `linkLabel: 'Ver proyecto'`
    // cuando el proyecto de Supabase vuelva a estar activo. Mientras está pausado, la demo
    // pública (/r/casa-brava) responde 404 y el enlace llevaría a una página rota.
  },
  {
    slug: 'plataforma-reservas',
    anonymized: true,
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
    anonymized: true,
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
    anonymized: true,
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
    anonymized: true,
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
    anonymized: true,
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

type ProjectTranslation = Partial<
  Pick<
    ProjectCase,
    'title' | 'area' | 'problem' | 'solution' | 'contribution' | 'technologies' | 'outcome' | 'linkLabel' | 'imageAlt' | 'caseStudy'
  >
>;

/** English copy, keyed by slug. Structural fields (URLs, images, flags) come from the Spanish source above. */
const projectsEn: Record<string, ProjectTranslation> = {
  'primer-down': {
    area: 'Own product',
    problem:
      'Bring teams, competitions, history and news of American football in Spain together in a reliable, bilingual experience that is easy to explore.',
    solution:
      'A bilingual editorial archive built with Next.js, structured content in TypeScript, linked profiles, an interactive map, a timeline, SEO and an explicit sourcing and verification system.',
    contribution:
      'Product definition, frontend and content architecture, interface design, editorial modelling, internationalisation, performance and automated integrity checks.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'i18n', 'Technical SEO'],
    outcome:
      'Public, evolving project: 22 teams, 11 competitions, 23 historical milestones and bilingual articles backed by a central source registry.',
    linkLabel: 'View code on GitHub',
    imageAlt:
      'Primer Down home page: the headline “El fútbol americano también vive aquí” on a dark background, navigation for history, teams, map and competitions, and buttons to explore teams and history.',
  },
  'damascus-nice-guide': {
    area: 'Multilingual travel guide',
    problem:
      'Offer a clear, practical guide to discovering Nice during EVO France without losing the context of each place.',
    solution:
      'A web guide in English, Spanish and French with a map of points of interest, recommendations and nearby-place search.',
    contribution:
      'Development of the experience, internationalisation, structured content, and map and geolocation features.',
    technologies: ['Next.js 16', 'TypeScript', 'i18n', 'Maps', 'Geolocation', 'Vercel'],
    outcome: 'Public guide deployed for EVO France 2026, built for mobile browsing in three languages.',
    linkLabel: 'View project',
    imageAlt:
      'The EVO France Food Guide home page: the headline on a blue background, the author introduction, a language selector and navigation for map, local food, brunch and itineraries.',
  },
  'crypto-trading-dashboard': {
    area: 'Product observability',
    problem: 'Check the state of a trading lab without exposing any control that could execute trades.',
    solution:
      'A strictly read-only observability dashboard, backed by demo data or a Supabase replica protected by RLS.',
    contribution:
      'Design and implementation of the data architecture, the monitoring interface and explicit security boundaries.',
    outcome: 'Public dashboard that separates data visualisation from any ability to control the system.',
    linkLabel: 'View project',
    imageAlt:
      'Trading Lab dashboard in read-only mode: a header with system status, cards for equity, open PnL and max drawdown, and an equity curve on a dark background.',
  },
  reservas: {
    title: 'Reservas',
    area: 'SaaS product',
    problem: 'Give small restaurants a simple way to receive and manage online bookings.',
    solution:
      'An MVP with a public page per restaurant, time-slot availability, a private dashboard and email notifications.',
    contribution: 'End-to-end build of the booking flows, authentication, data and availability validation.',
    outcome:
      'Booking platform MVP covering both the customer journey and day-to-day restaurant operations.',
  },
  'plataforma-reservas': {
    title: 'Booking platform',
    area: 'Web product',
    problem:
      'Coordinate availability, user identity, languages and payments within a consistent, maintainable journey.',
    solution:
      'A Next.js application connected to business APIs, with authentication, internationalisation and clearly defined booking states.',
    contribution:
      'Development and evolution of interfaces, service integration, incident resolution and coordination of frontend–backend flows.',
    technologies: ['Next.js', 'TypeScript', 'REST APIs', 'Authentication', 'i18n', 'Payments'],
    outcome:
      'Anonymised case: the technical scope is described without publishing client metrics, operations or data.',
    caseStudy: {
      problem:
        'A booking flow whose authentication and availability were spread across several services, causing hard-to-reproduce errors.',
      work: 'Development and evolution of interfaces, service integration, incident resolution and coordination of frontend–backend flows.',
    },
  },
  'integraciones-empresariales': {
    title: 'Enterprise integrations',
    area: 'Connected systems',
    problem:
      'Connect product applications with corporate systems and structured content without pushing their complexity into the user experience.',
    solution:
      'API-based integration layers, controlled processes and content models ready to exchange information between services.',
    contribution:
      'Building and maintaining integrations, task automation, error diagnosis and traceability across systems.',
    technologies: ['SAP', 'Strapi', 'REST APIs', 'Node.js', 'Automation', 'Docker'],
    outcome:
      'Anonymised case: internal systems, endpoints and data are deliberately kept off this site.',
    caseStudy: {
      problem: 'Marketing data and content out of sync between SAP, the CMS and the website, fixed by hand.',
      work: 'Strapi integrations (lifecycle hooks and webhooks), automated bulk updates and a log of every sync so it can be audited.',
    },
  },
  'pagos-3d-secure': {
    title: 'Payments and 3D Secure',
    area: 'Critical flows',
    problem:
      'Handle payments with intermediate states, strong authentication and external redirects without breaking the user journey.',
    solution:
      'A payment flow built into the application, with state validation, error handling and 3D Secure support.',
    contribution:
      'Frontend integration, coordination with payment APIs, state control and incident resolution in sensitive journeys.',
    technologies: ['Next.js', 'TypeScript', 'Payment APIs', '3D Secure', 'Testing'],
    outcome:
      'Anonymised case: no providers, volumes, credentials or internal business rules are published.',
    caseStudy: {
      problem:
        'A checkout losing customers to intermittent 3DS verification errors and payment states that disagreed between frontend and gateway.',
      work: 'I modelled payment states explicitly, handled the 3DS challenge return and retries, and added tracing to follow every transaction end to end.',
    },
  },
  'aplicaciones-moviles': {
    title: 'Mobile apps',
    area: 'Mobile product',
    problem:
      'Bring product features to mobile while sharing quality standards, authentication and API communication.',
    solution:
      'React Native and Expo apps built with TypeScript and connected to the same business services as the web platform.',
    contribution: 'Building screens and flows, state management, API integration, debugging and feature evolution.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'Testing'],
    outcome:
      'Anonymised case: the portfolio focuses on the technical approach and does not identify products or end users.',
  },
  'cms-headless': {
    title: 'CMS and content platforms',
    area: 'Structured content',
    problem: 'Let non-technical teams manage content without coupling the public experience to the editorial back office.',
    solution: 'Headless architectures with Next.js and Strapi, clear content models and API-based delivery.',
    contribution:
      'Content modelling and integration, frontend implementation and maintenance of CMS–application flows.',
    technologies: ['Next.js', 'Strapi', 'Headless CMS', 'TypeScript', 'REST APIs'],
    outcome: 'Anonymised case: no private structures, tokens, endpoints or client content are shown.',
  },
};

/** Catalan copy, keyed by slug. Same rules as the English map. */
const projectsCa: Record<string, ProjectTranslation> = {
  'primer-down': {
    area: 'Producte propi',
    problem:
      'Reunir equips, competicions, història i actualitat del futbol americà en una experiència fiable, bilingüe i fàcil d’explorar.',
    solution:
      'Un arxiu editorial bilingüe amb Next.js, contingut estructurat en TypeScript, fitxes connectades, mapa interactiu, cronologia, SEO i un sistema explícit de fonts i verificació.',
    contribution:
      'Definició del producte, arquitectura frontend i de continguts, disseny de la interfície, modelatge editorial, internacionalització, rendiment i automatització de controls d’integritat.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'i18n', 'SEO tècnic'],
    outcome:
      'Projecte públic en evolució: 22 equips, 11 competicions, 23 fites històriques i articles bilingües avalats per un registre central de fonts.',
    linkLabel: 'Veure el codi a GitHub',
    imageAlt:
      'Portada de Primer Down: titular «El fútbol americano también vive aquí» sobre fons fosc, navegació per història, equips, mapa i competicions, i botons per explorar equips i història.',
  },
  'damascus-nice-guide': {
    area: 'Guia de viatge multilingüe',
    problem:
      'Oferir una guia clara i pràctica per descobrir Niça durant l’EVO France sense perdre el context de cada lloc.',
    solution:
      'Una guia web en anglès, castellà i francès amb mapa de punts d’interès, recomanacions i cerca de llocs propers.',
    contribution:
      'Desenvolupament de l’experiència, internacionalització, continguts estructurats i funcionalitats de mapa i geolocalització.',
    technologies: ['Next.js 16', 'TypeScript', 'i18n', 'Mapes', 'Geolocalització', 'Vercel'],
    outcome:
      'Guia pública desplegada per a l’EVO France 2026, preparada per navegar des del mòbil i en tres idiomes.',
    linkLabel: 'Veure el projecte',
    imageAlt:
      'Portada de The EVO France Food Guide: titular sobre fons blau, presentació de l’autor, selector d’idioma i navegació per mapa, menjar local, brunch i itineraris.',
  },
  'crypto-trading-dashboard': {
    area: 'Observabilitat de producte',
    problem:
      'Consultar l’estat d’un laboratori de trading sense exposar controls que puguin executar operacions.',
    solution:
      'Un panell d’observabilitat estrictament de només lectura, amb dades de demostració o una rèplica de Supabase protegida per RLS.',
    contribution:
      'Disseny i implementació de l’arquitectura de dades, la interfície de monitoratge i límits explícits de seguretat.',
    outcome:
      'Dashboard públic que separa la visualització de dades de qualsevol capacitat de control sobre el sistema.',
    linkLabel: 'Veure el projecte',
    imageAlt:
      'Panell Trading Lab en mode de només lectura: capçalera amb l’estat del sistema, targetes d’equity, PnL obert i drawdown màxim, i una corba d’equity sobre fons fosc.',
  },
  reservas: {
    title: 'Reservas',
    area: 'Producte SaaS',
    problem: 'Donar als petits restaurants una manera senzilla de rebre i gestionar reserves en línia.',
    solution:
      'Un MVP amb pàgina pública per restaurant, disponibilitat per franges, panell privat i notificacions per correu.',
    contribution:
      'Construcció end-to-end dels fluxos de reserva, autenticació, dades i validació de disponibilitat.',
    outcome:
      'MVP de plataforma de reserves que cobreix el recorregut del client i la gestió diària del restaurant.',
  },
  'plataforma-reservas': {
    title: 'Plataforma de reserves',
    area: 'Producte web',
    problem:
      'Coordinar disponibilitat, identitat d’usuari, idiomes i pagaments dins d’un recorregut consistent i mantenible.',
    solution:
      'Una aplicació Next.js connectada a APIs de negoci, amb autenticació, internacionalització i estats de reserva clarament definits.',
    contribution:
      'Desenvolupament i evolució d’interfícies, integració de serveis, resolució d’incidències i coordinació dels fluxos entre frontend i backend.',
    technologies: ['Next.js', 'TypeScript', 'APIs REST', 'Autenticació', 'i18n', 'Pagaments'],
    outcome:
      'Cas anonimitzat: es descriu l’abast tècnic sense publicar mètriques, operacions ni dades del client.',
    caseStudy: {
      problem:
        'Flux de reserva amb autenticació i disponibilitat repartides entre diversos serveis, cosa que generava errors difícils de reproduir.',
      work: 'Desenvolupament i evolució d’interfícies, integració de serveis, resolució d’incidències i coordinació dels fluxos entre frontend i backend.',
    },
  },
  'integraciones-empresariales': {
    title: 'Integracions empresarials',
    area: 'Sistemes connectats',
    problem:
      'Connectar aplicacions de producte amb sistemes corporatius i contingut estructurat sense traslladar-ne la complexitat a l’experiència d’usuari.',
    solution:
      'Capes d’integració basades en APIs, processos controlats i models de contingut preparats per intercanviar informació entre serveis.',
    contribution:
      'Implementació i manteniment d’integracions, automatització de tasques, diagnòstic d’errors i traçabilitat entre sistemes.',
    technologies: ['SAP', 'Strapi', 'APIs REST', 'Node.js', 'Automatització', 'Docker'],
    outcome:
      'Cas anonimitzat: els sistemes, endpoints i dades internes queden deliberadament fora d’aquest web.',
    caseStudy: {
      problem:
        'Dades de màrqueting i contingut desincronitzades entre SAP, el CMS i el web, amb correccions manuals.',
      work: 'Integracions amb Strapi (lifecycle hooks i webhooks), actualitzacions massives automatitzades i registre de cada sincronització per poder-la auditar.',
    },
  },
  'pagos-3d-secure': {
    title: 'Pagaments i 3D Secure',
    area: 'Fluxos crítics',
    problem:
      'Gestionar pagaments amb estats intermedis, autenticació reforçada i retorns externs sense trencar el recorregut de l’usuari.',
    solution:
      'Un flux de pagament integrat a l’aplicació, amb validació d’estats, tractament d’errors i suport per a 3D Secure.',
    contribution:
      'Integració frontend, coordinació amb APIs de pagament, control d’estats i resolució d’incidències en recorreguts sensibles.',
    technologies: ['Next.js', 'TypeScript', 'APIs de pagament', '3D Secure', 'Testing'],
    outcome:
      'Cas anonimitzat: no es publiquen proveïdors, volums, credencials ni regles internes de negoci.',
    caseStudy: {
      problem:
        'Checkout amb abandonaments per errors intermitents en la verificació 3DS i estats de pagament inconsistents entre frontend i passarel·la.',
      work: 'Vaig modelar els estats del pagament de manera explícita, vaig gestionar el retorn del challenge 3DS i els reintents, i vaig afegir traces per seguir cada transacció de punta a punta.',
    },
  },
  'aplicaciones-moviles': {
    title: 'Aplicacions mòbils',
    area: 'Producte mòbil',
    problem:
      'Portar funcionalitats de producte al mòbil compartint criteris de qualitat, autenticació i comunicació amb APIs.',
    solution:
      'Aplicacions React Native i Expo construïdes amb TypeScript i connectades als mateixos serveis de negoci que la plataforma web.',
    contribution:
      'Desenvolupament de pantalles i fluxos, gestió d’estat, integració d’APIs, depuració i evolució funcional.',
    outcome:
      'Cas anonimitzat: el portfolio se centra en l’enfocament tècnic i no identifica productes ni usuaris finals.',
  },
  'cms-headless': {
    title: 'CMS i plataformes de contingut',
    area: 'Contingut estructurat',
    problem:
      'Permetre que equips no tècnics gestionin contingut sense acoblar l’experiència pública al panell editorial.',
    solution: 'Arquitectures headless amb Next.js i Strapi, models de contingut clars i consum mitjançant APIs.',
    contribution:
      'Modelatge i integració de contingut, implementació frontend i manteniment dels fluxos entre CMS i aplicació.',
    outcome: 'Cas anonimitzat: no es mostren estructures privades, tokens, endpoints ni contingut de clients.',
  },
};

const translations: Record<Exclude<Locale, 'es'>, Record<string, ProjectTranslation>> = {
  ca: projectsCa,
  en: projectsEn,
};

export function getProjects(locale: Locale): ProjectCase[] {
  if (locale === 'es') return projects;

  return projects.map((project) => {
    const translation = translations[locale][project.slug] ?? {};
    return {
      ...project,
      ...translation,
      caseStudy: project.caseStudy && {
        ...project.caseStudy,
        ...translation.caseStudy,
        // Results are only published once they exist in every language.
        result: translation.caseStudy?.result,
      },
    };
  });
}
