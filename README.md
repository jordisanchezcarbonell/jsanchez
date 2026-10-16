# Jordi Sánchez — Full-Stack Developer

Web profesional de Jordi Sánchez. Combina portfolio técnico, experiencia profesional y servicios de desarrollo para empresas y agencias, con una vertical específica para clubes y negocios deportivos.

Está construida con Astro y TypeScript, genera HTML estático y evita JavaScript de interfaz salvo en las demostraciones interactivas.

## Rutas principales

El sitio tiene dos posicionamientos separados, cada uno con su navegación y su SEO.

**Portfolio técnico** (raíz, bilingüe es/en):

- `/`: presentación, experiencia, stack, proyectos y servicios destacados.
- `/proyectos`: listado de casos, cada uno enlazado a su ficha.
- `/proyectos/[slug]`: ficha de caso con problema, trabajo, resultado, stack y enlaces.
- `/servicios`: servicios de desarrollo y formas de colaboración.
- `/sobre-mi`: trayectoria, formación y tecnologías.
- `/cv`: currículum completo, con estilos de impresión para exportarlo a PDF.
- `/contacto`: formulario y vías directas de contacto.

**Negocios locales** (`/negocios-locales`, solo español):

- `/negocios-locales`: hub de la vertical.
- `/negocios-locales/ejemplos`: conceptos de web y demo interactiva.
- `/negocios-locales/clubes`: landing para clubes, academias, gimnasios y centros deportivos.
- `/negocios-locales/blog`: contenido editorial de la vertical.

Las rutas anteriores (`/clubes`, `/blog`, `/ejemplos`, `/demos`) mantienen un redirect 301 en `vercel.json`.

## Desarrollo local

Requiere Node.js 22.12.0 o superior. La versión recomendada está fijada en `.nvmrc`.

```bash
nvm use
npm install
npm run dev
```

Para habilitar el formulario, copia `.env.example` a `.env.local` y añade la clave pública de Web3Forms:

```dotenv
WEB3FORMS_ACCESS_KEY=tu_access_key
```

Sin esta variable el sitio sigue compilando y muestra un enlace de contacto por email como alternativa.

## Validación

```bash
npm test
npm run check
npm run build
```

Estos tres comandos se ejecutan en cada push y cada pull request desde `.github/workflows/ci.yml`, con la versión de Node fijada en `.nvmrc` y sin secretos configurados.

Las pruebas construyen el sitio y verifican rutas, posicionamiento, separación de las dos verticales, redirects, experiencia, proyectos y sus fichas, servicios, formulario, sitemap y consistencia de privacidad.

## Contenido

Los datos compartidos viven en `src/data/`:

- `experience.ts`: experiencia profesional verificada.
- `projects.ts`: proyectos y casos de estudio; cada entrada genera su ficha en ambos idiomas.
- `services.ts`: servicios y alcance técnico.
- `profile.ts`: formación, stack y copia de perfil, compartidos por `/sobre-mi` y `/cv`.
- `local-business.ts`: rutas y navegación de la vertical de negocios locales.

Los artículos viven en `src/content/blog/` y utilizan la colección tipada definida en `src/content.config.ts`.

## Despliegue en Vercel

1. Configura `WEB3FORMS_ACCESS_KEY` en las variables del proyecto.
2. Comprueba en Web3Forms el correo de destino y restringe el uso al dominio cuando sea posible.
3. Asigna `www.jordisanchezweb.es` como dominio principal y redirige la variante sin `www`.
4. Activa Web Analytics y Speed Insights.
5. Revisa los datos identificativos del aviso legal antes de publicar la actividad comercial definitiva.

`@astrojs/sitemap` genera `sitemap-index.xml`; `robots.txt`, canonical, hreflang, Open Graph, Twitter Cards y JSON-LD están incluidos. Las tipografías se sirven localmente. El blog publica un feed en `/negocios-locales/blog/rss.xml`.

## Diagramas de caso

Los casos cuyo texto describe un mecanismo (pagos y 3D Secure, integraciones, plataforma de reservas) llevan un diagrama en `src/components/CaseDiagram.astro`: SVG escrito a mano, sin dependencias ni runtime, con `role="img"` y `aria-label`.

Son casos anonimizados, así que los diagramas se mantienen **al mismo nivel de detalle que el texto ya publicado**: no muestran proveedores, endpoints, volúmenes ni reglas internas. Trazos y texto usan `currentColor`; el acento marca la única parte sobre la que gira el trabajo.

## Seguridad

Astro empaqueta sus scripts como módulos inline, así que `script-src 'self'` los bloquearía todos. Por eso `security.csp` está activado en `astro.config.mjs`: genera una CSP por página en un `<meta>` con el hash de cada script y cada estilo, y las directivas que Astro no puede deducir (`form-action`, `img-src`, `connect-src`…) se declaran ahí mismo.

`frame-ancestors` se ignora dentro de un `<meta>`, así que viaja como cabecera desde `vercel.json`, junto a HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y `Cross-Origin-Opener-Policy`.

Las páginas de demostración (`/negocios-locales/demos/`, `/demo-club`) van con `noindex, nofollow` y quedan fuera del sitemap.

## AI workflow test

This repository is ready for the AI-assisted development workflow.
