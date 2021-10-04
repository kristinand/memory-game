export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function shuffleList(list) {
  const newList = list;
  let currentIndex = list.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = list[currentIndex];
    newList[currentIndex] = list[randomIndex];
    newList[randomIndex] = temporaryValue;
  }

  return newList;
}

export function listToArray(list, m) {
  let k = list.length / m;
  if (k < m) {
    k = m;
    m = list.length / m;
  }
  if (!Number.isInteger(k)) return list;
  const array = new Array(m).fill([]);
  for (const i in array) {
    array[i] = list.slice(i * k, i * k + k);
  }
  return array;
}

export function generateRandomColor(sat1 = 50, sat2 = 55, light1 = 70, light2 = 75, hue1 = 0, hue2 = 360) {
  const hue = getRandomNumber(hue1, hue2);
  const sat = getRandomNumber(sat1, sat2);
  const light = getRandomNumber(light1, light2);
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

export function formatTime(timer) {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const getMinutes = `${Math.floor(timer / 60)}`;
  return getMinutes !== '0' ? `${getMinutes}min ${getSeconds}s` : `${getSeconds}s`;
}

export function fillCards(cards, level, coverColor) {
  let patterns = ['☯', '◑', '◐', '◒', '◓', '♡', '♥', '☁', '☀', '♨', '♦', '❀'];

  for (let i = 0; i < level * 2 + 2; i++) {
    const keyPart = `${level}${i}${Math.ceil(Math.random() * 100000)}`;
    const color = generateRandomColor();
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

export const getLocalStorageValue = (prop) => JSON.parse(localStorage.getItem(prop));