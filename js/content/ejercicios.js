// Ejercicios paso a paso. Se recorren con la misma pantalla y se guardan en el Diario.
//
// Tipos de paso:
//   leer      → solo texto
//   respirar  → guía de respiración de `veces` ciclos
//   chips     → elegir una opción de una lista
//   opcion    → elegir y, según la opción, ver una nota o un campo adicional
//   texto     → campo de texto libre
//   lista     → casillas de verificación
//   tiempo    → campo de texto con cuenta regresiva
//   copiar    → muestra un texto guardado con botón para copiarlo

import { EMOCIONES, OTROS_ESTADOS } from './emociones.js';

const NOMBRES_EMOCION = [...EMOCIONES, ...OTROS_ESTADOS].map((e) => ({ v: e.id, txt: e.nombre }));

export const EJERCICIOS = [
  {
    id: 'ahora',
    titulo: 'Regular una emoción',
    tema: 'emociones',
    resumen: 'Ocho pasos para cuando la emoción sube ahora mismo.',
    minutos: 3,
    tormenta: true,
    fuente: [
      ['I', 'Integra calma mental, Shantideva y reevaluación. No es un protocolo validado como tal.'],
    ],
    pasos: [
      {
        k: 'leer',
        t: 'Detente',
        x: 'No envíes el mensaje ni contestes todavía. Si hace falta, sal físicamente de la situación.',
      },
      {
        k: 'respirar',
        t: 'Ancla el cuerpo',
        x: 'Apoya los pies en el suelo. Haz cuatro respiraciones con la salida más larga que la entrada.',
        veces: 4,
      },
      {
        k: 'chips',
        t: 'Nombra',
        x: '¿Qué emoción es? Nombrarla ayuda a bajar su intensidad.',
        clave: 'emocion',
        opciones: NOMBRES_EMOCION,
      },
      {
        k: 'chips',
        t: 'Localiza',
        x: '¿Dónde está en el cuerpo? Observa la sensación medio minuto, sin el relato.',
        clave: 'lugar',
        opciones: ['Pecho', 'Garganta', 'Estómago', 'Mandíbula', 'Hombros', 'Manos', 'Todo el cuerpo'].map((v) => ({ v, txt: v })),
      },
      {
        k: 'opcion',
        t: '¿Tiene remedio?',
        x: 'La pregunta de Shantideva: lo que tiene remedio se atiende, y lo que no lo tiene no mejora con enojo.',
        clave: 'remedio',
        opciones: [
          { v: 'si', txt: 'Sí, tiene remedio', campo: 'accion', prompt: '¿Cuál es la acción concreta, y cuándo?' },
          { v: 'parte', txt: 'Una parte sí', campo: 'accion', prompt: '¿Qué parte depende de ti, y cuándo la harás?' },
          { v: 'no', txt: 'No tiene remedio', nota: 'Si no lo tiene, ¿qué agrega tu enojo? Prueba a decir: esto no lo puedo cambiar hoy.' },
        ],
      },
      {
        k: 'texto',
        t: 'Mira otra lectura',
        x: '¿Qué pudo llevar a la otra persona a actuar así? ¿Qué importará de esto dentro de un año?',
        clave: 'lectura',
        opcional: true,
      },
      {
        k: 'opcion',
        t: 'Compasión con discernimiento',
        x: 'Di por dentro: esto es duro, y no soy la única persona que pasa por esto. Después pregúntate qué respuesta tienes en mente.',
        clave: 'compasion',
        opciones: [
          { v: 'cuidado', txt: 'Una respuesta que cuida', nota: 'Bien. Cuidar también puede incluir un límite firme.' },
          { v: 'ceder', txt: 'Ceder para evitar el conflicto', nota: 'Eso es lo que Chögyam Trungpa llamó “compasión idiota”. Pregúntate qué necesita realmente la situación, no qué calma tu incomodidad.' },
          { v: 'atacar', txt: 'Devolver el golpe', nota: 'Espera. Vuelve a respirar y deja la respuesta para mañana.' },
        ],
      },
      {
        k: 'texto',
        t: 'Tu siguiente acción',
        x: 'Decide según lo que valoras, no según lo que sientes en este minuto.',
        clave: 'siguiente',
        muestraIntencion: true,
      },
    ],
  },
  {
    id: 'reajuste',
    titulo: 'Reajustar una expectativa',
    tema: 'expectativas',
    resumen: 'Nueve pasos por escrito para pasar de “debería” a “puedo”.',
    minutos: 20,
    fuente: [
      ['I', 'Integra pérdida ambigua, impermanencia y trabajo con valores. No es un protocolo validado como tal.'],
    ],
    pasos: [
      { k: 'texto', t: 'Formula la expectativa', x: 'Esperaba o necesito que…', clave: 'expectativa' },
      { k: 'texto', t: 'Busca el valor de fondo', x: '¿Qué te importa detrás de esa expectativa? Por ejemplo: ser una presencia cercana.', clave: 'valor' },
      {
        k: 'texto',
        t: 'Separa lo que depende de ti',
        x: 'Haz tres listas: lo que depende de mí, lo que depende en parte y lo que no depende de mí.',
        clave: 'separar',
        filas: 6,
      },
      {
        k: 'texto',
        t: 'Nombra la pérdida',
        x: '¿Qué parte de la vida imaginada se perdió? Escribe el duelo sin corregirlo. Puedes sostener dos verdades a la vez: lo perdí, y sigue siendo parte de mí.',
        clave: 'perdida',
        filas: 6,
      },
      {
        k: 'leer',
        t: 'Contempla la impermanencia',
        x: 'Esta configuración tampoco es definitiva. Las personas crecen, los acuerdos se revisan y las circunstancias cambian.',
      },
      {
        k: 'texto',
        t: 'Reformula la meta',
        x: 'Conviértela en una conducta que controles. Por ejemplo, en lugar de “que vivan conmigo”: “en cada tiempo juntos, una hora sin pantallas y una conversación real”.',
        clave: 'meta',
      },
      {
        k: 'texto',
        t: 'Calibra el realismo',
        x: '¿Qué esperaría una persona sabia y bien informada? Una expectativa realista evita decepciones innecesarias, y sigue siendo una expectativa.',
        clave: 'realismo',
      },
      {
        k: 'texto',
        t: 'Comprométete y suelta el resultado',
        x: 'Elige una acción para esta semana. Después dedícala: que esto ayude, sea cual sea el resultado.',
        clave: 'accion',
      },
      {
        k: 'leer',
        t: 'Revisa en dos a cuatro semanas',
        x: 'Vuelve a esta nota en tu Diario y mira qué pasó, sin castigarte. Evaluar la práctica también es parte de la práctica.',
      },
    ],
  },
  {
    id: 'escritura-libre',
    titulo: 'Escritura libre del duelo',
    tema: 'expectativas',
    resumen: 'Diez minutos para escribir lo perdido, sin corregirlo.',
    minutos: 10,
    fuente: [
      ['I', 'El informe la propone para la fase de crisis, junto con el modelo de doble proceso del duelo.'],
    ],
    pasos: [
      {
        k: 'tiempo',
        t: 'Escribe sin corregir',
        x: 'Nombra lo perdido: las rutinas, la casa, lo que imaginabas. Nadie más lo va a leer.',
        clave: 'texto',
        segundos: 600,
      },
    ],
  },
  {
    id: 'culpa',
    titulo: 'Ordenar la culpa',
    tema: 'emociones',
    resumen: 'Separa lo que se puede reparar de lo que solo te castiga.',
    minutos: 6,
    fuente: [
      ['T', 'La confesión y la reparación budistas distinguen arrepentimiento de autodenigración.'],
      ['C', 'Autocompasión: d = 0,69 en un metaanálisis de intervenciones de compasión.'],
    ],
    pasos: [
      { k: 'texto', t: '¿De qué te sientes culpable?', x: 'Escríbelo tal como aparece.', clave: 'motivo' },
      {
        k: 'opcion',
        t: '¿Qué tipo de culpa es?',
        x: 'Mira si apunta a algo que hiciste o a lo que crees ser.',
        clave: 'tipo',
        opciones: [
          { v: 'reparadora', txt: 'Hice algo concreto que puedo reparar', campo: 'reparacion', prompt: '¿Cómo lo vas a reconocer y reparar? Si son tus hijos, hazlo según su edad y sin cargarlos con detalles adultos.' },
          { v: 'difusa', txt: 'Es una sensación general de no estar a la altura', nota: 'Prueba estas tres frases: este es un momento de sufrimiento. Otras personas también lo sienten. Que pueda ser amable conmigo.' },
        ],
      },
      { k: 'texto', t: '¿Qué le dirías a alguien querido en tu lugar?', x: 'Escríbelo y léetelo.', clave: 'carta', opcional: true },
    ],
  },
  {
    id: 'mensaje',
    titulo: 'Antes de responder',
    tema: 'compromisos',
    resumen: 'Escribe sin filtro, ajusta y espera 24 horas antes de enviar.',
    minutos: 5,
    fuente: [
      ['I', 'Aplica la regla de las 24 horas y la comunicación breve, informativa, amable, firme y centrada en los hijos, descritas en el informe.'],
    ],
    pasos: [
      { k: 'texto', t: 'Escribe sin filtro', x: 'Lo que escribas aquí no se envía a nadie.', clave: 'borrador', filas: 6 },
      { k: 'respirar', t: 'Respira antes de editar', x: 'Cuatro respiraciones con la salida larga.', veces: 4 },
      {
        k: 'lista',
        t: 'Revisa el tono',
        x: 'Marca lo que tu respuesta debería cumplir.',
        clave: 'revision',
        opciones: ['Es breve', 'Informa hechos, sin juicios', 'Es amable', 'Es firme donde hace falta', 'Se centra en tus hijos o en el tema concreto'],
      },
      { k: 'texto', t: 'Escribe la versión final', x: 'Deja solo lo necesario.', clave: 'version', filas: 6 },
      {
        k: 'opcion',
        t: '¿Cuándo la envías?',
        x: 'Si un mensaje viene cargado, la regla es dejar pasar 24 horas.',
        clave: 'cuando',
        opciones: [
          { v: 'esperar', txt: 'Espero 24 horas', nota: 'Queda guardada en tu Diario. Vuelve a leerla mañana.' },
          { v: 'urgente', txt: 'Es urgente y la envío hoy', nota: 'Léela una vez más en voz alta antes de enviarla.' },
        ],
      },
      { k: 'copiar', t: 'Tu mensaje', x: 'Cópialo cuando decidas enviarlo.', clave: 'version' },
    ],
  },
  {
    id: 'desenredar',
    titulo: 'Desenredar un compromiso',
    tema: 'compromisos',
    resumen: 'Separa lo no negociable, lo gestionable y lo que se puede revisar.',
    minutos: 10,
    fuente: [
      ['I', 'La distinción entre compromiso, relación y circunstancias viene de la guía del informe. La lectura del compromiso como voto es una interpretación.'],
    ],
    pasos: [
      { k: 'texto', t: '¿Qué compromiso te pesa?', x: 'Escríbelo en una frase.', clave: 'peso' },
      { k: 'texto', t: 'Lo que no se negocia', x: '¿Qué elegiste y sostienes pase lo que pase?', clave: 'nucleo' },
      { k: 'texto', t: 'Las relaciones', x: '¿Con quién tienes que gestionar esto? ¿Qué límite necesitas?', clave: 'relaciones' },
      { k: 'texto', t: 'Las circunstancias', x: 'Ciudad, horarios, dinero: ¿qué se puede revisar con el tiempo o por vías legales?', clave: 'circunstancias' },
      {
        k: 'texto',
        t: 'Tu voto',
        x: 'Completa: no elijo cada día si… Elijo cada día cómo…',
        clave: 'voto',
        guardaVoto: true,
      },
      {
        k: 'lista',
        t: '¿Qué más necesita cuidado?',
        x: 'Para que el compromiso no consuma tu identidad, elige lo que atenderás esta semana.',
        clave: 'cuidado',
        opciones: ['Amistades y familia', 'Sueño y salud', 'Movimiento', 'Un proyecto propio', 'Tiempo sin obligaciones'],
      },
      {
        k: 'leer',
        t: 'Un límite importante',
        x: 'Sostener un compromiso no significa soportar cualquier cosa. Si esta sensación viene con desesperanza o con ideas de huida o de hacerte daño, busca ayuda profesional ahora.',
        ayuda: true,
      },
    ],
  },
  {
    id: 'revision-valores',
    titulo: 'Revisión mensual',
    tema: 'proposito',
    resumen: 'Mira tus valores y tus acuerdos, sin autocastigo.',
    minutos: 10,
    fuente: [
      ['C', 'En ACT, los valores son direcciones elegidas que nunca se alcanzan del todo.'],
      ['T', 'El quinto punto del entrenamiento mental propone evaluar la práctica.'],
    ],
    pasos: [
      { k: 'texto', t: '¿Qué valores quieres sostener este mes?', x: 'Dos o tres palabras, y por qué.', clave: 'valores' },
      { k: 'texto', t: '¿Dónde actuaste de acuerdo con ellos?', x: 'Recuerda ejemplos concretos.', clave: 'si' },
      { k: 'texto', t: '¿Dónde te alejaste?', x: 'Míralo sin castigo. ¿Qué harías distinto?', clave: 'no' },
      { k: 'texto', t: 'Tus acuerdos', x: 'Si tienes acuerdos de crianza, ¿alguno necesita revisarse?', clave: 'acuerdos', opcional: true },
      { k: 'texto', t: 'Tu intención para este mes', x: 'Se mostrará en Hoy y en Ahora.', clave: 'intencion', guardaIntencion: true },
    ],
  },
];

export function ejercicioPorId(id) {
  return EJERCICIOS.find((e) => e.id === id);
}
