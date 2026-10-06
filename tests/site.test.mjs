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
  const routes = ['/proyectos/', '/servicios/', '/clubes/', '/sobre-mi/', '/contacto/'];
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
  assert.match(home, /class="mobile-actions[^"]*"[^>]*>\s*<a class="nav-cta[^"]*" href="\/contacto\/"/);
});

test('the primary navigation reaches every professional area', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const primaryNav = home.match(/<nav class="desktop-navigation[^"]*"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const footer = home.match(/<footer[\s\S]*<\/footer>/)[0];

  for (const destination of ['/proyectos/', '/servicios/', '/sobre-mi/', '/contacto/']) {
    assert.match(primaryNav, new RegExp(`href="${destination}"`));
  }

  // Clubs and the blog are secondary: footer (and the home clubs section), not the main nav.
  assert.doesNotMatch(primaryNav, /href="\/clubes\/"/);
  assert.doesNotMatch(primaryNav, /href="\/blog\/"/);
  assert.match(footer, /href="\/clubes\/"/);
  assert.match(footer, /href="\/blog\/"/);
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
  const projects = readFileSync(
    path.join(process.cwd(), 'dist', 'proyectos', 'index.html'),
    'utf8',
  );

  for (const page of [home, projects]) {
    assert.match(page, /Qué hice/);
    assert.match(page, /errores intermitentes en la verificación 3DS/);
    assert.match(page, /lifecycle hooks y webhooks/);
    assert.doesNotMatch(page, /\[?TODO/);
  }
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
  assert.match(projects, /archivo editorial bilingüe/i);

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
    ['Reservas', 'https://reservas-b.vercel.app'],
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

  for (const route of ['proyectos', 'servicios', 'clubes', 'sobre-mi', 'contacto']) {
    assert.match(sitemap, new RegExp(`jordisanchezweb\\.es/${route}/`));
  }
});

test('the clubs landing addresses the full sports-business audience', () => {
  const clubs = readFileSync(path.join(process.cwd(), 'dist', 'clubes', 'index.html'), 'utf8');

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
