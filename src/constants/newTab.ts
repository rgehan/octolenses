const NEW_TAB_SETTING_LS_KEY = 'useNewTabPage';

export async function getNewTabSetting() {
  if (chrome.storage) {
    const {
      [NEW_TAB_SETTING_LS_KEY]: results = true,
    } = await chrome.storage.local.get([NEW_TAB_SETTING_LS_KEY]);
    return results;
  } else {
    const results = localStorage.getItem(NEW_TAB_SETTING_LS_KEY);
    return results !== null ? JSON.parse(results) : true;
  }
}

export function saveNewTabSetting(useNewTab: boolean) {
  if (chrome.storage) {
    chrome.storage.local.get({ [NEW_TAB_SETTING_LS_KEY]: useNewTab });
  } else {
    localStorage.setItem(NEW_TAB_SETTING_LS_KEY, JSON.stringify(useNewTab));
  }
}
