export const removeCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value};max-age=0`;
};
