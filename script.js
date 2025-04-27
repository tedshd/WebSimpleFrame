import { loadFetch } from "./utils/loadFetch.js";
import { SimpleStore } from './utils/simpleStore.js';
import { i18n, i18nContentRender } from './utils/i18n.js';
import './utils/pwa.js';

export async function initialize() {

  window.loadFetch = loadFetch;

  const simpleStore = new SimpleStore();
  window.simpleStore = simpleStore;

  const translate = await i18n();
  window.translate = translate;

  i18nContentRender(document.querySelectorAll('body *'));

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker 註冊成功:', registration.scope);
        })
        .catch(error => {
          console.log('Service Worker 註冊失敗:', error);
        });
    });
  }
}
