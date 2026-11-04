import { useState } from '../../vendor/preact-htm.mjs';
import { html, Enlace, GlifoAgua, Icono, horaCorta, fechaLarga, plural } from '../ui.js';
import { useEstado, diaLocal, borrarEscrito, borrarRegistro } from '../estado.js';
import { aguaPorNivel, emocionPorId, EMOCIONES } from '../content/emociones.js';
import { resumenEscrito } from './ejercicio.js';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function Calendario({ e, mes, fijarMes, dia, fijarDia }) {
  const y = mes.getFullYear();
  const m = mes.getMonth();
  const primero = new Date(y, m, 1);
  const dias = new Date(y, m + 1, 0).getDate();
  const blancos = (primero.getDay() + 6) % 7;
  const celdas = [];
  for (let i = 0; i < blancos; i += 1) celdas.push(null);
  for (let d = 1; d <= dias; d += 1) celdas.push(d);
  const hoy = diaLocal();
  const nivelDe = (clave) => {
    const rs = e.registros.filter((r) => diaLocal(r.fecha) === clave);
    return rs.length ? rs[rs.length - 1].agua : null;
  };
  return html`<div class="calendario">
    <div class="cal-cabecera">
      <button class="btn-icono" type="button" aria-label="Mes anterior" onClick=${() => fijarMes(new Date(y, m - 1, 1))}><${Icono} n="atras" /></button>
      <p>${MESES[m]} de ${y}</p>
      <button class="btn-icono" type="button" aria-label="Mes siguiente" onClick=${() => fijarMes(new Date(y, m + 1, 1))}><${Icono} n="flecha" /></button>
    </div>
    <div class="cal-semana" aria-hidden="true">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l) => html`<span>${l}</span>`)}</div>
    <div class="cal-dias">
      ${celdas.map((d) => {
        if (!d) return html`<span></span>`;
        const clave = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const n = nivelDe(clave);
        const practico = e.practicas.some((p) => diaLocal(p.fecha) === clave);
        const texto = `${d} de ${MESES[m]}${n ? `, ${aguaPorNivel(n).nombre}` : ''}${practico ? ', con práctica' : ''}`;
        return html`<button
          type="button"
          class=${`cal-dia ${n ? `nivel-${n}` : ''} ${clave === hoy ? 'es-hoy' : ''} ${dia === clave ? 'elegido' : ''}`}
          aria-label=${texto}
          aria-pressed=${dia === clave}
          onClick=${() => fijarDia(dia === clave ? null : clave)}
        >
          ${d}${practico ? html`<i aria-hidden="true"></i>` : null}
        </button>`;
      })}
    </div>
    <div class="cal-leyenda" aria-hidden="true">
      <span class="ley nivel-1"></span><span>Tormenta</span>
      <span class="ley nivel-3"></span><span>Brisa</span>
      <span class="ley nivel-5"></span><span>Espejo</span>
    </div>
  </div>`;
}

function Entrada({ item }) {
  const [abierto, fijarAbierto] = useState(false);
  const [borrando, fijarBorrando] = useState(false);
  if (item.tipo === 'registro') {
    const r = item.dato;
    const agua = aguaPorNivel(r.agua);
    const em = r.emocion ? emocionPorId(r.emocion) : null;
    return html`<li class="entrada">
      <span class="entrada-glifo"><${GlifoAgua} n=${r.agua} t=${28} /></span>
      <div>
        <p class="entrada-titulo">${agua.nombre}${em ? `, ${em.nombre.toLowerCase()}` : ''}${r.intensidad !== null && em ? ` (${r.intensidad} de 10)` : ''}</p>
        <p class="entrada-hora">${horaCorta(r.fecha)}</p>
        ${r.nota ? html`<p class="entrada-nota">${r.nota}</p>` : null}
        ${borrando
          ? html`<p class="confirma">¿Borrar este registro? <button type="button" class="enlace" onClick=${() => borrarRegistro(r.id)}>Sí, borrar</button> <button type="button" class="enlace" onClick=${() => fijarBorrando(false)}>No</button></p>`
          : html`<button type="button" class="enlace enlace-suave" onClick=${() => fijarBorrando(true)}>Borrar</button>`}
      </div>
    </li>`;
  }
  const es = item.dato;
  const filas = resumenEscrito(es);
  return html`<li class="entrada">
    <span class="entrada-glifo"><${Icono} n="diario" t=${26} /></span>
    <div>
      <p class="entrada-titulo">${es.titulo}</p>
      <p class="entrada-hora">${horaCorta(es.fecha)}</p>
      <button type="button" class="enlace" aria-expanded=${abierto} onClick=${() => fijarAbierto(!abierto)}>${abierto ? 'Ocultar' : 'Ver lo que escribiste'}</button>
      ${abierto
        ? html`<dl class="escrito">
              ${filas.map(([t, v]) => html`<dt>${t}</dt><dd>${v}</dd>`)}
            </dl>
            ${borrando
              ? html`<p class="confirma">¿Borrar este escrito? <button type="button" class="enlace" onClick=${() => borrarEscrito(es.id)}>Sí, borrar</button> <button type="button" class="enlace" onClick=${() => fijarBorrando(false)}>No</button></p>`
              : html`<button type="button" class="enlace enlace-suave" onClick=${() => fijarBorrando(true)}>Borrar</button>`}`
        : null}
    </div>
  </li>`;
}

function Resumen({ e, mes }) {
  const delMes = e.registros.filter((r) => {
    const d = new Date(r.fecha);
    return d.getMonth() === mes.getMonth() && d.getFullYear() === mes.getFullYear() && r.emocion;
  });
  if (!delMes.length) return null;
  const cuenta = {};
  delMes.forEach((r) => {
    cuenta[r.emocion] = (cuenta[r.emocion] || 0) + 1;
  });
  const orden = Object.entries(cuenta).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const max = orden[0][1];
  return html`<section class="bloque">
    <h2>Lo que más apareció este mes</h2>
    <ul class="barras">
      ${orden.map(([id, n]) => {
        const em = emocionPorId(id);
        const conFicha = EMOCIONES.some((x) => x.id === id);
        return html`<li>
          <span class="barra-nombre">${conFicha ? html`<${Enlace} ruta=${`/emocion/${id}`} clase="enlace">${em.nombre}<//>` : em.nombre}</span>
          <span class="barra-pista"><i style=${`width:${(n / max) * 100}%`}></i></span>
          <span class="barra-n">${n}</span>
        </li>`;
      })}
    </ul>
  </section>`;
}

export function Diario() {
  const e = useEstado();
  const [mes, fijarMes] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [dia, fijarDia] = useState(null);

  const enMes = (iso) => {
    const d = new Date(iso);
    return d.getMonth() === mes.getMonth() && d.getFullYear() === mes.getFullYear();
  };
  const filtro = (iso) => (dia ? diaLocal(iso) === dia : enMes(iso));
  const items = [
    ...e.registros.filter((r) => filtro(r.fecha)).map((r) => ({ tipo: 'registro', fecha: r.fecha, id: r.id, dato: r })),
    ...e.escritos.filter((x) => filtro(x.fecha)).map((x) => ({ tipo: 'escrito', fecha: x.fecha, id: x.id, dato: x })),
  ].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  // Agrupa por día
  const grupos = [];
  items.forEach((it) => {
    const c = diaLocal(it.fecha);
    const g = grupos[grupos.length - 1];
    if (g && g.clave === c) g.items.push(it);
    else grupos.push({ clave: c, fecha: it.fecha, items: [it] });
  });

  return html`<div class="pantalla-diario">
    <header class="titulo-grande"><h1>Diario</h1></header>
    <div class="cuerpo">
      <${Calendario} e=${e} mes=${mes} fijarMes=${fijarMes} dia=${dia} fijarDia=${fijarDia} />

      <div class="acciones-diario">
        <a class="btn btn-principal" href="#/registro">Registrar cómo estoy</a>
        <a class="btn btn-secundario" href="#/ejercicio/reajuste">Reajustar una expectativa</a>
        <a class="btn btn-secundario" href="#/ejercicio/escritura-libre">Escribir libremente</a>
        <a class="btn btn-secundario" href="#/ejercicio/mensaje">Preparar un mensaje difícil</a>
      </div>

      <${Resumen} e=${e} mes=${mes} />

      <section class="bloque">
        <h2>${dia ? fechaLarga(`${dia}T12:00:00`) : `Tus notas de ${MESES[mes.getMonth()]}`}</h2>
        ${grupos.length
          ? grupos.map((g) => html`<div key=${g.clave}>
              ${dia ? null : html`<p class="grupo-fecha">${fechaLarga(g.fecha)}</p>`}
              <ul class="entradas">${g.items.map((it) => html`<${Entrada} key=${it.id} item=${it} />`)}</ul>
            </div>`)
          : html`<p class="nota">${dia ? 'No hay notas este día.' : 'Todavía no hay notas este mes. Registra cómo estás para empezar.'}</p>`}
      </section>
      <p class="nota">Tu diario se guarda solo en este teléfono. ${plural(e.registros.length + e.escritos.length, 'nota', 'notas')} en total.</p>
    </div>
  </div>`;
}
