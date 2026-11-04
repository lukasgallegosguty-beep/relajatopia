// Piezas de interfaz compartidas.

import { html, useEffect, useRef, useState } from '../vendor/preact-htm.mjs';
import { Laguna, horaActual } from './laguna.js';
import { azar } from './apacheta.js';
import { ORIGENES } from './content/lecturas.js';
import { aguaPorNivel } from './content/emociones.js';

export { html };

export function ir(ruta, reemplazar = false) {
  window.__navAdelante = true;
  if (reemplazar) {
    history.replaceState(null, '', `#${ruta}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    location.hash = ruta;
  }
}

export function volver(alternativa = '/hoy') {
  if (history.length > 1 && window.__navegoDentro) history.back();
  else ir(alternativa, true);
}

export function useHora() {
  const [hora, fijar] = useState(horaActual());
  useEffect(() => {
    const id = setInterval(() => fijar(horaActual()), 60000);
    return () => clearInterval(id);
  }, []);
  return hora;
}

export function LagunaVista({ hora, agitacion, solAlto = null, practicas = [], horizonte, orilla, clase = '' }) {
  const lienzo = useRef(null);
  const escena = useRef(null);
  useEffect(() => {
    escena.current = new Laguna(lienzo.current, { hora, agitacion, solAlto, practicas, horizonte, orilla });
    const alTema = () => escena.current && escena.current.fijar({ tema: true });
    window.addEventListener('relajatopia-tema', alTema);
    return () => {
      window.removeEventListener('relajatopia-tema', alTema);
      escena.current.destruir();
    };
  }, []);
  useEffect(() => {
    if (escena.current) escena.current.fijar({ hora, agitacion, solAlto, practicas });
  }, [hora, agitacion, solAlto, practicas]);
  return html`<canvas ref=${lienzo} class=${`lienzo ${clase}`} aria-hidden="true"></canvas>`;
}

// Íconos propios, trazados a mano
const TRAZOS = {
  hoy: html`<path d="M3 17h18M6.5 17a5.5 5.5 0 0 1 11 0M12 4.5v3M4.8 8.3l2 2M19.200 8.3l-2 2M7 20.500h10" />`,
  practicar: html`<path d="M2.500 19 9 7.500l4 7 2.400-3.800L21.500 19zM7 11l2 1.500 2-1" />`,
  diario: html`<path d="M4 6.500h16v11H4zM4 10.200h16M8 14h8" />`,
  tu: html`<path d="M6 18.500c-1.800 0-3-1-3-2.300 0-1.500 1.500-2.700 3.600-2.700h10.800c2.100 0 3.600 1.200 3.600 2.700 0 1.300-1.200 2.300-3 2.300zM8 13.500c-1.200-.3-1.900-1.100-1.900-2.100 0-1.300 1.300-2.200 3-2.200h5.800c1.700 0 3 .9 3 2.200 0 1-.7 1.800-1.900 2.100M10.200 9.200c-.7-.4-1-1-1-1.600 0-1.200 1.200-2.100 2.800-2.100s2.800.9 2.800 2.100c0 .6-.3 1.200-1 1.600" />`,
  atras: html`<path d="M14.500 5.500 8 12l6.500 6.500" />`,
  cerrar: html`<path d="M6 6l12 12M18 6 6 18" />`,
  play: html`<path d="M8 5.500v13l10.500-6.500z" fill="currentColor" />`,
  pausa: html`<path d="M8.500 5.500v13M15.500 5.500v13" stroke-width="3" />`,
  voz: html`<path d="M4 9.500v5h3.500L12 18.500v-13L7.500 9.500zM15.500 9a4.200 4.200 0 0 1 0 6M18 6.500a7.800 7.800 0 0 1 0 11" />`,
  vozNo: html`<path d="M4 9.500v5h3.500L12 18.500v-13L7.500 9.500zM16 9.500l5 5M21 9.500l-5 5" />`,
  ola: html`<path d="M2.500 9c2.400 0 2.400 2 4.800 2s2.300-2 4.700-2 2.300 2 4.700 2 2.400-2 4.800-2M2.500 15c2.400 0 2.400 2 4.800 2s2.300-2 4.700-2 2.300 2 4.700 2 2.400-2 4.800-2" />`,
  ojo: html`<path d="M2.500 12S6 5.800 12 5.800 21.500 12 21.500 12 18 18.200 12 18.200 2.500 12 2.500 12zM12 14.800a2.800 2.800 0 1 0 0-5.600 2.800 2.800 0 0 0 0 5.600z" />`,
  mas: html`<path d="M12 5v14M5 12h14" />`,
  flecha: html`<path d="M9.500 5.500 16 12l-6.500 6.500" />`,
  check: html`<path d="M5 12.500l4.500 4.500L19 7" />`,
  telefono: html`<path d="M6.500 3.500h3l1.500 4.500-2 1.500a12 12 0 0 0 5.500 5.500l1.500-2 4.500 1.500v3a2 2 0 0 1-2.200 2A16.500 16.500 0 0 1 4.500 5.700a2 2 0 0 1 2-2.200z" />`,
};

export function Icono({ n, t = 24 }) {
  return html`<svg class="icono" width=${t} height=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TRAZOS[n]}</svg>`;
}

// Glifo del estado del agua: de una línea quieta a olas altas.
export function GlifoAgua({ n, t = 34 }) {
  const a = aguaPorNivel(n).agit;
  const linea = (y, fase) => {
    let d = '';
    for (let x = 0; x <= 40; x += 2) {
      const yy = y + Math.sin(x / 3.2 + fase) * a * 5.2;
      d += `${x === 0 ? 'M' : 'L'}${x} ${yy.toFixed(2)}`;
    }
    return html`<path d=${d} />`;
  };
  return html`<svg width=${t} height=${t} viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" aria-hidden="true">${linea(11, 0)}${linea(20, 1.4)}${linea(29, 2.6)}</svg>`;
}

export function Cabecera({ titulo, atras = '/hoy', cerrar = false, derecha = null }) {
  return html`<header class="cabecera">
    <button class="btn-icono" type="button" aria-label=${cerrar ? 'Cerrar' : 'Volver'} onClick=${() => volver(atras)}>
      <${Icono} n=${cerrar ? 'cerrar' : 'atras'} />
    </button>
    ${titulo ? html`<p class="cabecera-titulo">${titulo}</p>` : null}
    <div class="cabecera-der">${derecha}</div>
  </header>`;
}

// Lista “cordillera”: cada fila es una capa de montaña, de la más lejana a la más cercana.
function crestaRuta(semilla) {
  const r = azar(semilla * 31 + 7);
  const a = r() * 6;
  const b = r() * 6;
  const c = 60 + r() * 280;
  const w = 70 + r() * 80;
  const alto = 9 + r() * 7;
  let linea = '';
  for (let x = 0; x <= 400; x += 8) {
    const cono = Math.max(0, 1 - Math.abs(x - c) / w) * alto;
    const y = 20 + Math.sin(x / 74 + a) * 3.4 + Math.sin(x / 29 + b) * 1.6 - cono;
    linea += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
  }
  return { linea, relleno: `${linea}L400 30L0 30Z` };
}

const CLARO_A = [214, 238, 232];
const CLARO_B = [84, 182, 178];
const FONDO_A = [18, 117, 123];
const FONDO_B = [10, 47, 56];
const OSCURO_A = [24, 88, 98];
const OSCURO_B = [7, 34, 42];

const mezclar = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const cssRgb = (c) => `rgb(${c.join(',')})`;

export function colorFila(i, n, oscuro) {
  const p = n > 1 ? i / (n - 1) : 0;
  if (oscuro) return { fondo: cssRgb(mezclar(OSCURO_A, OSCURO_B, p)), texto: '#EAF5F2', suave: '#BCD6D3' };
  if (p < 0.5) return { fondo: cssRgb(mezclar(CLARO_A, CLARO_B, p * 2)), texto: '#072B33', suave: '#0B3B44' };
  return { fondo: cssRgb(mezclar(FONDO_A, FONDO_B, (p - 0.5) * 2)), texto: '#FFFFFF', suave: '#DDF1EE' };
}

const numeroDe = (txt) => [...txt].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export function esOscuro() {
  return document.documentElement.dataset.tema === 'oscuro';
}

export function Cordillera({ filas, etiqueta }) {
  const oscuro = esOscuro();
  return html`<ul class="cordillera" aria-label=${etiqueta}>
    ${filas.map((f, i) => {
      const c = colorFila(i, filas.length, oscuro);
      const cresta = crestaRuta(numeroDe(f.clave));
      return html`<li key=${f.clave} style=${`--fondo:${c.fondo};--texto:${c.texto};--suave:${c.suave}`}>
        <svg class="cresta" viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true">
          <path d=${cresta.relleno} fill=${c.fondo} />
          <path class="cresta-linea" d=${cresta.linea} />
        </svg>
        <a class="fila" href=${`#${f.ruta}`}>
          <span class="fila-texto">
            <span class="fila-titulo">${f.titulo}</span>
            ${f.sub ? html`<span class="fila-sub">${f.sub}</span>` : null}
          </span>
          ${f.der ? html`<span class="fila-der">${f.der}</span>` : null}
        </a>
      </li>`;
    })}
  </ul>`;
}

// Notas de origen: tradición, ciencia o interpretación
export function Origen({ f, children }) {
  const parrafos = Array.isArray(children) ? children : [children];
  return html`<div class=${`origen origen-${f}`}>
    <span class="origen-marca">${ORIGENES[f].nombre}</span>
    ${parrafos.map((x) => html`<p>${x}</p>`)}
  </div>`;
}

// Une los bloques seguidos que tienen el mismo origen.
export function agruparBloques(bloques) {
  const grupos = [];
  bloques.forEach(([f, x]) => {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.f === f) ultimo.textos.push(x);
    else grupos.push({ f, textos: [x] });
  });
  return grupos;
}

export function Fuentes({ lista }) {
  if (!lista || !lista.length) return null;
  return html`<div class="fuentes">${lista.map(([f, x]) => html`<${Origen} f=${f}>${x}<//>`)}</div>`;
}

export function Aviso({ tono = 'suave', children }) {
  return html`<div class=${`aviso aviso-${tono}`}>${children}</div>`;
}

export function Selector({ opciones, valor, alCambiar, etiqueta }) {
  return html`<div class="selector" role="radiogroup" aria-label=${etiqueta}>
    ${opciones.map((o) => html`<button type="button" role="radio" aria-checked=${o.v === valor} class=${o.v === valor ? 'activo' : ''} onClick=${() => alCambiar(o.v)}>${o.txt}</button>`)}
  </div>`;
}

export function Enlace({ ruta, children, clase = '' }) {
  return html`<a class=${clase} href=${`#${ruta}`}>${children}</a>`;
}

export function fechaLarga(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function horaCorta(iso) {
  return new Date(iso).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}

export function plural(n, uno, varios) {
  return `${n} ${n === 1 ? uno : varios}`;
}

// Compartir o descargar un archivo generado en el teléfono.
export async function entregarArchivo(nombre, tipo, contenido) {
  const archivo = new File([contenido], nombre, { type: tipo });
  if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
    try {
      await navigator.share({ files: [archivo], title: nombre });
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
  }
  const url = URL.createObjectURL(archivo);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
