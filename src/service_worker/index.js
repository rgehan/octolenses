import { includes } from "lodash";

import './cache.js';
import { NEW_TAB_SETTING_LS_KEY } from "../constants/newTab";

/**
 * Whenever a blank new tab is opened, overrides it with OctoLenses
 * if the settings of the user allowed it.
 */
async function overrideNewTabPage(tab) {
  const useNewTabPage = await chrome.storage.local.get([NEW_TAB_SETTING_LS_KEY]);

  console.log('useNewTabPage', useNewTabPage);

  if (useNewTabPage && isNewTab(tab)) {
    chrome.tabs.update(tab.id, {
      url: chrome.runtime.getURL('index.html'),
    });
  }
}

function openInNewTab(tab) {
  // If it's a new tab, open directly in it
  if (isNewTab(tab)) {
    return chrome.tabs.update(tab.id, {
      url: chrome.runtime.getURL('index.html'),
    });
  }

  // Else create a new tab for OctoLenses
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
  });
}

function isNewTab(tab) {
  const KNOWN_NEW_TAB_URLS = [
    'chrome://newtab/', // For Chrome
    'about:newtab', // For Firefox
  ];

  // In recent versions of Chrome, the URL that is being loaded into the new tab
  // is stored in the `pendingUrl` property, while in older versions, and
  // firefox, it is stored in the `url` property.
  let url = tab.pendingUrl || tab.url;

  return includes(KNOWN_NEW_TAB_URLS, url);
}

// Override new tab page with OctoLenses if the settings allow it.
chrome.tabs.onCreated.addListener(overrideNewTabPage);

// On click of the extension's icon, open OctoLenses in a new tab.
chrome.action.onClicked.addListener(openInNewTab);

