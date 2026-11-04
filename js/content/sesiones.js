// Sesiones guiadas de Relajatopia.
//
// Los guiones son originales y parafrasean las prácticas descritas en el informe
// base (secciones 1, 2, 4, 5, 9, 10 y 11). Cada sesión se arma con cuatro partes:
//   inicio  → frases seguidas al comenzar
//   cuerpo  → frases que se reparten a lo largo de la práctica
//   relleno → recordatorios breves que solo aparecen en las versiones largas
//   cierre  → frases finales, ajustadas al término de la sesión
//
// Para cambiar un texto basta con editarlo aquí; `node pruebas/contenido.mjs`
// comprueba que los tiempos sigan calzando con cada duración.

export const TEMAS = {
  emociones: { nombre: 'Emociones', piedra: '#C4606E' },
  expectativas: { nombre: 'Expectativas', piedra: '#C39A4B' },
  felicidad: { nombre: 'Felicidad', piedra: '#3F9C97' },
  proposito: { nombre: 'Propósito', piedra: '#4C62B4' },
  compromisos: { nombre: 'Compromisos', piedra: '#6E5C93' },
  dormir: { nombre: 'Dormir', piedra: '#7C8FA8' },
};

export const SESIONES = [
  // ───────────── Emociones ─────────────
  {
    id: 'sostener',
    titulo: 'Sostener el momento',
    tema: 'emociones',
    resumen: 'Exhalar largo, nombrar lo que sientes y decirte algo amable.',
    para: 'Para los días en que todo está revuelto. Es la práctica central de la primera fase.',
    fuente: [
      ['C', 'Etiquetar la emoción ayuda a bajar su intensidad y la autocompasión tiene efectos moderados en ensayos.'],
      ['I', 'Esta combinación es una integración propia, no un protocolo validado.'],
    ],
    duraciones: [5],
    fases: [1],
    inicio: [
      'Quédate como estás. Hoy no hace falta hacerlo bien.',
      'Apoya los pies en el suelo y deja que el cuerpo pese.',
    ],
    cuerpo: [
      'Inhala por la nariz, sin forzar.',
      'Exhala despacio, un poco más largo que la entrada.',
      'Sigue así tres o cuatro veces, a tu ritmo.',
      'Ahora ponle nombre a lo que hay. Una palabra basta: pena, rabia, miedo, cansancio.',
      'Dilo por dentro, por ejemplo: esto es tristeza.',
      'Busca dónde se siente en el cuerpo y quédate ahí unos momentos.',
      'Pon una mano en el pecho, si te ayuda.',
      'Di por dentro: esto es duro, y hay muchas personas pasando por algo parecido.',
    ],
    relleno: ['Entrada suave, salida larga.'],
    cierre: [
      'Hoy basta con esto. Estabilizarte ya es avanzar.',
      'Abre los ojos cuando quieras.',
    ],
  },
  {
    id: 'exhalar-largo',
    titulo: 'Exhalar largo',
    tema: 'emociones',
    resumen: 'Baja la activación con una salida de aire más larga que la entrada.',
    para: 'Para cuando el cuerpo va acelerado, antes de contestar o de dormir.',
    fuente: [
      ['T', 'Parte de la calma mental: atención sostenida en la respiración.'],
      ['I', 'La salida larga es un recurso de estabilización incluido en los protocolos de esta app.'],
    ],
    duraciones: [3, 5, 10],
    fases: [1, 2, 3],
    inicio: [
      'Siéntate o quédate de pie, como estés. No hace falta preparar nada.',
      'Apoya los pies en el suelo y deja que el peso baje.',
    ],
    cuerpo: [
      'Inhala por la nariz, sin forzar.',
      'Exhala despacio, un poco más largo que la entrada.',
      'Cuando el aire termine de salir, espera un instante.',
      'Deja que la próxima entrada llegue sola.',
      'Si te ayuda, cuenta cuatro al entrar y seis al salir.',
    ],
    relleno: [
      'Entrada suave, salida larga.',
      'Los hombros pueden bajar un poco.',
      'Si la mente se fue a otra parte, vuelve a la salida del aire.',
      'Nada que resolver ahora. Solo esta respiración.',
    ],
    cierre: [
      'Haz una última salida larga.',
      'Nota cómo está tu cuerpo ahora, sin pedirle que esté distinto.',
    ],
  },
  {
    id: 'nombrar',
    titulo: 'Nombrar lo que hay',
    tema: 'emociones',
    resumen: 'Ponle nombre a la emoción y encuéntrala en el cuerpo.',
    para: 'Para cuando sientes mucho y no sabes bien qué es.',
    fuente: [
      ['C', 'Nombrar y observar la emoción se relaciona con mindfulness y regulación emocional.'],
      ['T', 'Observar la sensación sin seguir el relato viene de la visión clara, o vipashyana.'],
    ],
    duraciones: [5, 10],
    fases: [1, 2, 3],
    inicio: [
      'Toma una postura cómoda y cierra los ojos, o baja la mirada.',
      'Haz tres respiraciones con la salida un poco más larga.',
    ],
    cuerpo: [
      'Pregúntate con calma: ¿qué emoción está aquí ahora?',
      'Ponle un nombre simple. Una palabra basta.',
      'Dilo por dentro, por ejemplo: esto es miedo.',
      'Ahora busca dónde está en el cuerpo. Puede ser el pecho, la garganta, el estómago o las manos.',
      'Mira la sensación como mirarías el clima. ¿Es calor, presión, un nudo, un vacío?',
      'Deja de lado la historia que la explica. Por ahora, solo la sensación.',
      'Observa si cambia de tamaño, de lugar o de intensidad.',
    ],
    relleno: [
      'Si aparece un relato, nómbralo: pensando. Y vuelve al cuerpo.',
      'No tienes que hacer que esto se vaya.',
      'Si se vuelve demasiado, abre los ojos y lleva la atención a los pies.',
    ],
    cierre: [
      'Reconoce lo que hiciste: miraste lo que había, sin huir y sin empujarlo.',
      'Abre los ojos cuando quieras.',
    ],
  },
  {
    id: 'atencion-respiracion',
    titulo: 'Dejar que el agua se asiente',
    tema: 'emociones',
    resumen: 'Atención en la respiración. La base de todas las prácticas.',
    para: 'Para entrenar una atención estable, todos los días.',
    fuente: [
      ['T', 'Es shamatha, o calma mental: atención sostenida en un objeto, normalmente la respiración.'],
      ['C', 'En 142 ensayos, las intervenciones de mindfulness superaron a no recibir tratamiento (d = 0,55) y fueron equivalentes a los tratamientos basados en evidencia.'],
    ],
    duraciones: [5, 10, 20],
    fases: [2, 3],
    inicio: [
      'Siéntate con la espalda recta y relajada, como una montaña.',
      'Deja las manos descansando. Baja la mirada o cierra los ojos.',
      'Imagina que tu mente es una laguna de altura. Cuando dejas de agitarla, el agua se asienta sola.',
    ],
    cuerpo: [
      'Lleva la atención a la respiración, donde mejor la notes: la nariz, el pecho o el abdomen.',
      'No la cambies. Solo acompáñala.',
      'Cuando notes que te distrajiste, ese ya es un buen momento: volviste. Regresa sin regañarte.',
      'Los pensamientos son como ondas. No hace falta perseguirlos ni detenerlos.',
    ],
    relleno: [
      'Vuelve a la respiración.',
      'Deja que el agua se asiente.',
      'Si te distrajiste, empieza de nuevo aquí.',
      'Relaja la frente y la mandíbula.',
      'Una respiración a la vez.',
    ],
    cierre: [
      'Suelta la atención en la respiración y deja la mente abierta unos momentos.',
      'Antes de levantarte, mira cómo está el agua ahora.',
    ],
  },
  {
    id: 'atencion-sonidos',
    titulo: 'Escuchar lo que suena',
    tema: 'emociones',
    resumen: 'Atención suave a los sonidos, con los ojos abiertos.',
    para: 'Para cuando cerrar los ojos o seguir la respiración te agita.',
    fuente: [
      ['I', 'En la fase de crisis, el informe propone una calma mental suave y con los ojos abiertos si hay agitación.'],
    ],
    duraciones: [5, 10],
    fases: [1, 2],
    ojos: 'abiertos',
    inicio: [
      'Esta práctica se hace con los ojos abiertos. Apoya la mirada en un punto cercano.',
      'Siente el contacto de tu cuerpo con la silla o con el suelo.',
    ],
    cuerpo: [
      'Abre el oído. Deja que los sonidos lleguen, sin buscarlos.',
      'Escucha el sonido más lejano que puedas notar.',
      'Ahora el más cercano.',
      'No necesitas ponerles nombre. Un sonido aparece, dura y se va.',
      'Si la atención se va a lo que te preocupa, vuelve a lo que se oye ahora.',
    ],
    relleno: [
      'Cada sonido llega solo. No tienes que ir a buscarlo.',
      'Si sube la agitación, mira un objeto cercano y nómbralo por dentro.',
      'Vuelve a escuchar.',
    ],
    cierre: [
      'Vuelve a sentir el peso de tu cuerpo.',
      'Mira a tu alrededor y nota dónde estás.',
    ],
  },
  {
    id: 'caminar',
    titulo: 'Caminar con atención',
    tema: 'emociones',
    resumen: 'Práctica en movimiento para cuando quedarse en silencio cuesta.',
    para: 'Para salir de la rumiación usando el cuerpo.',
    fuente: [
      ['I', 'El informe la propone en la fase de crisis como alternativa a sentarse mucho rato.'],
    ],
    duraciones: [10, 20],
    fases: [1, 2, 3],
    ojos: 'abiertos',
    inicio: [
      'Busca un lugar seguro donde caminar unos pasos de ida y vuelta, o un trayecto tranquilo.',
      'Empieza a caminar un poco más lento de lo normal.',
    ],
    cuerpo: [
      'Siente el pie que se apoya: el talón, la planta, los dedos.',
      'Nota el peso que pasa de un pie al otro.',
      'Deja los brazos sueltos y la mirada al frente, sin clavarla en nada.',
      'Cuando aparezca un pensamiento, vuelve a la próxima pisada.',
      'Mira lo que te rodea con curiosidad: un color, una sombra, el aire.',
    ],
    relleno: [
      'Un paso, y otro.',
      'Si te cuesta estar aquí, acelera un poco y siente la fuerza de las piernas.',
      'Vuelve a los pies.',
    ],
    cierre: [
      'Disminuye el paso y detente.',
      'Quédate de pie unos instantes y siente todo el cuerpo.',
    ],
  },
  {
    id: 'con-el-miedo',
    titulo: 'Mirar el miedo',
    tema: 'emociones',
    resumen: 'Distingue lo que ocurre ahora de lo que tu mente anticipa.',
    para: 'Para cuando la cabeza corre hacia lo que podría pasar.',
    fuente: [
      ['T', 'La tradición lee el miedo como una proyección hacia el futuro de un yo amenazado.'],
      ['C', 'Se relaciona con mindfulness, exposición y tolerancia a la incertidumbre.'],
    ],
    duraciones: [5, 10],
    fases: [1, 2, 3],
    inicio: [
      'Siéntate con los pies bien apoyados.',
      'Haz tres respiraciones con la salida más larga.',
    ],
    cuerpo: [
      'Completa por dentro esta frase: tengo miedo de que...',
      'Pregúntate: ¿esto está pasando ahora o lo estoy imaginando?',
      'Mira lo que sí es cierto en este momento: dónde estás, qué ves, qué se oye.',
      'Observa el pensamiento como un pensamiento. Aparece, se queda un poco y cambia.',
      'Busca el miedo en el cuerpo y respira cerca de esa zona.',
      'Si hay algo que puedas hacer, anótalo para después. Si no lo hay, déjalo pasar por ahora.',
    ],
    relleno: [
      'Vuelve a lo que ocurre ahora.',
      'No necesitas resolver el futuro en esta respiración.',
    ],
    cierre: [
      'Vuelve a sentir los pies.',
      'Sigue con lo próximo que tengas que hacer, una cosa a la vez.',
    ],
  },
  {
    id: 'tiene-remedio',
    titulo: '¿Tiene remedio?',
    tema: 'emociones',
    resumen: 'La pregunta de Shantideva para ordenar la rabia y la angustia.',
    para: 'Para cuando una situación te tiene dando vueltas.',
    fuente: [
      ['T', 'Parafrasea el verso 10 del capítulo 6 del Bodhicharyavatara de Shantideva, sobre la paciencia.'],
      ['C', 'Equivale a una reevaluación orientada a la acción. La reevaluación fue la estrategia más eficaz en un metaanálisis de experimentos (d+ = 0,36).'],
    ],
    duraciones: [5, 10, 20],
    fases: [2, 3],
    inicio: [
      'Trae a la mente algo que te esté dando rabia o angustia.',
      'Elige algo de tamaño mediano, no lo más difícil de tu vida.',
      'Haz tres respiraciones con la salida más larga.',
    ],
    cuerpo: [
      'El maestro indio Shantideva propuso una pregunta muy práctica: ¿esto tiene remedio?',
      'Si lo tiene, ¿cuál es la acción concreta, y cuándo la vas a hacer?',
      'Si no lo tiene, ¿qué agrega tu enojo, además de más sufrimiento para ti?',
      'Mira con honestidad: quizás una parte tiene remedio y otra no.',
      'Para la parte que depende de ti, imagina el primer paso.',
      'Para la parte que no depende de ti, prueba a decir: esto no lo puedo cambiar hoy.',
      'Piensa ahora: ¿qué importará de esto dentro de un año?',
    ],
    relleno: [
      'Vuelve a la pregunta: ¿tiene remedio?',
      'Nota qué cambia en el cuerpo cuando separas lo que depende de ti.',
      'Si la rabia sube mucho, vuelve un rato a la respiración.',
    ],
    cierre: [
      'Elige una sola acción para hoy, o elige no hacer nada por ahora.',
      'Anótala en tu diario, si te ayuda.',
    ],
  },
  {
    id: 'persona-dificil',
    titulo: 'La persona difícil',
    tema: 'emociones',
    resumen: 'Afloja el resentimiento sin justificar lo que hizo el otro.',
    para: 'Para cuando una ofensa antigua sigue ocupando espacio.',
    fuente: [
      ['T', 'Shantideva describe al agresor como alguien movido por sus aflicciones, y al adversario como ocasión para practicar la paciencia.'],
      ['I', 'Explicar una conducta no la justifica ni obliga a ceder. Si hay violencia, lo que corresponde es protegerte.'],
    ],
    duraciones: [10, 20],
    fases: [2, 3],
    cautela: 'Si esta persona te ha hecho daño grave o te da miedo, elige otra práctica. Esta sesión no es para eso.',
    inicio: [
      'Elige a alguien que te cueste, pero no a quien te haya dañado de forma grave.',
      'Haz unas respiraciones hasta que el cuerpo se acomode.',
    ],
    cuerpo: [
      'Recuerda una situación concreta con esa persona. Observa qué pasa en tu cuerpo.',
      'Nota lo que el resentimiento te cuesta a ti: sueño, atención, paz.',
      'Pregúntate qué pudo llevar a esa persona a actuar así: miedo, dolor, cansancio, su propia historia.',
      'Eso explica su conducta. No la justifica, y tampoco te obliga a ceder.',
      'Un aforismo del entrenamiento mental dice: agradece a todos, incluso a quien te pone a prueba.',
      'Pregúntate qué capacidad estás entrenando gracias a esta dificultad: paciencia, límites, claridad.',
      'Si puedes, di por dentro: que esta persona se libre de lo que la hace actuar así.',
      'Si hoy no puedes, está bien. Vuelve a tu respiración.',
    ],
    relleno: [
      'Vuelve a respirar antes de seguir.',
      'Puedes poner un límite firme sin odio.',
      'Si sube la rabia, abre los ojos y mira la habitación.',
    ],
    cierre: [
      'Suelta a esa persona y vuelve a ti.',
      'Pregúntate qué necesitas hoy para cuidarte.',
    ],
  },
  {
    id: 'autocompasion',
    titulo: 'Culpa y amabilidad',
    tema: 'emociones',
    resumen: 'Distingue lo que puedes reparar de lo que solo te castiga.',
    para: 'Para cuando la culpa no te deja en paz.',
    fuente: [
      ['C', 'La autocompasión mostró d = 0,69 en un metaanálisis de intervenciones de compasión.'],
      ['T', 'La confesión y la reparación budistas distinguen el arrepentimiento útil de la autodenigración.'],
    ],
    duraciones: [5, 10],
    fases: [1, 2, 3],
    inicio: [
      'Busca una postura cómoda y respira unas veces con calma.',
      'Trae a la mente lo que te hace sentir culpa.',
    ],
    cuerpo: [
      'Distingue: ¿hice algo concreto que puedo reparar, o es la sensación general de no estar a la altura?',
      'Si es algo concreto, piensa en el primer paso para repararlo. Eso es arrepentimiento útil.',
      'Si es una sensación difusa, deja de discutir con ella por un momento.',
      'Pon una mano donde te dé calma y di por dentro: este es un momento de sufrimiento.',
      'Di también: otras personas sienten esto. Es parte de ser humano.',
      'Y luego: que pueda ser amable conmigo.',
      'Háblate como le hablarías a alguien que quieres y que está en tu lugar.',
    ],
    relleno: [
      'Vuelve a la frase que más te sirva.',
      'Ser amable contigo no te quita responsabilidad. Te permite ejercerla.',
    ],
    cierre: [
      'Si hay algo que reparar, elige cuándo lo harás.',
      'Lo demás puede descansar por hoy.',
    ],
  },

  // ───────────── Expectativas ─────────────
  {
    id: 'impermanencia',
    titulo: 'Esto también cambia',
    tema: 'expectativas',
    resumen: 'Meditación analítica sobre la impermanencia de lo que hoy pesa.',
    para: 'Para aflojar la exigencia de que las cosas se queden como las imaginaste.',
    fuente: [
      ['T', 'Las situaciones dependen de causas y condiciones, y por eso cambian. Vacuidad no significa que nada importe.'],
      ['C', 'La meditación analítica se parece a la reevaluación cognitiva, aunque esta comparación es indirecta.'],
    ],
    duraciones: [5, 10, 20],
    fases: [2, 3],
    inicio: [
      'Esta meditación es para pensar con calma. Vas a usar la razón, no a dejar la mente en blanco.',
      'Respira unas veces hasta que la mente se aquiete un poco.',
    ],
    cuerpo: [
      'Piensa en una situación de tu vida que hoy te pesa.',
      'Recuerda cómo era esa misma situación hace cinco años. Mira cuánto ha cambiado.',
      'Piensa en lo que dio origen a lo que hoy vives: personas, decisiones, lugares, momentos. Muchas causas, ninguna sola.',
      'Si nació de tantas causas, seguirá cambiando cuando esas causas cambien.',
      'Las personas crecen, los acuerdos se revisan, los lugares y los ánimos se mueven.',
      'Pregúntate: ¿qué parte de mi dolor viene de exigir que esto se quede igual?',
      'No se trata de que nada importe. Se trata de que nada está fijo.',
      'Si esto también cambia, ¿qué quiero cuidar mientras dure?',
    ],
    relleno: [
      'Vuelve a la pregunta: ¿esto fue siempre así?',
      'Si te perdiste en recuerdos, regresa a la respiración y retoma.',
      'Deja que la idea se asiente como algo sencillo, no como un argumento.',
    ],
    cierre: [
      'Suelta el razonamiento y descansa en lo que comprendiste.',
      'Abre los ojos cuando quieras.',
    ],
  },
  {
    id: 'ocho-preocupaciones',
    titulo: 'Las ocho preocupaciones',
    tema: 'expectativas',
    resumen: 'Ganar, perder, elogio, crítica: lo que mueve tu ánimo cada día.',
    para: 'Para ver qué expectativas te están subiendo y bajando.',
    fuente: [
      ['T', 'Las ocho preocupaciones mundanas son cuatro pares: ganancia y pérdida, placer y dolor, elogio y crítica, fama y descrédito.'],
      ['C', 'La felicidad momentánea depende más de las expectativas y los errores de predicción que de los resultados acumulados (Rutledge et al., 2014).'],
    ],
    duraciones: [5, 10, 20],
    fases: [2, 3],
    inicio: [
      'Siéntate con calma y respira unas veces.',
      'Hoy vas a mirar qué mueve tu ánimo.',
    ],
    cuerpo: [
      'La tradición tibetana habla de ocho preocupaciones: ganar y perder, placer y dolor, elogio y crítica, buena y mala fama.',
      'Piensa en la última semana. ¿Qué te subió el ánimo? ¿Qué te lo bajó?',
      'Mira si esas subidas y bajadas vinieron de un resultado, de un comentario o de cómo crees que te ven.',
      'Nota que ninguno de esos pares se queda fijo. El elogio pasa. La crítica también.',
      'Pregúntate: ¿qué esperaba que pasara? ¿Era realista?',
      'Un aforismo del entrenamiento mental dice: no esperes aplausos.',
      'Pregúntate: ¿qué quiero hacer, aunque nadie lo aplauda?',
    ],
    relleno: [
      'Vuelve a la última semana y mira otro momento.',
      'Observa sin juzgarte. Estas preocupaciones son de todas las personas.',
      'Esperar con realismo no es dejar de esperar.',
    ],
    cierre: [
      'Elige una cosa que harás esta semana por lo que vale, no por lo que te devuelva.',
      'Abre los ojos cuando quieras.',
    ],
  },
  {
    id: 'soltar-resultados',
    titulo: 'Soltar el resultado',
    tema: 'expectativas',
    resumen: 'Separa resultados, conductas y valores para no caer en la pasividad.',
    para: 'Para sostener una meta importante sin quedar a merced de lo que pase.',
    fuente: [
      ['I', 'Los tres niveles son una síntesis del informe: desapego en los resultados, compromiso en las conductas y fidelidad en los valores.'],
      ['C', 'Coincide con la lógica de ACT, que superó a los controles (g = 0,57) en 39 ensayos.'],
    ],
    duraciones: [10],
    fases: [2, 3],
    inicio: [
      'Trae a la mente una meta o un deseo que te importa mucho.',
      'Respira unas veces con calma.',
    ],
    cuerpo: [
      'Primero mira el resultado que quieres. Nota cuánto depende de otras personas o de las circunstancias.',
      'Ese es el nivel donde conviene soltar. Puedes desearlo sin exigirlo.',
      'Ahora mira tus conductas: lo que tú puedes hacer hoy o esta semana.',
      'Ese es el nivel donde conviene comprometerse del todo.',
      'Por último, mira el valor que hay detrás. ¿Qué tipo de persona quieres ser en esto?',
      'Ese es el nivel que no depende de que el mundo responda.',
      'Reformula tu meta como algo que puedas hacer, aunque el resultado no llegue.',
      'Un aforismo dice: empieza y termina con la intención. El éxito puede medirse ahí.',
    ],
    relleno: [
      'Vuelve a separar: resultado, conducta, valor.',
      'Soltar el resultado no es dejar de intentarlo.',
    ],
    cierre: [
      'Di por dentro lo que harás esta semana.',
      'Y deja el resultado donde está.',
    ],
  },
  {
    id: 'amar-sin-retener',
    titulo: 'Amar sin retener',
    tema: 'expectativas',
    resumen: 'La diferencia entre querer el bien de alguien y necesitarle cerca.',
    para: 'Para cuando extrañas a alguien o temes perderle.',
    fuente: [
      ['T', 'El amor desea el bien del otro. El apego depende de que el otro cumpla lo que esperas.'],
      ['I', 'La aplicación a hijas e hijos que no viven contigo a diario es una interpretación del informe.'],
    ],
    duraciones: [10],
    fases: [2, 3],
    inicio: [
      'Piensa en alguien que amas y cuya presencia extrañas.',
      'Deja que aparezca lo que sientes, sin corregirlo.',
    ],
    cuerpo: [
      'Nota que aquí pueden convivir dos deseos: quiero que esté bien, y necesito que esté conmigo para estar bien.',
      'Los dos son humanos. No hace falta juzgar ninguno.',
      'Mira el primero: querer su bien. ¿Cómo se siente en el cuerpo?',
      'Mira el segundo: necesitar su presencia. ¿Cómo se siente?',
      'Repite por dentro: quiero que estés bien también cuando no estás conmigo.',
      'Imagínale teniendo un buen momento lejos de ti.',
      'Si duele, deja que duela. Ese dolor también es amor.',
      'Prueba a alegrarte un poco por eso, en la medida que hoy puedas.',
    ],
    relleno: [
      'Vuelve a la frase: que estés bien.',
      'No tienes que dejar de extrañar.',
    ],
    cierre: [
      'Agradece el vínculo que existe, aunque hoy tenga otra forma.',
      'Vuelve a tu respiración y a este lugar.',
    ],
  },
  {
    id: 'ecuanimidad',
    titulo: 'Ecuanimidad',
    tema: 'expectativas',
    resumen: 'Saca a las personas de las casillas de amigo, enemigo y desconocido.',
    para: 'Para recuperar perspectiva en relaciones que se volvieron rígidas.',
    fuente: [
      ['T', 'La ecuanimidad tibetana no es indiferencia: es no dividir a los seres en amigos, enemigos y desconocidos de forma fija.'],
      ['C', 'La supresión emocional rinde poco y aumenta la activación fisiológica. La ecuanimidad auténtica permite sentir.'],
    ],
    duraciones: [10, 20],
    fases: [2, 3],
    inicio: [
      'Piensa en tres personas: alguien que quieres, alguien neutral y alguien que te cuesta.',
      'Míralas frente a ti, en tu imaginación.',
    ],
    cuerpo: [
      'Nota lo rápido que la mente las pone en casillas: querida, desconocida, enemiga.',
      'Recuerda que esas casillas cambian. Alguien que te ayudó pudo dañarte. Alguien difícil pudo ayudarte.',
      'Las tres quieren estar bien. Las tres temen sufrir. En eso son iguales.',
      'Ecuanimidad no es indiferencia. Puedes sentir, poner límites y aun así no encerrar a nadie en una casilla para siempre.',
      'Di por dentro: que las tres estén bien.',
      'Observa qué se afloja en tu cuerpo, si algo se afloja.',
    ],
    relleno: [
      'Vuelve a mirar a las tres.',
      'Si una de ellas te agita, respira y regresa a la persona neutral.',
      'Nadie queda fijo en un solo papel.',
    ],
    cierre: [
      'Suelta a las tres y descansa en la respiración.',
      'Abre los ojos cuando quieras.',
    ],
  },

  // ───────────── Felicidad ─────────────
  {
    id: 'amor-bondadoso',
    titulo: 'Amor bondadoso por etapas',
    tema: 'felicidad',
    resumen: 'De ti hacia quienes quieres, una persona neutral y alguien difícil.',
    para: 'Para abrir el corazón sin forzarlo.',
    fuente: [
      ['T', 'Es una de las prácticas de los cuatro inconmensurables: amor, compasión, alegría empática y ecuanimidad.'],
      ['C', 'Las intervenciones de compasión mostraron efectos moderados (d ≈ 0,4 a 0,7) en 21 ensayos, con evidencia de calidad moderada a baja.'],
    ],
    duraciones: [10, 20],
    fases: [2, 3],
    inicio: [
      'Siéntate con calma y haz unas respiraciones tranquilas.',
      'Si te ayuda, pon una mano en el pecho.',
    ],
    cuerpo: [
      'Empieza por ti. Repite por dentro: que esté bien. Que tenga paz. Que pueda cuidar a quienes quiero.',
      'Ahora trae a alguien que quieres mucho.',
      'Repite: que estés bien. Que tengas paz. Que crezcas con alegría.',
      'Ahora piensa en alguien neutral, una persona que ves a menudo y casi no conoces.',
      'Esa persona también quiere estar bien. Repite: que estés bien. Que tengas paz.',
      'Si te resulta posible, trae a alguien difícil. Si hoy es demasiado, quédate con la persona neutral o vuelve a ti.',
      'Esto no significa aprobar lo que hizo. Repite, si puedes: que estés bien.',
      'Amplía a todas las personas que hoy pasan por algo parecido a lo tuyo.',
    ],
    relleno: [
      'Deja que las palabras vayan lento.',
      'Si no sientes nada, está bien. La intención también cuenta.',
      'Vuelve a la frase que estabas diciendo.',
    ],
    cierre: [
      'Deja las frases y descansa unos momentos.',
      'Lleva este tono amable a lo próximo que hagas.',
    ],
  },
  {
    id: 'alegria-empatica',
    titulo: 'Alegrarse por otros',
    tema: 'felicidad',
    resumen: 'Trabaja la envidia con alegría empática, en dosis tolerables.',
    para: 'Para cuando duele ver lo bueno que tienen otras personas.',
    fuente: [
      ['T', 'La alegría empática (muditā) es el antídoto tradicional de la envidia, uno de los cinco venenos.'],
      ['C', 'Se relaciona con gratitud y menor comparación social. El informe no revisó esas intervenciones en detalle.'],
    ],
    duraciones: [10],
    fases: [2, 3],
    inicio: [
      'Respira unas veces y deja que el cuerpo se acomode.',
      'Empieza por algo fácil: recuerda una buena noticia de alguien que quieres.',
    ],
    cuerpo: [
      'Deja que esa alegría crezca un poco, sin esfuerzo.',
      'Ahora trae a alguien a quien le va bien en algo que te gustaría tener.',
      'Nota si aparece una punzada. No la reprimas. Se llama envidia y es muy común.',
      'Mira qué te muestra esa punzada sobre lo que valoras o lo que has perdido.',
      'Recuerda que esa persona también quiere estar bien, como tú.',
      'En una dosis que puedas tolerar, di por dentro: que esto bueno dure para ti.',
      'Si hoy no puedes, está bien. Vuelve a la persona fácil.',
    ],
    relleno: [
      'Vuelve a la alegría fácil cuando lo necesites.',
      'No tienes que fingir nada.',
    ],
    cierre: [
      'Reconoce algo bueno que también hay en tu vida hoy.',
      'Abre los ojos cuando quieras.',
    ],
  },
  {
    id: 'ampliar-circulo',
    titulo: 'Ampliar el círculo',
    tema: 'felicidad',
    resumen: 'Para la soledad: recuerda los lazos que sí están y busca uno.',
    para: 'Para las noches o los días en que te sientes aparte.',
    fuente: [
      ['C', 'Observacional: en el estudio de Harvard, la calidad de las relaciones se asoció con más salud y felicidad. No prueba causalidad.'],
      ['T', 'Bodhicitta y amor bondadoso apuntan a la conexión con todos los seres.'],
    ],
    duraciones: [5, 10],
    fases: [1, 2, 3],
    inicio: [
      'Si hoy te sientes aparte del mundo, esta práctica es para ti.',
      'Respira con calma y siente el apoyo bajo tu cuerpo.',
    ],
    cuerpo: [
      'Piensa en todas las personas que hicieron posible este momento: quien cultivó tu comida, quien construyó tu casa, quien te enseñó a leer.',
      'Ahora piensa en alguien que se alegra de verte, aunque no lo veas seguido.',
      'Di por dentro: que estés bien.',
      'Piensa en quienes en este momento se sienten como tú. Son muchas personas.',
      'Di por dentro: que estemos bien.',
      'Pregúntate a quién podrías escribir hoy un mensaje simple. No hace falta contarlo todo.',
    ],
    relleno: [
      'Vuelve a sentir el apoyo bajo tu cuerpo.',
      'Una persona a la vez.',
    ],
    cierre: [
      'Elige a quién le escribirás.',
      'Hazlo antes de que termine el día, si puedes.',
    ],
  },

  // ───────────── Propósito ─────────────
  {
    id: 'intencion-manana',
    titulo: 'Empezar con la intención',
    tema: 'proposito',
    resumen: 'Dos o cinco minutos para decidir qué quieres cuidar hoy.',
    para: 'Al despertar, antes de entrar en el día.',
    fuente: [
      ['T', 'Viene del aforismo de entrenamiento mental que invita a empezar y terminar con la intención.'],
      ['C', 'Se parece al trabajo con valores en ACT. Tener propósito se asocia con menor mortalidad (RR = 0,83), sin prueba de causalidad.'],
    ],
    duraciones: [2, 3, 5],
    fases: [2, 3],
    inicio: [
      'Antes de entrar en el día, quédate un momento aquí.',
      'Haz tres respiraciones tranquilas.',
    ],
    cuerpo: [
      'Pregúntate: ¿qué quiero cuidar hoy?',
      'Dilo por dentro en una frase corta, que empiece con: hoy quiero.',
      'Piensa en un momento del día donde esa intención se pondrá a prueba.',
      'Imagínate respondiendo como te gustaría.',
    ],
    relleno: [
      'No es una promesa de perfección. Es la dirección del día.',
      'Vuelve a tu frase.',
    ],
    cierre: ['Repite tu intención una vez más, y empieza.'],
  },
  {
    id: 'dedicacion-noche',
    titulo: 'Terminar con la intención',
    tema: 'proposito',
    resumen: 'Revisa el día sin castigarte y déjalo terminar.',
    para: 'Al acostarte.',
    fuente: [
      ['T', 'Dedicar lo bueno del día es el cierre habitual de la práctica tibetana.'],
      ['I', 'Revisar sin autocastigo está tomado del quinto punto del entrenamiento mental: evaluar la práctica.'],
    ],
    duraciones: [2, 3, 5],
    fases: [2, 3],
    noche: true,
    inicio: [
      'Ya puedes dejar de resolver cosas por hoy.',
      'Deja que la respiración se haga más lenta.',
    ],
    cuerpo: [
      'Recuerda un momento del día en que actuaste como querías, aunque sea pequeño.',
      'Recuerda uno en que no lo lograste, y míralo sin castigarte.',
      'Si hay algo que reparar, déjalo para mañana.',
      'Ofrece lo bueno del día a quienes quieres, sea cual sea el resultado.',
    ],
    relleno: ['Sin revisar más. Deja el día donde está.'],
    cierre: ['El día terminó. Puedes soltarlo.'],
  },
  {
    id: 'aforismo-dia',
    titulo: 'El aforismo de hoy',
    tema: 'proposito',
    resumen: 'Una frase del entrenamiento mental como foco del día.',
    para: 'Para llevar una idea contigo, no para analizarla toda.',
    fuente: [
      ['T', 'El lojong de Geshe Chekawa organiza el entrenamiento mental en siete puntos y alrededor de 59 aforismos. Las traducciones varían.'],
    ],
    duraciones: [5, 10],
    fases: [3],
    usaAforismo: true,
    inicio: [
      'Lee el aforismo de hoy, sin apuro.',
      'Respira unas veces y deja que la frase se quede en la mente.',
    ],
    cuerpo: [
      'Repite la frase por dentro, lentamente.',
      'Pregúntate: ¿dónde se aplica esto en mi vida hoy?',
      'Piensa en una situación concreta, con una persona concreta.',
      'Imagina cómo cambiaría tu respuesta si tuvieras presente esta frase.',
      'Si te incomoda, mira esa incomodidad con curiosidad.',
    ],
    relleno: [
      'Vuelve a la frase.',
      'No necesitas entenderla por completo.',
      'Suelta los análisis y deja la frase sola.',
    ],
    cierre: [
      'Lleva la frase contigo a lo que sigue.',
      'Vuelve a ella si el día se complica.',
    ],
  },
  {
    id: 'sesion-completa',
    titulo: 'Sesión completa',
    tema: 'proposito',
    resumen: 'Calma, análisis, los cuatro inconmensurables y dedicación.',
    para: 'Para la práctica larga de la tercera fase.',
    fuente: [
      ['T', 'Reúne calma mental, meditación analítica y los cuatro inconmensurables, con motivación al inicio y dedicación al final.'],
    ],
    duraciones: [20],
    fases: [3],
    maxSilencio: 150,
    inicio: [
      'Empieza con la intención: ¿para qué vas a practicar hoy?',
      'Siéntate con la espalda recta y relajada.',
    ],
    cuerpo: [
      'Lleva la atención a la respiración. Deja que el agua se asiente.',
      'Cuando te distraigas, vuelve sin regañarte.',
      'Ahora elige un tema para pensar con calma: la impermanencia, o la pregunta de si esto tiene remedio.',
      'Razona despacio. Busca algo que puedas comprobar en tu propia vida.',
      'Cuando llegues a una comprensión, descansa en ella.',
      'Ahora abre el corazón. Desea a todas las personas que estén bien.',
      'Desea que se liberen del sufrimiento.',
      'Alégrate por lo bueno que hay en la vida de otras personas.',
      'Y deja que esos deseos alcancen a todas por igual, sin casillas.',
    ],
    relleno: [
      'Vuelve a la práctica en la que estabas.',
      'Relaja la frente y la mandíbula.',
    ],
    cierre: [
      'Termina con la intención: que esto beneficie a quienes quieres, sea cual sea el resultado.',
      'Abre los ojos cuando quieras.',
    ],
  },
  {
    id: 'voto',
    titulo: 'No elijo si, elijo cómo',
    tema: 'proposito',
    resumen: 'Mira un compromiso que pesa y separa lo que sí puedes mover.',
    para: 'Para cuando una obligación ineludible te parece demasiado.',
    fuente: [
      ['T', 'Los votos de bodhisattva son un compromiso libremente asumido de beneficiar a otros.'],
      ['C', 'Frankl sostuvo que, ante lo inevitable, sigue libre la actitud con que se afronta. La logoterapia tiene poca evidencia de ensayos de alta calidad.'],
      ['I', 'Aplicar la idea de voto a la crianza u otros compromisos es una interpretación del informe.'],
    ],
    duraciones: [10],
    fases: [2, 3],
    inicio: [
      'Piensa en el compromiso que hoy te pesa.',
      'Puede ser criar tras una separación, cuidar a alguien, sostener una promesa.',
    ],
    cuerpo: [
      'Separa tres cosas. Primero, el compromiso en sí: lo que elegiste y no vas a negociar.',
      'Segundo, las relaciones que vienen con él. Esas se pueden gestionar, con límites.',
      'Tercero, las circunstancias: ciudad, horarios, dinero. Esas se pueden revisar con el tiempo.',
      'Cuando todo se mezcla, todo pesa igual. Nota si algo se aligera al separarlo.',
      'Repite por dentro: no elijo cada día si sostengo esto. Elijo cada día cómo.',
      'Viktor Frankl observó que, cuando la situación no se puede cambiar, sigue libre la actitud con que la enfrentas.',
      'Pregúntate: ¿cómo quiero sostener esto hoy?',
      'Pregúntate también: ¿qué otra parte de mi vida necesita cuidado para que este compromiso no lo ocupe todo?',
    ],
    relleno: [
      'Vuelve a separar: compromiso, relaciones, circunstancias.',
      'Sostener no es aguantar cualquier cosa.',
    ],
    cierre: [
      'Elige un gesto concreto para hoy.',
      'Si esta sensación viene con desesperanza, busca apoyo. No tienes que cargarla sin ayuda.',
    ],
  },

  // ───────────── Compromisos ─────────────
  {
    id: 'tonglen',
    titulo: 'Tonglen: tomar y dar',
    tema: 'compromisos',
    resumen: 'Al inhalar tomas el dolor, al exhalar envías alivio. Empieza por el tuyo.',
    para: 'Para no huir del dolor y convertirlo en conexión con otros.',
    fuente: [
      ['T', 'Práctica tradicional de “dar y tomar”, difundida por Pema Chödrön para no huir del dolor.'],
      ['I', 'En duelo agudo o trauma puede inundar. Por eso aquí es gradual: primero tu dolor, en dosis cortas.'],
    ],
    duraciones: [10, 20],
    fases: [3],
    cautela: 'En duelo agudo o trauma, esta práctica puede inundar. Si estás en plena crisis, deja esto para más adelante y usa “Sostener el momento”. Puedes detenerte cuando quieras.',
    inicio: [
      'Esta práctica trabaja directamente con el dolor. Si se vuelve demasiado, detente y abre los ojos.',
      'Haz unas respiraciones tranquilas.',
    ],
    cuerpo: [
      'Empieza por tu propio dolor. Reconoce lo que te pesa hoy.',
      'Al inhalar, deja entrar esa molestia en vez de apartarla. Al exhalar, deja salir alivio y espacio.',
      'Sigue así unas respiraciones: entra lo que duele, sale algo de alivio.',
      'Piensa ahora en otras personas que sienten lo mismo en este momento.',
      'Al inhalar, acompaña su dolor junto al tuyo. Al exhalar, envíales alivio.',
      'Si te ayuda, imagina el dolor como aire denso, y el alivio como aire fresco.',
      'Si puedes, incluye a toda tu familia, con todas sus partes.',
      'Exhala hacia ellos algo simple: calma, alivio, un poco de espacio.',
    ],
    relleno: [
      'Entra lo que duele, sale algo de alivio.',
      'Si es demasiado, vuelve a respirar sin imágenes.',
      'Tú también estás en esta práctica.',
    ],
    cierre: [
      'Suelta las imágenes y respira normalmente.',
      'Dedica lo que hayas hecho a quienes lo necesitan.',
    ],
  },
  {
    id: 'despues-traspaso',
    titulo: 'Después del traspaso',
    tema: 'compromisos',
    resumen: 'Para el vacío que queda cuando tus hijos se van con el otro hogar.',
    para: 'Justo después de dejarlos o de que se vayan.',
    fuente: [
      ['C', 'Esa tristeza encaja con la pérdida ambigua de Pauline Boss: una pérdida sin cierre con alguien que sigue presente.'],
      ['I', 'Práctica adaptada del informe. No hay ensayos con madres y padres separados.'],
    ],
    duraciones: [5],
    fases: [1, 2, 3],
    paternidad: true,
    inicio: [
      'Se acaban de separar por unos días. Este vacío es normal.',
      'Deja que la tristeza esté aquí, sin convertirla en catástrofe.',
    ],
    cuerpo: [
      'Al inhalar, reconoce la añoranza. Al exhalar, deja salir un poco de espacio.',
      'Piensa en las madres y padres que en este momento también se están separando de sus hijos.',
      'Al inhalar, acompaña esa añoranza compartida. Al exhalar, envíales alivio, a ellos y a sus hijos.',
      'Envía algo de calma a tus hijos, estén donde estén.',
      'Repite por dentro: quiero que estén bien también cuando no están conmigo.',
    ],
    relleno: ['Entra la añoranza, sale algo de alivio.'],
    cierre: [
      'Elige un pequeño ritual para seguir: caminar, ducharte o escribir tres líneas.',
      'Sigue con tu día a tu ritmo.',
    ],
  },
  {
    id: 'antes-traspaso',
    titulo: 'Antes del traspaso',
    tema: 'compromisos',
    resumen: 'Tres minutos para llegar con calma y cuidar a tus hijos del conflicto.',
    para: 'Unos diez minutos antes de entregar o recibir a tus hijos.',
    fuente: [
      ['C', 'El conflicto delante de hijas e hijos es el principal factor de riesgo, sobre todo si quedan en medio.'],
      ['I', 'La secuencia es una integración del informe.'],
    ],
    duraciones: [3],
    fases: [1, 2, 3],
    paternidad: true,
    inicio: ['Faltan unos minutos. Quédate un momento contigo.'],
    cuerpo: [
      'Haz tres respiraciones largas, con la salida más lenta que la entrada.',
      'Nombra lo que sientes: tensión, tristeza, rabia, apuro.',
      'Repite por dentro: que este traspaso sea fácil para mis hijos.',
      'Imagínate saludando con calma, de forma breve y amable.',
      'Si hay algo que discutir, queda para después, por escrito, nunca delante de ellos.',
    ],
    relleno: [],
    cierre: ['Una respiración más, y vamos.'],
  },
  {
    id: 'presencia',
    titulo: 'Llegar de verdad',
    tema: 'compromisos',
    resumen: 'Prepárate para que el tiempo con tus hijos sea de calidad.',
    para: 'Antes de recibir a tus hijos o de una actividad con ellos.',
    fuente: [
      ['C', 'En hogares separados, la cercanía y la crianza con autoridad afectiva pesan más que la frecuencia de contacto (Amato y Gilbreth, 1999).'],
      ['C', 'La crianza consciente es prometedora, no probada: un metaanálisis halló g = 0,34 en estrés parental y otro no halló efecto global.'],
    ],
    duraciones: [5],
    fases: [1, 2, 3],
    paternidad: true,
    inicio: [
      'Deja por un momento el trabajo, el teléfono y las discusiones pendientes.',
      'Haz tres respiraciones tranquilas.',
    ],
    cuerpo: [
      'Hoy no se trata de compensar nada. Se trata de estar.',
      'Piensa en tu hijo o tu hija. ¿Qué le interesa esta semana?',
      'Proponte escuchar con toda tu atención, sin corregir ni resolver de inmediato.',
      'Acepta que puede llegar de buen o mal ánimo. No lo tomes como una evaluación tuya.',
      'Afecto y límites van juntos. Puedes dar calidez y firmeza a la vez.',
      'Elige un momento sin pantallas y una conversación real.',
    ],
    relleno: ['Vuelve a tu intención: estar.'],
    cierre: [
      'No necesitas un día perfecto.',
      'Basta con que estés de verdad.',
    ],
  },
  {
    id: 'fecha-dificil',
    titulo: 'Un día que duele',
    tema: 'compromisos',
    resumen: 'Para cumpleaños, fiestas o vacaciones que no serán como imaginaste.',
    para: 'En una fecha señalada, sobre todo si no te toca estar con tus hijos.',
    fuente: [
      ['I', 'Adaptación de la guía del informe para fechas importantes.'],
    ],
    duraciones: [5],
    fases: [1, 2, 3],
    inicio: [
      'Hoy es un día señalado, y quizás no es como lo imaginaste.',
      'Respira unas veces y reconoce lo que sientes.',
    ],
    cuerpo: [
      'Nombra lo que extrañas de cómo pudo ser este día.',
      'Si piensas en tus hijos, repite: que tengan un buen día, donde estén.',
      'Puedes estar triste y aun así dejar que otros disfruten.',
      'Piensa a quién puedes ver o llamar hoy. La compañía importa.',
      'No necesitas anestesiar esto con alcohol ni con trabajo de más. Puedes sentirlo y seguir.',
    ],
    relleno: ['Vuelve a la respiración.'],
    cierre: [
      'Elige una cosa pequeña y buena para hoy.',
      'Esta noche, deja el día terminar.',
    ],
  },

  // ───────────── Dormir ─────────────
  {
    id: 'dormir',
    titulo: 'Soltar el cuerpo',
    tema: 'dormir',
    resumen: 'Recorrido lento por el cuerpo para preparar el sueño.',
    para: 'Ya en la cama, con la luz apagada.',
    fuente: [
      ['I', 'La primera fase del informe prioriza dormir. Esta es una práctica de relajación general. Si el insomnio es grave, consulta.'],
    ],
    duraciones: [10, 20],
    fases: [1, 2, 3],
    noche: true,
    maxSilencio: 100,
    inicio: [
      'Acuéstate como te resulte más cómodo y cierra los ojos.',
      'Hoy ya no hay nada más que resolver.',
      'Deja que la respiración se haga lenta y que la cama te sostenga.',
    ],
    cuerpo: [
      'Lleva la atención a los pies. Deja que pesen.',
      'Sube a las pantorrillas y las rodillas. Suéltalas.',
      'Afloja los muslos y las caderas.',
      'Deja que el abdomen suba y baje solo.',
      'Afloja el pecho y la espalda.',
      'Deja caer los hombros.',
      'Suelta los brazos, las manos y los dedos.',
      'Relaja el cuello y la mandíbula.',
      'Afloja los ojos, la frente y el cuero cabelludo.',
      'Todo el cuerpo pesa y descansa.',
    ],
    relleno: [
      'Si aparece un pensamiento, déjalo pasar como una onda.',
      'No tienes que dormirte. Basta con descansar.',
    ],
    cierre: [
      'Sigue respirando lento.',
      'Deja que el sueño llegue cuando quiera.',
    ],
  },
];

export function sesionPorId(id) {
  return SESIONES.find((s) => s.id === id);
}

export function textoDuraciones(s) {
  const d = s.duraciones;
  if (d.length === 1) return `${d[0]} min`;
  return `${d.slice(0, -1).join(', ')} o ${d[d.length - 1]} min`;
}
