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
