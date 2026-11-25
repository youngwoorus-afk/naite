// 나이테 일기장 오프라인 지원: 앱 화면을 기기에 저장해 두고, 인터넷이 없어도 열리게 함.
const CACHE = 'naite-v2';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const same = u.origin === location.origin;
  const lib = (u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/'))
    || u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';
  if (!same && !lib) return; // 일기 데이터 통신(Firestore)은 건드리지 않음
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request);
    const net = fetch(e.request, same ? { cache: 'no-cache' } : undefined).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return same ? net : (hit || net); // 앱 파일은 최신 우선, 라이브러리·글꼴은 저장본 우선
  }));
});
