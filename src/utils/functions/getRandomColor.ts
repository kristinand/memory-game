import { getRandomNumber } from './getRandomNumber';

export function getRandomColor(sat1 = 50, sat2 = 55, light1 = 70, light2 = 75, hue1 = 0, hue2 = 360): string {
  const hue = getRandomNumber(hue1, hue2);
  const sat = getRandomNumber(sat1, sat2);
  const light = getRandomNumber(light1, light2);
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}
