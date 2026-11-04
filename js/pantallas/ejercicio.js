import { useEffect, useRef, useState } from '../../vendor/preact-htm.mjs';
import { html, LagunaVista, Cabecera, Fuentes, Icono, Enlace, ir, useHora, volver, Aviso } from '../ui.js';
import { useEstado, obtener, guardarEscrito, guardarPractica, cambiarCampo, agitacionDeHoy } from '../estado.js';
import { ejercicioPorId } from '../content/ejercicios.js';
import { emocionPorId } from '../content/emociones.js';
import { campana } from '../sonido.js';

function PasoRespirar({ veces, alListo }) {
  const [hecho, fijarHecho] = useState(0);
  const [fase, fijarFase] = useState('Inhala');
  const [grande, fijarGrande] = useState(false);
  useEffect(() => {
    let vivo = true;
    let cuenta = 0;
    let t;
    const ciclo = () => {
      if (!vivo) return;
      fijarFase('Inhala');
      fijarGrande(true);
      t = setTimeout(() => {
        fijarFase('Exhala');
        fijarGrande(false);
        t = setTimeout(() => {
          cuenta += 1;
          fijarHecho(cuenta);
          if (cuenta >= veces) {
            fijarFase('Listo');
            alListo();
          } else ciclo();
        }, 6000);
      }, 4000);
    };
    ciclo();
    return () => {
      vivo = false;
      clearTimeout(t);
    };
  }, []);
  return html`<div class="paso-respirar" aria-live="polite">
    <div class=${`sol-paso ${grande ? 'sube' : ''}`} aria-hidden="true"></div>
    <p class="paso-respirar-fase">${fase}</p>
    <p class="nota">${Math.min(hecho + 1, veces)} de ${veces}</p>
  </div>`;
}

function PasoTiempo({ paso, valor, alCambiar }) {
  const [queda, fijarQueda] = useState(paso.segundos);
  const [corriendo, fijarCorriendo] = useState(false);
  useEffect(() => {
    if (!corriendo) return undefined;
    const id = setInterval(() => {
      fijarQueda((q) => {
        if (q <= 1) {
          clearInterval(id);
          campana({ nivel: 0.35 });
          fijarCorriendo(false);
          return 0;
        }
        return q - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [corriendo]);
  const m = Math.floor(queda / 60);
  const s = String(queda % 60).padStart(2, '0');
  return html`<div>
    <p class="reloj-escribir" role="timer">${m}:${s}</p>
    <textarea
      class="area-grande"
      rows="10"
      aria-label=${paso.t}
      value=${valor || ''}
      onFocus=${() => {
        if (queda === paso.segundos) fijarCorriendo(true);
      }}
      onInput=${(ev) => alCambiar(ev.target.value)}
      placeholder="Empieza a escribir y correrá el tiempo."
    ></textarea>
  </div>`;
}

function Copiar({ texto }) {
  const [ok, fijarOk] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto || '');
      fijarOk(true);
    } catch {
      fijarOk(false);
    }
  };
  return html`<div>
    <blockquote class="mensaje-final">${texto || 'Todavía no escribiste un mensaje.'}</blockquote>
    <button class="btn btn-secundario" type="button" disabled=${!texto} onClick=${copiar}>${ok ? 'Copiado' : 'Copiar mensaje'}</button>
  </div>`;
}

const estaCompleto = (paso, datos) => {
  if (paso.opcional) return true;
  if (paso.k === 'texto' || paso.k === 'tiempo') return Boolean((datos[paso.clave] || '').trim());
  if (paso.k === 'chips' || paso.k === 'opcion') return Boolean(datos[paso.clave]);
  return true;
};

export function Ejercicio({ id }) {
  const ej = ejercicioPorId(id);
  const e = useEstado();
  const hora = useHora();
  const [i, fijarI] = useState(-1);
  const [datos, fijarDatos] = useState({});
  const [respiroListo, fijarRespiroListo] = useState(false);
  const agitBase = useRef(ej && ej.tormenta ? 0.95 : agitacionDeHoy(obtener()));
  if (!ej) return html`<${Cabecera} atras="/hoy" />`;

  const directo = ej.tormenta; // en una emoción fuerte no hay pantalla previa
  const indice = directo ? Math.max(i, 0) : i;
  const total = ej.pasos.length;
  const paso = indice >= 0 ? ej.pasos[indice] : null;

  const poner = (clave, valor) => fijarDatos((d) => ({ ...d, [clave]: valor }));

  const finalizar = () => {
    if (paso) {
      ej.pasos.forEach((p) => {
        if (p.guardaVoto && datos[p.clave]) cambiarCampo('voto', datos[p.clave].trim());
        if (p.guardaIntencion && datos[p.clave]) cambiarCampo('intencion', datos[p.clave].trim());
      });
    }
    const hayTexto = Object.values(datos).some((v) => (Array.isArray(v) ? v.length : String(v).trim()));
    if (hayTexto) guardarEscrito({ ref: ej.id, titulo: ej.titulo, datos });
    const p = guardarPractica({ ref: ej.id, tipo: 'ejercicio', titulo: ej.titulo, tema: ej.tema, min: ej.minutos });
    ir(`/terminada/${p.id}`, true);
  };

  const avanzar = () => {
    fijarRespiroListo(false);
    if (indice >= total - 1) finalizar();
    else fijarI(indice + 1);
    window.scrollTo(0, 0);
  };

  const retroceder = () => {
    if (indice <= 0) volver('/hoy');
    else {
      fijarI(indice - 1);
      window.scrollTo(0, 0);
    }
  };

  // Pantalla previa
  if (!paso) {
    return html`<div class="pantalla-texto">
      <${Cabecera} atras="/practicar/caminos" />
      <h1>${ej.titulo}</h1>
      <p class="lead">${ej.resumen}</p>
      <p class="para">Toma cerca de ${ej.minutos} minutos. Lo que escribas queda solo en este teléfono, en tu Diario.</p>
      <button class="btn btn-principal btn-ancho" type="button" onClick=${() => fijarI(0)}>Empezar</button>
      <h2>De dónde viene</h2>
      <${Fuentes} lista=${ej.fuente} />
    </div>`;
  }

  const opcionElegida = paso.k === 'opcion' ? paso.opciones.find((o) => o.v === datos[paso.clave]) : null;
  const puede = estaCompleto(paso, datos) && (paso.k !== 'respirar' || respiroListo);
  const agit = agitBase.current * Math.pow(1 - indice / total, 1.5);

  return html`<div class="pantalla-ejercicio">
    <section class="escena escena-mini">
      <${LagunaVista} hora=${hora} agitacion=${agit} horizonte=${0.56} orilla=${1} />
      <div class="ej-barra">
        <button class="btn-icono claro" type="button" aria-label="Volver" onClick=${retroceder}><${Icono} n="atras" /></button>
        <p>${ej.titulo}</p>
        ${total > 1 ? html`<p class="ej-contador">Paso ${indice + 1} de ${total}</p>` : null}
      </div>
    </section>
    <div class="cuerpo ej-cuerpo" key=${indice}>
      <h1>${paso.t}</h1>
      <p class="lead">${paso.x}</p>

      ${paso.muestraIntencion && e.intencion ? html`<blockquote class="intencion">${e.intencion}</blockquote>` : null}

      ${paso.k === 'respirar' && html`<${PasoRespirar} veces=${paso.veces} alListo=${() => fijarRespiroListo(true)} />`}

      ${paso.k === 'chips' &&
      html`<div class="chips">
        ${paso.opciones.map((o) => html`<button type="button" class=${`chip ${datos[paso.clave] === o.v ? 'activo' : ''}`} aria-pressed=${datos[paso.clave] === o.v} onClick=${() => poner(paso.clave, o.v)}>${o.txt}</button>`)}
      </div>`}

      ${paso.k === 'opcion' &&
      html`<div class="opciones">
        ${paso.opciones.map((o) => html`<button type="button" class=${`opcion ${datos[paso.clave] === o.v ? 'activa' : ''}`} aria-pressed=${datos[paso.clave] === o.v} onClick=${() => poner(paso.clave, o.v)}>
          <span>${o.txt}</span>
          ${datos[paso.clave] === o.v ? html`<${Icono} n="check" t=${20} />` : null}
        </button>`)}
      </div>
      ${opcionElegida && opcionElegida.nota ? html`<p class="nota-opcion">${opcionElegida.nota}</p>` : null}
      ${opcionElegida && opcionElegida.campo
        ? html`<label class="campo">
            <span>${opcionElegida.prompt}</span>
            <textarea rows="3" value=${datos[opcionElegida.campo] || ''} onInput=${(ev) => poner(opcionElegida.campo, ev.target.value)}></textarea>
          </label>`
        : null}`}

      ${paso.k === 'texto' &&
      html`<textarea class="area" rows=${paso.filas || 4} aria-label=${paso.t} value=${datos[paso.clave] || ''} onInput=${(ev) => poner(paso.clave, ev.target.value)}></textarea>`}

      ${paso.k === 'tiempo' && html`<${PasoTiempo} paso=${paso} valor=${datos[paso.clave]} alCambiar=${(v) => poner(paso.clave, v)} />`}

      ${paso.k === 'lista' &&
      html`<div class="opciones">
        ${paso.opciones.map((o) => {
          const lista = datos[paso.clave] || [];
          const on = lista.includes(o);
          return html`<button type="button" class=${`opcion ${on ? 'activa' : ''}`} aria-pressed=${on} onClick=${() => poner(paso.clave, on ? lista.filter((x) => x !== o) : [...lista, o])}>
            <span>${o}</span>
            ${on ? html`<${Icono} n="check" t=${20} />` : null}
          </button>`;
        })}
      </div>`}

      ${paso.k === 'copiar' && html`<${Copiar} texto=${datos[paso.clave]} />`}

      ${paso.ayuda ? html`<${Aviso}><${Enlace} ruta="/ayuda" clase="enlace">Ver dónde pedir ayuda<//><//>` : null}

      <div class="ej-pie">
        ${paso.opcional ? html`<span class="nota">Puedes saltarte este paso.</span>` : html`<span></span>`}
        <button class="btn btn-principal" type="button" disabled=${!puede} onClick=${avanzar}>${indice >= total - 1 ? 'Terminar' : 'Continuar'}</button>
      </div>
      ${ej.tormenta && indice === 0 ? html`<p class="nota"><${Enlace} ruta="/ayuda" clase="enlace">Si temes hacerte daño, pide ayuda ahora<//></p>` : null}
    </div>
  </div>`;
}

// Resumen legible de un escrito guardado
export function resumenEscrito(es) {
  const ej = ejercicioPorId(es.ref);
  if (!ej) return [];
  const filas = [];
  ej.pasos.forEach((p) => {
    if (!p.clave) return;
    const v = es.datos[p.clave];
    if (!v || (Array.isArray(v) && !v.length)) return;
    if (p.k === 'chips' || p.k === 'opcion') {
      const o = p.opciones.find((x) => x.v === v);
      const nombre = o ? o.txt : (emocionPorId(v) || {}).nombre || v;
      filas.push([p.t, nombre]);
      if (o && o.campo && es.datos[o.campo]) filas.push([o.prompt, es.datos[o.campo]]);
    } else if (p.k === 'lista') {
      filas.push([p.t, v.join(', ')]);
    } else if (p.k === 'texto' || p.k === 'tiempo') {
      filas.push([p.t, v]);
    }
  });
  return filas;
}
