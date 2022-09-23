export function getLocalStorageValue<T>(prop: string): T | null {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(prop)) as (T | null);
  }

  return null;
}
