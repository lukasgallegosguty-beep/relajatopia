import { useState } from '../../vendor/preact-htm.mjs';
import { html, Cabecera, Enlace, Selector, Icono, Aviso, entregarArchivo, plural, ir } from '../ui.js';
import {
  useEstado, minutosTotales, diasSeguidos, cambiarPerfil, cambiarAjustes, cambiarCampo,
  exportarDatos, importarDatos, borrarTodo, hayPersistencia,
} from '../estado.js';
import { Apacheta } from './sesion.js';
import { FASES, fasePorId } from '../content/caminos.js';
import { AVISO } from '../content/referencias.js';
import { hayVozTelefono, hayClips, totalClips, descargarTodosLosClips } from '../voz.js';

function CampoFrase({ titulo, ayuda, valor, alGuardar, marcador }) {
  const [editando, fijarEditando] = useState(false);
  const [texto, fijarTexto] = useState(valor);
  if (editando) {
    return html`<div class="frase">
      <label class="campo">
        <span>${titulo}</span>
        <textarea rows="2" maxlength="160" value=${texto} placeholder=${marcador} onInput=${(ev) => fijarTexto(ev.target.value)}></textarea>
      </label>
      <p class="nota">${ayuda}</p>
      <div class="fila-botones">
        <button class="btn btn-texto" type="button" onClick=${() => fijarEditando(false)}>Cancelar</button>
        <button class="btn btn-principal" type="button" onClick=${() => {
          alGuardar(texto.trim());
          fijarEditando(false);
        }}>Guardar</button>
      </div>
    </div>`;
  }
  return html`<div class="frase">
    <p class="frase-titulo">${titulo}</p>
    ${valor ? html`<blockquote class="intencion">${valor}</blockquote>` : html`<p class="nota">${ayuda}</p>`}
    <button class="enlace" type="button" onClick=${() => {
      fijarTexto(valor);
      fijarEditando(true);
    }}>${valor ? 'Cambiar' : 'Escribir'}</button>
  </div>`;
}

export function Tu() {
  const e = useEstado();
  const n = e.practicas.length;
  const min = minutosTotales(e);
  const dias = diasSeguidos(e);
  const fase = fasePorId(e.perfil.fase);
  return html`<div class="pantalla-tu">
    <header class="titulo-grande"><h1>${e.perfil.nombre || 'Tú'}</h1></header>
    <div class="cuerpo">
      <section class="apacheta-tu">
        ${n
          ? html`<${Apacheta} practicas=${e.practicas} alto=${250} />
              <p class="lead">Tu apacheta tiene ${plural(n, 'piedra', 'piedras')}: ${plural(min, 'minuto', 'minutos')} de práctica${dias > 1 ? ` y ${dias} días seguidos` : ''}.</p>
              <p class="nota">Las apachetas son montículos que los viajeros andinos levantan en los pasos de montaña, y en el Tíbet existe una costumbre parecida. Cada persona agrega una piedra. Aquí tampoco se pierde ninguna si dejas de practicar unos días.</p>`
          : html`<p class="lead">Cada práctica que termines agregará una piedra a tu apacheta.</p>
              <p class="nota">Las piedras nunca se pierden. Si dejas de practicar unos días, retomas donde estabas.</p>
              <a class="btn btn-principal" href="#/practicar">Elegir una práctica</a>`}
      </section>

      <section class="bloque">
        <${CampoFrase}
          titulo="Mi intención"
          ayuda="Una frase sobre lo que quieres cuidar. Se muestra en Hoy y te acompaña cuando usas Ahora."
          marcador="Por ejemplo: proteger a mis hijos del conflicto"
          valor=${e.intencion}
          alGuardar=${(v) => cambiarCampo('intencion', v)}
        />
        <${CampoFrase}
          titulo="Mi compromiso"
          ayuda="Lo que sostienes aunque pese: no elijo cada día si… Elijo cada día cómo…"
          marcador="No elijo cada día si crío a mis hijos. Elijo cada día cómo."
          valor=${e.voto}
          alGuardar=${(v) => cambiarCampo('voto', v)}
        />
      </section>

      <section class="bloque">
        <ul class="atajos">
          <li><a href=${`#/fase/${fase.id}`}><span>Mi camino: fase ${fase.nombre}</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/paternidad"><span>Criar después del divorcio</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/ayuda"><span>Cuándo y dónde pedir ayuda</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/evidencia"><span>Qué dice la evidencia</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/bibliografia"><span>Bibliografía</span><${Icono} n="flecha" t=${20} /></a></li>
          <li><a href="#/ajustes"><span>Ajustes y datos</span><${Icono} n="flecha" t=${20} /></a></li>
        </ul>
      </section>
    </div>
  </div>`;
}

function archivoCalendario(horaTexto) {
  const [hh, mm] = horaTexto.split(':');
  const hoy = new Date();
  const fecha = `${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, '0')}${String(hoy.getDate()).padStart(2, '0')}`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Relajatopia//ES',
    'BEGIN:VEVENT',
    `UID:relajatopia-${Date.now()}@relajatopia`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART:${fecha}T${hh}${mm}00`,
    'DURATION:PT10M',
    'RRULE:FREQ=DAILY',
    'SUMMARY:Practicar en Relajatopia',
    'DESCRIPTION:Unos minutos para ti.',
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Practicar en Relajatopia',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

export function Ajustes() {
  const e = useEstado();
  const [hora, fijarHora] = useState('08:00');
  const [mensaje, fijarMensaje] = useState('');
  const [borrando, fijarBorrando] = useState(false);
  const [descarga, fijarDescarga] = useState(null);

  const descargarVoces = async () => {
    fijarDescarga(0);
    await descargarTodosLosClips((n) => fijarDescarga(n));
    fijarDescarga('lista');
  };

  const exportar = async () => {
    await entregarArchivo(`relajatopia-respaldo-${new Date().toISOString().slice(0, 10)}.json`, 'application/json', exportarDatos());
    fijarMensaje('Respaldo creado.');
  };

  const importar = async (ev) => {
    const f = ev.target.files[0];
    if (!f) return;
    try {
      importarDatos(await f.text());
      fijarMensaje('Respaldo restaurado.');
    } catch (err) {
      fijarMensaje(err.message.startsWith('El archivo') ? err.message : 'No se pudo leer el archivo. Elige un respaldo .json de Relajatopia.');
    }
    ev.target.value = '';
  };

  return html`<div class="pantalla-texto">
    <${Cabecera} titulo="Ajustes y datos" atras="/tu" />

    <h2>Tu perfil</h2>
    <label class="campo">
      <span>Nombre</span>
      <input type="text" maxlength="30" value=${e.perfil.nombre} onInput=${(ev) => cambiarPerfil({ nombre: ev.target.value })} />
    </label>
    <p class="etiqueta-campo">Fase actual</p>
    <${Selector} etiqueta="Fase" valor=${e.perfil.fase} alCambiar=${(v) => cambiarPerfil({ fase: v })} opciones=${FASES.map((f) => ({ v: f.id, txt: f.nombre }))} />
    <p class="etiqueta-campo">Tiempo al día</p>
    <${Selector} etiqueta="Minutos al día" valor=${e.perfil.minutos} alCambiar=${(v) => cambiarPerfil({ minutos: v })} opciones=${[5, 10, 20].map((m) => ({ v: m, txt: `${m} min` }))} />
    <label class="interruptor">
      <input type="checkbox" checked=${e.perfil.metas.includes('paternidad')} onChange=${(ev) => cambiarPerfil({ metas: ev.target.checked ? [...e.perfil.metas, 'paternidad'] : e.perfil.metas.filter((m) => m !== 'paternidad') })} />
      <span>Mostrar atajos para criar después de un divorcio</span>
    </label>

    <h2>Apariencia</h2>
    <${Selector} etiqueta="Tema" valor=${e.ajustes.tema} alCambiar=${(v) => cambiarAjustes({ tema: v })} opciones=${[{ v: 'hora', txt: 'Según la hora' }, { v: 'claro', txt: 'Claro' }, { v: 'oscuro', txt: 'Oscuro' }]} />

    <h2>Sesiones guiadas</h2>
    <p class="etiqueta-campo">Voz</p>
    <${Selector}
      etiqueta="Voz"
      valor=${e.ajustes.voz}
      alCambiar=${(v) => cambiarAjustes({ voz: v })}
      opciones=${[{ v: 'grabada', txt: 'De la app' }, { v: 'telefono', txt: 'Del teléfono' }, { v: 'sin', txt: 'Sin voz' }]}
    />
    ${!hayVozTelefono() ? html`<p class="nota">Este navegador no tiene voz propia.</p>` : null}
    ${hayClips()
      ? html`<div class="acciones-diario">
          <button class="btn btn-secundario" type="button" disabled=${descarga !== null && descarga !== 'lista'} onClick=${descargarVoces}>
            ${descarga === null ? 'Descargar todas las voces' : descarga === 'lista' ? 'Voces descargadas' : `Descargando ${descarga} de ${totalClips()}`}
          </button>
        </div>
        <p class="nota">Cada sesión guarda su voz la primera vez que la abres. Este botón las deja todas listas para usar sin conexión.</p>`
      : null}
    <label class="interruptor">
      <input type="checkbox" checked=${e.ajustes.texto} onChange=${(ev) => cambiarAjustes({ texto: ev.target.checked })} />
      <span>Mostrar el texto en pantalla</span>
    </label>

    <h2>Recordatorio diario</h2>
    <p class="para">Crea un evento repetido en el calendario de tu teléfono.</p>
    <div class="fila-campo">
      <input type="time" aria-label="Hora del recordatorio" value=${hora} onInput=${(ev) => fijarHora(ev.target.value)} />
      <button class="btn btn-secundario" type="button" onClick=${() => entregarArchivo('relajatopia-recordatorio.ics', 'text/calendar', archivoCalendario(hora))}>Agregar al calendario</button>
    </div>

    <h2>Instalar en tu teléfono</h2>
    <p class="para">En iPhone, abre esta página en Safari, toca Compartir y luego “Agregar a inicio”. En Android, abre el menú de Chrome y toca “Instalar app”.</p>

    <h2>Tus datos</h2>
    <p class="para">Todo se guarda solo en este teléfono. Si cambias de equipo o borras los datos del navegador, se pierde, salvo que tengas un respaldo. En iPhone, instalar la app en la pantalla de inicio ayuda a que Safari no borre tus datos.</p>
    ${!hayPersistencia() ? html`<${Aviso} tono="fuerte"><p>Este navegador no permite guardar datos. Lo que registres se perderá al cerrar la app.</p><//>` : null}
    <div class="acciones-diario">
      <button class="btn btn-secundario" type="button" onClick=${exportar}>Crear respaldo</button>
      <label class="btn btn-secundario">
        Restaurar respaldo
        <input class="oculto" type="file" accept="application/json,.json" onChange=${importar} />
      </label>
      ${borrando
        ? html`<${Aviso} tono="fuerte">
            <p>Esto borra tu perfil, tus registros y tu apacheta. No se puede deshacer.</p>
            <div class="fila-botones">
              <button class="btn btn-texto" type="button" onClick=${() => fijarBorrando(false)}>Cancelar</button>
              <button class="btn btn-peligro" type="button" onClick=${() => {
                borrarTodo();
                ir('/hoy', true);
              }}>Borrar todo</button>
            </div>
          <//>`
        : html`<button class="btn btn-texto btn-peligro-texto" type="button" onClick=${() => fijarBorrando(true)}>Borrar todos mis datos</button>`}
    </div>
    ${mensaje ? html`<p class="nota" role="status">${mensaje}</p>` : null}

    <h2>Acerca de</h2>
    <p class="para">${AVISO}</p>
    <p class="para">Los contenidos resumen un informe sobre budismo tibetano y ciencia contemporánea. Cada texto indica si viene de la tradición, de la ciencia o de una interpretación. <${Enlace} ruta="/bibliografia" clase="enlace">Ver la bibliografía<//>.</p>
  </div>`;
}
