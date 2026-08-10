# Jordi Sánchez — Full-Stack Developer

Web profesional de Jordi Sánchez. Combina portfolio técnico, experiencia profesional y servicios de desarrollo para empresas y agencias, con una vertical específica para clubes y negocios deportivos.

Está construida con Astro y TypeScript, genera HTML estático y evita JavaScript de interfaz salvo en las demostraciones interactivas.

## Rutas principales

- `/`: presentación, experiencia, stack, proyectos y servicios destacados.
- `/proyectos`: casos de estudio profesionales anonimizados.
- `/servicios`: servicios de desarrollo y formas de colaboración.
- `/clubes`: landing para clubes, academias, gimnasios y centros deportivos.
- `/sobre-mi`: trayectoria, formación y tecnologías.
- `/contacto`: formulario y vías directas de contacto.
- `/blog`: contenido editorial secundario.

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

Las pruebas construyen el sitio y verifican rutas, posicionamiento, experiencia, proyectos, servicios, formulario, sitemap y consistencia de privacidad.

## Contenido

Los datos compartidos viven en `src/data/`:

- `experience.ts`: experiencia profesional verificada.
- `projects.ts`: casos de estudio anonimizados.
- `services.ts`: servicios y alcance técnico.

Los artículos viven en `src/content/blog/` y utilizan la colección tipada definida en `src/content.config.ts`.

## Despliegue en Vercel

1. Configura `WEB3FORMS_ACCESS_KEY` en las variables del proyecto.
2. Comprueba en Web3Forms el correo de destino y restringe el uso al dominio cuando sea posible.
3. Asigna `www.jordisanchezweb.es` como dominio principal y redirige la variante sin `www`.
4. Activa Web Analytics y Speed Insights.
5. Revisa los datos identificativos del aviso legal antes de publicar la actividad comercial definitiva.

`@astrojs/sitemap` genera `sitemap-index.xml`; `robots.txt`, canonical, Open Graph, Twitter Cards y JSON-LD están incluidos. Las tipografías se sirven localmente.
