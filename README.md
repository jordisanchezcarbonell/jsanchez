# Jordi Sánchez Web

Web de captación estática para un servicio freelance de diseño web dirigido a negocios locales de Barcelona. Construida con Astro, sin framework de interfaz ni JavaScript de navegación.

## Desarrollo local

Requiere Node.js 22.12.0 o superior.

Copia `.env.example` a `.env.local` y añade tu access key de Web3Forms:

```dotenv
WEB3FORMS_ACCESS_KEY=tu_access_key
```

`.env.local` está ignorado por Git y no debe confirmarse en el repositorio.

```bash
npm install
npm run dev
```

Para validar una entrega de producción:

```bash
npm run check
npm run build
npm run preview
```

## Antes de publicar

1. Añade `WEB3FORMS_ACCESS_KEY` en **Vercel → Project Settings → Environment Variables** y vuelve a desplegar. No uses el prefijo `PUBLIC_`.
2. Verifica en Web3Forms que el correo de destino sea `jordigw@gmail.com` y activa la restricción de dominio si tu plan lo permite.
3. Revisa los datos identificativos del aviso legal y añade el NIF y el domicilio profesional completo si resultan exigibles para tu actividad.
4. Importa el repositorio en Vercel, asigna `jordisanchezweb.es` y configura la redirección de `www` desde el panel.
5. Activa Web Analytics y Speed Insights en el proyecto de Vercel y vuelve a desplegar.

## Contenido del blog

Los artículos viven en `src/content/blog/`. Cada Markdown usa este frontmatter:

```yaml
title: "Título"
description: "Descripción SEO"
publishDate: 2026-07-17
updatedDate: 2026-07-17 # opcional
author: "Jordi Sánchez"
category: "SEO local"
draft: false
```

La ruta, el canonical y los datos estructurados `Article` se generan automáticamente.

## SEO y privacidad

- `@astrojs/sitemap` genera `sitemap-index.xml` y los sitemaps de páginas. `/sitemap.xml` redirige al índice mediante `vercel.json`.
- `robots.txt`, canonical, Open Graph, Twitter Card y datos estructurados están incluidos.
- Fraunces e Inter se autoalojan desde paquetes locales; no hay peticiones a Google Fonts.
- Vercel Analytics no usa cookies. El formulario solo envía datos después de una acción explícita del usuario.
