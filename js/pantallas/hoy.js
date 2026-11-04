import { html, LagunaVista, Icono, GlifoAgua, Enlace, Aviso, ir, useHora, plural } from '../ui.js';
import { useEstado, registroDeHoy, agitacionDeHoy, practicasDe, diaLocal, diasDeEstaSemana, aguaBajaSostenida } from '../estado.js';
import { AGUA, aguaPorNivel, EMOCIONES, emocionPorId } from '../content/emociones.js';
import { sesionPorId } from '../content/sesiones.js';
import { planDelDia, fasePorId } from '../content/caminos.js';
import { aforismoDe } from '../content/aforismos.js';

function saludo(h) {
  if (h >= 5 && h < 12) return 'Buenos días';
  if (h >= 12 && h < 20.5) return 'Buenas tardes';
  return 'Buenas noches';
}

export function duracionCercana(sesion, minutos) {
  const validas = sesion.duraciones.filter((d) => d <= minutos);
  return validas.length ? validas[validas.length - 1] : sesion.duraciones[0];
}

export function sugerencia(e, ahora = new Date()) {
  const h = ahora.getHours();
  const hoy = diaLocal(ahora);
  const hechas = practicasDe(e, hoy);
  const hecha = (id) => hechas.some((p) => p.ref === id);
  const reg = registroDeHoy(e);
  if (reg && reg.emocion) {
    const em = EMOCIONES.find((x) => x.id === reg.emocion);
    const id = em && em.sesiones.find((s) => !hecha(s));
    if (id) {
      const s = sesionPorId(id);
      const fases = s.fases || [1, 2, 3];
      const elegida = fases.includes(e.perfil.fase) ? id : 'sostener';
      if (!hecha(elegida)) {
        const se = sesionPorId(elegida);
        return { sesion: se, min: duracionCercana(se, e.perfil.minutos), motivo: `Porque hoy registraste ${em.nombre.toLowerCase()}.` };
      }
    }
  }
  if ((h >= 21 || h < 4) && !hecha('dormir')) {
    const s = sesionPorId('dormir');
    return { sesion: s, min: 10, motivo: 'Para preparar el sueño.' };
  }
  const fase = fasePorId(e.perfil.fase);
  const pendiente = planDelDia(e.perfil.fase, e.perfil.minutos, ahora).find((p) => !hecha(p.sesion));
  if (pendiente) {
    return { sesion: sesionPorId(pendiente.sesion), min: pendiente.min, motivo: `Es parte de tu plan de la fase ${fase.nombre}.` };
  }
  return null;
}

function Semana({ e }) {
  const dias = diasDeEstaSemana(e);
  const letras = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const hechos = dias.filter((d) => d.hecho).length;
  return html`<div class="semana" role="img" aria-label=${`Practicaste ${plural(hechos, 'día', 'días')} esta semana`}>
    ${dias.map((d, i) => html`<span class=${`dia ${d.hecho ? 'hecho' : ''} ${d.futuro ? 'futuro' : ''}`}><i></i>${letras[i]}</span>`)}
  </div>`;
}

export function Hoy() {
  const e = useEstado();
  const hora = useHora();
  const reg = registroDeHoy(e);
  const agua = reg ? aguaPorNivel(reg.agua) : null;
  const sug = sugerencia(e);
  const nombre = e.perfil.nombre;
  const paternidad = e.perfil.metas.includes('paternidad');
  const plan = planDelDia(e.perfil.fase, e.perfil.minutos);
  const hechasHoy = practicasDe(e, diaLocal());
  const af = aforismoDe();
  const fase = fasePorId(e.perfil.fase);
  const emocion = reg && reg.emocion ? emocionPorId(reg.emocion) : null;

  return html`<div class="pantalla-hoy">
    <section class="escena">
      <${LagunaVista} hora=${hora} agitacion=${agitacionDeHoy(e)} practicas=${e.practicas} horizonte=${0.6} orilla=${0.91} />
      <div class="saludo">
        <h1>${saludo(hora)}${nombre ? `, ${nombre}` : ''}</h1>
        ${e.intencion ? html`<p>${e.intencion}</p>` : null}
      </div>
    </section>

    <div class="cuerpo">
      <section class="bloque">
        ${agua
          ? html`<div class="agua-registrada">
              <span class="agua-glifo"><${GlifoAgua} n=${agua.n} t=${30} /></span>
              <p>Hoy tu agua está en <strong>${agua.nombre.toLowerCase()}</strong>${emocion ? html`, con ${emocion.nombre.toLowerCase()}` : ''}.</p>
              <${Enlace} ruta="/registro" clase="enlace">Actualizar<//>
            </div>`
          : html`<h2>¿Cómo está el agua hoy?</h2>
              <div class="olas">
                ${AGUA.map((a) => html`<button type="button" class="ola" onClick=${() => ir(`/registro/${a.n}`)}>
                  <${GlifoAgua} n=${a.n} />
                  <span>${a.nombre}</span>
                </button>`)}
              </div>`}
      </section>

      ${aguaBajaSostenida(e)
        ? html`<${Aviso}>
            <p>Tus últimos registros muestran varios días difíciles. Hablar con alguien puede ayudar.</p>
            <${Enlace} ruta="/ayuda" clase="enlace">Ver cuándo y dónde pedir ayuda<//>
          <//>`
        : null}

      <section class="bloque">
        <h2>Tu práctica de hoy</h2>
        ${sug
          ? html`<a class="practica-hoy" href=${`#/sesion/${sug.sesion.id}/${sug.min}`}>
              <span class="ph-texto">
                <span class="ph-titulo">${sug.sesion.titulo}</span>
                <span class="ph-motivo">${sug.motivo}</span>
              </span>
              <span class="ph-accion"><span class="ph-min">${sug.min} min</span><span class="boton-piedra"><${Icono} n="play" t=${24} /></span></span>
            </a>`
          : html`<p class="nota">Terminaste tu plan de hoy. Si quieres seguir, elige algo en <${Enlace} ruta="/practicar" clase="enlace">Practicar<//>.</p>`}
        ${plan.length > 1
          ? html`<ul class="plan">
              ${plan.map((p) => {
                const s = sesionPorId(p.sesion);
                const ok = hechasHoy.some((x) => x.ref === p.sesion);
                return html`<li class=${ok ? 'hecho' : ''}>
                  <a href=${`#/sesion/${s.id}/${p.min}`}>
                    <i aria-hidden="true"></i>
                    <span>${s.titulo}</span>
                    <small>${p.min} min${ok ? ', hecho' : ''}</small>
                  </a>
                </li>`;
              })}
            </ul>`
          : null}
        <${Semana} e=${e} />
      </section>

      <section class="bloque aforismo">
        <h2>El aforismo de hoy</h2>
        <blockquote>${af.txt}</blockquote>
        <p>${af.nota}</p>
        <${Enlace} ruta="/sesion/aforismo-dia" clase="enlace">Practicar con este aforismo<//>
      </section>

      <section class="bloque">
        <h2>Para este momento</h2>
        <ul class="atajos">
          <li><a href="#/ejercicio/ahora"><span>Me está subiendo una emoción fuerte</span><${Icono} n="flecha" t=${20} /></a></li>
          ${paternidad ? html`<li><a href="#/paternidad"><span>Tengo un traspaso o un conflicto con mi expareja</span><${Icono} n="flecha" t=${20} /></a></li>` : null}
          <li><a href="#/respirar"><span>Necesito respirar un momento</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/ejercicio/reajuste"><span>Las cosas no salieron como esperaba</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/sesion/dormir"><span>No me puedo dormir</span><${Icono} n="flecha" t=${20} /></a></li>
          ${!paternidad && e.perfil.metas.includes('compromisos') ? html`<li><a href="#/ejercicio/desenredar"><span>Un compromiso me está pesando</span><${Icono} n="flecha" t=${20} /></a></li>` : null}
        </ul>
      </section>

      <p class="fase-actual">Estás en la fase <${Enlace} ruta=${`/fase/${fase.id}`} clase="enlace">${fase.nombre}<//>.</p>
    </div>
  </div>`;
}

