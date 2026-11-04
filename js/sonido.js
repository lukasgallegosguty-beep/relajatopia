// Sonidos sintetizados en el dispositivo con Web Audio. No hay archivos de audio.

export const AMBIENTES = [
  { id: 'lluvia', nombre: 'Lluvia', detalle: 'Lluvia pareja sobre un techo' },
  { id: 'viento', nombre: 'Viento de altura', detalle: 'Ráfagas lentas en la meseta' },
  { id: 'orilla', nombre: 'Orilla', detalle: 'Agua que llega y se retira' },
  { id: 'marron', nombre: 'Ruido marrón', detalle: 'Fondo grave y constante para dormir' },
  { id: 'cuencos', nombre: 'Cuencos', detalle: 'Un golpe suave cada cierto tiempo' },
];

let ctx = null;
let salida = null;
let ruidoBlanco = null;
let ruidoMarron = null;
const activos = new Map();
const oyentes = new Set();
let apagado = null;
let apagadoFin = null;

function avisar() {
  oyentes.forEach((o) => o());
}

export function escucharSonido(fn) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

export function preparar() {
  const Contexto = window.AudioContext || window.webkitAudioContext;
  if (!Contexto) return null;
  if (!ctx) {
    ctx = new Contexto();
    if (navigator.audioSession) {
      try {
        navigator.audioSession.type = 'playback';
      } catch {
        /* no disponible en este navegador */
      }
    }
    salida = ctx.createGain();
    salida.gain.value = 0.9;
    salida.connect(ctx.destination);
    ruidoBlanco = crearRuido(false);
    ruidoMarron = crearRuido(true);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function crearRuido(marron) {
  const seg = 12;
  const largo = seg * ctx.sampleRate;
  const buf = ctx.createBuffer(2, largo, ctx.sampleRate);
  for (let c = 0; c < 2; c += 1) {
    const d = buf.getChannelData(c);
    let ultimo = 0;
    for (let i = 0; i < largo; i += 1) {
      const b = Math.random() * 2 - 1;
      if (marron) {
        ultimo = (ultimo + 0.02 * b) / 1.02;
        d[i] = ultimo * 3.5;
      } else {
        d[i] = b;
      }
    }
    // Empalme suave para que el bucle no se note
    const cruce = Math.floor(ctx.sampleRate * 0.4);
    for (let i = 0; i < cruce; i += 1) {
      const k = i / cruce;
      d[i] = d[i] * k + d[largo - cruce + i] * (1 - k);
    }
  }
  return buf;
}

function fuente(buf) {
  const s = ctx.createBufferSource();
  s.buffer = buf;
  s.loop = true;
  s.loopEnd = buf.duration - 0.4;
  return s;
}

function filtro(tipo, f, q = 0.7) {
  const n = ctx.createBiquadFilter();
  n.type = tipo;
  n.frequency.value = f;
  n.Q.value = q;
  return n;
}

function lfo(frecuencia, profundidad, destino) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.value = frecuencia;
  g.gain.value = profundidad;
  o.connect(g);
  g.connect(destino);
  o.start();
  return o;
}

function construir(id, gananciaCanal) {
  const nodos = [];
  if (id === 'lluvia') {
    const s = fuente(ruidoBlanco);
    const hp = filtro('highpass', 700);
    const lp = filtro('lowpass', 6500);
    const g = ctx.createGain();
    g.gain.value = 0.2;
    s.connect(hp).connect(lp).connect(g).connect(gananciaCanal);
    s.start();
    const s2 = fuente(ruidoMarron);
    const g2 = ctx.createGain();
    g2.gain.value = 0.3;
    s2.connect(filtro('lowpass', 420)).connect(g2).connect(gananciaCanal);
    s2.start(0, 3);
    nodos.push(s, s2, lfo(0.13, 0.03, g.gain));
  }
  if (id === 'viento') {
    const s = fuente(ruidoBlanco);
    const bp = filtro('bandpass', 420, 0.9);
    const g = ctx.createGain();
    g.gain.value = 0.8;
    s.connect(bp).connect(g).connect(gananciaCanal);
    s.start();
    nodos.push(s, lfo(0.07, 190, bp.frequency), lfo(0.11, 0.4, g.gain));
  }
  if (id === 'orilla') {
    const s = fuente(ruidoMarron);
    const lp = filtro('lowpass', 1100);
    const g = ctx.createGain();
    g.gain.value = 0.46;
    s.connect(lp).connect(g).connect(gananciaCanal);
    s.start();
    const s2 = fuente(ruidoBlanco);
    const bp = filtro('bandpass', 1800, 0.6);
    const g2 = ctx.createGain();
    g2.gain.value = 0.015;
    s2.connect(bp).connect(g2).connect(gananciaCanal);
    s2.start();
    nodos.push(s, s2, lfo(0.1, 0.3, g.gain), lfo(0.1, 0.012, g2.gain), lfo(0.1, 500, lp.frequency));
  }
  if (id === 'marron') {
    const s = fuente(ruidoMarron);
    const g = ctx.createGain();
    g.gain.value = 0.8;
    s.connect(filtro('lowpass', 620)).connect(g).connect(gananciaCanal);
    s.start();
    nodos.push(s);
  }
  if (id === 'cuencos') {
    const golpe = () => {
      campana({ nivel: 0.62, grave: Math.random() > 0.5, destino: gananciaCanal });
      temporizador.t = setTimeout(golpe, 26000 + Math.random() * 28000);
    };
    const temporizador = { t: setTimeout(golpe, 800) };
    nodos.push({ stop: () => clearTimeout(temporizador.t) });
  }
  return nodos;
}

export function estaActivo(id) {
  return activos.has(id);
}

export function hayAlgoSonando() {
  return activos.size > 0;
}

export function volumenDe(id) {
  return activos.get(id)?.volumen ?? 0.6;
}

export function encender(id, volumen = 0.6) {
  if (!preparar() || activos.has(id)) return;
  const canal = ctx.createGain();
  canal.gain.value = 0;
  canal.gain.setTargetAtTime(volumen, ctx.currentTime, 0.8);
  canal.connect(salida);
  activos.set(id, { canal, volumen, nodos: construir(id, canal) });
  avisar();
}

export function apagar(id) {
  const a = activos.get(id);
  if (!a) return;
  a.canal.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
  activos.delete(id);
  setTimeout(() => {
    a.nodos.forEach((n) => {
      try {
        n.stop();
      } catch {
        /* ya detenido */
      }
    });
    a.canal.disconnect();
  }, 2500);
  if (!activos.size) cancelarApagado();
  avisar();
}

export function apagarTodo() {
  [...activos.keys()].forEach(apagar);
}

export function cambiarVolumen(id, v) {
  const a = activos.get(id);
  if (!a) return;
  a.volumen = v;
  a.canal.gain.setTargetAtTime(v, ctx.currentTime, 0.1);
}

// Temporizador para dormir
export function programarApagado(minutos) {
  cancelarApagado();
  apagadoFin = Date.now() + minutos * 60000;
  apagado = setTimeout(() => {
    apagarTodo();
    cancelarApagado();
  }, minutos * 60000);
  avisar();
}

export function cancelarApagado() {
  if (apagado) clearTimeout(apagado);
  apagado = null;
  apagadoFin = null;
  avisar();
}

export function minutosParaApagar() {
  return apagadoFin ? Math.max(1, Math.ceil((apagadoFin - Date.now()) / 60000)) : null;
}

// Campana: suma de parciales inarmónicos, como un cuenco metálico.
export function campana({ nivel = 0.5, grave = false, destino = null } = {}) {
  if (!preparar()) return;
  const base = grave ? 146.8 : 196;
  const parciales = [
    [1, 1, 11],
    [2.02, 0.55, 8],
    [2.99, 0.3, 6],
    [4.16, 0.16, 4],
    [5.43, 0.08, 2.6],
  ];
  const ahora = ctx.currentTime + 0.02;
  parciales.forEach(([r, a, d]) => {
    [-0.35, 0.35].forEach((detalle) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = base * r + detalle;
      g.gain.setValueAtTime(0.0001, ahora);
      g.gain.exponentialRampToValueAtTime((nivel * a) / 2, ahora + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, ahora + d);
      o.connect(g).connect(destino || salida);
      o.start(ahora);
      o.stop(ahora + d + 0.1);
    });
  });
}

// Mantiene la pantalla encendida durante una práctica.
let bloqueo = null;

export async function mantenerPantalla() {
  try {
    if ('wakeLock' in navigator) bloqueo = await navigator.wakeLock.request('screen');
  } catch {
    bloqueo = null;
  }
}

export function soltarPantalla() {
  try {
    if (bloqueo) bloqueo.release();
  } catch {
    /* ya liberado */
  }
  bloqueo = null;
}
