export const setLocalStorageValue = (name: string, item: unknown): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, typeof item !== 'string' ? JSON.stringify(item) : item);
  }
};
