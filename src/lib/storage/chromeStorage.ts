import { IStorage } from 'mobx-persist/lib/storage';

export const chromeStorage: IStorage = {
  getItem(key: string): Promise<string> {
    return new Promise(resolve => {
      chrome.storage.sync.get(key, result => {
        resolve(result[key] || null);
      });
    });
  },

  removeItem(key: string): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.sync.remove(key, () => {
        resolve(null);
      });
    });
  },

  setItem(key: string, value: string): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve(null);
      });
    });
  },
};
