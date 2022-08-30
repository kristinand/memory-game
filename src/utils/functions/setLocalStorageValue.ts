export const setLocalStorageValue = (name: string, item: unknown): void =>
  localStorage.setItem(name, typeof item !== 'string' ? JSON.stringify(item) : item);
