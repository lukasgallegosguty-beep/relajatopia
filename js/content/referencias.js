// Evidencia, criterios de ayuda y bibliografía (informe, secciones 6 y 13).
// Los teléfonos de Chile se verificaron el 4 de noviembre de 2026 en minsal.cl y
// chileatiende.gob.cl. Conviene revisarlos periódicamente.

export const PROGRAMAS = [
  {
    nombre: 'MBCT',
    base: 'Mindfulness y terapia cognitiva',
    dato: 'Menos recaída depresiva a 60 semanas (HR = 0,69; 38 % frente a 49 %) en 9 ensayos con 1.329 personas (Kuyken et al., 2016).',
    calidad: 'Alta',
    nota: 'Indicada para depresión recurrente en remisión.',
  },
  {
    nombre: 'MBSR y mindfulness',
    base: 'Vipassana laica',
    dato: 'En 142 ensayos superó a no recibir tratamiento (d = 0,55) y a controles activos (d = 0,23), y fue equivalente a tratamientos basados en evidencia (Goldberg et al., 2018).',
    calidad: 'Moderada',
    nota: 'Efectos menores con controles activos y posible sesgo de lealtad.',
  },
  {
    nombre: 'Compasión: CCT, CBCT, MSC y CFT',
    base: 'Lojong y cuatro inconmensurables',
    dato: 'En 21 ensayos con 1.285 personas: compasión d = 0,56, autocompasión d = 0,69, depresión d = 0,66, ansiedad d = 0,55 y bienestar d = 0,54 (Kirby et al., 2017).',
    calidad: 'Moderada a baja',
    nota: 'Pocos controles activos y muestras no clínicas.',
  },
  {
    nombre: 'CCT (Stanford, Thupten Jinpa)',
    base: 'Tibetana explícita',
    dato: 'En 100 personas durante 9 semanas: más mindfulness y felicidad, y menos preocupación y supresión emocional (Jazaieri et al., 2013).',
    calidad: 'Baja a moderada',
    nota: 'El control fue una lista de espera.',
  },
  {
    nombre: 'CBCT (Emory)',
    base: 'Lojong analítico',
    dato: 'Ensayos pequeños: menor respuesta inmune al estrés y mejor precisión empática.',
    calidad: 'Baja a moderada',
    nota: 'Muestras pequeñas.',
  },
  {
    nombre: 'Mindful Self-Compassion',
    base: 'Laica, con influencia budista',
    dato: 'Más autocompasión y satisfacción vital, y menos depresión, ansiedad y estrés, mantenidos a 6 y 12 meses (Neff y Germer, 2013).',
    calidad: 'Baja',
    nota: 'Unas 51 personas, en su mayoría mujeres con experiencia meditativa, sin seguimiento del grupo control.',
  },
  {
    nombre: 'ACT',
    base: 'Contextualismo, no budista pero convergente',
    dato: 'En 39 ensayos: g = 0,57 frente a controles y equivalente a la TCC (A-Tjak et al., 2015).',
    calidad: 'Moderada a alta',
    nota: 'A mayor calidad de los estudios, menores los efectos.',
  },
];

export const LIMITES = [
  'La mayor parte de la evidencia sobre felicidad, propósito y relaciones es observacional: muestra asociación, no causa.',
  'Los ensayos de programas contemplativos suelen tener muestras pequeñas, controles pasivos y participantes autoseleccionados.',
  'No existen ensayos de prácticas budistas tibetanas en madres y padres divorciados. Las guías de esta app son extrapolaciones razonadas, no protocolos validados.',
  'La investigación sobre custodia compartida está politizada y es sobre todo observacional.',
];

// Criterios para buscar ayuda profesional.
export const CUANDO_AYUDA = [
  {
    senal: 'Ideas de hacerte daño, desesperanza persistente o síntomas depresivos por más de dos semanas',
    accion: 'Busca psiquiatría o psicoterapia. Si hay riesgo ahora, llama de inmediato.',
  },
  {
    senal: 'Insomnio grave, ataques de pánico o usar alcohol u otras sustancias para aguantar',
    accion: 'Pide atención clínica.',
  },
  {
    senal: 'Recuerdos traumáticos, disociación o agitación al meditar',
    accion: 'Reduce o detén la práctica y consulta a un profesional con formación en trauma.',
  },
  {
    senal: 'Conflicto de crianza bloqueado o litigio',
    accion: 'Prueba la mediación familiar o un programa para madres y padres separados.',
  },
  {
    senal: 'Violencia, amenazas, coacción o hijos usados como mensajeros o armas',
    accion: 'Busca asesoría legal y servicios especializados. La mediación puede no ser adecuada.',
  },
  {
    senal: 'Hijos con síntomas sostenidos: regresión, ansiedad o rechazo a uno de sus padres',
    accion: 'Consulta a psicología infantil.',
  },
];

export const TELEFONOS = [
  {
    nombre: 'Línea de Prevención del Suicidio',
    numero: '*4141',
    tel: '*4141',
    nota: 'Minsal. Gratis, confidencial y las 24 horas, desde celulares. En iPhone, escribe *4141 en la app Teléfono.',
    prioridad: true,
  },
  {
    nombre: 'Salud Responde',
    numero: '600 360 7777',
    tel: '+566003607777',
    nota: 'Minsal. Orientación en salud las 24 horas, desde fijos y celulares, al costo de una llamada local.',
    prioridad: true,
  },
  {
    nombre: 'SAMU',
    numero: '131',
    tel: '131',
    nota: 'Urgencias médicas.',
  },
  {
    nombre: 'Orientación en violencia de género',
    numero: '1455',
    tel: '1455',
    nota: 'Gratis, todos los días de 8:00 a 00:00. Para mujeres y testigos. WhatsApp: +56 9 9700 7000.',
  },
  {
    nombre: 'Fono Familia de Carabineros',
    numero: '149',
    tel: '149',
    nota: 'Para emergencias por violencia de género.',
  },
  {
    nombre: 'Emergencias de Carabineros',
    numero: '133',
    tel: '133',
    nota: 'Si hay peligro inmediato.',
  },
  {
    nombre: 'PDI',
    numero: '134',
    tel: '134',
    nota: 'Policía de Investigaciones.',
  },
];

export const MEDIACION = {
  texto: 'En Chile, antes de demandar por pensión de alimentos, relación directa y regular (visitas) o cuidado personal debes intentar una mediación. Asistir y llegar a acuerdo es voluntario, y estas tres materias son gratuitas en los centros licitados.',
  enlace: 'https://pmf.mediacionchile.gob.cl',
  etiqueta: 'Abrir el portal de mediación familiar',
  extra: 'Se solicita con ClaveÚnica. Para más orientación, llama a ChileAtiende al 101.',
};

export const AVISO = 'Relajatopia es una ayuda para el bienestar. No diagnostica, no trata ninguna enfermedad y no reemplaza la atención de profesionales de la salud.';

export const BIBLIOGRAFIA = [
  {
    grupo: 'Fuentes tradicionales',
    items: [
      { id: 'shantideva', txt: 'Shantideva, Bodhicharyavatara.', nota: 'En español: La práctica del bodisatva (Grupo Padmakara, Ediciones Dharma, 2008) y Camino al despertar (trad. Luis O. Gómez, Siruela). El capítulo 6 trata de la paciencia.' },
      { id: 'chekawa', txt: 'Geshe Chekawa, Siete puntos del entrenamiento mental.', nota: 'En inglés, Mind Training: The Great Collection, trad. Thupten Jinpa.' },
      { id: 'trungpa', txt: 'Chögyam Trungpa, Collected Works, vol. 2.', nota: 'Origen de “compasión idiota”. Considera las controversias de conducta del autor.' },
    ],
  },
  {
    grupo: 'Maestros contemporáneos',
    items: [
      { id: 'chodron', txt: 'Pema Chödrön, Cuando todo se derrumba (Gaia, 2012; nueva edición 2022).', nota: 'Lojong y tonglen aplicados al derrumbe vital.' },
      { id: 'piver', txt: 'Susan Piver, The Wisdom of a Broken Heart.', nota: 'Meditación aplicada al desamor. Sin edición en español localizada.' },
      { id: 'jinpa', txt: 'Thupten Jinpa, Anatomía del corazón (Grijalbo, 2017).', nota: 'Edición española de A Fearless Heart. Base del programa CCT.' },
      { id: 'ricard', txt: 'Matthieu Ricard, En defensa de la felicidad (Urano).', nota: 'La felicidad como sukha cultivable.' },
    ],
  },
  {
    grupo: 'Emoción, expectativas, bienestar y propósito',
    items: [
      { id: 'rutledge2014', txt: 'Rutledge et al. (2014), PNAS 111(33):12252–12257.', nota: 'La felicidad depende de expectativas y errores de predicción.' },
      { id: 'webb2012', txt: 'Webb, Miles y Sheeran (2012), Psychological Bulletin 138(4):775–808.', nota: 'Metaanálisis de estrategias de regulación emocional.' },
      { id: 'atjak2015', txt: 'A-Tjak et al. (2015), Psychotherapy and Psychosomatics 84:30–36.', nota: 'Eficacia de ACT.' },
      { id: 'gloster2020', txt: 'Gloster et al. (2020), J. Contextual Behavioral Science 18:181–192.', nota: 'Revisión de 20 metaanálisis de ACT.' },
      { id: 'boss', txt: 'Pauline Boss, Ambiguous Loss.', nota: 'Teoría de la pérdida ambigua.' },
      { id: 'frankl', txt: 'Viktor Frankl, El hombre en busca de sentido (Herder).', nota: 'Clásico sobre el sentido en el sufrimiento.' },
      { id: 'cohen2016', txt: 'Cohen, Bavishi y Rozanski (2016), Psychosomatic Medicine 78(2):122–133.', nota: 'Propósito y mortalidad.' },
      { id: 'blanchflower2021', txt: 'Blanchflower (2021), Journal of Population Economics 34:575–624.', nota: 'Curva en U de la felicidad en 145 países.' },
    ],
  },
  {
    grupo: 'Divorcio y crianza',
    items: [
      { id: 'amato1991', txt: 'Amato y Keith (1991), Psychological Bulletin.', nota: 'Metaanálisis sobre hijas e hijos del divorcio.' },
      { id: 'amato2001', txt: 'Amato (2001), Journal of Family Psychology 15(3):355–370.', nota: 'Actualización del metaanálisis.' },
      { id: 'amato1999', txt: 'Amato y Gilbreth (1999), Journal of Marriage and the Family 61(3):557–573.', nota: 'La calidad de la implicación pesa más que la frecuencia.' },
      { id: 'emery2001', txt: 'Emery et al. (2001), Journal of Consulting and Clinical Psychology; Emery, The Truth About Children and Divorce (2004).', nota: 'Ensayo de mediación a 12 años y guía para familias.' },
      { id: 'hetherington2002', txt: 'Hetherington y Kelly, For Better or For Worse (2002).', nota: 'Estudio longitudinal: la resiliencia es mayoritaria.' },
      { id: 'baude2016', txt: 'Baude et al. (2016), Journal of Divorce & Remarriage.', nota: 'Custodia compartida. Debate abierto.' },
      { id: 'duncan2009', txt: 'Duncan, Coatsworth y Greenberg (2009), Clinical Child and Family Psychology Review.', nota: 'Modelo de crianza consciente.' },
      { id: 'burgdorf2019', txt: 'Burgdorf, Szabó y Abbott (2019), Frontiers in Psychology 10:1336.', nota: 'Metaanálisis de mindfulness para madres y padres.' },
    ],
  },
  {
    grupo: 'Programas contemplativos y riesgos',
    items: [
      { id: 'kuyken2016', txt: 'Kuyken et al. (2016), JAMA Psychiatry 73(6):565–574.', nota: 'MBCT y prevención de recaídas.' },
      { id: 'goldberg2018', txt: 'Goldberg et al. (2018), Clinical Psychology Review 59:52–60.', nota: 'Estado empírico del mindfulness.' },
      { id: 'kirby2017', txt: 'Kirby, Tellegen y Steindl (2017), Behavior Therapy 48(6):778–792.', nota: 'Metaanálisis de intervenciones de compasión.' },
      { id: 'jazaieri2013', txt: 'Jazaieri et al. (2013), Motivation and Emotion 38:23–35.', nota: 'Ensayo de CCT.' },
      { id: 'neff2013', txt: 'Neff y Germer (2013), Journal of Clinical Psychology 69(1):28–44.', nota: 'Ensayo de Mindful Self-Compassion.' },
      { id: 'lindahl2017', txt: 'Lindahl et al. (2017), PLOS ONE 12(5):e0176239.', nota: 'Experiencias difíciles al meditar.' },
      { id: 'britton2021', txt: 'Britton et al. (2021), Clinical Psychological Science.', nota: 'Efectos adversos en programas de mindfulness.' },
      { id: 'silkin2018', txt: 'Informe Lewis Silkin (2018) sobre Rigpa.', nota: 'Documento primario sobre abusos en una institución budista tibetana.' },
    ],
  },
];

export function refPorId(id) {
  for (const g of BIBLIOGRAFIA) {
    const r = g.items.find((i) => i.id === id);
    if (r) return r;
  }
  return null;
}
