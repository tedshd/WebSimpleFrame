import {getQueryString} from './querystring.js';

// TODO add support i18n lang
const locales = {
  'en-US': '../locale/en-US.json',
  'zh-TW': '../locale/zh-TW.json'
};

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function i18n(language) {
  for (var x in locales) {
    const data = await fetchData(locales[x])
    locales[x] = data
  }

  const lang = language || getQueryString('hl') || navigator.language;
  const keysData = locales[lang] || locales['en-US'];
  const getLangKey = (key, obj) => {
    if (obj) {
      return keysData[key].replace(/\{(\w+)\}/g, (match, key) => obj[key]);
    } else {
      return keysData[key];
    }
  }
  return { getLangKey };
}
