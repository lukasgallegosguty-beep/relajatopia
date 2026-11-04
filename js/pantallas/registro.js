import { useState } from '../../vendor/preact-htm.mjs';
import { html, LagunaVista, GlifoAgua, Cabecera, ir, useHora, Origen, Enlace } from '../ui.js';
import { guardarRegistro } from '../estado.js';
import { AGUA, aguaPorNivel, EMOCIONES, OTROS_ESTADOS, emocionPorId } from '../content/emociones.js';
import { sesionPorId, textoDuraciones } from '../content/sesiones.js';
import { ejercicioPorId } from '../content/ejercicios.js';

export function Registro({ agua: inicial }) {
  const hora = useHora();
  const [agua, fijarAgua] = useState(inicial ? Number(inicial) : null);
  const [emocion, fijarEmocion] = useState(null);
  const [intensidad, fijarIntensidad] = useState(5);
  const [nota, fijarNota] = useState('');

  const guardar = () => {
    guardarRegistro({ agua, emocion, intensidad: emocion ? intensidad : null, nota: nota.trim() });
    const dificil = EMOCIONES.find((x) => x.id === emocion);
    ir(dificil ? `/emocion/${dificil.id}` : '/hoy', true);
  };

  return html`<div class="pantalla-registro">
    <section class="escena escena-baja">
      <${LagunaVista} hora=${hora} agitacion=${agua ? aguaPorNivel(agua).agit : 0.3} horizonte=${0.5} orilla=${1} />
      <${Cabecera} atras="/hoy" cerrar=${true} />
    </section>
    <div class="cuerpo">
      <h1>¿Cómo está el agua?</h1>
      <div class="olas" role="radiogroup" aria-label="Estado de ánimo">
        ${AGUA.map((a) => html`<button type="button" role="radio" aria-checked=${agua === a.n} class=${`ola ${agua === a.n ? 'activa' : ''}`} onClick=${() => fijarAgua(a.n)}>
          <${GlifoAgua} n=${a.n} />
          <span>${a.nombre}</span>
        </button>`)}
      </div>
      ${agua ? html`<p class="nota">${aguaPorNivel(agua).txt}.</p>` : null}

      ${agua
        ? html`<h2>¿Qué emoción está más presente?</h2>
            <div class="chips">
              ${[...EMOCIONES, ...OTROS_ESTADOS].map((x) => html`<button type="button" class=${`chip ${emocion === x.id ? 'activo' : ''}`} aria-pressed=${emocion === x.id} onClick=${() => fijarEmocion(emocion === x.id ? null : x.id)}>${x.nombre}</button>`)}
            </div>
            ${emocion
              ? html`<label class="campo">
                  <span>Intensidad: ${intensidad} de 10</span>
                  <input type="range" min="0" max="10" step="1" value=${intensidad} onInput=${(ev) => fijarIntensidad(Number(ev.target.value))} />
                </label>`
              : null}
            <label class="campo">
              <span>Una nota, si quieres</span>
              <textarea rows="3" maxlength="600" value=${nota} onInput=${(ev) => fijarNota(ev.target.value)} placeholder="¿Qué pasó hoy?"></textarea>
            </label>
            <button class="btn btn-principal btn-ancho" type="button" onClick=${guardar}>Guardar</button>`
        : null}
    </div>
  </div>`;
}

export function Emocion({ id }) {
  const em = emocionPorId(id);
  if (!em || !em.lectura) return html`<${Cabecera} atras="/hoy" />`;
  const ej = em.ejercicio ? ejercicioPorId(em.ejercicio) : null;
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/hoy" />
    <h1>${em.nombre}</h1>
    <${Origen} f="T">${[em.lectura, `Antídoto: ${em.antidoto}`]}<//>
    <${Origen} f="C">${[`Equivalente en psicología: ${em.psicologia}`, em.evidencia]}<//>
    <h2>Practicar ahora</h2>
    <ul class="atajos">
      ${em.sesiones.map((sid) => {
        const s = sesionPorId(sid);
        return html`<li><a href=${`#/sesion/${s.id}`}><span>${s.titulo}</span><small>${textoDuraciones(s)}</small></a></li>`;
      })}
      ${ej ? html`<li><a href=${`#/ejercicio/${ej.id}`}><span>${ej.titulo}</span><small>${ej.minutos} min</small></a></li>` : null}
      <li><a href="#/ejercicio/ahora"><span>Regular una emoción</span><small>3 min</small></a></li>
    </ul>
    <p class="nota"><${Enlace} ruta="/hoy" clase="enlace">Volver a Hoy<//></p>
  </div>`;
}
