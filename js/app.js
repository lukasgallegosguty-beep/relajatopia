// Punto de entrada: navegación, tema y marco de la app.

import { render, useEffect, useErrorBoundary, useState } from '../vendor/preact-htm.mjs';
import { html, Icono } from './ui.js';
import { useEstado } from './estado.js';
import { horaActual } from './laguna.js';
import { escucharSonido, hayAlgoSonando, apagarTodo } from './sonido.js';
import { Bienvenida } from './pantallas/bienvenida.js';
import { Hoy } from './pantallas/hoy.js';
import { Registro, Emocion } from './pantallas/registro.js';
import { Practicar } from './pantallas/practicar.js';
import { Sesion, Reproductor, Terminada } from './pantallas/sesion.js';
import { Respirar } from './pantallas/respirar.js';
import { Ejercicio } from './pantallas/ejercicio.js';
import { Diario } from './pantallas/diario.js';
import { Tu, Ajustes } from './pantallas/tu.js';
import { Lectura, Fase, Paternidad, Situacion, Ayuda, Evidencia, Bibliografia } from './pantallas/info.js';

const leerRuta = () => {
  const crudo = location.hash.replace(/^#\/?/, '');
  const partes = crudo.split('/').filter(Boolean);
  return { base: partes[0] || 'hoy', a: partes[1], b: partes[2] };
};

const posiciones = new Map();

function useRuta() {
  const [ruta, fijar] = useState(leerRuta());
  useEffect(() => {
    let previa = location.hash;
    const alCambiar = () => {
      posiciones.set(previa, window.scrollY);
      const adelante = window.__navAdelante;
      window.__navAdelante = false;
      window.__navegoDentro = true;
      previa = location.hash;
      fijar(leerRuta());
      const y = adelante ? 0 : posiciones.get(location.hash) || 0;
      requestAnimationFrame(() => window.scrollTo(0, y));
    };
    const alClic = (ev) => {
      const a = ev.target.closest && ev.target.closest('a[href^="#"]');
      if (a) window.__navAdelante = true;
    };
    window.addEventListener('hashchange', alCambiar);
    document.addEventListener('click', alClic, true);
    return () => {
      window.removeEventListener('hashchange', alCambiar);
      document.removeEventListener('click', alClic, true);
    };
  }, []);
  return ruta;
}

function aplicarTema(ajuste) {
  const h = horaActual();
  const noche = h < 6.5 || h >= 20.5;
  const tema = ajuste === 'hora' ? (noche ? 'oscuro' : 'claro') : ajuste;
  const raiz = document.documentElement;
  if (raiz.dataset.tema !== tema) {
    raiz.dataset.tema = tema;
    window.dispatchEvent(new Event('relajatopia-tema'));
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = tema === 'oscuro' ? '#071F26' : '#EEF4F2';
}

function BarraTabs({ base, seccion }) {
  const tabs = [
    { id: 'hoy', txt: 'Hoy', ruta: '/hoy', icono: 'hoy' },
    { id: 'practicar', txt: 'Practicar', ruta: '/practicar', icono: 'practicar' },
    { id: 'diario', txt: 'Diario', ruta: '/diario', icono: 'diario' },
    { id: 'tu', txt: 'Tú', ruta: '/tu', icono: 'tu' },
  ];
  const activo = (id) => base === id;
  const Tab = (t) => html`<a href=${`#${t.ruta}`} class=${activo(t.id) ? 'activa' : ''} aria-current=${activo(t.id) ? 'page' : null}><${Icono} n=${t.icono} /><span>${t.txt}</span></a>`;
  return html`<nav class="tabs" aria-label="Principal">
    ${Tab(tabs[0])}
    ${Tab(tabs[1])}
    <a class="tab-ahora" href="#/ejercicio/ahora" aria-label="Ahora: regular una emoción fuerte"><span class="piedra-ahora"><${Icono} n="ola" t=${26} /></span><span>Ahora</span></a>
    ${Tab(tabs[2])}
    ${Tab(tabs[3])}
  </nav>`;
}

function MiniSonido() {
  const [, marcar] = useState(0);
  useEffect(() => escucharSonido(() => marcar((x) => x + 1)), []);
  if (!hayAlgoSonando()) return null;
  return html`<div class="mini-sonido">
    <a href="#/practicar/sonidos">Sonido de fondo activo</a>
    <button class="enlace" type="button" onClick=${apagarTodo}>Detener</button>
  </div>`;
}

const PANTALLA_COMPLETA = new Set(['reproducir', 'respirar', 'ejercicio', 'registro', 'terminada']);

function App() {
  const ruta = useRuta();
  const e = useEstado();
  const [fallo, reiniciar] = useErrorBoundary();

  useEffect(() => {
    aplicarTema(e.ajustes.tema);
    const id = setInterval(() => aplicarTema(e.ajustes.tema), 60000);
    return () => clearInterval(id);
  }, [e.ajustes.tema]);

  if (fallo) {
    return html`<div class="pantalla-error">
      <h1>Esta pantalla no se pudo abrir</h1>
      <p class="lead">Tus datos siguen guardados. Vuelve a Hoy para continuar.</p>
      <button class="btn btn-principal" type="button" onClick=${() => {
        location.hash = '/hoy';
        reiniciar();
      }}>Volver a Hoy</button>
    </div>`;
  }

  if (!e.perfil.listo) return html`<${Bienvenida} />`;

  const { base, a, b } = ruta;
  const vistas = {
    hoy: () => html`<${Hoy} />`,
    registro: () => html`<${Registro} key=${a || 'nuevo'} agua=${a} />`,
    emocion: () => html`<${Emocion} id=${a} />`,
    practicar: () => html`<${Practicar} seccion=${a} />`,
    sesion: () => html`<${Sesion} key=${`${a}-${b || ''}`} id=${a} min=${b} />`,
    reproducir: () => html`<${Reproductor} key=${`${a}-${b}`} id=${a} min=${b} />`,
    terminada: () => html`<${Terminada} key=${a} id=${a} />`,
    respirar: () => html`<${Respirar} />`,
    ejercicio: () => html`<${Ejercicio} key=${a} id=${a} />`,
    diario: () => html`<${Diario} />`,
    tu: () => html`<${Tu} />`,
    ajustes: () => html`<${Ajustes} />`,
    lectura: () => html`<${Lectura} key=${a} id=${a} />`,
    fase: () => html`<${Fase} key=${a} id=${a} />`,
    paternidad: () => html`<${Paternidad} />`,
    situacion: () => html`<${Situacion} key=${a} id=${a} />`,
    ayuda: () => html`<${Ayuda} />`,
    evidencia: () => html`<${Evidencia} />`,
    bibliografia: () => html`<${Bibliografia} />`,
  };
  const vista = vistas[base] || vistas.hoy;
  const completa = PANTALLA_COMPLETA.has(base);

  return html`<div class=${`marco ${completa ? 'marco-completo' : ''}`}>
    <main>${vista()}</main>
    ${completa ? null : html`<${MiniSonido} />`}
    ${completa ? null : html`<${BarraTabs} base=${base} />`}
  </div>`;
}

aplicarTema('hora');
render(html`<${App} />`, document.getElementById('app'));

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.search.includes('sw=1'))) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
