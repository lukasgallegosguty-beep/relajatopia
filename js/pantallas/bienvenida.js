import { useState } from '../../vendor/preact-htm.mjs';
import { html, LagunaVista, Icono } from '../ui.js';
import { cambiarPerfil, cambiarCampo } from '../estado.js';
import { FASES } from '../content/caminos.js';
import { AVISO } from '../content/referencias.js';

const METAS = [
  { v: 'emociones', txt: 'Manejar emociones difíciles' },
  { v: 'expectativas', txt: 'Reajustar expectativas' },
  { v: 'felicidad', txt: 'Sentirme mejor en el día a día' },
  { v: 'proposito', txt: 'Encontrar propósito' },
  { v: 'compromisos', txt: 'Sostener un compromiso difícil' },
  { v: 'paternidad', txt: 'Criar después de un divorcio' },
];

const MOMENTOS = [
  { v: 1, txt: 'Estoy en plena crisis', sub: 'Algo duro pasó hace poco. Necesito estabilizarme.' },
  { v: 2, txt: 'Estoy retomando el equilibrio', sub: 'Ya pasó lo peor y quiero ordenar lo que siento.' },
  { v: 3, txt: 'Quiero profundizar', sub: 'Estoy bien y busco dar sentido a lo que vivo.' },
];

// La escena amanece a medida que avanzan los pasos.
const HORAS = [4.4, 5.6, 6.4, 7.4, 9.5];
const AGITACION = [0.9, 0.62, 0.4, 0.2, 0.05];

export function Bienvenida() {
  const [paso, fijarPaso] = useState(0);
  const [nombre, fijarNombre] = useState('');
  const [metas, fijarMetas] = useState([]);
  const [fase, fijarFase] = useState(null);
  const [minutos, fijarMinutos] = useState(5);

  const alternarMeta = (v) => fijarMetas((m) => (m.includes(v) ? m.filter((x) => x !== v) : [...m, v]));

  const terminar = () => {
    cambiarPerfil({
      nombre: nombre.trim(),
      metas,
      fase: fase || 1,
      minutos,
      listo: true,
      creado: new Date().toISOString(),
    });
    cambiarCampo('intencion', '');
    // Pide al navegador que no borre estos datos si le falta espacio.
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    location.hash = '/hoy';
  };

  const siguiente = () => (paso === 4 ? terminar() : fijarPaso(paso + 1));

  return html`<div class="bienvenida">
    <${LagunaVista} clase="lienzo-fondo" hora=${HORAS[paso]} agitacion=${AGITACION[paso]} horizonte=${0.19} orilla=${1} />
    <div class="bienvenida-hoja">
      ${paso === 0 &&
      html`<div class="paso-bienvenida">
        <h1 class="marca">Relajatopia</h1>
        <p class="lema">Cuando dejas de agitarla, el agua se aclara sola. Esta app te ayuda a practicar eso con tu mente.</p>
        <p class="detalle">Prácticas del budismo tibetano, explicadas con lo que hoy dice la ciencia, para adultos que atraviesan algo difícil.</p>
        <label class="campo">
          <span>¿Cómo quieres que te llamemos?</span>
          <input type="text" autocomplete="given-name" maxlength="30" placeholder="Tu nombre (opcional)" value=${nombre} onInput=${(ev) => fijarNombre(ev.target.value)} />
        </label>
      </div>`}

      ${paso === 1 &&
      html`<div>
        <h2>¿Qué te trae por aquí?</h2>
        <p class="detalle">Elige todo lo que corresponda.</p>
        <div class="opciones">
          ${METAS.map((m) => html`<button type="button" class=${`opcion ${metas.includes(m.v) ? 'activa' : ''}`} aria-pressed=${metas.includes(m.v)} onClick=${() => alternarMeta(m.v)}>
            <span>${m.txt}</span>
            ${metas.includes(m.v) ? html`<${Icono} n="check" t=${20} />` : null}
          </button>`)}
        </div>
      </div>`}

      ${paso === 2 &&
      html`<div>
        <h2>¿En qué momento estás?</h2>
        <p class="detalle">Define con qué fase empiezas. Puedes cambiarla cuando quieras.</p>
        <div class="opciones">
          ${MOMENTOS.map((m) => html`<button type="button" class=${`opcion opcion-doble ${fase === m.v ? 'activa' : ''}`} aria-pressed=${fase === m.v} onClick=${() => fijarFase(m.v)}>
            <span><strong>${m.txt}</strong><small>${m.sub}</small></span>
            ${fase === m.v ? html`<${Icono} n="check" t=${20} />` : null}
          </button>`)}
        </div>
        ${fase ? html`<p class="detalle fase-elegida">Empezarás en la fase ${FASES[fase - 1].nombre}. ${FASES[fase - 1].objetivo}</p>` : null}
      </div>`}

      ${paso === 3 &&
      html`<div>
        <h2>¿Cuánto tiempo al día?</h2>
        <p class="detalle">Practicar poco y seguido sirve más que hacerlo mucho una sola vez.</p>
        <div class="opciones">
          ${[5, 10, 20].map((m) => html`<button type="button" class=${`opcion ${minutos === m ? 'activa' : ''}`} aria-pressed=${minutos === m} onClick=${() => fijarMinutos(m)}>
            <span>${m} minutos</span>
            ${minutos === m ? html`<${Icono} n="check" t=${20} />` : null}
          </button>`)}
        </div>
      </div>`}

      ${paso === 4 &&
      html`<div>
        <h2>Antes de empezar</h2>
        <p class="detalle">${AVISO}</p>
        <ul class="lista-simple">
          <li>Si una práctica te agita o te trae recuerdos difíciles, detente. Parar también es cuidarte.</li>
          <li>Si tienes ideas de hacerte daño, llama al *4141. Es gratis y atiende las 24 horas.</li>
          <li>Tus registros se guardan solo en este teléfono. No hay cuenta ni servidor.</li>
        </ul>
      </div>`}

      <div class="bienvenida-pie">
        ${paso > 0 ? html`<button class="btn btn-texto" type="button" onClick=${() => fijarPaso(paso - 1)}>Volver</button>` : html`<span></span>`}
        <button class="btn btn-principal" type="button" disabled=${paso === 2 && !fase} onClick=${siguiente}>
          ${paso === 4 ? 'Entendido, empezar' : paso === 0 ? 'Comenzar' : 'Continuar'}
        </button>
      </div>
    </div>
  </div>`;
}
