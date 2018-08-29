import { isNewTabUrl } from './utils';

export const openInNewTab = tab => {
  // If it's a new tab, open directly in it
  if (isNewTabUrl(tab.url)) {
    return chrome.tabs.update(tab.id, {
      url: chrome.extension.getURL('index.html'),
    });
  }

  // Else create a new tab for OctoLenses
  chrome.tabs.create({
    url: chrome.extension.getURL('index.html'),
  });
};
