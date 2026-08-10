import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

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

test('the home presents Jordi as a Full-Stack Developer without the retired portfolio', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');

  assert.match(home, /<h1[^>]*>[^<]*Jordi Sánchez[^<]*Full-Stack Developer[^<]*<\/h1>/);
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

test('the home name uses the neutral sans display face', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(home, /<h1 class="hero-title"[^>]*>Jordi Sánchez — Full-Stack Developer<\/h1>/);
  assert.match(compiledCss, /\.hero-title\[[^\]]+\]\{[^}]*font-family:var\(--sans\)/);
});

test('the footer name uses the same neutral sans face', () => {
  const cssDirectory = path.join(process.cwd(), 'dist', '_astro');
  const compiledCss = readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n');

  assert.match(compiledCss, /\.footer-name\[[^\]]+\]\{[^}]*font-family:var\(--sans\)/);
});

test('the primary navigation reaches every professional area', () => {
  const home = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  const destinations = ['/proyectos/', '/servicios/', '/clubes/', '/sobre-mi/', '/contacto/'];

  for (const destination of destinations) {
    assert.match(home, new RegExp(`href="${destination}"`));
  }
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
  assert.match(home, /Más de 4 años desarrollando aplicaciones web y móviles/);
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

test('the privacy page describes every field collected by the contact form', () => {
  const privacy = readFileSync(path.join(process.cwd(), 'dist', 'privacidad', 'index.html'), 'utf8');

  assert.match(privacy, /nombre/);
  assert.match(privacy, /dirección de correo electrónico/);
  assert.match(privacy, /organización.*opcional/i);
  assert.match(privacy, /motivo de contacto/);
  assert.match(privacy, /mensaje/);
});
