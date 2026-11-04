// Lista en JSON todas las frases de las sesiones con su huella.
// La usa herramientas/generar_voz.py.
import { SESIONES } from '../js/content/sesiones.js';
import { huella } from '../js/voz.js';

const unicas = new Map();
SESIONES.forEach((s) => {
  [...s.inicio, ...s.cuerpo, ...(s.relleno || []), ...s.cierre].forEach((txt) => {
    unicas.set(huella(txt), txt);
  });
});

console.log(JSON.stringify([...unicas].map(([clave, txt]) => ({ clave, txt })), null, 1));
