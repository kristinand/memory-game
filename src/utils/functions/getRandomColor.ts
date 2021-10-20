import { getRandomNumber } from './getRandomNumber';

export function getRandomColor(sat1 = 40, sat2 = 40, light1 = 60, light2 = 60, hue1 = 0, hue2 = 360): string {
  const hue = getRandomNumber(hue1, hue2);
  const sat = getRandomNumber(sat1, sat2);
  const light = getRandomNumber(light1, light2);
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}
