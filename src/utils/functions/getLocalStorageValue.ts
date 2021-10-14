export const getLocalStorageValue = (prop: string): unknown => JSON.parse(localStorage.getItem(prop));
