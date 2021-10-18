export const setLocalStorageValue = (name: string, item: any): void =>
  localStorage.setItem(name, typeof item !== 'string' ? JSON.stringify(item) : item);
