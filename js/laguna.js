// La escena de la app: una laguna de altura dibujada en canvas.
// El agua refleja la cordillera y se agita o se aquieta según el estado de la persona.

import { azar, disponerPiedras } from './apacheta.js';

const CLAVES = [
  { h: 0, c0: '#060C26', c1: '#0F1A48', c2: '#232E6C', lejos: '#222E65', medio: '#17214E', cerca: '#0E1637', nieve: '#8EA3DB', agua: '#0A1B47', brillo: '#9DB1E6', estrellas: 1 },
  { h: 5, c0: '#0A1132', c1: '#1B2460', c2: '#47407F', lejos: '#2C2F6B', medio: '#1E2258', cerca: '#141840', nieve: '#A9A8DE', agua: '#111D52', brillo: '#B6B5EA', estrellas: 0.8 },
  { h: 6.6, c0: '#2A3176', c1: '#B65A8C', c2: '#F7B47C', lejos: '#7B5B98', medio: '#4F3F82', cerca: '#2F2A60', nieve: '#FFD8C8', agua: '#7A5993', brillo: '#FFD9B8', estrellas: 0.1 },
  { h: 8.5, c0: '#1B6FBE', c1: '#68B7E0', c2: '#DCF0EF', lejos: '#9CABC8', medio: '#BC8A5A', cerca: '#7E5C46', nieve: '#FFFFFF', agua: '#159CA5', brillo: '#E9FBFA', estrellas: 0 },
  { h: 13, c0: '#0C5BB2', c1: '#4BA6E0', c2: '#BEE7EE', lejos: '#A78FA2', medio: '#CB9558', cerca: '#8C6243', nieve: '#FFFFFF', agua: '#0DA2A7', brillo: '#E6FFFC', estrellas: 0 },
  { h: 17.5, c0: '#1B5CAB', c1: '#7BB1D8', c2: '#F8DBA8', lejos: '#A98A9D', medio: '#C47D4D', cerca: '#7C4C45', nieve: '#FFEFD8', agua: '#1C93A0', brillo: '#FFF2D8', estrellas: 0 },
  { h: 19.6, c0: '#2B2A74', c1: '#C4507E', c2: '#FAA55B', lejos: '#7D4A8D', medio: '#5C3578', cerca: '#3A2459', nieve: '#FFC8AE', agua: '#6F3F81', brillo: '#FFC9A0', estrellas: 0.05 },
  { h: 21.2, c0: '#0E143F', c1: '#2E2A70', c2: '#6B3F87', lejos: '#33306F', medio: '#252459', cerca: '#181A45', nieve: '#A99FDA', agua: '#161B52', brillo: '#B9B0E8', estrellas: 0.7 },
  { h: 24, c0: '#060C26', c1: '#0F1A48', c2: '#232E6C', lejos: '#222E65', medio: '#17214E', cerca: '#0E1637', nieve: '#8EA3DB', agua: '#0A1B47', brillo: '#9DB1E6', estrellas: 1 },
];

const aRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};
const mezcla = (a, b, t) => {
  const x = aRgb(a);
  const y = aRgb(b);
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
};
const rgba = (hex, al) => {
  const [r, g, b] = aRgb(hex);
  return `rgba(${r},${g},${b},${al})`;
};

export function paletaDeHora(hora) {
  const h = ((hora % 24) + 24) % 24;
  let i = 0;
  while (i < CLAVES.length - 2 && CLAVES[i + 1].h <= h) i += 1;
  const a = CLAVES[i];
  const b = CLAVES[i + 1];
  const t = (h - a.h) / (b.h - a.h);
  const p = { hora: h, estrellas: a.estrellas + (b.estrellas - a.estrellas) * t };
  Object.keys(a).forEach((k) => {
    if (k !== 'h' && k !== 'estrellas') p[k] = mezcla(a[k], b[k], t);
  });
  return p;
}

export function horaActual() {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60;
}

const movimientoReducido = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function ruidoSuave(semilla, n) {
  const r = azar(semilla);
  const v = Array.from({ length: n + 2 }, () => r());
  return (x) => {
    const p = x * n;
    const i = Math.floor(p);
    const f = p - i;
    const s = f * f * (3 - 2 * f);
    return v[i] + (v[i + 1] - v[i]) * s;
  };
}

const volcan = (x, c, w, alto) => {
  const d = Math.abs(x - c) / w;
  return d >= 1 ? 0 : alto * Math.pow(1 - d, 1.32);
};

export class Laguna {
  constructor(canvas, opciones = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.op = { horizonte: 0.6, orilla: 0.9, ...opciones };
    this.hora = opciones.hora ?? horaActual();
    this.agitacion = opciones.agitacion ?? 0.2;
    this.agitacionMeta = this.agitacion;
    this.solAlto = opciones.solAlto ?? null; // 0 a 1: posición controlada, para respirar
    this.practicas = opciones.practicas ?? [];
    this.ultimoTiempo = 0;
    this.activo = false;
    this.visible = true;
    this.sucio = true;
    this.t = 0;
    this.marco = null;
    this.bucle = this.bucle.bind(this);
    this.alCambiarVisibilidad = () => {
      if (document.hidden) this.pausar();
      else this.iniciar();
    };
    document.addEventListener('visibilitychange', this.alCambiarVisibilidad);
    this.ro = new ResizeObserver(() => this.medir());
    this.ro.observe(canvas);
    this.io = new IntersectionObserver((e) => {
      this.visible = e[e.length - 1].isIntersecting;
      if (this.visible) this.iniciar();
      else this.pausar();
    });
    this.io.observe(canvas);
    this.medir();
    this.iniciar();
  }

  medir() {
    const caja = this.canvas.getBoundingClientRect();
    if (!caja.width || !caja.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(caja.width * dpr);
    const H = Math.round(caja.height * dpr);
    if (W === this.W && H === this.H) return;
    this.W = W;
    this.H = H;
    this.dpr = dpr;
    this.canvas.width = W;
    this.canvas.height = H;
    this.m = Math.ceil(26 * dpr);
    this.hz = Math.round(H * this.op.horizonte);
    this.arriba = this.arriba || document.createElement('canvas');
    this.arriba.width = W + this.m * 2;
    this.arriba.height = this.hz;
    this.capaOrilla = this.capaOrilla || document.createElement('canvas');
    this.capaOrilla.width = W;
    this.capaOrilla.height = H;
    this.prepararCordillera();
    this.prepararBrillos();
    this.dibujarOrilla();
    this.sucio = true;
    this.pintar();
  }

  prepararCordillera() {
    const n1 = ruidoSuave(11, 7);
    const n2 = ruidoSuave(23, 19);
    const n3 = ruidoSuave(37, 5);
    const n4 = ruidoSuave(53, 13);
    const n5 = ruidoSuave(71, 41);
    const A = this.hz * 0.62;
    this.perfil = {
      lejos: (x) => {
        const v = Math.max(volcan(x, 0.68, 0.3, A), volcan(x, 0.22, 0.25, A * 0.66), volcan(x, 0.97, 0.18, A * 0.52));
        return Math.max(v, A * 0.2) + (n5(x) - 0.5) * A * 0.035;
      },
      nieve: (x) => A * (0.56 + n2(x) * 0.16),
      medio: (x) => A * (0.14 + n1(x) * 0.26 + (n2(x) - 0.5) * 0.06),
      cerca: (x) => A * (0.05 + n3(x) * 0.14 + (n4(x) - 0.5) * 0.03),
    };
    const r = azar(97);
    this.astros = Array.from({ length: 70 }, () => ({ x: r(), y: r() * r(), t: 0.3 + r() * 0.7 }));
  }

  prepararBrillos() {
    const r = azar(131);
    this.brillos = Array.from({ length: 64 }, () => ({
      x: r(),
      y: r(),
      largo: 0.3 + r() * 0.7,
      f: 0.6 + r() * 1.5,
      fase: r() * 6.28,
    }));
  }

  componerArriba(p) {
    const c = this.arriba.getContext('2d');
    const ancho = this.arriba.width;
    const hz = this.hz;
    const g = c.createLinearGradient(0, 0, 0, hz);
    g.addColorStop(0, p.c0);
    g.addColorStop(0.62, p.c1);
    g.addColorStop(1, p.c2);
    c.fillStyle = g;
    c.fillRect(0, 0, ancho, hz);

    if (p.estrellas > 0.02) {
      c.fillStyle = '#FFFFFF';
      this.astros.forEach((e) => {
        c.globalAlpha = p.estrellas * e.t * 0.9;
        const s = (e.t > 0.8 ? 1.6 : 1) * this.dpr;
        c.fillRect(e.x * ancho, e.y * hz * 0.82, s, s);
      });
      c.globalAlpha = 1;
    }

    this.dibujarAstro(c, p, ancho, hz);

    const capa = (fn, color) => {
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, hz);
      for (let x = 0; x <= ancho; x += 3) c.lineTo(x, hz - fn(x / ancho));
      c.lineTo(ancho, hz);
      c.closePath();
      c.fill();
    };

    capa(this.perfil.lejos, p.lejos);
    // Nieve: la parte del volcán que queda sobre la línea irregular de nieves
    c.save();
    c.beginPath();
    c.moveTo(0, hz);
    for (let x = 0; x <= ancho; x += 3) c.lineTo(x, hz - this.perfil.lejos(x / ancho));
    c.lineTo(ancho, hz);
    c.closePath();
    c.clip();
    c.fillStyle = p.nieve;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(ancho, 0);
    for (let x = ancho; x >= 0; x -= 3) c.lineTo(x, hz - this.perfil.nieve(x / ancho));
    c.closePath();
    c.fill();
    c.restore();

    capa(this.perfil.medio, p.medio);
    capa(this.perfil.cerca, p.cerca);
  }

  dibujarAstro(c, p, ancho, hz) {
    const h = p.hora;
    let alto;
    let x;
    let esSol = true;
    if (this.solAlto !== null) {
      alto = this.solAlto;
      x = 0.6;
      esSol = !(h > 20.5 || h < 6.2);
    } else if (h >= 6.2 && h <= 20.6) {
      const k = (h - 6.2) / 14.4;
      alto = Math.sin(k * Math.PI);
      x = 0.1 + k * 0.8;
    } else {
      const k = (((h - 20.6) + 24) % 24) / 9.6;
      alto = Math.sin(k * Math.PI);
      x = 0.1 + k * 0.8;
      esSol = false;
    }
    const y = hz * 0.98 - alto * hz * (this.solAlto !== null ? 0.72 : 0.5);
    const px = x * ancho;
    const radio = hz * (esSol ? 0.075 : 0.06);
    const colorHalo = esSol ? mezcla(p.c2, '#FFF3C4', 0.6) : '#DDE4FF';
    const halo = c.createRadialGradient(px, y, radio * 0.5, px, y, radio * 5.5);
    halo.addColorStop(0, rgba(colorHalo, esSol ? 0.55 : 0.22));
    halo.addColorStop(1, rgba(colorHalo, 0));
    c.fillStyle = halo;
    c.fillRect(px - radio * 6, y - radio * 6, radio * 12, radio * 12);
    c.fillStyle = esSol ? '#FFF6DA' : '#EDEFFA';
    c.beginPath();
    if (esSol) {
      c.arc(px, y, radio, 0, Math.PI * 2);
    } else {
      // Luna creciente
      c.arc(px, y, radio, -Math.PI / 2, Math.PI / 2, true);
      c.quadraticCurveTo(px - radio * 0.42, y, px, y - radio);
    }
    c.fill();
  }

  // Orilla de sal y apacheta, en primer plano
  dibujarOrilla() {
    if (!this.capaOrilla) return;
    const c = this.capaOrilla.getContext('2d');
    const { W, H } = this;
    c.clearRect(0, 0, W, H);
    if (this.op.orilla >= 1) return;
    const estilos = getComputedStyle(document.documentElement);
    const suelo = estilos.getPropertyValue('--suelo').trim() || '#EEF4F2';
    const borde = estilos.getPropertyValue('--suelo-borde').trim() || '#CFE0DC';
    const yBase = H * this.op.orilla;
    const curva = (x) => yBase + Math.sin(x / W * 5.1 + 0.8) * H * 0.022 + Math.sin(x / W * 11.3) * H * 0.009 - (x / W) * H * 0.02;
    const trazo = (dy) => {
      c.beginPath();
      c.moveTo(0, H);
      for (let x = 0; x <= W; x += 6) c.lineTo(x, curva(x) + dy);
      c.lineTo(W, H);
      c.closePath();
    };
    c.fillStyle = borde;
    trazo(-3 * this.dpr);
    c.fill();
    c.fillStyle = suelo;
    trazo(0);
    c.fill();

    const piedras = disponerPiedras(this.practicas, H * 0.078);
    if (piedras.length) {
      const px = W * 0.8;
      const py = curva(px) + H * 0.035;
      c.save();
      c.translate(px, py);
      c.fillStyle = 'rgba(14,54,64,.16)';
      c.beginPath();
      c.ellipse(0, 0, H * 0.075 * Math.min(1.9, 0.6 + piedras.length * 0.07), H * 0.012, 0, 0, Math.PI * 2);
      c.fill();
      piedras.forEach((p) => {
        c.save();
        c.translate(p.x, p.y);
        c.rotate((p.rot * Math.PI) / 180);
        c.fillStyle = p.color;
        c.fill(new Path2D(p.d));
        c.translate(p.cx, p.cy);
        c.fillStyle = p.luz;
        c.fill(new Path2D(p.cara));
        c.restore();
      });
      c.restore();
    }
  }

  fijar(cambios) {
    let rehacerOrilla = false;
    if (cambios.hora !== undefined && Math.abs(cambios.hora - this.hora) > 0.004) {
      this.hora = cambios.hora;
      this.sucio = true;
    }
    if (cambios.solAlto !== undefined && cambios.solAlto !== this.solAlto) {
      this.solAlto = cambios.solAlto;
      this.sucio = true;
    }
    if (cambios.agitacion !== undefined) this.agitacionMeta = cambios.agitacion;
    if (cambios.practicas !== undefined && cambios.practicas.length !== this.practicas.length) {
      this.practicas = cambios.practicas;
      rehacerOrilla = true;
    }
    if (cambios.tema) rehacerOrilla = true;
    if (rehacerOrilla) this.dibujarOrilla();
    if (movimientoReducido()) {
      this.agitacion = this.agitacionMeta;
      this.pintar();
    } else {
      this.iniciar();
    }
  }

  iniciar() {
    if (this.activo || !this.visible || document.hidden) return;
    this.activo = true;
    this.ultimoTiempo = 0;
    this.marco = requestAnimationFrame(this.bucle);
  }

  pausar() {
    this.activo = false;
    if (this.marco) cancelAnimationFrame(this.marco);
    this.marco = null;
  }

  bucle(ahora) {
    if (!this.activo) return;
    this.marco = requestAnimationFrame(this.bucle);
    if (ahora - this.ultimoTiempo < 33) return;
    const dt = this.ultimoTiempo ? Math.min(0.1, (ahora - this.ultimoTiempo) / 1000) : 0.033;
    this.ultimoTiempo = ahora;
    this.t += dt;
    this.agitacion += (this.agitacionMeta - this.agitacion) * Math.min(1, dt * 0.9);
    this.pintar();
    if (movimientoReducido()) this.pausar();
  }

  pintar() {
    if (!this.W) return;
    const { ctx, W, H, hz, m, dpr } = this;
    const p = paletaDeHora(this.hora);
    if (this.sucio) {
      this.componerArriba(p);
      this.sucio = false;
    }
    ctx.drawImage(this.arriba, m, 0, W, hz, 0, 0, W, hz);

    const ag = this.agitacion;
    const altoLago = H - hz;
    const paso = Math.max(1, Math.round(dpr));
    const t = this.t;
    const limite = m - 2;
    for (let y = 0; y < altoLago; y += paso) {
      const k = y / altoLago;
      const fuenteY = hz - 1 - y * 0.92;
      if (fuenteY < 0) break;
      const amp = (ag * (1.4 + 17 * k * k) + 0.16) * dpr;
      let dx = amp * Math.sin(y * (0.05 / dpr) * (1 + (1 - k) * 2.2) + t * 1.9);
      dx += amp * 0.5 * Math.sin(y * (0.17 / dpr) - t * 1.25);
      dx = Math.max(-limite, Math.min(limite, dx));
      ctx.drawImage(this.arriba, m + dx, fuenteY, W, paso, 0, hz + y, W, paso);
    }

    // Tinte del agua: cuanto más agitada, menos se ve el reflejo
    const tinte = ctx.createLinearGradient(0, hz, 0, H);
    tinte.addColorStop(0, rgba(p.agua, 0.2 + ag * 0.4));
    tinte.addColorStop(1, rgba(p.agua, 0.5 + ag * 0.38));
    ctx.fillStyle = tinte;
    ctx.fillRect(0, hz, W, altoLago);

    // Línea del horizonte, apenas marcada
    ctx.fillStyle = rgba(p.brillo, 0.3);
    ctx.fillRect(0, hz, W, Math.max(1, dpr * 0.75));

    // Destellos sobre el agua
    ctx.fillStyle = p.brillo;
    const cuantos = Math.floor(6 + ag * 58);
    for (let i = 0; i < cuantos; i += 1) {
      const b = this.brillos[i];
      const prof = b.y * b.y;
      const al = (0.08 + ag * 0.5) * (0.5 + 0.5 * Math.sin(t * b.f + b.fase));
      if (al <= 0.02) continue;
      const largo = (10 + 60 * prof) * b.largo * dpr * (0.5 + ag);
      ctx.globalAlpha = al;
      const x = (b.x * W + Math.sin(t * 0.4 + b.fase) * 8 * dpr * (ag + 0.2)) % W;
      ctx.fillRect(x, hz + prof * altoLago + 2 * dpr, largo, Math.max(1, dpr * (0.6 + prof * 1.1)));
    }
    ctx.globalAlpha = 1;

    ctx.drawImage(this.capaOrilla, 0, 0);
  }

  destruir() {
    this.pausar();
    this.ro.disconnect();
    this.io.disconnect();
    document.removeEventListener('visibilitychange', this.alCambiarVisibilidad);
  }
}
