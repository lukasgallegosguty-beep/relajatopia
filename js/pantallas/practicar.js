import { useEffect, useState } from '../../vendor/preact-htm.mjs';
import { html, Cordillera, Icono, Selector, Enlace, esOscuro } from '../ui.js';
import { useEstado } from '../estado.js';
import { SESIONES, TEMAS, textoDuraciones } from '../content/sesiones.js';
import { FASES, SITUACIONES } from '../content/caminos.js';
import { LECTURAS } from '../content/lecturas.js';
import { EJERCICIOS } from '../content/ejercicios.js';
import { AMBIENTES, encender, apagar, estaActivo, cambiarVolumen, volumenDe, programarApagado, cancelarApagado, minutosParaApagar, escucharSonido, preparar } from '../sonido.js';

const SEGMENTOS = [
  { v: 'sesiones', txt: 'Sesiones' },
  { v: 'caminos', txt: 'Caminos' },
  { v: 'lecturas', txt: 'Lecturas' },
  { v: 'sonidos', txt: 'Sonidos' },
];

function Sesiones({ e }) {
  const [tema, fijarTema] = useState('todas');
  const [tiempo, fijarTiempo] = useState(0);
  const lista = SESIONES.filter((s) => (tema === 'todas' || s.tema === tema) && (!tiempo || s.duraciones.some((d) => d <= tiempo)));
  const filas = lista.map((s) => ({
    clave: s.id,
    ruta: `/sesion/${s.id}`,
    titulo: s.titulo,
    sub: s.resumen,
    der: textoDuraciones(s),
  }));
  return html`<div>
    <div class="filtros">
      <div class="desliza" role="group" aria-label="Filtrar por tema">
        ${[['todas', 'Todas'], ...Object.entries(TEMAS).map(([k, v]) => [k, v.nombre])].map(([k, n]) => html`<button type="button" class=${`chip ${tema === k ? 'activo' : ''}`} aria-pressed=${tema === k} onClick=${() => fijarTema(k)}>${n}</button>`)}
      </div>
      <div class="desliza" role="group" aria-label="Filtrar por duración">
        ${[[0, 'Cualquier duración'], [5, 'Hasta 5 min'], [10, 'Hasta 10 min']].map(([k, n]) => html`<button type="button" class=${`chip chip-suave ${tiempo === k ? 'activo' : ''}`} aria-pressed=${tiempo === k} onClick=${() => fijarTiempo(k)}>${n}</button>`)}
      </div>
    </div>
    ${filas.length
      ? html`<${Cordillera} key=${`${tema}-${tiempo}-${esOscuro()}`} filas=${filas} etiqueta="Sesiones" />`
      : html`<p class="nota relleno">No hay sesiones con ese filtro. Prueba con otra duración.</p>`}
  </div>`;
}

function Caminos({ e }) {
  const filas = FASES.map((f) => ({
    clave: `fase${f.id}`,
    ruta: `/fase/${f.id}`,
    titulo: f.nombre,
    sub: f.plazo,
    der: f.id === e.perfil.fase ? 'Tu fase' : null,
  }));
  const otros = [
    { clave: 'paternidad', ruta: '/paternidad', titulo: 'Criar después del divorcio', sub: `${SITUACIONES.length} situaciones con pasos concretos.` },
    ...EJERCICIOS.filter((x) => x.id !== 'ahora').map((x) => ({
      clave: x.id,
      ruta: `/ejercicio/${x.id}`,
      titulo: x.titulo,
      sub: x.resumen,
      der: `${x.minutos} min`,
    })),
  ];
  return html`<div>
    <p class="intro">Tres fases con un plan diario de 5, 10 o 20 minutos, y herramientas para situaciones concretas.</p>
    <${Cordillera} filas=${[...filas, ...otros]} etiqueta="Caminos y herramientas" />
  </div>`;
}

function Lecturas() {
  const [tema, fijarTema] = useState('todas');
  const lista = LECTURAS.filter((l) => tema === 'todas' || l.tema === tema);
  const filas = lista.map((l) => ({
    clave: l.id,
    ruta: `/lectura/${l.id}`,
    titulo: l.titulo,
    sub: TEMAS[l.tema].nombre,
  }));
  const temas = Object.entries(TEMAS).filter(([k]) => k !== 'dormir');
  return html`<div>
    <div class="filtros">
      <div class="desliza" role="group" aria-label="Filtrar por tema">
        ${[['todas', 'Todas'], ...temas.map(([k, v]) => [k, v.nombre])].map(([k, n]) => html`<button type="button" class=${`chip ${tema === k ? 'activo' : ''}`} aria-pressed=${tema === k} onClick=${() => fijarTema(k)}>${n}</button>`)}
      </div>
    </div>
    <${Cordillera} key=${tema} filas=${filas} etiqueta="Lecturas" />
    <p class="nota relleno"><${Enlace} ruta="/evidencia" clase="enlace">Qué dice la evidencia sobre estos programas<//></p>
  </div>`;
}

function Sonidos() {
  const [, marcar] = useState(0);
  useEffect(() => escucharSonido(() => marcar((x) => x + 1)), []);
  const quedan = minutosParaApagar();
  return html`<div class="sonidos">
    <p class="intro">Se generan en tu teléfono y funcionan sin conexión. Combina los que quieras.</p>
    <ul class="mezcla">
      ${AMBIENTES.map((a) => {
        const on = estaActivo(a.id);
        return html`<li class=${on ? 'on' : ''}>
          <button type="button" class="mezcla-boton" aria-pressed=${on} onClick=${() => {
            preparar();
            if (on) apagar(a.id);
            else encender(a.id);
          }}>
            <span class="boton-piedra"><${Icono} n=${on ? 'pausa' : 'play'} t=${20} /></span>
            <span><strong>${a.nombre}</strong><small>${a.detalle}</small></span>
          </button>
          ${on
            ? html`<input type="range" aria-label=${`Volumen de ${a.nombre}`} min="0" max="1" step="0.05" value=${volumenDe(a.id)} onInput=${(ev) => cambiarVolumen(a.id, Number(ev.target.value))} />`
            : null}
        </li>`;
      })}
    </ul>
    <h2>Apagar solo</h2>
    <${Selector}
      etiqueta="Temporizador de apagado"
      valor=${quedan ? 'on' : 0}
      opciones=${[{ v: 0, txt: 'No' }, { v: 15, txt: '15 min' }, { v: 30, txt: '30 min' }, { v: 60, txt: '60 min' }]}
      alCambiar=${(v) => (v ? programarApagado(v) : cancelarApagado())}
    />
    ${quedan ? html`<p class="nota">Se apagan en ${quedan} min.</p>` : null}
    <p class="nota">Mantén la app abierta. En algunos teléfonos, el sonido se detiene al bloquear la pantalla.</p>
  </div>`;
}

export function Practicar({ seccion }) {
  const e = useEstado();
  const actual = SEGMENTOS.some((s) => s.v === seccion) ? seccion : 'sesiones';
  return html`<div class="pantalla-practicar">
    <header class="titulo-grande">
      <h1>Practicar</h1>
      <nav class="segmentos" aria-label="Secciones">
        ${SEGMENTOS.map((s) => html`<a href=${`#/practicar/${s.v}`} aria-current=${actual === s.v ? 'page' : null}>${s.txt}</a>`)}
      </nav>
    </header>
    ${actual === 'sesiones' && html`<${Sesiones} e=${e} />`}
    ${actual === 'caminos' && html`<${Caminos} e=${e} />`}
    ${actual === 'lecturas' && html`<${Lecturas} />`}
    ${actual === 'sonidos' && html`<${Sonidos} />`}
  </div>`;
}
