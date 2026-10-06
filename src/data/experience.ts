export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  technologies: string[];
}

/** First professional role (Ogilvy). Years of experience are derived from it at build time. */
export const careerStart = new Date('2020-09-01');

export function yearsOfExperience(now: Date = new Date()): number {
  const years = now.getFullYear() - careerStart.getFullYear();
  const beforeAnniversary =
    now.getMonth() < careerStart.getMonth() ||
    (now.getMonth() === careerStart.getMonth() && now.getDate() < careerStart.getDate());

  return beforeAnniversary ? years - 1 : years;
}

export const experience: ExperienceItem[] = [
  {
    company: 'Eunoia Digital',
    role: 'Full-Stack Developer',
    period: 'Abril 2022 — Actualidad',
    summary:
      'Desarrollo y evolución de aplicaciones web y móviles, APIs, integraciones y flujos de producto. Trabajo transversal entre frontend, backend, calidad y despliegue.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'React Native',
      'NestJS',
      'Jest',
      'Docker',
      'CI/CD',
    ],
  },
  {
    company: 'Ogilvy',
    role: 'Full-Stack Developer',
    period: 'Septiembre 2020 — Abril 2022',
    summary:
      'Desarrollo y mantenimiento de proyectos web internacionales, sitebuilding, calidad y gestión de contenido en plataformas Drupal.',
    technologies: ['Drupal 7/8', 'React', 'Angular', 'Selenium', 'New Relic', 'Sass', 'CSS'],
  },
];
