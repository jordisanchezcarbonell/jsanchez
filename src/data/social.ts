export interface SocialLink {
  label: string;
  url: string;
}

// TODO(Jordi): confirmar la URL de Malt (el sitio bloquea peticiones automáticas y no se pudo verificar).
// LinkedIn sirve el perfil sin barra final: la variante con barra responde 301 hacia esta.
// Feeds the footer, the contact page, the CV and the Person `sameAs` of the structured data.
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/jordisanchezcarbonell' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jordi-s%C3%A1nchez-carbonell-baa83797',
  },
  { label: 'Malt', url: 'https://www.malt.es/profile/jordisanchez1' },
];
