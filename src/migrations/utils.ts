export function getFromLocalStorage(key: string) {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export function saveToLocalStorage(key: string, value: any) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

export function hydrateLocalStorageFromObject(object: any) {
  localStorage.clear();

  Object.keys(object).forEach(key => {
    saveToLocalStorage(key, object[key]);
  });
}

export function dumpLocalStorageToObject() {
  const object: Record<string, any> = {};

  Object.keys(localStorage).forEach(key => {
    object[key] = getFromLocalStorage(key);
  });

  return object;
}
