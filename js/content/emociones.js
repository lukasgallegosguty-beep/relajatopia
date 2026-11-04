// Estados del agua y fichas de emociones (informe, sección 7).

export const AGUA = [
  { n: 1, nombre: 'Tormenta', txt: 'Muy mal', agit: 1 },
  { n: 2, nombre: 'Oleaje', txt: 'Mal', agit: 0.72 },
  { n: 3, nombre: 'Brisa', txt: 'Más o menos', agit: 0.42 },
  { n: 4, nombre: 'Calma', txt: 'Bien', agit: 0.16 },
  { n: 5, nombre: 'Espejo', txt: 'Muy bien', agit: 0.02 },
];

export function aguaPorNivel(n) {
  return AGUA.find((a) => a.n === n) || AGUA[2];
}

// Las siete emociones difíciles del informe.
export const EMOCIONES = [
  {
    id: 'ira',
    nombre: 'Ira',
    lectura: 'Es aversión. Shantideva dice que destruye la paz de quien la siente.',
    antidoto: 'Paciencia. Pregúntate si tiene remedio, mira al otro como alguien movido por sus aflicciones y cultiva amor bondadoso.',
    psicologia: 'Reevaluación cognitiva, toma de perspectiva y pausa conductual.',
    evidencia: 'Metaanálisis de experimentos: la reevaluación logró d+ = 0,36.',
    sesiones: ['exhalar-largo', 'tiene-remedio'],
  },
  {
    id: 'resentimiento',
    nombre: 'Resentimiento',
    lectura: 'Es aversión rumiada: seguir aferrándose a una ofensa pasada.',
    antidoto: 'El aforismo de agradecer a todos, tonglen gradual y ecuanimidad.',
    psicologia: 'Intervenciones de perdón y reducción de la rumiación.',
    evidencia: 'Las intervenciones de perdón muestran efectos moderados. El informe no las revisó en detalle.',
    sesiones: ['persona-dificil', 'ecuanimidad'],
  },
  {
    id: 'culpa',
    nombre: 'Culpa',
    lectura: 'Sirve si es arrepentimiento que lleva a reparar. Daña si se vuelve autodenigración.',
    antidoto: 'Reconocer y reparar, y dedicar lo bueno que puedas hacer.',
    psicologia: 'Distinguir culpa de vergüenza, autocompasión y reparación concreta.',
    evidencia: 'Autocompasión: d = 0,69 en un metaanálisis, con un ensayo aleatorizado de Mindful Self-Compassion.',
    sesiones: ['autocompasion', 'sostener'],
    ejercicio: 'culpa',
  },
  {
    id: 'tristeza',
    nombre: 'Tristeza o duelo',
    lectura: 'Es un dolor natural ante la impermanencia. Se sufre más al aferrarse a que nada cambie.',
    antidoto: 'Contemplar la impermanencia, tonglen empezando por ti y quedarte con lo que no tiene suelo.',
    psicologia: 'Modelo de duelo de doble proceso, pérdida ambigua y activación conductual.',
    evidencia: 'Duelo: teoría y estudios clínicos. Activación conductual: metaanálisis en depresión.',
    sesiones: ['sostener', 'impermanencia'],
    ejercicio: 'escritura-libre',
  },
  {
    id: 'miedo',
    nombre: 'Miedo',
    lectura: 'Es la proyección hacia el futuro de un yo que se siente amenazado.',
    antidoto: 'Calma mental y examinar la naturaleza del pensamiento.',
    psicologia: 'Mindfulness, exposición y tolerancia a la incertidumbre.',
    evidencia: 'Mindfulness: d = 0,55 frente a no recibir tratamiento, en un metaanálisis de 142 ensayos.',
    sesiones: ['con-el-miedo', 'atencion-sonidos'],
  },
  {
    id: 'envidia',
    nombre: 'Envidia',
    lectura: 'Es uno de los cinco venenos: sufrir por el bien ajeno.',
    antidoto: 'Alegría empática, y recordar las ocho preocupaciones mundanas.',
    psicologia: 'Gratitud y reducción de la comparación social.',
    evidencia: 'Las intervenciones de gratitud muestran efectos pequeños. El informe no las revisó en detalle.',
    sesiones: ['alegria-empatica', 'ocho-preocupaciones'],
  },
  {
    id: 'soledad',
    nombre: 'Soledad',
    lectura: 'Es la sensación de separación de un yo aislado.',
    antidoto: 'Amor bondadoso, bodhicitta y comunidad.',
    psicologia: 'Conexión social y conducta prosocial.',
    evidencia: 'Evidencia observacional sólida para las relaciones, y ensayos para la conducta prosocial.',
    sesiones: ['ampliar-circulo', 'amor-bondadoso'],
  },
];

// Estados agradables o neutros: se registran, sin ficha.
export const OTROS_ESTADOS = [
  { id: 'calma', nombre: 'Calma' },
  { id: 'alegria', nombre: 'Alegría' },
  { id: 'gratitud', nombre: 'Gratitud' },
  { id: 'cansancio', nombre: 'Cansancio' },
];

export function emocionPorId(id) {
  return EMOCIONES.find((e) => e.id === id) || OTROS_ESTADOS.find((e) => e.id === id);
}
