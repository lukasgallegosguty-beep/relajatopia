import { useEffect, useRef, useState } from '../../vendor/preact-htm.mjs';
import { html, LagunaVista, Icono, Selector, ir, useHora, volver } from '../ui.js';
import { guardarPractica, obtener, agitacionDeHoy } from '../estado.js';
import { campana, mantenerPantalla, soltarPantalla, preparar } from '../sonido.js';

const RITMOS = {
  suave: { entrada: 4, salida: 6, nombre: '4 y 6' },
  lento: { entrada: 4, salida: 8, nombre: '4 y 8' },
};

// Curva suave para que el sol suba y baje sin saltos
const suavizar = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);

export function Respirar() {
  const hora = useHora();
  const [ritmo, fijarRitmo] = useState('suave');
  const [minutos, fijarMinutos] = useState(1);
  const [activo, fijarActivo] = useState(false);
  const [fase, fijarFase] = useState({ txt: '', alto: 0.15, cuenta: 0, avance: 0 });
  const inicio = useRef(0);
  const agitInicial = useRef(agitacionDeHoy(obtener()) || 0.4);

  const empezar = () => {
    preparar();
    campana({ nivel: 0.35 });
    mantenerPantalla();
    inicio.current = performance.now();
    fijarActivo(true);
  };

  const terminar = (seg) => {
    soltarPantalla();
    fijarActivo(false);
    if (seg >= 45) {
      campana({ nivel: 0.35 });
      const p = guardarPractica({ ref: 'respirar', tipo: 'respiracion', titulo: 'Respirar', tema: 'emociones', min: seg / 60 });
      ir(`/terminada/${p.id}`, true);
    }
  };

  useEffect(() => {
    if (!activo) return undefined;
    const { entrada, salida } = RITMOS[ritmo];
    const ciclo = entrada + salida;
    const total = minutos * 60;
    let marco;
    const paso = () => {
      const t = (performance.now() - inicio.current) / 1000;
      if (t >= total) {
        terminar(total);
        return;
      }
      const c = t % ciclo;
      const inhalando = c < entrada;
      const k = inhalando ? c / entrada : 1 - (c - entrada) / salida;
      const restante = inhalando ? entrada - c : ciclo - c;
      fijarFase({
        txt: inhalando ? 'Inhala' : 'Exhala',
        alto: 0.1 + suavizar(k) * 0.8,
        cuenta: Math.ceil(restante),
        avance: t / total,
      });
      if (navigator.vibrate && c < 0.05) navigator.vibrate(12);
      marco = requestAnimationFrame(paso);
    };
    marco = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(marco);
  }, [activo]);

  useEffect(() => () => soltarPantalla(), []);

  return html`<div class="reproductor respirar">
    <${LagunaVista}
      clase="lienzo-fondo"
      hora=${hora}
      agitacion=${activo ? agitInicial.current * (1 - fase.avance) : agitInicial.current}
      solAlto=${activo ? fase.alto : 0.3}
      horizonte=${0.62}
      orilla=${1}
    />
    <div class="rep-arriba">
      <button class="btn-icono claro" type="button" aria-label="Cerrar" onClick=${() => {
        if (activo) terminar((performance.now() - inicio.current) / 1000);
        else volver('/hoy');
      }}><${Icono} n="cerrar" /></button>
      <p>Respirar</p>
    </div>
    ${activo
      ? html`<div class="resp-guia" aria-live="polite">
          <p class="resp-fase">${fase.txt}</p>
          <p class="resp-cuenta" aria-hidden="true">${fase.cuenta}</p>
        </div>`
      : html`<div class="resp-inicio">
          <h1>Salida más larga que la entrada</h1>
          <p>El sol sube cuando inhalas y baja cuando exhalas.</p>
          <p class="etiqueta-campo">Ritmo, en segundos</p>
          <${Selector} etiqueta="Ritmo" valor=${ritmo} alCambiar=${fijarRitmo} opciones=${Object.entries(RITMOS).map(([v, r]) => ({ v, txt: r.nombre }))} />
          <p class="etiqueta-campo">Duración</p>
          <${Selector} etiqueta="Duración" valor=${minutos} alCambiar=${fijarMinutos} opciones=${[1, 3, 5].map((m) => ({ v: m, txt: `${m} min` }))} />
          <button class="btn btn-principal btn-ancho" type="button" onClick=${empezar}>Empezar</button>
        </div>`}
  </div>`;
}
