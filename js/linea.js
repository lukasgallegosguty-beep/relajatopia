// Convierte el guion de una sesión en una línea de tiempo para una duración dada.

const CARACTERES_POR_SEGUNDO = 13.5;

export function estimarVoz(txt) {
  return Math.max(1.5, txt.length / CARACTERES_POR_SEGUNDO) + 0.4;
}

const ENTRADA = 5; // segundos tras la campana inicial
const PAUSA_INICIO = 4;
const PAUSA_CIERRE = 4;
const SILENCIO_FINAL = 7;
const SILENCIO_MAXIMO = 110;

export function construirLinea(sesion, minutos, duracionDe = estimarVoz) {
  const total = minutos * 60;
  const marcas = [];

  // Inicio
  let t = ENTRADA;
  sesion.inicio.forEach((txt) => {
    marcas.push({ t, txt });
    t += duracionDe(txt) + PAUSA_INICIO;
  });
  const finInicio = t;

  // Cierre, armado desde el final
  const cierre = [];
  let tc = total - SILENCIO_FINAL;
  for (let i = sesion.cierre.length - 1; i >= 0; i -= 1) {
    const txt = sesion.cierre[i];
    tc -= duracionDe(txt);
    cierre.unshift({ t: tc, txt });
    tc -= PAUSA_CIERRE;
  }
  const tramo = tc - finInicio;

  // Cuerpo con recordatorios intercalados si el silencio queda muy largo
  const cuerpo = sesion.cuerpo;
  const relleno = sesion.relleno || [];
  const limite = sesion.maxSilencio ?? SILENCIO_MAXIMO;
  const voz = (lista) => lista.reduce((a, x) => a + duracionDe(x), 0);
  const secuencia = (m) => {
    const res = [];
    let r = 0;
    cuerpo.forEach((linea, i) => {
      res.push(linea);
      const cuota = Math.floor(((i + 1) * m) / cuerpo.length);
      while (r < cuota) {
        res.push(relleno[r % relleno.length]);
        r += 1;
      }
    });
    return res;
  };
  let extra = 0;
  let lista = secuencia(0);
  while (relleno.length && (tramo - voz(lista)) / lista.length > limite && extra < 60) {
    extra += 1;
    lista = secuencia(extra);
  }

  const silencio = (tramo - voz(lista)) / lista.length;
  let tb = finInicio + silencio * 0.3;
  lista.forEach((txt) => {
    marcas.push({ t: tb, txt });
    tb += duracionDe(txt) + silencio;
  });

  marcas.push(...cierre);
  return { total, marcas, silencio };
}
