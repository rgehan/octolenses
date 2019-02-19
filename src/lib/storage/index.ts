import { chromeStorage } from './chromeStorage';

declare global {
  const chrome: any;
}

export function getStorage() {
  if (chrome.storage) {
    console.info('Using chrome.storage API');
    return chromeStorage;
  }

  console.info('Defaulting to localStorage');
  return localStorage;
}
