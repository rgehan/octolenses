export const openInNewTab = tab => {
  // If it's a new tab, open directly in it
  if (tab.url === 'chrome://newtab/') {
    return chrome.tabs.update(tab.id, {
      url: chrome.extension.getURL('index.html'),
    });
  }

  // Else create a new tab for OctoLenses
  chrome.tabs.create({
    url: chrome.extension.getURL('index.html'),
  });
};
