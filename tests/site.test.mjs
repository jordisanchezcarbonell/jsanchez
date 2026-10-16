import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

function yearsSince(isoDate) {
  const start = new Date(isoDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  return beforeAnniversary ? years - 1 : years;
}

test('the production site builds without contact-form credentials', () => {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      WEB3FORMS_ACCESS_KEY: '',
    },
  });

  assert.equal(
    result.status,
    0,
    `Expected a successful build.\n${result.stdout}\n${result.stderr}`,
  );
});

test('the professional routes are available in the production output', () => {
  const routes = ['/proyectos/', '/servicios/', '/sobre-mi/', '/contacto/'];
  const missingRoutes = routes.filter(
    (route) => !existsSync(path.join(process.cwd(), 'dist', route, 'index.html')),
  );

  assert.deepEqual(missingRoutes, []);
});

test('the home leads with a value proposition without the retired portfolio', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');

  assert.match(home, /<h1[^>]*>Producto web que llega a producción y se mantiene estable\.<\/h1>/);
  assert.match(home, /Full-Stack Developer · Barcelona/);
  assert.doesNotMatch(home, /jordi-sanchez-portafolio\.vercel\.app/);
});

test('display typography keeps names legible without whimsical letter alternates', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /font-variation-settings:\s*"SOFT"\s+0,\s*"WONK"\s+0/);
  assert.doesNotMatch(compiledCss, /font-variation-settings:\s*"SOFT"\s+\d+,\s*"WONK"\s+1/);
});

test('the hero headline shares the serif display face with the section headings', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.doesNotMatch(compiledCss, /\.hero-title\[[^\]]+\]\{[^}]*font-family:var\(--sans\)/);
  assert.match(compiledCss, /\.hero-title\[[^\]]+\]\{[^}]*font-size:clamp\(2\.5rem,5\.6vw,5\.5rem\)/);
});

test('web fonts are self-hosted with metric-adjusted fallbacks and a preloaded display face', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');

  assert.match(home, /font-family:"Fraunces-[0-9a-f]+ fallback: [^"]+";[^}]*size-adjust:/);
  assert.match(home, /font-family:"Inter-[0-9a-f]+ fallback: [^"]+";[^}]*size-adjust:/);
  assert.match(home, /font-display:swap/);
  assert.equal((home.match(/<link rel="preload"[^>]+as="font"/g) ?? []).length, 2);
});

test('personal brand typography stays neutral in the header and footer', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /\.footer-name\[[^\]]+\]\{[^}]*font-family:var\(--sans\)/);
  assert.match(compiledCss, /\.footer-name\[[^\]]+\]\{[^}]*font-weight:560/);
  assert.match(compiledCss, /\.brand-mark\[[^\]]+\]\{[^}]*font-family:var\(--sans\)/);
});

test('professional page introductions give long headings enough desktop width', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /\.page-intro h1\{[^}]*max-width:15ch/);
});

test('footer navigation links keep a comfortable touch target', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /nav\[[^\]]+\] a\[[^\]]+\]\{[^}]*min-height:2\.75rem/);
});

test('the header stays reachable while scrolling, with contact always visible', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /\.site-header\[[^\]]+\]\{[^}]*position:sticky/);
  const mobileActions = home.match(/<div class="mobile-actions[^"]*"[^>]*>([\s\S]*?)<details/)[1];
  assert.match(mobileActions, /<a class="nav-cta[^"]*" href="\/contacto\/"/);
});

test('compact links get a 44px hit area and dark-block labels stay legible', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /\.text-link:before,\.tap-target:before\{[^}]*height:max\(100%,2\.75rem\)/);
  assert.match(compiledCss, /\.projects\[[^\]]+\] \.row-index\[[^\]]+\]\{color:#c77b6d\}/);
});

test('the primary navigation reaches every professional area', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const primaryNav = home.match(/<nav class="desktop-navigation[^"]*"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const footer = home.match(/<footer[\s\S]*<\/footer>/)[0];

  for (const destination of ['/proyectos/', '/servicios/', '/sobre-mi/', '/contacto/']) {
    assert.match(primaryNav, new RegExp(`href="${destination}"`));
  }

  // The local-business vertical stays out of the root: one discreet footer link, nothing more.
  assert.doesNotMatch(primaryNav, /href="\/negocios-locales/);
  assert.doesNotMatch(home, /href="\/negocios-locales\/clubes\/"/);
  assert.match(footer, /href="\/negocios-locales\/"/);
});

test('the home exposes the verified professional experience', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');

  assert.match(home, /Eunoia Digital/);
  assert.match(home, /Abril 2022/);
  assert.match(home, /Ogilvy/);
  assert.match(home, /Septiembre 2020/);
});

test('the projects page presents anonymized professional case studies', () => {
  const projects = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'index.html'),
    'utf8',
  );

  assert.match(projects, /Plataforma de reservas/);
  assert.match(projects, /Integraciones empresariales/);
  assert.match(projects, /Pagos y 3D Secure/);
  assert.match(projects, /Aplicaciones móviles/);
  assert.doesNotMatch(projects, /TODO.*resultado/i);
});

test('anonymized cases follow the problem / work / result format without unpublished placeholders', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const payments = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'pagos-3d-secure', 'index.html'),
    'utf8',
  );
  const integrations = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'integraciones-empresariales', 'index.html'),
    'utf8',
  );

  for (const page of [home, payments, integrations]) {
    assert.match(page, /Qué hice/);
    assert.doesNotMatch(page, /\[?TODO/);
  }

  assert.match(payments, /errores intermitentes en la verificación 3DS/);
  assert.match(integrations, /lifecycle hooks y webhooks/);
});

test('Primer Down appears as a public project on the home and projects pages', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const projects = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'index.html'),
    'utf8',
  );

  for (const page of [home, projects]) {
    assert.match(page, /Primer Down/);
    assert.match(page, /Next\.js/);
  }

  assert.match(
    projects,
    /href="https:\/\/github\.com\/jordisanchezcarbonell\/Gridiron-Spain"/,
  );
  const primerDown = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'primer-down', 'index.html'),
    'utf8',
  );
  assert.match(primerDown, /archivo editorial bilingüe/i);

  for (const page of [home, projects]) {
    assert.match(page, /href="https:\/\/primer-down\.vercel\.app\/es"[^>]*>\s*Ver demo en vivo/);
    assert.match(page, /<img[^>]+alt="Portada de Primer Down[^"]+"[^>]+width="\d+"[^>]+height="\d+"|<img[^>]+width="\d+"[^>]+height="\d+"[^>]+alt="Portada de Primer Down/);
  }
});

test('the projects page links to the selected public Vercel deployments', () => {
  const projects = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'index.html'),
    'utf8',
  );

  for (const [name, url] of [
    ['Damascus’s Nice Guide', 'https://damascus-nice-guide.vercel.app'],
    ['Crypto Trading Dashboard', 'https://crypto-trading-dashboard-inky.vercel.app'],
  ]) {
    assert.match(projects, new RegExp(name));
    assert.match(projects, new RegExp(`href="${url}"`));
  }
});

test('home service cards link to their anchor on the services page', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const services = readFileSync(path.join(process.cwd(), 'dist', 'servicios', 'index.html'), 'utf8');
  const anchors = [...home.matchAll(/href="\/servicios\/#([a-z0-9-]+)"/g)].map((match) => match[1]);

  assert.equal(anchors.length, 4);
  for (const anchor of anchors) {
    assert.match(services, new RegExp(`id="${anchor}"`));
  }
});

test('the services page describes concrete technical collaborations', () => {
  const services = readFileSync(path.join(process.cwd(), 'dist', 'servicios', 'index.html'), 'utf8');

  assert.match(services, /Desarrollo React y Next\.js/);
  assert.match(services, /Integraciones API/);
  assert.match(services, /Strapi y CMS headless/);
  assert.match(services, /React Native/);
  assert.match(services, /Colaboración con agencias/);
});

test('the about page includes experience, education, and verified skills', () => {
  const about = readFileSync(path.join(process.cwd(), 'dist', 'sobre-mi', 'index.html'), 'utf8');

  assert.match(about, /Eunoia Digital/);
  assert.match(about, /Ogilvy/);
  assert.match(about, /Desarrollo de Aplicaciones Web/);
  assert.match(about, /Desarrollo de Aplicaciones Multiplataforma/);
  assert.match(about, /Ethical Hacking/);
  assert.match(about, new RegExp(`Llevo ${yearsSince('2020-09-01')} años trabajando`));
  assert.doesNotMatch(about, /más de cuatro años/);
});

test('the contact page accepts professional and commercial enquiries', () => {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      WEB3FORMS_ACCESS_KEY: 'test-only-key',
    },
  });

  assert.equal(result.status, 0, `Expected a successful configured build.\n${result.stderr}`);

  const contact = readFileSync(path.join(process.cwd(), 'dist', 'contacto', 'index.html'), 'utf8');

  assert.match(contact, /action="https:\/\/api\.web3forms\.com\/submit"/);
  assert.match(contact, /name="nombre"/);
  assert.match(contact, /name="email"/);
  assert.match(contact, /name="tipo"/);
  assert.match(contact, /name="mensaje"/);
  assert.doesNotMatch(contact, /Nombre del negocio/);
});

test('the home combines professional positioning, work, and services', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');

  assert.match(home, /<title>Jordi Sánchez — Full-Stack Developer<\/title>/);
  assert.match(home, new RegExp(`${yearsSince('2020-09-01')} años con React, Next\\.js y TypeScript`));
  assert.match(home, /href="\/proyectos\/"[^>]*>\s*Ver proyectos/);
  assert.match(home, /href="\/contacto\/"[^>]*>\s*Trabajar conmigo/);
  assert.match(home, /Plataforma de reservas/);
  assert.match(home, /Desarrollo React y Next\.js/);
  assert.doesNotMatch(home, /barberías|peluquerías|centros de estética/i);
});

test('metadata and sitemap expose the professional brand and routes', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const manifest = readFileSync(path.join(process.cwd(), 'dist', 'site.webmanifest'), 'utf8');
  const sitemap = readFileSync(path.join(process.cwd(), 'dist', 'sitemap-0.xml'), 'utf8');

  assert.match(home, /property="og:site_name" content="Jordi Sánchez — Full-Stack Developer"/);
  assert.match(home, /name="twitter:image:alt" content="Jordi Sánchez — Full-Stack Developer en Barcelona"/);
  assert.match(manifest, /Full-Stack Developer/);

  for (const route of ['proyectos', 'servicios', 'negocios-locales/clubes', 'sobre-mi', 'contacto']) {
    assert.match(sitemap, new RegExp(`jordisanchezweb\\.es/${route}/`));
  }
});

test('the clubs landing addresses the full sports-business audience', () => {
  const clubs = readFileSync(
    path.join(process.cwd(), 'dist', 'negocios-locales', 'clubes', 'index.html'),
    'utf8',
  );

  for (const audience of ['clubes', 'academias', 'gimnasios', 'pádel', 'tenis']) {
    assert.match(clubs, new RegExp(audience, 'i'));
  }

  for (const need of ['inscripciones', 'reservas', 'patrocinadores', 'merchandising', 'eventos', 'automatización']) {
    assert.match(clubs, new RegExp(need, 'i'));
  }

  assert.match(clubs, /href="\/contacto\/"/);
});

test('professional profiles appear in the footer, contact page and Person sameAs', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const contact = readFileSync(path.join(process.cwd(), 'dist', 'contacto', 'index.html'), 'utf8');
  const profiles = [
    'https://github.com/jordisanchezcarbonell',
    'https://www.malt.es/profile/jordisanchez1',
  ];

  for (const url of profiles) {
    assert.match(home, new RegExp(`<footer[\\s\\S]*href="${url}"`));
    assert.match(contact, new RegExp(`href="${url}"`));
  }

  const jsonLd = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  const person = jsonLd['@graph'].find((node) => node['@type'] === 'Person');
  assert.deepEqual(person.sameAs, profiles);
});

test('the privacy page describes every field collected by the contact form', () => {
  const privacy = readFileSync(path.join(process.cwd(), 'dist', 'privacidad', 'index.html'), 'utf8');

  assert.match(privacy, /nombre/);
  assert.match(privacy, /dirección de correo electrónico/);
  assert.match(privacy, /organización.*opcional/i);
  assert.match(privacy, /motivo de contacto/);
  assert.match(privacy, /mensaje/);
});

test('the English version mirrors the professional pages under /en/', () => {
  const pages = {
    '/en/': /<h1[^>]*>Web products that reach production and stay stable\.<\/h1>/,
    '/en/projects/': /Payments and 3D Secure/,
    '/en/services/': /React and Next\.js development/,
    '/en/about/': /Building digital products from Barcelona/,
    '/en/contact/': /Let(?:'|&#39;|’)s talk about what you need to build or improve/,
    '/en/thanks/': /Thank you\. Your message is in\./,
  };

  for (const [route, heading] of Object.entries(pages)) {
    const html = readFileSync(path.join(process.cwd(), 'dist', route, 'index.html'), 'utf8');
    assert.match(html, /<html lang="en">/, route);
    assert.match(html, heading, route);
    assert.match(html, /property="og:locale" content="en_GB"/, route);
    assert.match(html, /property="og:image" content="https:\/\/www\.jordisanchezweb\.es\/og-image-en\.png"/, route);
  }
});

test('translated pages declare reciprocal hreflang alternates', () => {
  const pairs = [
    ['/', '/en/'],
    ['/proyectos/', '/en/projects/'],
    ['/servicios/', '/en/services/'],
    ['/sobre-mi/', '/en/about/'],
    ['/contacto/', '/en/contact/'],
    ['/proyectos/primer-down/', '/en/projects/primer-down/'],
  ];
  const site = 'https://www\\.jordisanchezweb\\.es';

  for (const [es, en] of pairs) {
    for (const route of [es, en]) {
      const html = readFileSync(path.join(process.cwd(), 'dist', route, 'index.html'), 'utf8');
      assert.match(html, new RegExp(`<link rel="alternate" hreflang="es" href="${site}${es}"`), route);
      assert.match(html, new RegExp(`<link rel="alternate" hreflang="en" href="${site}${en}"`), route);
      assert.match(html, new RegExp(`<link rel="alternate" hreflang="x-default" href="${site}${es}"`), route);
    }
  }

  // Spanish-only pages do not advertise a translation.
  const clubs = readFileSync(
    path.join(process.cwd(), 'dist', 'negocios-locales', 'clubes', 'index.html'),
    'utf8',
  );
  assert.doesNotMatch(clubs, /hreflang="en"[^>]*rel="alternate"|rel="alternate" hreflang="en"/);
});

test('the language switch links each page to its translation', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const enProjects = readFileSync(path.join(process.cwd(), 'dist', 'en', 'projects', 'index.html'), 'utf8');

  assert.match(home, /<a class="language-switch[^"]*" href="\/en\/" hreflang="en" lang="en"/);
  assert.match(enProjects, /<a class="language-switch[^"]*" href="\/proyectos\/" hreflang="es" lang="es"/);
});

test('English pages stay in English and link to English routes', () => {
  for (const route of ['/en/', '/en/projects/', '/en/services/', '/en/about/', '/en/contact/']) {
    const html = readFileSync(path.join(process.cwd(), 'dist', route, 'index.html'), 'utf8');
    const main = html.match(/<main[\s\S]*<\/main>/)[0];

    assert.doesNotMatch(main, /href="\/(proyectos|servicios|sobre-mi|contacto)\//, route);
    assert.doesNotMatch(main, /Qué hice|Ver proyectos|Trabajar conmigo|Problema/, route);
    assert.doesNotMatch(main, /\[?TODO/, route);
  }

  const home = readFileSync(path.join(process.cwd(), 'dist', 'en', 'index.html'), 'utf8');
  assert.doesNotMatch(home, /href="\/clubes\/"/);
  assert.match(home, new RegExp(`${yearsSince('2020-09-01')} years with React, Next\\.js and TypeScript`));
});

test('the English contact form redirects to the English thank-you page', () => {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, WEB3FORMS_ACCESS_KEY: 'test-only-key' },
  });
  assert.equal(result.status, 0, result.stderr);

  const contact = readFileSync(path.join(process.cwd(), 'dist', 'en', 'contact', 'index.html'), 'utf8');
  assert.match(contact, /name="redirect" value="https:\/\/www\.jordisanchezweb\.es\/en\/thanks\/"/);
  assert.match(contact, /<option value="Proyecto freelance"[^>]*>Freelance project<\/option>/);

  const sitemap = readFileSync(path.join(process.cwd(), 'dist', 'sitemap-0.xml'), 'utf8');
  assert.match(sitemap, /jordisanchezweb\.es\/en\/projects\//);
  assert.doesNotMatch(sitemap, /\/en\/thanks\//);
});

test('every project has a case study page in both languages', () => {
  const dist = path.join(process.cwd(), 'dist');
  const slugs = readdirSync(path.join(dist, 'proyectos'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  assert.ok(slugs.length >= 9, `Expected a case page per project, found ${slugs.length}.`);

  for (const slug of slugs) {
    for (const route of [['proyectos', slug], ['en', 'projects', slug]]) {
      assert.ok(
        existsSync(path.join(dist, ...route, 'index.html')),
        `Missing case page for ${route.join('/')}.`,
      );
    }
  }
});

test('the projects list links to every case page instead of repeating it', () => {
  const dist = path.join(process.cwd(), 'dist');
  const list = readFileSync(path.join(dist, 'proyectos', 'index.html'), 'utf8');
  const slugs = readdirSync(path.join(dist, 'proyectos'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const slug of slugs) {
    assert.match(list, new RegExp(`href="/proyectos/${slug}/"`));
  }

  // The full breakdown belongs to the case page, so the list must not duplicate it.
  assert.doesNotMatch(list, /Mi contribución/);
  assert.match(list, /Leer el caso completo/);
});

test('case pages carry breadcrumbs and their own structured data', () => {
  const casePage = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'pagos-3d-secure', 'index.html'),
    'utf8',
  );

  assert.match(casePage, /href="\/proyectos\/"/);
  assert.match(
    casePage,
    /<link rel="canonical" href="https:\/\/www\.jordisanchezweb\.es\/proyectos\/pagos-3d-secure\/"/,
  );

  const blocks = [...casePage.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
  const graph = blocks.flat();
  const work = graph.find((node) => node['@type'] === 'CreativeWork');
  const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList');

  assert.ok(work, 'Expected a CreativeWork node.');
  assert.equal(work.name, 'Pagos y 3D Secure');
  assert.ok(breadcrumb, 'Expected a BreadcrumbList node.');
  assert.deepEqual(
    breadcrumb.itemListElement.map((item) => item.position),
    [1, 2, 3],
  );
});

test('the local-business vertical keeps its own navigation and entry point', () => {
  const dist = path.join(process.cwd(), 'dist');
  const hub = readFileSync(path.join(dist, 'negocios-locales', 'index.html'), 'utf8');
  const examples = readFileSync(
    path.join(dist, 'negocios-locales', 'ejemplos', 'index.html'),
    'utf8',
  );

  for (const page of [hub, examples]) {
    const primaryNav = page.match(/<nav class="desktop-navigation[^"]*"[^>]*>([\s\S]*?)<\/nav>/)[1];

    for (const destination of ['/negocios-locales/ejemplos/', '/negocios-locales/clubes/', '/negocios-locales/blog/']) {
      assert.match(primaryNav, new RegExp(`href="${destination}"`));
    }

    // The technical portfolio is not part of the vertical's navigation.
    assert.doesNotMatch(primaryNav, /href="\/proyectos\/"/);
    assert.doesNotMatch(primaryNav, /href="\/sobre-mi\/"/);
    // Spanish-only vertical: no language switch.
    assert.doesNotMatch(primaryNav, /class="language-switch"/);
  }

  assert.match(hub, /Negocios locales/);
});

test('the vertical stays out of the index while the demo remains unindexed', () => {
  const dist = path.join(process.cwd(), 'dist');
  const sitemap = readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
  const demo = readFileSync(
    path.join(dist, 'negocios-locales', 'demos', 'taller-33', 'index.html'),
    'utf8',
  );

  for (const route of ['negocios-locales/', 'negocios-locales/ejemplos/', 'negocios-locales/blog/']) {
    assert.match(sitemap, new RegExp(`jordisanchezweb\\.es/${route}`));
  }

  assert.doesNotMatch(sitemap, /negocios-locales\/demos/);
  assert.match(demo, /name="robots" content="noindex, nofollow"/);
});

test('every moved route keeps a permanent redirect', () => {
  const config = JSON.parse(readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8'));
  const bySource = new Map(config.redirects.map((entry) => [entry.source, entry]));

  const moved = [
    ['/clubes/', '/negocios-locales/clubes/'],
    ['/ejemplos/', '/negocios-locales/ejemplos/'],
    ['/blog/:path*', '/negocios-locales/blog/:path*'],
    ['/demos/:path*', '/negocios-locales/demos/:path*'],
  ];

  for (const [source, destination] of moved) {
    const redirect = bySource.get(source);
    assert.ok(redirect, `Missing redirect for ${source}.`);
    assert.equal(redirect.destination, destination);
    assert.equal(redirect.permanent, true);
  }
});

test('pages ship a hash-based content security policy', () => {
  const pages = ['index.html', path.join('proyectos', 'primer-down', 'index.html')];

  for (const page of pages) {
    const html = readFileSync(path.join(process.cwd(), 'dist', page), 'utf8');
    const csp = html.match(/<meta http-equiv="content-security-policy" content="([^"]*)"/)?.[1];

    assert.ok(csp, `Expected a CSP meta tag on ${page}.`);
    assert.match(csp, /default-src 'self'/);
    assert.match(csp, /form-action 'self' https:\/\/api\.web3forms\.com/);
    assert.match(csp, /object-src 'none'/);

    // Astro inlines its scripts, so they must be allowed by hash and never by 'unsafe-inline'.
    const scriptSrc = csp.match(/script-src ([^;]*)/)[1];
    assert.match(scriptSrc, /'sha256-/);
    assert.doesNotMatch(scriptSrc, /'unsafe-inline'/);
    assert.doesNotMatch(scriptSrc, /'unsafe-eval'/);
  }
});

test('the response headers cover framing, transport and referrers', () => {
  const config = JSON.parse(readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8'));
  const rule = config.headers.find((entry) => entry.source === '/(.*)');
  const byKey = new Map(rule.headers.map((header) => [header.key, header.value]));

  assert.equal(byKey.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(byKey.get('X-Frame-Options'), 'DENY');
  assert.equal(byKey.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.match(byKey.get('Strict-Transport-Security'), /max-age=\d+/);
  // frame-ancestors is ignored inside a meta tag, so it has to travel as a header.
  assert.match(byKey.get('Content-Security-Policy'), /frame-ancestors 'none'/);
});

test('the blog publishes a feed and advertises it for autodiscovery', () => {
  const dist = path.join(process.cwd(), 'dist');
  const feed = readFileSync(path.join(dist, 'negocios-locales', 'blog', 'rss.xml'), 'utf8');
  const index = readFileSync(path.join(dist, 'negocios-locales', 'blog', 'index.html'), 'utf8');
  const post = readFileSync(
    path.join(dist, 'negocios-locales', 'blog', 'cuanto-cuesta-web-barberia-barcelona', 'index.html'),
    'utf8',
  );

  assert.match(feed, /<rss version="2\.0"/);
  assert.match(feed, /<link>https:\/\/www\.jordisanchezweb\.es\/negocios-locales\/blog\/<\/link>/);

  const items = [...feed.matchAll(/<item>/g)];
  assert.equal(items.length, 2);

  // Every entry must point at the vertical's own prefix, never the retired /blog/ route.
  for (const link of [...feed.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1])) {
    assert.match(link, /^https:\/\/www\.jordisanchezweb\.es\/negocios-locales\/blog\//);
  }

  for (const page of [index, post]) {
    assert.match(
      page,
      /<link rel="alternate" type="application\/rss\+xml"[^>]*href="\/negocios-locales\/blog\/rss\.xml"/,
    );
  }
});

test('blog posts declare their place in the site hierarchy', () => {
  const post = readFileSync(
    path.join(
      process.cwd(),
      'dist',
      'negocios-locales',
      'blog',
      'cuanto-cuesta-web-barberia-barcelona',
      'index.html',
    ),
    'utf8',
  );

  const blocks = [...post.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
  const graph = blocks.flat();
  const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList');
  const article = graph.find((node) => node['@type'] === 'Article');

  assert.ok(article, 'Expected an Article node.');
  assert.ok(breadcrumb, 'Expected a BreadcrumbList node.');
  assert.deepEqual(
    breadcrumb.itemListElement.map((item) => item.name),
    ['Negocios locales', 'Blog', '¿Cuánto cuesta una web para una barbería en Barcelona?'],
  );
  assert.match(article.mainEntityOfPage, /\/negocios-locales\/blog\//);
});

test('continuous integration runs the full verification suite', () => {
  const workflow = readFileSync(
    path.join(process.cwd(), '.github', 'workflows', 'ci.yml'),
    'utf8',
  );

  assert.match(workflow, /node-version-file: \.nvmrc/);
  for (const step of ['npm ci', 'npm run check', 'npm test']) {
    assert.match(workflow, new RegExp(step.replace(/ /g, '\\s')));
  }
});

test('demo pages stay out of the search index', () => {
  const dist = path.join(process.cwd(), 'dist');
  const demos = [
    path.join(dist, 'negocios-locales', 'demos', 'taller-33', 'index.html'),
    path.join(dist, 'demo-club', 'index.html'),
  ];

  for (const demo of demos) {
    const html = readFileSync(demo, 'utf8');
    assert.match(html, /name="robots" content="noindex, nofollow"/, demo);
  }
});

test('the CV is published in both languages from the same data as the site', () => {
  const dist = path.join(process.cwd(), 'dist');
  const es = readFileSync(path.join(dist, 'cv', 'index.html'), 'utf8');
  const en = readFileSync(path.join(dist, 'en', 'cv', 'index.html'), 'utf8');
  const about = readFileSync(path.join(dist, 'sobre-mi', 'index.html'), 'utf8');

  for (const page of [es, en]) {
    // Experience, education and stack all come from src/data/.
    assert.match(page, /Eunoia Digital/);
    assert.match(page, /Ogilvy/);
    assert.match(page, /Ethical Hacking/i);
    assert.match(page, /React Native/);
    assert.match(page, /jordigw@gmail\.com/);
  }

  assert.match(es, /Experiencia/);
  assert.match(en, /Experience/);

  // The about page and the CV must never drift apart on shared facts.
  for (const fact of ['Eunoia Digital', 'Ogilvy', 'Strapi']) {
    assert.match(about, new RegExp(fact));
    assert.match(es, new RegExp(fact));
  }
});

test('the CV prints without the site chrome around it', () => {
  const css = readdirSync(path.join(process.cwd(), 'dist', '_astro'))
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(process.cwd(), 'dist', '_astro', file), 'utf8'))
    .join('\n');

  // The PDF is produced by printing the page, so header, footer and the button must be hidden.
  assert.match(css, /@media print/);
  assert.match(css, /@page\{margin:14mm\}|@page\s*{\s*margin:\s*14mm/);

  const cv = readFileSync(path.join(process.cwd(), 'dist', 'cv', 'index.html'), 'utf8');
  assert.match(cv, /class="[^"]*no-print[^"]*"/);
});

test('the CV is reachable from the footer in both languages', () => {
  const dist = path.join(process.cwd(), 'dist');
  const home = readFileSync(path.join(dist, 'index.html'), 'utf8');
  const enHome = readFileSync(path.join(dist, 'en', 'index.html'), 'utf8');

  assert.match(home.match(/<footer[\s\S]*<\/footer>/)[0], /href="\/cv\/"/);
  assert.match(enHome.match(/<footer[\s\S]*<\/footer>/)[0], /href="\/en\/cv\/"/);
});

test('the anonymized cases carry an accessible inline diagram', () => {
  const dist = path.join(process.cwd(), 'dist');
  const withDiagram = ['pagos-3d-secure', 'integraciones-empresariales', 'plataforma-reservas'];

  for (const slug of withDiagram) {
    for (const base of [['proyectos', slug], ['en', 'projects', slug]]) {
      const html = readFileSync(path.join(dist, ...base, 'index.html'), 'utf8');
      const svg = html.match(/<svg[\s\S]*?<\/svg>/)?.[0];

      assert.ok(svg, `Expected a diagram on ${base.join('/')}.`);
      assert.match(svg, /role="img"/);
      assert.match(svg, /aria-label="[^"]{20,}"/);
      assert.match(html, /<figcaption[\s>]/);

      // Self-contained: no scripts, styles or external images inside the drawing.
      assert.doesNotMatch(svg, /<script|<foreignObject|<image|xlink:href="http/);
    }
  }

  // Projects whose prose describes no mechanism get no invented diagram.
  const plain = readFileSync(path.join(dist, 'proyectos', 'cms-headless', 'index.html'), 'utf8');
  assert.doesNotMatch(plain, /<svg/);
});

test('diagram labels are translated, not left in Spanish on the English pages', () => {
  const dist = path.join(process.cwd(), 'dist');
  const en = readFileSync(path.join(dist, 'en', 'projects', 'pagos-3d-secure', 'index.html'), 'utf8');
  const es = readFileSync(path.join(dist, 'proyectos', 'pagos-3d-secure', 'index.html'), 'utf8');

  assert.match(es, /Pago iniciado/);
  assert.match(es, /fuera de la app/);
  assert.match(en, /Payment started/);
  assert.match(en, /outside the app/);
  assert.doesNotMatch(en.match(/<svg[\s\S]*?<\/svg>/)[0], /Pago iniciado|fuera de la app/);
});

test('the hero leads with real work, not an ornament', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const hero = home.match(/<section class="hero"[\s\S]*?<\/section>/)[0];

  // The preview links to the case and carries a real alt text, not decoration.
  assert.match(hero, /href="\/proyectos\/primer-down\/"/);
  assert.match(hero, /<img[^>]+alt="Portada de Primer Down[^"]+"/);
  assert.match(hero, /Proyecto destacado/i);

  // It is the largest paintable element above the fold, so it must not be lazy.
  const img = hero.match(/<img[^>]*>/)[0];
  assert.match(img, /loading="eager"/);
  assert.match(img, /fetchpriority="high"/);
  assert.match(img, /width="\d+"[^>]*height="\d+"|height="\d+"[^>]*width="\d+"/);
});

test('the home never shows the same screenshot twice', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const alts = [...home.matchAll(/<img[^>]+alt="([^"]+)"/g)].map((match) => match[1]);

  assert.equal(new Set(alts).size, alts.length, `Duplicate images on the home: ${alts.join(' | ')}`);
});

test('the English hero mirrors the Spanish one', () => {
  const en = readFileSync(path.join(process.cwd(), 'dist', 'en', 'index.html'), 'utf8');
  const hero = en.match(/<section class="hero"[\s\S]*?<\/section>/)[0];

  assert.match(hero, /href="\/en\/projects\/primer-down\/"/);
  assert.match(hero, /Featured project/i);
});

test('the Reservas demo stays unlinked while its database is paused', () => {
  const dist = path.join(process.cwd(), 'dist');
  const pages = ['index.html', path.join('proyectos', 'index.html'), path.join('proyectos', 'reservas', 'index.html')];

  // Its public entry point (/r/casa-brava) answers 404 while Supabase is paused, so linking
  // it would send visitors to a broken page. Restore the link together with the database.
  for (const page of pages) {
    const html = readFileSync(path.join(dist, page), 'utf8');
    assert.doesNotMatch(html, /reservas-b\.vercel\.app/, page);
  }

  // The project itself keeps its case page; only the outbound link is gone.
  const reservas = readFileSync(path.join(dist, 'proyectos', 'reservas', 'index.html'), 'utf8');
  assert.match(reservas, /Reservas/);
  assert.match(reservas, /Supabase/);
});

test('a case is labelled anonymized by its data, not by whether it is linked', () => {
  const dist = path.join(process.cwd(), 'dist');

  // Jordi's own project, currently without an outbound link, is still not a client case.
  const own = readFileSync(path.join(dist, 'proyectos', 'reservas', 'index.html'), 'utf8');
  assert.match(own, /Proyecto público/);
  assert.doesNotMatch(own, /Caso anonimizado/);

  const client = readFileSync(path.join(dist, 'proyectos', 'pagos-3d-secure', 'index.html'), 'utf8');
  assert.match(client, /Caso anonimizado/);
});
