export function getLocalStorageValue<T>(prop: string): T | null {
  return JSON.parse(localStorage.getItem(prop)) as (T | null);
}
