import { includes } from 'lodash';

const KNOWN_NEW_TAB_URLS = [
  'chrome://newtab/', // For Chrome
  'about:newtab', // For Firefox
];

export function isNewTab(tab) {
  // In recent versions of Chrome, the URL that is being loaded into the new tab
  // is stored in the `pendingUrl` property, while in older versions, and
  // firefox, it is stored in the `url` property.
  let url = tab.pendingUrl || tab.url;
  return includes(KNOWN_NEW_TAB_URLS, url);
}
