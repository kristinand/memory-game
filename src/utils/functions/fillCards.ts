import { getRandomColor } from './getRandomColor';
import { getRandomNumber } from './getRandomNumber';

export function fillCards(cards: any[], level: number, coverColor: string): any[] {
  let patterns = ['☯', '◑', '◐', '◒', '◓', '♡', '♥', '☁', '☀', '♨', '♦', '❀'];

  for (let i = 0; i < level * 2 + 2; i++) {
    const keyPart = `${level}${i}${Math.ceil(Math.random() * 100000)}`;
    const color = getRandomColor();
    const patternNumber = getRandomNumber(0, patterns.length);
    const pattern = patterns[patternNumber];
    patterns = [...patterns.slice(0, patternNumber), ...patterns.slice(patternNumber + 1)];
    const card = { color, pattern, coverColor, status: 'closed' };
    cards.push({
      key: '1'.concat(keyPart),
      ...card,
    });
    cards.push({
      key: '2'.concat(keyPart),
      ...card,
    });
  }
  return cards;
}
