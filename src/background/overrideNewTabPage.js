/**
 * If no setting is explicitely set (most probably on first start),
 * use the new tab page, else respect the setting value.
 */
const shouldUseNewTabPage = () => {
  const useNewTabPage = JSON.parse(localStorage.getItem('useNewTabPage'));
  return useNewTabPage !== null ? useNewTabPage : true;
};

/**
 * Whenever a blank new tab is opened, overrides it with OctoLenses
 * if the settings of the user allowed it.
 */
export const overrideNewTabPage = tab => {
  if (shouldUseNewTabPage() && tab.url === 'chrome://newtab/') {
    chrome.tabs.update(tab.id, {
      url: chrome.extension.getURL('index.html'),
    });
  }
};
