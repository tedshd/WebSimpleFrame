// minimal-sw.js
self.addEventListener('install', (event) => {
  // 只做最基本的安裝，不緩存任何文件
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // 不做任何處理，直接使用網絡請求
  return;
});