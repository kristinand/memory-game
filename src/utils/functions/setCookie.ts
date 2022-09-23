const DAY_SECONDS = 50 * 60 * 24;

export const setCookie = (name: string, value: string, expireDays = 1): void => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=${value};max-age=${DAY_SECONDS * expireDays}`;
  }
};
