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
