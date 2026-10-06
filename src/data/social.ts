export interface SocialLink {
  label: string;
  url: string;
}

// TODO(Jordi): añadir LinkedIn ({ label: 'LinkedIn', url: 'https://www.linkedin.com/in/…/' }).
// TODO(Jordi): confirmar la URL de Malt (el sitio bloquea peticiones automáticas y no se pudo verificar).
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/jordisanchezcarbonell' },
  { label: 'Malt', url: 'https://www.malt.es/profile/jordisanchez1' },
];
