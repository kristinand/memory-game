export function shuffleList<T>(list: T[]): T[] {
  const newList = list;
  let currentIndex = list.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temporaryValue = list[currentIndex];
    newList[currentIndex] = list[randomIndex];
    newList[randomIndex] = temporaryValue;
  }

  return newList;
}
