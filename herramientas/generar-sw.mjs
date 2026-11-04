// Genera sw.js con la lista de archivos para uso sin conexión y una versión
// calculada desde su contenido. Ejecuta esto después de cambiar cualquier archivo:
//   node herramientas/generar-sw.mjs
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const carpetas = ['css', 'fuentes', 'iconos', 'js', 'vendor'];
const sueltos = ['index.html', 'manifest.webmanifest', 'audio/silencio.m4a'];

const recorrer = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const r = join(dir, n);
    return statSync(r).isDirectory() ? recorrer(r) : [r];
  });

const archivos = [...sueltos.map((a) => join(raiz, a)), ...carpetas.flatMap((c) => recorrer(join(raiz, c)))]
  .map((a) => relative(raiz, a).split('\\').join('/'))
  .filter((a) => !a.endsWith('.txt'))
  .sort();

const huella = createHash('sha256');
archivos.forEach((a) => huella.update(a).update(readFileSync(join(raiz, a))));
const version = huella.digest('hex').slice(0, 10);

const plantilla = readFileSync(join(raiz, 'herramientas/sw-plantilla.js'), 'utf8');
const salida = plantilla
  .replace('__VERSION__', version)
  .replace('__ARCHIVOS__', JSON.stringify(['./', ...archivos], null, 2));
writeFileSync(join(raiz, 'sw.js'), salida);
console.log(`sw.js generado: versión ${version}, ${archivos.length} archivos`);
