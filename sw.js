/* Carte SIATeG — service worker
   Précache le "shell" de l'app pour un lancement hors-ligne,
   et met en cache à la volée les ressources externes (polices, libs, moteur OCR). */
const CACHE = 'carte-forum-v4';   // v4 : force la MAJ (correctif orientation OCR)
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/qrcode.min.js',
  './vendor/jsQR.js',
  './vendor/tesseract/tesseract.min.js',   // entrée OCR (léger) ; cœur WASM + langue = cache à la volée
  './vendor/tesseract/worker.min.js',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navigation : réseau d'abord, puis cache (fonctionne hors-ligne)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Reste (icônes, polices, librairies CDN, assets Tesseract) : cache d'abord
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(r => {
        if (r && (r.status === 200 || r.type === 'opaque')) {
          const cp = r.clone();
          caches.open(CACHE).then(c => c.put(req, cp));
        }
        return r;
      }).catch(() => hit);
    })
  );
});
