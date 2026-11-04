// Comprueba la integridad del contenido sin navegador: node pruebas/contenido.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { SESIONES, TEMAS, sesionPorId } from '../js/content/sesiones.js';
import { LECTURAS, ORIGENES } from '../js/content/lecturas.js';
import { EMOCIONES } from '../js/content/emociones.js';
import { EJERCICIOS, ejercicioPorId } from '../js/content/ejercicios.js';
import { FASES, SITUACIONES, planDelDia } from '../js/content/caminos.js';
import { AFORISMOS } from '../js/content/aforismos.js';
import { BIBLIOGRAFIA, refPorId, TELEFONOS } from '../js/content/referencias.js';
import { CLIPS } from '../js/content/voz-clips.js';
import { construirLinea, estimarVoz } from '../js/linea.js';
import { duracionClip, huella } from '../js/voz.js';

let revisados = 0;
const ok = (cond, msg) => {
  revisados += 1;
  assert.ok(cond, msg);
};

const duracion = (txt) => duracionClip(txt) ?? estimarVoz(txt);

// Sesiones
const ids = new Set();
SESIONES.forEach((s) => {
  ok(!ids.has(s.id), `id repetido: ${s.id}`);
  ids.add(s.id);
  ok(TEMAS[s.tema], `tema inválido en ${s.id}`);
  ok(s.resumen.length <= 90, `resumen largo en ${s.id}: ${s.resumen.length}`);
  ok(s.fuente.length > 0, `sin fuente en ${s.id}`);
  s.fuente.forEach(([f]) => ok(ORIGENES[f], `origen inválido en ${s.id}`));
  s.duraciones.forEach((min) => {
    const { total, marcas, silencio } = construirLinea(s, min, duracion);
    ok(total === min * 60, `total incorrecto en ${s.id}`);
    ok(silencio >= 3, `${s.id} (${min} min): queda muy poco silencio entre frases (${silencio.toFixed(1)} s)`);
    marcas.forEach((m, i) => {
      ok(m.t >= 0 && m.t < total, `${s.id} (${min} min): marca fuera de la sesión`);
      if (i > 0) {
        const fin = marcas[i - 1].t + duracion(marcas[i - 1].txt);
        ok(m.t >= fin + 1, `${s.id} (${min} min): frases solapadas en "${m.txt}"`);
      }
    });
    const ultima = marcas[marcas.length - 1];
    ok(ultima.t + duracion(ultima.txt) <= total, `${s.id} (${min} min): la última frase no alcanza a terminar`);
    // Todo el cuerpo debe alcanzar a decirse
    s.cuerpo.forEach((l) => ok(marcas.some((m) => m.txt === l), `${s.id}: falta "${l}"`));
  });
});

// Lecturas
const lecIds = new Set();
LECTURAS.forEach((l) => {
  ok(!lecIds.has(l.id), `lectura repetida: ${l.id}`);
  lecIds.add(l.id);
  ok(sesionPorId(l.practica), `práctica inexistente en ${l.id}: ${l.practica}`);
  l.bloques.forEach(([f]) => ok(ORIGENES[f], `origen inválido en ${l.id}`));
  (l.refs || []).forEach((r) => ok(refPorId(r), `referencia inexistente en ${l.id}: ${r}`));
});

// Emociones
EMOCIONES.forEach((e) => {
  e.sesiones.forEach((id) => ok(sesionPorId(id), `sesión inexistente en ${e.id}: ${id}`));
  if (e.ejercicio) ok(ejercicioPorId(e.ejercicio), `ejercicio inexistente en ${e.id}`);
});
ok(EMOCIONES.length === 7, 'deben ser las 7 emociones del informe');

// Fases
FASES.forEach((f) => {
  [5, 10, 20].forEach((m) => {
    const plan = planDelDia(f.id, m);
    plan.forEach((p) => {
      const s = sesionPorId(p.sesion);
      ok(s, `sesión inexistente en fase ${f.id}: ${p.sesion}`);
      ok(s.duraciones.includes(p.min), `${p.sesion} no tiene versión de ${p.min} min (fase ${f.id})`);
      if (p.rotar) p.rotar.forEach((id) => ok(sesionPorId(id).duraciones.includes(p.min), `${id} sin ${p.min} min`));
      if (p.alternativa) ok(ejercicioPorId(p.alternativa), `alternativa inexistente: ${p.alternativa}`);
    });
    const suma = plan.reduce((a, p) => a + p.min, 0);
    ok(suma === m, `el plan de la fase ${f.id} para ${m} min suma ${suma}`);
  });
  if (f.semanal) ok(ejercicioPorId(f.semanal.ejercicio), 'ejercicio semanal inexistente');
  if (f.mensual) ok(ejercicioPorId(f.mensual.ejercicio), 'ejercicio mensual inexistente');
});

// Situaciones
ok(SITUACIONES.length === 7, 'deben ser las 7 situaciones del informe');
SITUACIONES.forEach((s) => {
  if (s.sesion) ok(sesionPorId(s.sesion), `sesión inexistente en ${s.id}`);
  if (s.ejercicio) ok(ejercicioPorId(s.ejercicio), `ejercicio inexistente en ${s.id}`);
});

// Ejercicios
const tipos = new Set(['leer', 'respirar', 'chips', 'opcion', 'texto', 'lista', 'tiempo', 'copiar']);
EJERCICIOS.forEach((e) => {
  e.pasos.forEach((p) => {
    ok(tipos.has(p.k), `tipo de paso inválido en ${e.id}: ${p.k}`);
    if (['chips', 'opcion', 'texto', 'lista', 'tiempo'].includes(p.k)) ok(p.clave, `paso sin clave en ${e.id}: ${p.t}`);
  });
  ok(e.fuente.length > 0, `ejercicio sin fuente: ${e.id}`);
});
ok(ejercicioPorId('ahora').pasos.length === 8, 'el protocolo 9.1 tiene 8 pasos');
ok(ejercicioPorId('reajuste').pasos.length === 9, 'el protocolo 9.2 tiene 9 pasos');

// Otros
ok(AFORISMOS.length >= 7, 'faltan aforismos');
ok(BIBLIOGRAFIA.flatMap((g) => g.items).length >= 25, 'bibliografía incompleta');
ok(TELEFONOS.some((t) => t.numero === '*4141'), 'falta la línea de prevención del suicidio');

// Audios: todo lo que declara el manifiesto debe existir
Object.keys(CLIPS).forEach((k) => ok(existsSync(new URL(`../audio/voz/${k}.m4a`, import.meta.url)), `falta audio ${k}`));

// Palabras con género en los guiones (la voz le habla a madres y padres por igual)
const genero = /\b(solo|sola|cansado|cansada|tranquilo|tranquila|agitado|agitada|atrapado|atrapada|cómodo|cómoda|sentado|sentada|obligado|obligada)\b/i;
const permitidas = [/solo esta respiración/i, /^solo /i, /por ahora, solo/i, /solo acompáñala/i, /cada sonido llega solo/i, /llegue sola/i, /asienta sola/i, /baje solo/i, /sube y baje solo/i, /postura cómoda/i, /más cómodo/i, /respiraciones tranquilas/i, /trayecto tranquilo/i];
SESIONES.forEach((s) => {
  [...s.inicio, ...s.cuerpo, ...(s.relleno || []), ...s.cierre].forEach((l) => {
    if (genero.test(l) && !permitidas.some((p) => p.test(l))) {
      console.log(`  revisar género: ${s.id}: ${l}`);
    }
  });
});

// sw.js al día
const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
ok(sw.includes('js/app.js'), 'sw.js no incluye la app');

const frases = new Set(SESIONES.flatMap((s) => [...s.inicio, ...s.cuerpo, ...(s.relleno || []), ...s.cierre]));
console.log(`Contenido correcto: ${revisados} comprobaciones.`);
console.log(`${SESIONES.length} sesiones, ${LECTURAS.length} lecturas, ${EJERCICIOS.length} ejercicios, ${frases.size} frases, ${[...frases].filter((f) => CLIPS[huella(f)]).length} con audio.`);
