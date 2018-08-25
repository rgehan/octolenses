import { overrideNewTabPage } from './overrideNewTabPage';

// Override new tab page with OctoLenses if the settings allow it.
chrome.tabs.onCreated.addListener(overrideNewTabPage);
