export const getCookie = (name: string): string | null => {
  if (typeof document !== 'undefined') {
    const decodedCookieObj = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < decodedCookieObj.length; i++) {
      const [key, value] = decodedCookieObj[i].split('=');
      if (key === name) {
        return value;
      }
    }
  }

  return null;
};
