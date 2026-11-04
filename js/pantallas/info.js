import { useState } from '../../vendor/preact-htm.mjs';
import { html, Cabecera, Origen, Enlace, Selector, Icono, Aviso, agruparBloques } from '../ui.js';
import { useEstado, cambiarPerfil, practicasDe, diaLocal } from '../estado.js';
import { lecturaPorId, ORIGENES } from '../content/lecturas.js';
import { sesionPorId, TEMAS, textoDuraciones } from '../content/sesiones.js';
import { fasePorId, planDelDia, SITUACIONES, situacionPorId } from '../content/caminos.js';
import { ejercicioPorId } from '../content/ejercicios.js';
import { PROGRAMAS, LIMITES, COMPARACION, RECOMENDACIONES, CUANDO_AYUDA, TELEFONOS, MEDIACION, BIBLIOGRAFIA, refPorId, AVISO } from '../content/referencias.js';

export function Lectura({ id }) {
  const l = lecturaPorId(id);
  if (!l) return html`<${Cabecera} atras="/practicar/lecturas" />`;
  const s = sesionPorId(l.practica);
  const refs = (l.refs || []).map(refPorId).filter(Boolean);
  return html`<article class="pantalla-texto lectura">
    <${Cabecera} atras="/practicar/lecturas" />
    <p class="tema-sesion">${TEMAS[l.tema].nombre}</p>
    <h1>${l.titulo}</h1>
    ${agruparBloques(l.bloques).map((g) => html`<${Origen} f=${g.f}>${g.textos}<//>`)}
    ${s
      ? html`<a class="practica-hoy" href=${`#/sesion/${s.id}`}>
          <span class="ph-texto">
            <span class="ph-motivo">Practicar esto</span>
            <span class="ph-titulo">${s.titulo}</span>
          </span>
          <span class="ph-accion"><span class="ph-min">${textoDuraciones(s)}</span><span class="boton-piedra"><${Icono} n="play" t=${24} /></span></span>
        </a>`
      : null}
    ${refs.length
      ? html`<h2>Para seguir leyendo</h2>
          <ul class="biblio">${refs.map((r) => html`<li>${r.txt}</li>`)}</ul>`
      : null}
  </article>`;
}

export function Fase({ id }) {
  const e = useEstado();
  const f = fasePorId(id);
  const [min, fijarMin] = useState(e.perfil.minutos);
  const plan = planDelDia(f.id, min);
  const hoy = practicasDe(e, diaLocal());
  const esMia = e.perfil.fase === f.id;
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/practicar/caminos" />
    <h1>${f.nombre}</h1>
    <p class="lead">${f.objetivo}</p>
    <p class="para">${f.plazo}</p>

    <h2>Plan diario</h2>
    <${Selector} etiqueta="Minutos al día" valor=${min} alCambiar=${fijarMin} opciones=${[5, 10, 20].map((m) => ({ v: m, txt: `${m} min` }))} />
    <ul class="plan plan-grande">
      ${plan.map((p) => {
        const s = sesionPorId(p.sesion);
        const ok = hoy.some((x) => x.ref === p.sesion);
        return html`<li class=${ok ? 'hecho' : ''}>
          <a href=${`#/sesion/${s.id}/${p.min}`}>
            <i aria-hidden="true"></i>
            <span>${s.titulo}</span>
            <small>${p.min} min${ok ? ', hecho' : ''}</small>
          </a>
          ${p.alternativa ? html`<p class="nota">O bien: <${Enlace} ruta=${`/ejercicio/${p.alternativa}`} clase="enlace">${ejercicioPorId(p.alternativa).titulo}<//></p>` : null}
        </li>`;
      })}
    </ul>
    ${f.semanal ? html`<p class="para">${f.semanal.txt} <${Enlace} ruta=${`/ejercicio/${f.semanal.ejercicio}`} clase="enlace">Hacerlo ahora<//></p>` : null}
    ${f.mensual ? html`<p class="para">${f.mensual.txt} <${Enlace} ruta=${`/ejercicio/${f.mensual.ejercicio}`} clase="enlace">Hacerlo ahora<//></p>` : null}

    <${Aviso}><p>${f.evitar}</p><//>

    ${esMia
      ? html`<p class="nota">Esta es tu fase actual.</p>`
      : html`<button class="btn btn-secundario btn-ancho" type="button" onClick=${() => cambiarPerfil({ fase: f.id })}>Cambiar a esta fase</button>`}
    <p class="nota">Las duraciones son orientativas. Los programas evaluados usan de 8 a 9 semanas de práctica diaria de 20 a 45 minutos.</p>
  </div>`;
}

export function Paternidad() {
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/practicar/caminos" />
    <h1>Criar después del divorcio</h1>
    <p class="lead">Lo que más protege a tus hijos es tener menos conflicto delante y una relación cálida y con autoridad afectiva. Estas guías apuntan a eso.</p>
    <ul class="atajos atajos-dobles">
      ${SITUACIONES.map((s) => html`<li><a href=${`#/situacion/${s.id}`}><span><strong>${s.titulo}</strong><small>${s.breve}</small></span><${Icono} n="flecha" t=${20} /></a></li>`)}
    </ul>
    <h2>Para entender mejor</h2>
    <ul class="atajos">
      ${['proteger-hijos', 'calidad', 'mediacion', 'crianza-paralela', 'crianza-consciente', 'compasion-idiota'].map((id) => {
        const l = lecturaPorId(id);
        return html`<li><a href=${`#/lectura/${id}`}><span>${l.titulo}</span><${Icono} n="flecha" t=${20} /></a></li>`;
      })}
    </ul>
    <${Origen} f="I">No existen ensayos de prácticas budistas tibetanas en madres y padres divorciados. Estas guías son extrapolaciones razonadas, no protocolos validados.<//>
  </div>`;
}

export function Situacion({ id }) {
  const s = situacionPorId(id);
  if (!s) return html`<${Cabecera} atras="/paternidad" />`;
  const ses = s.sesion ? sesionPorId(s.sesion) : null;
  const ej = s.ejercicio ? ejercicioPorId(s.ejercicio) : null;
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/paternidad" />
    <h1>${s.titulo}</h1>
    <p class="lead">${s.breve}</p>
    <ol class="pasos">${s.pasos.map((p) => html`<li>${p}</li>`)}</ol>
    ${ses
      ? html`<a class="practica-hoy" href=${`#/sesion/${ses.id}`}>
          <span class="ph-texto"><span class="ph-motivo">Sesión guiada</span><span class="ph-titulo">${ses.titulo}</span></span>
          <span class="ph-accion"><span class="ph-min">${textoDuraciones(ses)}</span><span class="boton-piedra"><${Icono} n="play" t=${24} /></span></span>
        </a>`
      : null}
    ${ej ? html`<a class="btn btn-secundario btn-ancho" href=${`#/ejercicio/${ej.id}`}>${ej.titulo}</a>` : null}
    ${s.ayuda ? html`<p class="nota"><${Enlace} ruta="/ayuda" clase="enlace">Ver dónde pedir ayuda y mediación<//></p>` : null}
    <${Origen} f="I">Integra lo que protege a los hijos según la evidencia con prácticas tradicionales. No es un protocolo validado.<//>
  </div>`;
}

export function Ayuda() {
  const [copiado, fijarCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText('*4141');
      fijarCopiado(true);
    } catch {
      fijarCopiado(false);
    }
  };
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/tu" />
    <h1>Pedir ayuda</h1>
    <p class="lead">Si temes hacerte daño o hacer daño a alguien, no tienes que resolverlo con una práctica. Llama ahora.</p>
    <ul class="telefonos">
      ${TELEFONOS.map((t) => html`<li class=${t.prioridad ? 'prioridad' : ''}>
        <a href=${`tel:${t.tel}`}>
          <span class="tel-numero"><${Icono} n="telefono" t=${20} />${t.numero}</span>
          <span class="tel-nombre">${t.nombre}</span>
          <span class="tel-nota">${t.nota}</span>
        </a>
        ${t.numero === '*4141' ? html`<button class="enlace" type="button" onClick=${copiar}>${copiado ? 'Número copiado' : 'Copiar el número'}</button>` : null}
      </li>`)}
    </ul>

    <h2>Cuándo buscar apoyo profesional</h2>
    <ul class="criterios">
      ${CUANDO_AYUDA.map((c) => html`<li><p class="crit-senal">${c.senal}</p><p>${c.accion}</p></li>`)}
    </ul>

    <h2>Mediación familiar en Chile</h2>
    <p class="para">${MEDIACION.texto}</p>
    <p class="para"><a class="enlace" href=${MEDIACION.enlace} target="_blank" rel="noopener">${MEDIACION.etiqueta}</a></p>
    <p class="para">${MEDIACION.extra}</p>
    <p class="nota">Teléfonos revisados en noviembre de 2026 en minsal.cl y chileatiende.gob.cl.</p>
  </div>`;
}

export function Evidencia() {
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/tu" />
    <h1>Qué dice la evidencia</h1>
    <p class="lead">Los programas de origen tibetano o afines producen mejoras moderadas, comparables a otras intervenciones psicológicas y no superiores a ellas.</p>
    <h2>Cómo leer esta app</h2>
    ${Object.entries(ORIGENES).map(([f, o]) => html`<${Origen} f=${f}>${o.detalle}<//>`)}
    <h2>Programas</h2>
    <ul class="programas">
      ${PROGRAMAS.map((p) => html`<li>
        <p class="prog-nombre">${p.nombre}</p>
        <p class="prog-base">${p.base}</p>
        <p>${p.dato}</p>
        <dl><dt>Calidad</dt><dd>${p.calidad}. ${p.nota}</dd></dl>
      </li>`)}
    </ul>
    <h2>Tradición y psicología, tema por tema</h2>
    <ul class="comparacion">
      ${COMPARACION.map((c) => html`<li>
        <p class="prog-nombre">${c.tema}</p>
        <dl>
          <div><dt>Tradición</dt><dd>${c.tradicion}</dd></div>
          <div><dt>Psicología</dt><dd>${c.psicologia}</dd></div>
          <div><dt>Dónde se cruzan</dt><dd>${c.cruce}</dd></div>
        </dl>
      </li>`)}
    </ul>
    <h2>Seis recomendaciones</h2>
    <ol class="pasos">${RECOMENDACIONES.map((r) => html`<li>${r}</li>`)}</ol>
    <h2>Límites de esta evidencia</h2>
    <ul class="lista-simple">${LIMITES.map((l) => html`<li>${l}</li>`)}</ul>
    <p class="nota">${AVISO}</p>
  </div>`;
}

export function Bibliografia() {
  return html`<div class="pantalla-texto">
    <${Cabecera} atras="/tu" />
    <h1>Bibliografía</h1>
    ${BIBLIOGRAFIA.map((g) => html`<section>
      <h2>${g.grupo}</h2>
      <ul class="biblio">
        ${g.items.map((i) => html`<li><p>${i.txt}</p><p class="nota">${i.nota}</p></li>`)}
      </ul>
    </section>`)}
  </div>`;
}
