import './cache.js';

function openInNewTab() {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
  });
}

// On click of the extension's icon, open OctoLenses in a new tab.
chrome.action.onClicked.addListener(openInNewTab);
