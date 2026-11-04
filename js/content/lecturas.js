// Lecturas breves. Cada bloque indica su origen:
//   T = lo afirma la tradición budista tibetana
//   C = lo respalda la ciencia (se indica el tipo de evidencia en el texto)
//   I = interpretación o extrapolación, sin evidencia directa
// Todo el contenido resume el informe base de la app.

export const ORIGENES = {
  T: { nombre: 'Tradición', detalle: 'Lo afirma un texto o maestro de la tradición budista tibetana.' },
  C: { nombre: 'Ciencia', detalle: 'Lo respalda la investigación. El texto indica de qué tipo de estudio viene.' },
  I: { nombre: 'Interpretación', detalle: 'Es una extrapolación razonada, sin evidencia directa.' },
};

export const LECTURAS = [
  // Emociones
  {
    id: 'aflicciones',
    titulo: 'Lo que sientes no es lo que eres',
    tema: 'emociones',
    practica: 'nombrar',
    bloques: [
      ['T', 'En la tradición tibetana, las emociones perturbadoras (kleśa en sánscrito, nyon mongs en tibetano) son estados pasajeros: oscurecen la mente, pero no son su naturaleza.'],
      ['T', 'De ahí su optimismo práctico: si la aflicción no es esencial, se puede debilitar con entrenamiento.'],
      ['T', 'Las raíces se agrupan en tres venenos: apego, aversión y confusión. La confusión se considera la raíz, porque toma al yo y a las cosas como sólidos e independientes.'],
      ['I', 'Una forma laica de usar esta idea: decir “hay rabia” en lugar de “soy una persona rabiosa”.'],
    ],
  },
  {
    id: 'tres-estrategias',
    titulo: 'Tres maneras de responder a una emoción',
    tema: 'emociones',
    practica: 'tiene-remedio',
    bloques: [
      ['T', 'Evitar: alejarte de lo que la desencadena.'],
      ['T', 'Aplicar un antídoto: el amor contra la ira, la contemplación de la impermanencia contra el apego.'],
      ['T', 'Transformar: reconocer la energía de la emoción sin seguir su relato. Esta vía presupone estabilidad y guía calificada.'],
      ['T', 'Para quien empieza o atraviesa una crisis, la tradición recomienda las dos primeras.'],
    ],
  },
  {
    id: 'reevaluar',
    titulo: 'Reevaluar funciona, suprimir no',
    tema: 'emociones',
    practica: 'tiene-remedio',
    refs: ['webb2012'],
    bloques: [
      ['C', 'Un metaanálisis de 306 comparaciones (Webb, Miles y Sheeran, 2012) halló que el cambio cognitivo, sobre todo la reevaluación, fue lo más eficaz (d+ = 0,36).'],
      ['C', 'Las estrategias de despliegue atencional, en conjunto, no mostraron efecto fiable (d+ = 0,00), aunque la distracción activa sí ayudó.'],
      ['C', 'Suprimir lo que expresas fue poco eficaz y aumenta la activación fisiológica.'],
      ['I', 'La meditación analítica se parece mucho a la reevaluación: razonar con calma para cambiar una actitud.'],
    ],
  },
  {
    id: 'paciencia',
    titulo: 'La paciencia según Shantideva',
    tema: 'emociones',
    practica: 'tiene-remedio',
    refs: ['shantideva'],
    bloques: [
      ['T', 'El capítulo 6 del Bodhicharyavatara, del siglo VIII, es el texto de referencia sobre la ira.'],
      ['T', 'Sus argumentos: la ira destruye tu propia paz; si algo tiene remedio, no hace falta enojarse, y si no lo tiene, enojarse no sirve; quien agrede actúa movido por sus aflicciones; y el adversario te da una ocasión única de practicar paciencia.'],
      ['I', 'Explicar por qué alguien actúa mal no significa justificarlo ni dejar de poner límites.'],
    ],
  },

  // Expectativas
  {
    id: 'error-prediccion',
    titulo: 'Tu ánimo sigue a tus expectativas',
    tema: 'expectativas',
    practica: 'ocho-preocupaciones',
    refs: ['rutledge2014'],
    bloques: [
      ['C', 'Un experimento de Rutledge y colegas (PNAS, 2014) mostró que la felicidad momentánea no se explica por lo ganado en total, sino por las expectativas recientes y la diferencia entre lo esperado y lo obtenido. Una replicación preregistrada lo confirmó en su mayor parte.'],
      ['I', 'Bajar las expectativas reduce las decepciones, pero las expectativas positivas también dan alegría anticipada. La meta no es dejar de esperar, sino esperar con realismo.'],
    ],
  },
  {
    id: 'ocho',
    titulo: 'Las ocho preocupaciones mundanas',
    tema: 'expectativas',
    practica: 'ocho-preocupaciones',
    bloques: [
      ['T', 'Son cuatro pares: ganancia y pérdida, placer y dolor, elogio y crítica, fama y descrédito. La tradición las presenta como el motor de los vaivenes diarios del ánimo.'],
      ['T', 'El sufrimiento no viene de desear, sino de exigir que la realidad se ajuste a lo deseado y se quede así.'],
    ],
  },
  {
    id: 'amor-apego',
    titulo: 'Amor y apego',
    tema: 'expectativas',
    practica: 'amar-sin-retener',
    bloques: [
      ['T', 'El amor desea el bien del otro. El apego desea al otro para uno mismo y depende de que cumpla lo que esperas.'],
      ['I', 'Aplicado a la crianza: amar es querer que tus hijos estén bien. El apego es necesitar que estén contigo para que tú estés bien.'],
    ],
  },
  {
    id: 'aceptar',
    titulo: 'Aceptar no es resignarse',
    tema: 'expectativas',
    practica: 'soltar-resultados',
    bloques: [
      ['T', 'La aceptación reconoce lo que hay para actuar con lucidez. La resignación renuncia a actuar. Lo remediable se remedia y lo irremediable se acepta.'],
      ['I', 'Conviene separar tres niveles. En los resultados, que solo controlas en parte, suelta. En tus conductas, comprométete. En tus valores, sé fiel.'],
      ['C', 'ACT, basada en la aceptación y los valores, superó a los controles en 39 ensayos (g = 0,57), sin diferir de la TCC.'],
    ],
  },
  {
    id: 'perdida-ambigua',
    titulo: 'Una pérdida sin cierre',
    tema: 'expectativas',
    practica: 'despues-traspaso',
    bloques: [
      ['C', 'Pauline Boss llama pérdida ambigua a una pérdida poco clara, que continúa sin resolución. Ella misma aplica el concepto al divorcio: la relación se rompe, pero la persona sigue ahí. Es una teoría con apoyo clínico y cualitativo.'],
      ['C', 'Boss sostiene que no existe el cierre: se aprende a vivir con la pérdida y a sostener dos verdades a la vez.'],
      ['I', 'Perder la vida cotidiana con tus hijos mientras siguen presentes en tu vida es un ejemplo claro. Sirve nombrar lo perdido: las cenas diarias, la familia que imaginaste.'],
    ],
  },
  {
    id: 'adaptacion',
    titulo: 'El tiempo no lo cura todo solo',
    tema: 'expectativas',
    practica: 'impermanencia',
    bloques: [
      ['C', 'Las personas se adaptan a muchos cambios, pero no por completo a todos. En estudios de panel, tras un divorcio la satisfacción vital tiende a no volver del todo a su nivel previo, en promedio y con mucha variación entre personas (Lucas, 2005).'],
      ['I', 'Por eso tiene sentido trabajar activamente el reajuste en lugar de solo esperar.'],
    ],
  },

  // Felicidad
  {
    id: 'sukha',
    titulo: 'Felicidad y placer',
    tema: 'felicidad',
    practica: 'amor-bondadoso',
    bloques: [
      ['T', 'Sukha se distingue del placer sensorial, que es pasajero. Matthieu Ricard la describe como un estado de florecimiento que nace de una mente equilibrada y sobrevive a los altibajos.'],
      ['T', 'El Dalái Lama sostiene que la felicidad es el propósito de la vida y que se cultiva entrenando la mente.'],
      ['C', 'La psicología separa el bienestar hedónico (afecto positivo y satisfacción) del eudaimónico (por ejemplo, las seis dimensiones de Carol Ryff: autoaceptación, relaciones positivas, autonomía, dominio del entorno, propósito y crecimiento).'],
      ['C', 'Hay críticas: los estudios con meditadores expertos son pequeños y autoseleccionados, y la cifra popular de que el 40 % de la felicidad depende de ti no debe tomarse al pie de la letra.'],
    ],
  },
  {
    id: 'relaciones',
    titulo: 'Las relaciones pesan',
    tema: 'felicidad',
    practica: 'ampliar-circulo',
    bloques: [
      ['C', 'El Estudio de Harvard sobre el Desarrollo Adulto sigue desde 1938 a 724 hombres y sus familias. Su director, Robert Waldinger, lo resume en que las buenas relaciones nos mantienen más felices y más sanos.'],
      ['C', 'Quienes estaban más satisfechos con sus relaciones a los 50 años eran los más sanos a los 80. Son datos correlacionales y la muestra original es masculina y estadounidense.'],
      ['C', 'En experimentos breves, gastar en otras personas elevó el bienestar (Dunn, Aknin y Norton, 2008).'],
    ],
  },
  {
    id: 'curva-u',
    titulo: 'El valle de la mediana edad',
    tema: 'felicidad',
    practica: 'impermanencia',
    bloques: [
      ['C', 'Blanchflower (2021) halló una forma de U entre edad y bienestar en 145 países, con un mínimo cerca de los 47 o 48 años. La forma depende de qué se controle en el modelo.'],
      ['C', 'Datos recientes (Blanchflower, Bryson y Xu, 2025) muestran que esa U se está desdibujando: hoy el malestar se concentra en personas jóvenes y baja con la edad.'],
      ['I', 'Si una ruptura te toca en la mediana edad, parte del malestar puede ser de época vital y no un fracaso personal.'],
    ],
  },

  // Propósito
  {
    id: 'bodhicitta',
    titulo: 'Propósito sin fijación',
    tema: 'proposito',
    practica: 'intencion-manana',
    bloques: [
      ['T', 'Bodhicitta es la intención de alcanzar la plena lucidez para beneficiar a todos los seres. Tiene dos caras: la relativa, que es la intención y su práctica, y la absoluta, que comprende la vacuidad, incluida la del yo que tiene un propósito.'],
      ['T', 'Por eso permite tener una dirección intensa sin volverla identidad rígida ni exigencia de resultados.'],
      ['I', 'Su equivalente funcional más cercano son los valores de ACT: direcciones elegidas que nunca se alcanzan del todo. La diferencia es que la bodhicitta presupone karma y renacimiento, algo ajeno a la ciencia.'],
    ],
  },
  {
    id: 'sentido',
    titulo: 'Tener sentido y buscarlo',
    tema: 'proposito',
    practica: 'voto',
    bloques: [
      ['C', 'Michael Steger distingue la presencia de sentido de su búsqueda. La presencia se asocia con bienestar. La búsqueda sin presencia, con malestar.'],
      ['C', 'Viktor Frankl sostuvo que se puede hallar sentido incluso en el sufrimiento inevitable, por la actitud que se adopta. La logoterapia tiene poca evidencia de ensayos de alta calidad: su valor es sobre todo conceptual.'],
      ['I', 'Hay riesgo de glorificar un sufrimiento evitable. Dar sentido a lo inevitable no es tolerar el daño.'],
    ],
  },
  {
    id: 'proposito-salud',
    titulo: 'Propósito y salud',
    tema: 'proposito',
    practica: 'intencion-manana',
    refs: ['cohen2016'],
    bloques: [
      ['C', 'Un metaanálisis de 10 estudios prospectivos y 136.265 personas (Cohen, Bavishi y Rozanski, 2016) asoció un mayor propósito con menor mortalidad (RR ajustado = 0,83) y menos eventos cardiovasculares.'],
      ['C', 'Una actualización con datos de 488.765 personas estimó HR = 0,76.'],
      ['C', 'Es una asociación. No prueba que cultivar propósito cause esos resultados.'],
    ],
  },

  // Compromisos
  {
    id: 'proteger-hijos',
    titulo: 'Lo que protege a tus hijos',
    tema: 'compromisos',
    practica: 'antes-traspaso',
    paternidad: true,
    refs: ['amato1991', 'amato2001', 'hetherington2002'],
    bloques: [
      ['C', 'Los hijos de padres divorciados puntúan algo peor en varios ámbitos, con efectos pequeños: mediana de 0,14 desviaciones estándar en 92 estudios y media de −0,18 en 67 estudios más recientes.'],
      ['C', 'Los niños de familias intactas con conflicto alto puntuaron peor que los de familias divorciadas en varios ámbitos (Amato y Keith, 1991).'],
      ['C', 'Hetherington y Kelly (2002) concluyen que el 80 % acaba adaptándose y razonablemente bien. Un 20 % tuvo problemas, frente al 10 % en familias no divorciadas.'],
      ['I', 'Mensaje práctico: la resiliencia es lo común, y el conflicto expuesto es lo que más conviene reducir.'],
    ],
  },
  {
    id: 'calidad',
    titulo: 'Calidad antes que cantidad',
    tema: 'compromisos',
    practica: 'presencia',
    paternidad: true,
    refs: ['amato1999'],
    bloques: [
      ['C', 'En 63 estudios, la frecuencia de contacto con el padre no residente no se relacionó en general con el bienestar infantil. Sí lo hicieron la cercanía afectiva, la crianza con autoridad (afecto y límites no coercitivos) y el pago de la pensión (Amato y Gilbreth, 1999).'],
      ['C', 'Una actualización confirmó que las formas positivas de implicación tienen un efecto pequeño pero significativo (Adamsons y Johnson, 2013).'],
      ['C', 'Sobre el tiempo compartido, la evidencia es mixta y observacional: un metaanálisis halló mejor ajuste en custodia compartida, con efecto débil (d = 0,109), y el tema está politizado.'],
    ],
  },
  {
    id: 'mediacion',
    titulo: 'Mediar cambia el largo plazo',
    tema: 'compromisos',
    practica: 'tiene-remedio',
    paternidad: true,
    refs: ['emery2001'],
    bloques: [
      ['C', 'En un ensayo aleatorizado de Robert Emery, familias con custodia en disputa fueron a mediación o a litigio por sorteo. Doce años después, el 30 % de los progenitores no residentes del grupo de mediación veía a sus hijos cada semana, frente al 9 % del grupo de litigio.'],
      ['C', 'La mediación promedió unas 5 horas y el conflicto no aumentó. Es uno de los hallazgos causales más sólidos de esta literatura.'],
      ['C', 'Los programas preventivos también funcionan: New Beginnings (Wolchik y Sandler), evaluado en ensayos aleatorizados, mostró efectos sobre la salud mental de hijas e hijos a 6 y 15 años.'],
      ['I', 'Si hay violencia, la mediación puede no ser adecuada: busca orientación legal primero.'],
    ],
  },
  {
    id: 'crianza-paralela',
    titulo: 'Cooperar o criar en paralelo',
    tema: 'compromisos',
    practica: 'antes-traspaso',
    paternidad: true,
    bloques: [
      ['C', 'La coparentalidad cooperativa es lo ideal. Cuando el conflicto es alto, la crianza paralela reduce la exposición: comunicación mínima, escrita y centrada en los hijos, con normas propias en cada casa. Esto viene de estudios observacionales y opinión experta.'],
      ['C', 'Joan Kelly y Robert Emery subrayan que el conflicto delante de los hijos, sobre todo cuando quedan en medio, es el factor de riesgo más dañino.'],
      ['I', 'Los traspasos en lugares neutros, como el colegio, evitan confrontaciones.'],
    ],
  },
  {
    id: 'crianza-consciente',
    titulo: 'Crianza consciente',
    tema: 'compromisos',
    practica: 'presencia',
    paternidad: true,
    refs: ['burgdorf2019'],
    bloques: [
      ['C', 'Duncan, Coatsworth y Greenberg (2009) la definen en cinco dimensiones: escuchar con atención plena, aceptar sin juicio, conciencia emocional, autorregulación en la relación y compasión.'],
      ['C', 'Un metaanálisis halló una reducción pequeña del estrés parental (g = 0,34), y otro no halló efecto global. Es prometedora, no probada. No hay estudios sólidos centrados en padres divorciados.'],
    ],
  },
  {
    id: 'compasion-idiota',
    titulo: 'Compasión idiota',
    tema: 'compromisos',
    practica: 'persona-dificil',
    bloques: [
      ['T', 'Chögyam Trungpa usó esta expresión, tomada de Gurdjieff, para la compasión que no usa la inteligencia y termina alimentando la agresión del otro. Pema Chödrön la describe como dar lo que la gente quiere porque no soportamos verla sufrir, en vez de lo que necesita.'],
      ['I', 'En un divorcio puede ser ceder a todo lo que pide tu expareja por evitar conflicto, o consentir a tus hijos por culpa.'],
      ['I', 'Poner límites es compatible con la compasión, y a veces es su forma de expresarse. Un límite firme se puede formular sin odio.'],
    ],
  },
  {
    id: 'karma',
    titulo: 'Lo que el karma no significa',
    tema: 'compromisos',
    practica: 'autocompasion',
    bloques: [
      ['T', 'En su sentido tradicional, karma es intención y acción con consecuencias.'],
      ['I', 'No justifica pensar “me lo merezco” ni “es mi karma aguantar”. Usado así, alimenta la depresión o la pasividad ante el abuso.'],
    ],
  },
  {
    id: 'votos',
    titulo: 'Un compromiso no es una sumisión',
    tema: 'compromisos',
    practica: 'voto',
    bloques: [
      ['T', 'Los votos de bodhisattva son un compromiso libremente asumido de beneficiar a otros.'],
      ['I', 'Sostener la crianza cuando duele se puede vivir como un voto personal: no se elige cada día si se cumple, sino cómo.'],
      ['I', 'La analogía con samaya, el vínculo con el maestro, se desaconseja: se ha usado para imponer lealtad en relaciones abusivas. Criar es un compromiso no negociable; la relación con tu expareja no lo es en los mismos términos.'],
    ],
  },

  // Riesgos
  {
    id: 'efectos-adversos',
    titulo: 'Meditar también puede remover',
    tema: 'emociones',
    practica: 'atencion-sonidos',
    refs: ['lindahl2017', 'britton2021'],
    bloques: [
      ['C', 'El estudio Varieties of Contemplative Experience (Lindahl, Britton y colegas, 2017) identificó 59 tipos de experiencias difíciles en personas que meditan, con duraciones de días a más de una década.'],
      ['C', 'En programas tipo MBCT, el 58 % reportó algún efecto adverso, el 37 % con impacto en su funcionamiento y entre el 6 y el 14 % efectos negativos duraderos (Britton et al., 2021). Las tasas son similares a las de otros tratamientos psicológicos.'],
      ['C', 'Hay mayor riesgo con trauma no procesado, psicosis o trastorno bipolar, disociación, falta de sueño y retiros intensivos.'],
      ['I', 'Si aparecen agitación, disociación o recuerdos traumáticos, reduce o detén la práctica y consulta a un profesional con formación en trauma.'],
    ],
  },
  {
    id: 'bypass',
    titulo: 'Bypass espiritual',
    tema: 'emociones',
    practica: 'nombrar',
    bloques: [
      ['I', 'El término es de John Welwood: usar ideas espirituales para evitar emociones, conflictos o decisiones. Por ejemplo, “todo es vacuidad”, “es mi karma” o “debo ser compasivo”.'],
      ['I', 'Señales: ecuanimidad aparente con insomnio, irritabilidad o malestar físico; no poder expresar un enojo legítimo; minimizar un daño.'],
      ['C', 'La supresión expresiva rinde menos que la reevaluación y aumenta la activación fisiológica. La ecuanimidad auténtica permite sentir.'],
      ['I', 'También hay un riesgo al sacar las técnicas de su contexto: sin su marco ético, el mindfulness puede volverse una herramienta de rendimiento o autoexplotación. A la inversa, usar conceptos como karma o samaya sin contexto genera malentendidos dañinos.'],
    ],
  },
  {
    id: 'maestros',
    titulo: 'Cómo elegir con quién aprender',
    tema: 'proposito',
    practica: 'ecuanimidad',
    refs: ['silkin2018'],
    bloques: [
      ['C', 'Una investigación independiente encargada por Rigpa (Lewis Silkin, 2018) concluyó, en el balance de probabilidades, que Sogyal Rinpoche abusó física, sexual y emocionalmente de personas de su círculo cercano. El regulador británico confirmó después fallos graves de salvaguarda.'],
      ['C', 'Chögyam Trungpa tiene críticas documentadas por su consumo de alcohol y sus relaciones con alumnas, y Shambhala vivió en 2018 una crisis por denuncias contra su hijo y sucesor.'],
      ['I', 'Las enseñanzas pueden ser valiosas aunque quienes las transmiten fallen. Elige personas e instituciones con transparencia y códigos de conducta, y desconfía de cualquier marco que exija obediencia o silencio.'],
    ],
  },
];

export function lecturaPorId(id) {
  return LECTURAS.find((l) => l.id === id);
}
