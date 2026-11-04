import { useEffect, useMemo, useRef, useState } from '../../vendor/preact-htm.mjs';
import { html, LagunaVista, Cabecera, Fuentes, Icono, Selector, Aviso, GlifoAgua, Enlace, ir, plural } from '../ui.js';
import { useEstado, obtener, agitacionDeHoy, guardarPractica, anotarAguaDespues, cambiarAjustes } from '../estado.js';
import { sesionPorId, TEMAS } from '../content/sesiones.js';
import { AGUA } from '../content/emociones.js';
import { aforismoDe } from '../content/aforismos.js';
import { construirLinea, estimarVoz } from '../linea.js';
import { decir, callar, pausarVoz, reanudarVoz, prepararVoz, duracionClip, adelantarClips } from '../voz.js';
import { AMBIENTES, campana, encender, apagar, mantenerPantalla, soltarPantalla, preparar } from '../sonido.js';
import { horaActual } from '../laguna.js';
import { duracionCercana } from './hoy.js';
import { disponerPiedras, altoPila } from '../apacheta.js';

const duracionTexto = (txt) => duracionClip(txt) ?? estimarVoz(txt);

export function Sesion({ id, min }) {
  const e = useEstado();
  const s = sesionPorId(id);
  if (!s) return html`<${Cabecera} atras="/practicar" />`;
  const [minutos, fijarMinutos] = useState(min && s.duraciones.includes(Number(min)) ? Number(min) : duracionCercana(s, e.perfil.minutos));
  const enCrisis = e.perfil.fase === 1 && s.cautela;

  const empezar = () => {
    preparar();
    prepararVoz();
    if (e.ajustes.ambiente !== 'ninguno') encender(e.ajustes.ambiente, e.ajustes.volumenAmbiente);
    ir(`/reproducir/${s.id}/${minutos}`);
  };

  return html`<div class="pantalla-sesion">
    <${Cabecera} atras="/practicar" />
    <p class="tema-sesion">${TEMAS[s.tema].nombre}</p>
    <h1>${s.titulo}</h1>
    <p class="lead">${s.resumen}</p>
    <p class="para">${s.para}</p>
    ${s.ojos === 'abiertos' ? html`<p class="para"><${Icono} n="ojo" t=${20} /> Se hace con los ojos abiertos.</p>` : null}
    ${s.usaAforismo ? html`<blockquote class="aforismo-sesion">${aforismoDe().txt}</blockquote>` : null}

    ${s.cautela ? html`<${Aviso} tono=${enCrisis ? 'fuerte' : 'suave'}><p>${s.cautela}</p>${enCrisis ? html`<${Enlace} ruta="/sesion/sostener" clase="enlace">Ir a Sostener el momento<//>` : null}<//>` : null}

    ${s.duraciones.length > 1
      ? html`<h2>Duración</h2>
          <${Selector} etiqueta="Duración" valor=${minutos} alCambiar=${fijarMinutos} opciones=${s.duraciones.map((d) => ({ v: d, txt: `${d} min` }))} />`
      : html`<p class="para">Dura ${minutos} minutos.</p>`}

    <h2>Sonido de fondo</h2>
    <div class="chips">
      ${[{ id: 'ninguno', nombre: 'Sin sonido' }, ...AMBIENTES.filter((a) => a.id !== 'cuencos')].map((a) => html`<button type="button" class=${`chip ${e.ajustes.ambiente === a.id ? 'activo' : ''}`} aria-pressed=${e.ajustes.ambiente === a.id} onClick=${() => cambiarAjustes({ ambiente: a.id })}>${a.nombre}</button>`)}
    </div>

    <button class="btn btn-principal btn-ancho" type="button" onClick=${empezar}>Empezar</button>

    <h2>De dónde viene</h2>
    <${Fuentes} lista=${s.fuente} />
  </div>`;
}

const formatoTiempo = (seg) => {
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export function Reproductor({ id, min }) {
  const s = sesionPorId(id);
  if (!s) return html`<${Cabecera} atras="/practicar" />`;
  const minutos = s.duraciones.includes(Number(min)) ? Number(min) : s.duraciones[0];
  const e = obtener();
  const linea = useMemo(() => construirLinea(s, minutos, duracionTexto), [id, min]);
  const [transcurrido, fijarTranscurrido] = useState(0);
  const [pausado, fijarPausado] = useState(false);
  const [frase, fijarFrase] = useState('');
  const [voz, fijarVoz] = useState(e.ajustes.voz);
  const [confirmando, fijarConfirmando] = useState(false);
  const agitInicial = useRef(agitacionDeHoy(e) || 0.3);
  const horaInicio = useRef(s.noche ? Math.max(horaActual(), 19.2) : 4.9);
  const reloj = useRef({ inicio: performance.now(), pausa: 0, enPausa: null, indice: 0, terminado: false });
  const vozActual = useRef(voz);
  vozActual.current = voz;

  const finalizar = (seg) => {
    if (reloj.current.terminado) return;
    reloj.current.terminado = true;
    callar();
    soltarPantalla();
    const ambiente = obtener().ajustes.ambiente;
    if (ambiente !== 'ninguno') apagar(ambiente);
    const p = guardarPractica({ ref: s.id, tipo: 'sesion', titulo: s.titulo, tema: s.tema, min: seg / 60 });
    ir(`/terminada/${p.id}`, true);
  };

  useEffect(() => {
    campana({ nivel: 0.5 });
    mantenerPantalla();
    if (obtener().ajustes.voz === 'grabada') adelantarClips(linea.marcas.map((m) => m.txt));
    const recuperar = () => {
      if (!document.hidden) mantenerPantalla();
    };
    document.addEventListener('visibilitychange', recuperar);
    const tick = setInterval(() => {
      const r = reloj.current;
      if (r.enPausa !== null || r.terminado) return;
      const t = (performance.now() - r.inicio - r.pausa) / 1000;
      fijarTranscurrido(t);
      let ultima = null;
      while (r.indice < linea.marcas.length && linea.marcas[r.indice].t <= t) {
        ultima = linea.marcas[r.indice];
        r.indice += 1;
      }
      if (ultima) {
        fijarFrase(ultima.txt);
        decir(ultima.txt, vozActual.current);
      }
      if (t >= linea.total) {
        campana({ nivel: 0.5 });
        finalizar(linea.total);
      }
    }, 250);
    return () => {
      clearInterval(tick);
      document.removeEventListener('visibilitychange', recuperar);
      callar();
      soltarPantalla();
    };
  }, []);

  const alternarPausa = () => {
    const r = reloj.current;
    if (r.enPausa === null) {
      r.enPausa = performance.now();
      pausarVoz();
      fijarPausado(true);
    } else {
      r.pausa += performance.now() - r.enPausa;
      r.enPausa = null;
      reanudarVoz();
      fijarPausado(false);
    }
  };

  const alternarVoz = () => {
    prepararVoz();
    const nueva = voz === 'sin' ? (obtener().ajustes.voz === 'sin' ? 'grabada' : obtener().ajustes.voz) : 'sin';
    if (nueva === 'sin') callar();
    fijarVoz(nueva);
  };

  const salir = () => {
    if (transcurrido >= 60) {
      finalizar(transcurrido);
    } else {
      reloj.current.terminado = true;
      callar();
      const ambiente = obtener().ajustes.ambiente;
      if (ambiente !== 'ninguno') apagar(ambiente);
      ir(`/sesion/${s.id}`, true);
    }
  };

  const avance = Math.min(1, transcurrido / linea.total);
  const hora = s.noche ? Math.min(horaInicio.current + avance * 3, 23.5) : horaInicio.current + avance * 4.2;
  const agitacion = agitInicial.current * Math.pow(1 - avance, 1.6);
  const queda = Math.max(0, linea.total - transcurrido);

  return html`<div class="reproductor">
    <${LagunaVista} clase="lienzo-fondo" hora=${hora} agitacion=${agitacion} horizonte=${0.62} orilla=${1} />
    <div class="rep-arriba">
      <button class="btn-icono claro" type="button" aria-label="Terminar la sesión" onClick=${() => fijarConfirmando(true)}><${Icono} n="cerrar" /></button>
      <p>${s.titulo}</p>
    </div>
    <div class="rep-frase" aria-live="polite">
      ${s.usaAforismo ? html`<p class="rep-aforismo">${aforismoDe().txt}</p>` : null}
      ${e.ajustes.texto ? html`<p key=${frase}>${frase}</p>` : null}
    </div>
    <div class="rep-abajo">
      <div class="rep-progreso" role="progressbar" aria-label="Avance" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(avance * 100)}>
        <i style=${`width:${avance * 100}%`}></i>
      </div>
      <div class="rep-controles">
        <span class="rep-tiempo">${formatoTiempo(queda)}</span>
        <button class="rep-play" type="button" aria-label=${pausado ? 'Continuar' : 'Pausar'} onClick=${alternarPausa}><${Icono} n=${pausado ? 'play' : 'pausa'} t=${30} /></button>
        <button class="btn-icono claro" type="button" aria-label=${voz === 'sin' ? 'Activar voz' : 'Silenciar voz'} aria-pressed=${voz !== 'sin'} onClick=${alternarVoz}><${Icono} n=${voz === 'sin' ? 'vozNo' : 'voz'} /></button>
      </div>
    </div>
    ${confirmando
      ? html`<div class="rep-confirmar" role="dialog" aria-label="Terminar la sesión">
          <p>¿Terminar ahora?</p>
          <p class="nota">Detenerte también es cuidarte. ${transcurrido >= 60 ? 'Lo que practicaste cuenta.' : 'Con menos de un minuto no se agrega una piedra.'}</p>
          <div class="fila-botones">
            <button class="btn btn-texto" type="button" onClick=${() => fijarConfirmando(false)}>Seguir</button>
            <button class="btn btn-principal" type="button" onClick=${salir}>Terminar</button>
          </div>
        </div>`
      : null}
  </div>`;
}

export function Terminada({ id }) {
  const e = useEstado();
  const p = e.practicas.find((x) => x.id === id);
  const [elegida, fijarElegida] = useState(p ? p.agua : null);
  const n = e.practicas.length;
  if (!p) return html`<${Cabecera} atras="/hoy" />`;
  const elegir = (v) => {
    fijarElegida(v);
    anotarAguaDespues(p.id, v);
  };
  return html`<div class="pantalla-terminada">
    <${Apacheta} practicas=${e.practicas} nueva=${true} alto=${260} />
    <h1>Una piedra más</h1>
    <p class="lead">Tu apacheta tiene ${plural(n, 'piedra', 'piedras')}. Que esto ayude a quienes quieres, sea cual sea el resultado.</p>
    <h2>¿Cómo quedó el agua?</h2>
    <div class="olas" role="radiogroup" aria-label="Estado después de practicar">
      ${AGUA.map((a) => html`<button type="button" role="radio" aria-checked=${elegida === a.n} class=${`ola ${elegida === a.n ? 'activa' : ''}`} onClick=${() => elegir(a.n)}>
        <${GlifoAgua} n=${a.n} />
        <span>${a.nombre}</span>
      </button>`)}
    </div>
    ${elegida && elegida <= 2
      ? html`<${Aviso}><p>Si la práctica te dejó peor, prueba algo más suave o detente por hoy.</p><${Enlace} ruta="/ayuda" clase="enlace">Ver cuándo pedir ayuda<//><//>`
      : null}
    <button class="btn btn-principal btn-ancho" type="button" onClick=${() => ir('/hoy', true)}>Volver a Hoy</button>
  </div>`;
}

export function Apacheta({ practicas, alto = 240, nueva = false }) {
  return html`<${ApachetaSvg} practicas=${practicas} alto=${alto} nueva=${nueva} />`;
}

function ApachetaSvg({ practicas, alto, nueva }) {
  const piedras = useMemo(() => disponerPiedras(practicas, 62), [practicas.length]);
  const cima = altoPila(piedras) + 50;
  const anchoBase = Math.max(240, piedras.reduce((a, p) => Math.max(a, Math.abs(p.x) + 60), 0) * 2);
  const vista = Math.max(cima + 24, 170);
  const ultimo = piedras.length - 1;
  return html`<svg class="apacheta" viewBox=${`${-anchoBase / 2} ${-vista} ${anchoBase} ${vista + 18}`} height=${alto} role="img" aria-label=${`Apacheta con ${plural(practicas.length, 'piedra', 'piedras')}`}>
    <ellipse cx="0" cy="4" rx=${Math.min(anchoBase * 0.44, 40 + piedras.length * 7)} ry="7" class="apacheta-sombra" />
    ${piedras.map(
      (p) => html`<g key=${p.i} class=${nueva && p.i === ultimo ? 'piedra-nueva' : ''}>
        <g transform=${`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rot.toFixed(1)})`}>
          <path d=${p.d} fill=${p.color} />
          <path d=${p.cara} transform=${`translate(${p.cx.toFixed(1)} ${p.cy.toFixed(1)})`} fill=${p.luz} />
        </g>
      </g>`,
    )}
  </svg>`;
}
