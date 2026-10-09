// KODA - service worker: guarda la "carcasa" de la app para que abra al instante. Los datos siempre vienen de Google Sheets.
const CACHE = 'koda-shell-v1';
const SHELL = ['movil.html', 'login.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'config.js', 'koda-api.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;   // Apps Script y fuentes no se tocan
  // Red primero (siempre la versión nueva); si no hay internet, la copia guardada
  e.respondWith(fetch(r).then(res => { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); return res; }).catch(() => caches.match(r)));
});
