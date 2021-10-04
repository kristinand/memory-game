export const getLocalStorageValue = (prop: string): any => JSON.parse(localStorage.getItem(prop));
