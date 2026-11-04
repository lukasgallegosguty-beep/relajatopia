// Plan progresivo por fases (informe, sección 10).

export const FASES = [
  {
    id: 1,
    nombre: 'Sostener',
    plazo: 'Crisis aguda: las primeras seis semanas tras una ruptura o un hecho duro.',
    objetivo: 'Estabilizar el cuerpo, dormir y no causar daño. Aquí no se busca transformar nada.',
    evitar: 'Evita los retiros intensivos, tonglen hacia tu expareja y las prácticas largas en silencio si aparecen agitación o recuerdos intrusivos. Es la fase en que más sentido tiene buscar apoyo profesional.',
    planes: {
      5: [{ sesion: 'sostener', min: 5 }],
      10: [{ sesion: 'sostener', min: 5 }, { sesion: 'atencion-sonidos', min: 5 }],
      20: [
        { sesion: 'sostener', min: 5 },
        { sesion: 'atencion-sonidos', min: 5 },
        { sesion: 'caminar', min: 10, alternativa: 'escritura-libre' },
      ],
    },
  },
  {
    id: 2,
    nombre: 'Estabilizar',
    plazo: 'Del segundo al sexto mes.',
    objetivo: 'Regular, reevaluar y reconstruir tus rutinas.',
    evitar: 'Si puedes, suma un programa estructurado (MBSR, Mindful Self-Compassion, CCT o CBCT) con una persona instructora calificada.',
    planes: {
      5: [{ sesion: 'intencion-manana', min: 3 }, { sesion: 'dedicacion-noche', min: 2 }],
      10: [{ sesion: 'atencion-respiracion', min: 5 }, { rotar: ['impermanencia', 'tiene-remedio', 'ocho-preocupaciones'], min: 5 }],
      20: [{ sesion: 'atencion-respiracion', min: 10 }, { sesion: 'amor-bondadoso', min: 10 }],
    },
    semanal: { ejercicio: 'reajuste', txt: 'Una vez por semana, reajusta una expectativa por escrito.' },
  },
  {
    id: 3,
    nombre: 'Integrar',
    plazo: 'Después de los seis meses.',
    objetivo: 'Integrar, dar sentido y sostener tus compromisos sin resentimiento.',
    evitar: 'Cuida también otras áreas de tu vida para que un compromiso no lo ocupe todo.',
    planes: {
      5: [{ sesion: 'aforismo-dia', min: 5 }],
      10: [{ sesion: 'tonglen', min: 10 }],
      20: [{ sesion: 'sesion-completa', min: 20 }],
    },
    mensual: { ejercicio: 'revision-valores', txt: 'Una vez al mes, revisa tus valores y tus acuerdos.' },
  },
];

export function fasePorId(id) {
  return FASES.find((f) => f.id === Number(id)) || FASES[0];
}

// Devuelve los elementos del plan del día, resolviendo la sesión que rota.
export function planDelDia(faseId, minutos, fecha = new Date()) {
  const fase = fasePorId(faseId);
  const plan = fase.planes[minutos] || fase.planes[5];
  const inicio = new Date(fecha.getFullYear(), 0, 0);
  const dia = Math.floor((fecha - inicio) / 86400000);
  return plan.map((p) => (p.rotar ? { ...p, sesion: p.rotar[dia % p.rotar.length] } : p));
}

// Paternidad y maternidad tras el divorcio (informe, secciones 5 y 11).
export const SITUACIONES = [
  {
    id: 'antes-traspaso',
    titulo: 'Antes del traspaso',
    breve: 'Llegar con calma y dejar las discusiones fuera.',
    pasos: [
      'Diez minutos antes, haz tres respiraciones largas y nombra lo que sientes: tensión, tristeza.',
      'Di tu intención: que este traspaso sea fácil para mis hijos.',
      'Deja lista la logística (mochila, medicación, tareas) para reducir los roces.',
      'Si el conflicto es alto, haz el traspaso en un lugar neutro, como el colegio, y deja los temas pendientes para mensajes escritos, nunca delante de ellos.',
    ],
    sesion: 'antes-traspaso',
  },
  {
    id: 'despues-traspaso',
    titulo: 'Después del traspaso',
    breve: 'Atravesar el vacío de la casa sin ellos.',
    pasos: [
      'Haz un ritual breve de transición: caminar, ducharte o escribir tres líneas.',
      'Deja la tristeza sin narrarla como catástrofe. Es una pérdida ambigua y es normal.',
      'Haz un tonglen breve: toma tu añoranza y la de otras madres y padres, y envía alivio a ellos y a sus hijos.',
      'Evita contactar a tus hijos en exceso mientras están en el otro hogar si eso los pone en un conflicto de lealtades.',
    ],
    sesion: 'despues-traspaso',
  },
  {
    id: 'conflicto',
    titulo: 'Conflicto con tu expareja',
    breve: 'Responder sin alimentar la pelea ni ceder por miedo.',
    pasos: [
      'Usa la herramienta Ahora antes de responder, y aplica la regla de las 24 horas a los mensajes cargados.',
      'Escribe con brevedad: que informe, sea amable y firme, y se centre en tus hijos.',
      'Si cooperar no es posible, pasa a crianza paralela: poca comunicación, por escrito, y normas propias en cada casa.',
      'La otra persona actúa desde sus propias aflicciones. Eso explica su conducta, no la justifica, y no te obliga a ceder.',
      'Pregúntate: ¿estoy cediendo para evitar mi incomodidad o porque beneficia a mis hijos?',
      'Si hay bloqueo, prueba la mediación. Si hay violencia o coacción, busca protección legal.',
    ],
    ejercicio: 'mensaje',
    sesion: 'tiene-remedio',
    ayuda: true,
  },
  {
    id: 'anoranza',
    titulo: 'Cuando los extrañas',
    breve: 'Invertir en calidad cuando el tiempo es poco.',
    pasos: [
      'Recuerda que la cercanía y la autoridad afectiva pesan más que la frecuencia de las visitas.',
      'Invierte en calidad: rituales propios, atención plena y un contacto regular y predecible, como una llamada acordada.',
      'Practica: quiero que estén bien también cuando no están conmigo.',
      'Alégrate por lo bueno que viven en el otro hogar, en dosis que puedas tolerar.',
    ],
    sesion: 'amar-sin-retener',
  },
  {
    id: 'culpa',
    titulo: 'Culpa',
    breve: 'Separar lo que se repara de lo que solo castiga.',
    pasos: [
      'Distingue la culpa reparadora (hice algo concreto que puedo reparar) de la culpa difusa (“soy mala madre”, “soy mal padre”).',
      'Si es reparadora, reconócelo, repara con tus hijos según su edad y sin cargarlos con detalles adultos, y comprométete a cambiar.',
      'Si es difusa, practica autocompasión: es un momento de sufrimiento, otras personas lo sienten, que pueda ser amable conmigo.',
      'Recuerda el dato: alrededor del 80 % de los hijos de hogares divorciados acaba razonablemente bien ajustado. Lo que más daña es el conflicto mantenido, y eso sí puedes reducirlo.',
    ],
    ejercicio: 'culpa',
    sesion: 'autocompasion',
  },
  {
    id: 'fechas',
    titulo: 'Fechas importantes',
    breve: 'Cumpleaños, fiestas y vacaciones sin improvisar.',
    pasos: [
      'Planifica con semanas de anticipación y por escrito qué día corresponde a cada hogar.',
      'Si no te toca, crea un ritual propio (celebración adelantada, carta, llamada pactada) y planifica compañía para ese día.',
      'Por la mañana: que mis hijos tengan un buen día donde estén. Por la noche, dedica el día.',
      'Deja que la tristeza exista, sin anestesiarla con alcohol ni con trabajo de más.',
    ],
    sesion: 'fecha-dificil',
  },
  {
    id: 'compromiso',
    titulo: 'Cuando el compromiso pesa',
    breve: 'Separar lo no negociable de lo que se puede mover.',
    pasos: [
      'Distingue tu compromiso con tus hijos (elegido y no negociable), la relación con tu expareja (gestionable, con límites) y las circunstancias (revisables con el tiempo y por vías legales).',
      'Mírala como un voto: no elijo cada día si soy madre o padre; elijo cada día cómo lo soy.',
      'Frankl: cuando la situación no se puede cambiar, sigue libre la actitud con que la enfrentas.',
      'Cuida relaciones, salud y propósito más allá de la crianza para que el compromiso no consuma tu identidad.',
      'Si esta sensación viene con desesperanza o ideas de huida o daño, busca ayuda profesional de inmediato.',
    ],
    ejercicio: 'desenredar',
    sesion: 'voto',
    ayuda: true,
  },
];

export function situacionPorId(id) {
  return SITUACIONES.find((s) => s.id === id);
}
