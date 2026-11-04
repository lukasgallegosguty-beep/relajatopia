// Guía por voz: usa audios pregrabados si existen y, si no, la voz del teléfono.

import { CLIPS } from './content/voz-clips.js';

export function huella(txt) {
  let h = 0x811c9dc5;
  for (let i = 0; i < txt.length; i += 1) {
    h ^= txt.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

export function duracionClip(txt) {
  return CLIPS[huella(txt)] ?? null;
}

const SILENCIO = 'audio/silencio.m4a';

let elemento = null;
let vozTelefono = null;

function elegirVoz() {
  if (!('speechSynthesis' in window)) return null;
  const voces = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  if (!voces.length) return null;
  const orden = ['es-cl', 'es-419', 'es-mx', 'es-ar', 'es-us', 'es-es'];
  const puntaje = (v) => {
    const i = orden.indexOf(v.lang.toLowerCase());
    let p = i === -1 ? 0 : 10 - i;
    if (/enhanced|premium|natural|neural/i.test(v.name)) p += 12;
    if (/google|paulina|m[oó]nica/i.test(v.name)) p += 6;
    return p;
  };
  return voces.sort((a, b) => puntaje(b) - puntaje(a))[0];
}

// Debe llamarse dentro de un toque del usuario para que el navegador permita el audio.
export function prepararVoz() {
  if (!elemento) {
    elemento = new Audio();
    elemento.preload = 'auto';
  }
  try {
    elemento.src = SILENCIO;
    const p = elemento.play();
    if (p && p.catch) p.catch(() => {});
  } catch {
    /* el audio pregrabado queda desactivado */
  }
  if ('speechSynthesis' in window) {
    vozTelefono = elegirVoz();
    speechSynthesis.onvoiceschanged = () => {
      vozTelefono = elegirVoz();
    };
    const vacio = new SpeechSynthesisUtterance(' ');
    vacio.volume = 0;
    speechSynthesis.speak(vacio);
  }
}

function hablarConTelefono(txt) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = vozTelefono?.lang || 'es-CL';
  if (vozTelefono) u.voice = vozTelefono;
  u.rate = 0.86;
  u.pitch = 0.96;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export function decir(txt, modo) {
  if (modo === 'sin') return;
  const clave = huella(txt);
  if (modo === 'grabada' && CLIPS[clave] && elemento) {
    elemento.onerror = () => hablarConTelefono(txt);
    elemento.src = rutaClip(clave);
    const p = elemento.play();
    if (p && p.catch) p.catch(() => hablarConTelefono(txt));
    return;
  }
  hablarConTelefono(txt);
}

const rutaClip = (clave) => `audio/voz/${clave}.m4a`;

// Descarga por adelantado los audios de una sesión: quedan disponibles sin conexión.
export function adelantarClips(textos) {
  [...new Set(textos)].forEach((txt) => {
    const clave = huella(txt);
    if (CLIPS[clave]) fetch(rutaClip(clave)).catch(() => {});
  });
}

export function hayClips() {
  return Object.keys(CLIPS).length > 0;
}

export async function descargarTodosLosClips(avance) {
  const claves = Object.keys(CLIPS);
  let hechos = 0;
  const trabajar = async () => {
    while (claves.length) {
      const c = claves.pop();
      try {
        await fetch(rutaClip(c));
      } catch {
        /* se reintenta la próxima vez */
      }
      hechos += 1;
      avance(hechos);
    }
  };
  await Promise.all([trabajar(), trabajar(), trabajar(), trabajar()]);
}

export function totalClips() {
  return Object.keys(CLIPS).length;
}

export function callar() {
  if (elemento) {
    elemento.onerror = null;
    elemento.pause();
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

export function pausarVoz() {
  if (elemento) elemento.pause();
  if ('speechSynthesis' in window) speechSynthesis.pause();
}

export function reanudarVoz() {
  if (elemento && elemento.src && !elemento.ended && elemento.currentTime > 0) {
    const p = elemento.play();
    if (p && p.catch) p.catch(() => {});
  }
  if ('speechSynthesis' in window) speechSynthesis.resume();
}

export function hayVozTelefono() {
  return 'speechSynthesis' in window;
}
