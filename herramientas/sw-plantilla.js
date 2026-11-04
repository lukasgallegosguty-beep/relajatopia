// Archivo generado por herramientas/generar-sw.mjs. No lo edites a mano.
const VERSION = 'relajatopia-__VERSION__';
const CACHE_VOZ = 'relajatopia-voz-1';
const ARCHIVOS = __ARCHIVOS__;

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
