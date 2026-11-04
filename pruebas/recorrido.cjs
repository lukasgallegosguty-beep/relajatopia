// Recorrido completo en emulación de teléfono.
// Uso: python3 -m http.server 8765 --bind 127.0.0.1 (en la raíz del proyecto)
//      NODE_PATH=$(npm root -g) node pruebas/recorrido.cjs
const assert = require('node:assert/strict');
const { chromium, devices } = require('playwright');

const BASE = process.env.BASE || 'http://127.0.0.1:8765/index.html';
const CLAVE = 'relajatopia.v1';

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(`pageerror: ${e.message}`));
  p.on('console', (m) => {
    if (m.type() === 'error' && !/favicon|ERR_|404/.test(m.text())) errores.push(`console: ${m.text()}`);
  });
  const leer = () => p.evaluate((c) => JSON.parse(localStorage.getItem(c)), CLAVE);
  const paso = (t) => console.log(`  ${t}`);
  const fila = (n) => p.waitForTimeout(n);
  const sinDesborde = async (donde) => {
    const r = await p.evaluate(() => ({ a: document.documentElement.scrollWidth, b: window.innerWidth }));
    assert.ok(r.a <= r.b + 1, `desborde horizontal en ${donde}: ${r.a} > ${r.b}`);
  };

  paso('Bienvenida');
  await p.goto(BASE);
  await fila(400);
  await p.fill('input[type=text]', 'Ana');
  await p.click('text=Comenzar');
  await p.click('text=Criar después de un divorcio');
  await p.click('text=Continuar');
  assert.ok(await p.isDisabled('button:has-text("Continuar")'), 'debe exigir elegir un momento');
  await p.click('text=Estoy retomando el equilibrio');
  await p.click('text=Continuar');
  await p.click('text=10 minutos');
  await p.click('text=Continuar');
  await p.click('text=Entendido, empezar');
  await fila(500);
  let e = await leer();
  assert.equal(e.perfil.nombre, 'Ana');
  assert.equal(e.perfil.fase, 2);
  assert.equal(e.perfil.minutos, 10);
  assert.ok(await p.isVisible('text=Buen'), 'saludo en Hoy');
  await sinDesborde('Hoy');

  paso('Registro con emoción difícil lleva a su ficha');
  await p.click('.ola >> nth=1');
  await fila(300);
  await p.click('.chip:has-text("Ira")');
  await p.fill('textarea', 'Discusión por el traspaso');
  await p.click('button:has-text("Guardar")');
  await fila(300);
  assert.ok(await p.isVisible('h1:has-text("Ira")'), 'ficha de la emoción');
  e = await leer();
  assert.equal(e.registros.length, 1);
  assert.equal(e.registros[0].emocion, 'ira');
  assert.ok(await p.isVisible('text=Tradición'));

  paso('Hoy sugiere una práctica según la emoción');
  await p.goto(`${BASE}#/hoy`);
  await fila(300);
  assert.ok(await p.isVisible('text=Porque hoy registraste ira.'), 'sugerencia por emoción');

  paso('Filtros de Practicar');
  await p.goto(`${BASE}#/practicar`);
  await fila(300);
  const todas = await p.locator('.cordillera li').count();
  await p.click('.chip:has-text("Dormir")');
  await fila(200);
  const dormir = await p.locator('.cordillera li').count();
  assert.ok(dormir >= 1 && dormir < todas, 'filtro por tema');
  await sinDesborde('Practicar');

  paso('Una sesión corre, se pausa y agrega una piedra al minuto');
  await p.goto(`${BASE}#/sesion/exhalar-largo/3`);
  await fila(300);
  await p.click('button:has-text("Empezar")');
  await fila(6500);
  assert.ok((await p.textContent('.rep-frase')).includes('Siéntate'), 'la primera frase aparece');
  await p.click('[aria-label="Pausar"]');
  const t1 = await p.textContent('.rep-tiempo');
  await fila(1300);
  assert.equal(await p.textContent('.rep-tiempo'), t1, 'el tiempo se detiene en pausa');
  await p.click('[aria-label="Continuar"]');
  await fila(56000);
  await p.click('[aria-label="Terminar la sesión"]');
  await p.click('.rep-confirmar button:has-text("Terminar")');
  await fila(500);
  e = await leer();
  assert.equal(e.practicas.length, 1, 'una piedra');
  assert.ok(await p.isVisible('text=Una piedra más'));
  await p.click('.ola >> nth=3');
  e = await leer();
  assert.equal(e.practicas[0].agua, 4, 'agua después de practicar');

  paso('Protocolo Ahora, con rama y copia en el Diario');
  await p.goto(`${BASE}#/ejercicio/ahora`);
  await fila(400);
  await p.click('button:has-text("Continuar")');
  assert.ok(await p.isDisabled('button:has-text("Continuar")'), 'respirar exige terminar los ciclos');
  await fila(40400);
  await p.click('button:has-text("Continuar")');
  await p.click('.chip:has-text("Ira")');
  await p.click('button:has-text("Continuar")');
  await p.click('.chip:has-text("Pecho")');
  await p.click('button:has-text("Continuar")');
  await p.click('.opcion:has-text("Sí, tiene remedio")');
  await p.fill('textarea', 'Escribir mañana con calma');
  await p.click('button:has-text("Continuar")');
  await p.click('button:has-text("Continuar")'); // paso opcional
  await p.click('.opcion:has-text("Ceder para evitar el conflicto")');
  assert.ok(await p.isVisible('text=compasión idiota'));
  await p.click('button:has-text("Continuar")');
  await p.fill('textarea', 'Proteger a mis hijos');
  await p.click('button:has-text("Terminar")');
  await fila(500);
  e = await leer();
  assert.equal(e.escritos.length, 1);
  assert.equal(e.escritos[0].datos.accion, 'Escribir mañana con calma');
  assert.equal(e.practicas.length, 2);

  paso('Diario muestra lo guardado');
  await p.goto(`${BASE}#/diario`);
  await fila(300);
  await p.click('text=Ver lo que escribiste');
  assert.ok(await p.isVisible('text=Escribir mañana con calma'));
  await sinDesborde('Diario');

  paso('Todas las pantallas abren sin errores ni desborde');
  const leerDe = await p.evaluate(() => import('./js/content/lecturas.js').then((m) => m.LECTURAS.map((l) => l.id)));
  const sesiones = await p.evaluate(() => import('./js/content/sesiones.js').then((m) => m.SESIONES.map((s) => s.id)));
  const ejercicios = await p.evaluate(() => import('./js/content/ejercicios.js').then((m) => m.EJERCICIOS.map((s) => s.id)));
  const rutas = [
    'tu', 'ajustes', 'ayuda', 'evidencia', 'bibliografia', 'paternidad', 'fase/1', 'fase/2', 'fase/3', 'respirar',
    'practicar/caminos', 'practicar/lecturas', 'practicar/sonidos',
    'situacion/antes-traspaso', 'situacion/despues-traspaso', 'situacion/conflicto', 'situacion/anoranza', 'situacion/culpa', 'situacion/fechas', 'situacion/compromiso',
    'emocion/ira', 'emocion/resentimiento', 'emocion/culpa', 'emocion/tristeza', 'emocion/miedo', 'emocion/envidia', 'emocion/soledad',
    ...leerDe.map((x) => `lectura/${x}`), ...sesiones.map((x) => `sesion/${x}`), ...ejercicios.filter((x) => x !== 'ahora').map((x) => `ejercicio/${x}`),
  ];
  for (const r of rutas) {
    await p.goto(`${BASE}#/${r}`);
    await fila(60);
    await sinDesborde(r);
  }

  paso('Temas y sonidos');
  await p.goto(`${BASE}#/ajustes`);
  await fila(200);
  await p.click('.selector button:has-text("Oscuro")');
  await fila(100);
  assert.equal(await p.evaluate(() => document.documentElement.dataset.tema), 'oscuro');
  await p.click('.selector button:has-text("Claro")');
  await p.goto(`${BASE}#/practicar/sonidos`);
  await fila(200);
  await p.click('.mezcla-boton:has-text("Lluvia")');
  await fila(200);
  assert.ok(await p.isVisible('text=Sonido de fondo activo'));
  await p.click('.selector button:has-text("15 min")');
  await fila(100);
  assert.ok(await p.isVisible('text=Se apagan en 15 min.'));
  await p.click('.mini-sonido button:has-text("Detener")');

  paso('Respaldo: exportar, borrar y restaurar');
  const respaldo = await p.evaluate(() => import('./js/estado.js').then((m) => m.exportarDatos()));
  await p.goto(`${BASE}#/ajustes`);
  await fila(200);
  await p.click('text=Borrar todos mis datos');
  await p.click('button:has-text("Borrar todo")');
  await fila(400);
  assert.ok(await p.isVisible('text=Comenzar'), 'vuelve a la bienvenida');
  await p.evaluate((r) => import('./js/estado.js').then((m) => m.importarDatos(r)), respaldo);
  await fila(400);
  e = await leer();
  assert.equal(e.perfil.nombre, 'Ana');
  assert.equal(e.practicas.length, 2);

  assert.deepEqual(errores, [], 'errores de consola');
  await b.close();
  console.log('Recorrido correcto.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
