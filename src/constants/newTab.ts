const NEW_TAB_SETTING_LS_KEY = 'useNewTabPage';

export async function getNewTabSetting() {
  const {
    [NEW_TAB_SETTING_LS_KEY]: results = true,
  } = await chrome.storage.local.get([NEW_TAB_SETTING_LS_KEY]);
  return results;
}

export function saveNewTabSetting(useNewTab: boolean) {
  chrome.storage.local.get({ [NEW_TAB_SETTING_LS_KEY]: useNewTab });
}
