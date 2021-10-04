export function shuffleList(list: any[]): any[] {
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
