import { overrideNewTabPage } from './overrideNewTabPage';
import { openInNewTab } from './openInNewTab';

// Override new tab page with OctoLenses if the settings allow it.
chrome.tabs.onCreated.addListener(overrideNewTabPage);

// On click of the extension's icon, open OctoLenses in a new tab.
chrome.browserAction.onClicked.addListener(openInNewTab);
