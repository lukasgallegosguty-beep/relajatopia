# Relajatopia

App móvil de meditación en español para adultos. Une prácticas del budismo tibetano con lo que hoy dice la ciencia sobre emociones, expectativas, felicidad, propósito y compromisos difíciles, como criar después de un divorcio.

Es una aplicación web instalable (PWA): se abre desde un enlace, se agrega a la pantalla de inicio del teléfono y funciona sin conexión. No necesita cuenta ni servidor. **Todo lo que escribe la persona queda solo en su teléfono.**

## La idea

La mente es una laguna de altura: cuando dejas de agitarla, el agua se aclara sola.

- **La laguna** refleja cómo estás. Registras tu ánimo como estados del agua, de tormenta a espejo, y la escena cambia. Durante una práctica, el agua se aquieta.
- **La apacheta** muestra tu progreso. Cada práctica terminada agrega una piedra. Las piedras no se pierden si dejas de practicar unos días.
- **El origen de cada idea es visible.** Todo texto indica si viene de la tradición, de la ciencia o de una interpretación.

## Qué incluye

| Sección | Contenido |
|---|---|
| Hoy | Registro de ánimo, práctica sugerida, plan del día, aforismo y atajos |
| Practicar | 29 sesiones guiadas, 3 fases, 27 lecturas y 5 sonidos de fondo |
| Ahora | Protocolo de 8 pasos para cuando una emoción sube |
| Diario | Calendario de ánimo, notas y ejercicios escritos |
| Tú | Apacheta, intención, compromiso, ayuda, evidencia, bibliografía y ajustes |
| Criar después del divorcio | 7 situaciones con pasos concretos |

## Abrirla en el celular

1. Activa GitHub Pages en el repositorio: **Settings**, **Pages**, **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
2. Espera unos minutos y abre <https://lukasgallegosguty-beep.github.io/relajatopia/> en el teléfono.
3. En iPhone, usa Safari: toca Compartir y luego **Agregar a inicio**.
4. En Android, usa Chrome: abre el menú y toca **Instalar app**.

## Probarla en el computador

No hay paso de compilación. Sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8765
```

Luego abre <http://localhost:8765>. Conviene usar la vista de teléfono de las herramientas de desarrollo.

## Cómo cambiar contenido

Los textos están en `js/content/` y se pueden editar sin tocar el resto:

| Archivo | Qué contiene |
|---|---|
| `sesiones.js` | Guiones de las sesiones |
| `lecturas.js` | Lecturas con su origen |
| `ejercicios.js` | Protocolos paso a paso |
| `caminos.js` | Fases y situaciones de crianza |
| `emociones.js` | Estados del agua y fichas de emociones |
| `aforismos.js` | Aforismos del día |
| `referencias.js` | Evidencia, teléfonos de ayuda y bibliografía |

Después de cambiar cualquier archivo:

```bash
node pruebas/contenido.mjs            # revisa contenido y tiempos
python3 herramientas/generar_voz.py --modelos CARPETA   # solo si cambiaste un guion
node herramientas/generar-sw.mjs      # actualiza la lista para uso sin conexión
```

Si no regeneras `sw.js`, quienes ya tienen la app instalada no recibirán el cambio.

## Pruebas

```bash
node pruebas/contenido.mjs
python3 -m http.server 8765 --bind 127.0.0.1 &
NODE_PATH=$(npm root -g) node pruebas/recorrido.cjs
```

`contenido.mjs` comprueba enlaces entre contenidos, tiempos de cada duración y planes por fase. `recorrido.cjs` usa Playwright para recorrer la app en emulación de teléfono.

## Estructura

```
index.html            entrada de la app
css/app.css           estilos y colores
js/app.js             navegación y marco
js/estado.js          datos guardados en el teléfono
js/laguna.js          escena de la laguna (canvas)
js/apacheta.js        pila de piedras
js/linea.js           línea de tiempo de cada sesión
js/voz.js             voz pregrabada o del teléfono
js/sonido.js          sonidos sintetizados y campana
js/pantallas/         pantallas
js/content/           contenido editable
audio/voz/            voz de las sesiones
herramientas/         generadores de voz, íconos y sw.js
pruebas/              pruebas automáticas
vendor/               Preact y htm
fuentes/              tipografías
```

## Límites conocidos

- La voz de las sesiones es sintética. Se puede cambiar por la del teléfono o desactivar en Ajustes.
- La app mantiene la pantalla encendida durante una sesión. En algunos teléfonos, el audio se detiene si la bloqueas.
- Una PWA sin servidor no puede enviar notificaciones programadas. Por eso el recordatorio diario crea un evento en el calendario.
- Los datos viven en el navegador del teléfono. Si se borran, solo se recuperan con un respaldo creado en Ajustes.
- Está pensada para Chile: los teléfonos de ayuda y la información de mediación son chilenos y hay que revisarlos periódicamente.

## Aviso

Relajatopia es una ayuda para el bienestar. No diagnostica, no trata ninguna enfermedad y no reemplaza la atención de profesionales de la salud. No existen ensayos de prácticas budistas tibetanas en madres y padres divorciados: las guías de crianza son extrapolaciones razonadas, no protocolos validados.

## Identidad visual

Es una identidad propia, tomada del altiplano chileno y la meseta tibetana: lagunas de altura, salares, volcanes y la turquesa y el coral de la joyería tibetana. El primer concepto era papel crema con bermellón, pero se descartó por parecerse a demasiados productos actuales.

## Créditos

- Tipografías: [Piazzolla](https://github.com/huertatipografica/piazzolla) y [Alegreya Sans](https://github.com/huertatipografica/Alegreya-Sans), de Huerta Tipográfica, con licencia SIL Open Font 1.1.
- Interfaz: [Preact](https://preactjs.com) y [htm](https://github.com/developit/htm), con licencias MIT y Apache 2.0.
- Voz: generada con [Kokoro](https://github.com/hexgrad/kokoro), con licencia Apache 2.0, mediante [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx).

Los guiones y textos son originales y resumen un informe propio sobre budismo tibetano y ciencia contemporánea. Las fuentes están en la pantalla Bibliografía.
