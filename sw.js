// Archivo generado por herramientas/generar-sw.mjs. No lo edites a mano.
const VERSION = 'relajatopia-a112dbe40b';
const CACHE_VOZ = 'relajatopia-voz-1';
const ARCHIVOS = [
  "./",
  "audio/silencio.m4a",
  "css/app.css",
  "fuentes/alegreya-sans-400-italica.woff2",
  "fuentes/alegreya-sans-400.woff2",
  "fuentes/alegreya-sans-500.woff2",
  "fuentes/alegreya-sans-700.woff2",
  "fuentes/piazzolla-italica.woff2",
  "fuentes/piazzolla.woff2",
  "iconos/apple-touch-icon.png",
  "iconos/icono-192.png",
  "iconos/icono-512.png",
  "iconos/icono-mascara-512.png",
  "iconos/icono.svg",
  "index.html",
  "js/apacheta.js",
  "js/app.js",
  "js/content/aforismos.js",
  "js/content/caminos.js",
  "js/content/ejercicios.js",
  "js/content/emociones.js",
  "js/content/lecturas.js",
  "js/content/referencias.js",
  "js/content/sesiones.js",
  "js/content/voz-clips.js",
  "js/estado.js",
  "js/laguna.js",
  "js/linea.js",
  "js/pantallas/bienvenida.js",
  "js/pantallas/diario.js",
  "js/pantallas/ejercicio.js",
  "js/pantallas/hoy.js",
  "js/pantallas/info.js",
  "js/pantallas/practicar.js",
  "js/pantallas/registro.js",
  "js/pantallas/respirar.js",
  "js/pantallas/sesion.js",
  "js/pantallas/tu.js",
  "js/sonido.js",
  "js/ui.js",
  "js/voz.js",
  "manifest.webmanifest",
  "vendor/preact-htm.mjs"
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches
      .open(VERSION)
      .then((c) => c.addAll(ARCHIVOS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches
      .keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== VERSION && k !== CACHE_VOZ).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Safari pide el audio por tramos, así que hay que responder esos rangos.
async function servirVoz(pedido) {
  const cache = await caches.open(CACHE_VOZ);
  let res = await cache.match(pedido.url);
  if (!res) {
    res = await fetch(pedido.url);
    if (res.ok) await cache.put(pedido.url, res.clone());
  }
  const rango = pedido.headers.get('range');
  if (!rango || !res.ok) return res;
  const datos = await res.arrayBuffer();
  const m = /bytes=(\d+)-(\d*)/.exec(rango);
  const ini = m ? Number(m[1]) : 0;
  const fin = m && m[2] ? Math.min(Number(m[2]), datos.byteLength - 1) : datos.byteLength - 1;
  return new Response(datos.slice(ini, fin + 1), {
    status: 206,
    headers: {
      'Content-Type': 'audio/mp4',
      'Content-Length': String(fin - ini + 1),
      'Content-Range': `bytes ${ini}-${fin}/${datos.byteLength}`,
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (ev) => {
  const url = new URL(ev.request.url);
  if (ev.request.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.includes('/audio/voz/')) {
    ev.respondWith(servirVoz(ev.request));
    return;
  }
  if (ev.request.mode === 'navigate') {
    ev.respondWith(fetch(ev.request).catch(() => caches.match('./')));
    return;
  }
  ev.respondWith(caches.match(ev.request, { ignoreSearch: true }).then((r) => r || fetch(ev.request)));
});
