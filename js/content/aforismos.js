// Aforismos del entrenamiento mental (lojong), en redacción propia.
// La tradición los atribuye a Atisha y Geshe Chekawa los sistematizó en el siglo XII.
// Las traducciones varían según la edición.

export const AFORISMOS = [
  {
    txt: 'Transforma la adversidad en camino.',
    nota: 'Lo difícil de hoy puede servirte para entrenar algo. No significa que debas tolerar lo que te daña.',
  },
  {
    txt: 'Empieza y termina con la intención.',
    nota: 'Lo que marca el día es la dirección con que entras y sales de él.',
  },
  {
    txt: 'No esperes aplausos.',
    nota: 'Haz lo que valoras, aunque nadie lo note ni lo agradezca.',
  },
  {
    txt: 'Lleva todas las culpas a una sola.',
    nota: 'Mira tu reacción antes que al culpable. No significa aceptar la responsabilidad por lo que te hicieron.',
  },
  {
    txt: 'Agradece a todos.',
    nota: 'Incluso quien te pone a prueba te da algo que entrenar. Agradecer no es aprobar.',
  },
  {
    txt: 'Practica primero con lo que más te cuesta.',
    nota: 'Elige el punto donde la paciencia hace más falta hoy.',
  },
  {
    txt: 'Entre dos testigos, confía en el que te conoce por dentro.',
    nota: 'Tu honestidad contigo pesa más que la opinión de otros.',
  },
  {
    txt: 'Cambia tu actitud y sigue siendo natural.',
    nota: 'El trabajo es interior. No hace falta anunciarlo ni actuar como alguien especial.',
  },
  {
    txt: 'No hables de los defectos ajenos.',
    nota: 'Hoy, prueba a no comentar los errores de nadie, sobre todo delante de tus hijos.',
  },
  {
    txt: 'No busques el punto débil del otro.',
    nota: 'En una discusión, renuncia a decir aquello que sabes que más duele.',
  },
  {
    txt: 'Suelta también el remedio.',
    nota: 'Las prácticas sirven y luego se dejan. No las conviertas en otra exigencia.',
  },
  {
    txt: 'Mantén una mente alegre.',
    nota: 'No es negar lo que duele. Es no agregar peso innecesario a lo que ya pesa.',
  },
  {
    txt: 'Sé constante, pase lo que pase.',
    nota: 'Practica un poco en los días buenos y en los malos.',
  },
  {
    txt: 'Abandona la espera de resultados.',
    nota: 'Entrégate al esfuerzo y deja que el fruto llegue cuando pueda.',
  },
];

export function aforismoDe(fecha = new Date()) {
  const inicio = new Date(fecha.getFullYear(), 0, 0);
  const dia = Math.floor((fecha - inicio) / 86400000);
  return AFORISMOS[dia % AFORISMOS.length];
}
