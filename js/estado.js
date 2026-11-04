// Estado de la app. Todo se guarda solo en este dispositivo (localStorage).

import { useEffect, useState } from '../vendor/preact-htm.mjs';
import { aguaPorNivel } from './content/emociones.js';

const CLAVE = 'relajatopia.v1';

const inicial = () => ({
  v: 1,
  perfil: { nombre: '', metas: [], fase: 1, minutos: 5, listo: false, creado: null },
  ajustes: { tema: 'hora', voz: 'grabada', ambiente: 'ninguno', texto: true, volumenAmbiente: 0.5 },
  intencion: '',
  voto: '',
  registros: [],
  practicas: [],
  escritos: [],
});

let persistente = true;

function leer() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return inicial();
    const dato = JSON.parse(crudo);
    return normalizar(dato);
  } catch {
    persistente = false;
    return inicial();
  }
}

function normalizar(dato) {
  const base = inicial();
  return {
    ...base,
    ...dato,
    perfil: { ...base.perfil, ...(dato.perfil || {}) },
    ajustes: { ...base.ajustes, ...(dato.ajustes || {}) },
    registros: Array.isArray(dato.registros) ? dato.registros : [],
    practicas: Array.isArray(dato.practicas) ? dato.practicas : [],
    escritos: Array.isArray(dato.escritos) ? dato.escritos : [],
  };
}

function escribir() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
    persistente = true;
  } catch {
    persistente = false;
  }
}

let estado = leer();
const oyentes = new Set();

export const obtener = () => estado;
export const hayPersistencia = () => persistente;

export function actualizar(fn) {
  const copia = fn(estado);
  estado = copia || estado;
  escribir();
  oyentes.forEach((o) => o());
}

export function useEstado() {
  const [, marcar] = useState(0);
  useEffect(() => {
    const o = () => marcar((x) => x + 1);
    oyentes.add(o);
    return () => oyentes.delete(o);
  }, []);
  return estado;
}

// Fechas
export function diaLocal(fecha = new Date()) {
  const d = new Date(fecha);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${dd}`;
}

const nuevoId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

// Registros
export function guardarRegistro({ agua, emocion, intensidad, nota }) {
  const reg = { id: nuevoId(), fecha: new Date().toISOString(), agua, emocion: emocion || null, intensidad: intensidad ?? null, nota: nota || '' };
  actualizar((e) => ({ ...e, registros: [...e.registros, reg] }));
  return reg;
}

export function borrarRegistro(id) {
  actualizar((e) => ({ ...e, registros: e.registros.filter((r) => r.id !== id) }));
}

export function guardarPractica({ ref, tipo, titulo, tema, min }) {
  const p = { id: nuevoId(), fecha: new Date().toISOString(), ref, tipo, titulo, tema, min: Math.round(min * 10) / 10, agua: null };
  actualizar((e) => ({ ...e, practicas: [...e.practicas, p] }));
  return p;
}

export function anotarAguaDespues(id, agua) {
  actualizar((e) => ({ ...e, practicas: e.practicas.map((p) => (p.id === id ? { ...p, agua } : p)) }));
}

export function guardarEscrito({ ref, titulo, datos }) {
  const es = { id: nuevoId(), fecha: new Date().toISOString(), ref, titulo, datos };
  actualizar((e) => ({ ...e, escritos: [...e.escritos, es] }));
  return es;
}

export function borrarEscrito(id) {
  actualizar((e) => ({ ...e, escritos: e.escritos.filter((x) => x.id !== id) }));
}

export function cambiarPerfil(cambios) {
  actualizar((e) => ({ ...e, perfil: { ...e.perfil, ...cambios } }));
}

export function cambiarAjustes(cambios) {
  actualizar((e) => ({ ...e, ajustes: { ...e.ajustes, ...cambios } }));
}

export function cambiarCampo(campo, valor) {
  actualizar((e) => ({ ...e, [campo]: valor }));
}

// Respaldo
export function exportarDatos() {
  return JSON.stringify({ app: 'relajatopia', exportado: new Date().toISOString(), datos: estado }, null, 2);
}

export function importarDatos(texto) {
  const obj = JSON.parse(texto);
  const datos = obj && obj.app === 'relajatopia' ? obj.datos : null;
  if (!datos || typeof datos !== 'object' || !datos.perfil) {
    throw new Error('El archivo no es un respaldo de Relajatopia.');
  }
  actualizar(() => normalizar(datos));
}

export function borrarTodo() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    /* sin almacenamiento disponible */
  }
  estado = inicial();
  oyentes.forEach((o) => o());
}

// Cálculos
export function practicasDe(e, dia) {
  return e.practicas.filter((p) => diaLocal(p.fecha) === dia);
}

export function registroDeHoy(e) {
  const hoy = diaLocal();
  const delDia = e.registros.filter((r) => diaLocal(r.fecha) === hoy);
  return delDia[delDia.length - 1] || null;
}

// La laguna refleja el último registro del día y se calma con cada práctica.
export function agitacionDeHoy(e) {
  const reg = registroDeHoy(e);
  const base = reg ? aguaPorNivel(reg.agua).agit : 0.26;
  const hechas = practicasDe(e, diaLocal()).length;
  return base * Math.pow(0.6, hechas);
}

export function diasSeguidos(e) {
  const dias = new Set(e.practicas.map((p) => diaLocal(p.fecha)));
  let n = 0;
  const cursor = new Date();
  if (!dias.has(diaLocal(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (dias.has(diaLocal(cursor))) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function minutosTotales(e) {
  return Math.round(e.practicas.reduce((a, p) => a + (p.min || 0), 0));
}

export function diasDeEstaSemana(e) {
  const hoy = new Date();
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
  const dias = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(lunes);
    d.setDate(lunes.getDate() + i);
    const clave = diaLocal(d);
    dias.push({ clave, futuro: d > hoy && clave !== diaLocal(hoy), hecho: e.practicas.some((p) => diaLocal(p.fecha) === clave) });
  }
  return dias;
}

// Aviso suave: cinco o más de los últimos siete registros en tormenta u oleaje.
export function aguaBajaSostenida(e) {
  const ult = e.registros.slice(-7);
  if (ult.length < 5) return false;
  return ult.filter((r) => r.agua <= 2).length >= 5;
}
