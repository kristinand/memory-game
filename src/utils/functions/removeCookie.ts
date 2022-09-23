export const removeCookie = (name: string, value: string): void => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=${value};max-age=0`;
  }
};
