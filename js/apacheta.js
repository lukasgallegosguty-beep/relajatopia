// La apacheta: cada práctica terminada agrega una piedra. Las piedras nunca se pierden.

import { TEMAS } from './content/sesiones.js';

const MAX_VISIBLES = 55;

export function azar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Contorno irregular y suave, como una piedra de río.
export function formaPiedra(semilla, ancho, alto) {
  const r = azar(semilla * 7919 + 13);
  const n = 6 + Math.floor(r() * 3);
  const pts = [];
  for (let i = 0; i < n; i += 1) {
    const ang = (i / n) * Math.PI * 2 + r() * 0.45;
    const rad = 0.76 + r() * 0.34;
    pts.push([(Math.cos(ang) * ancho * rad) / 2, (Math.sin(ang) * alto * rad) / 2]);
  }
  return curvaCerrada(pts);
}

function curvaCerrada(pts) {
  const medio = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const inicio = medio(pts[0], pts[1]);
  let d = `M${inicio[0].toFixed(1)} ${inicio[1].toFixed(1)}`;
  for (let i = 1; i <= pts.length; i += 1) {
    const p = pts[i % pts.length];
    const q = medio(p, pts[(i + 1) % pts.length]);
    d += `Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

// Acerca el color del tema a un gris de roca para que parezca piedra y no dulce.
function mineral(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255];
  const roca = [122, 116, 108];
  const m = c.map((v, i) => Math.round(v * 0.52 + roca[i] * 0.48));
  return `#${m.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function aclarar(hex, t) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * t));
  return `rgb(${c.join(',')})`;
}

function oscurecer(hex, t) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v * (1 - t)));
  return `rgb(${c.join(',')})`;
}

// Devuelve las piedras ordenadas de abajo hacia arriba. (0,0) es el centro de la base.
export function disponerPiedras(practicas, base = 60) {
  const lista = practicas.slice(-MAX_VISIBLES);
  const n = lista.length;
  if (!n) return [];
  let k = 1;
  while ((k * (k + 1)) / 2 < n) k += 1;
  const piedras = [];
  let indice = 0;
  let y = 0;
  const desde = Math.max(0, practicas.length - MAX_VISIBLES);
  for (let fila = 0; fila < k && indice < n; fila += 1) {
    const enFila = Math.min(k - fila, n - indice);
    const anchoFila = base * (1 - fila * 0.055);
    const paso = anchoFila * 0.92;
    const x0 = (-(enFila - 1) * paso) / 2;
    let altoFila = 0;
    for (let c = 0; c < enFila; c += 1) {
      const sem = desde + indice + 1;
      const r = azar(sem * 104729);
      const w = anchoFila * (0.88 + r() * 0.26);
      const h = w * (0.56 + r() * 0.2);
      altoFila = Math.max(altoFila, h);
      const tema = TEMAS[lista[indice].tema];
      const color = mineral(tema ? tema.piedra : '#8D8C84');
      piedras.push({
        i: indice,
        x: x0 + c * paso + (r() - 0.5) * base * 0.16,
        y: -(y + h * 0.5) + (r() - 0.5) * base * 0.05,
        rot: (r() - 0.5) * 18,
        d: formaPiedra(sem, w, h),
        cara: formaPiedra(sem + 5000, w * 0.7, h * 0.52),
        cx: -w * 0.07,
        cy: -h * 0.13,
        color: oscurecer(color, 0.16),
        luz: aclarar(color, 0.08),
      });
      indice += 1;
    }
    y += altoFila * 0.74;
  }
  return piedras;
}

export function altoPila(piedras) {
  return piedras.reduce((a, p) => Math.max(a, -p.y), 0);
}
