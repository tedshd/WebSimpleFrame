import { loadFetch } from "./utils/loadFetch.js";
import { SimpleStore } from './utils/simpleStore.js';
import { i18n } from './utils/i18n.js';

export async function initialize() {
  window.loadFetch = loadFetch;

  const simpleStore = new SimpleStore();
  window.simpleStore = simpleStore;

  const translate = await i18n();
  window.translate = translate;
}