export function listToArray(list: any[], m: number): any[] {
  let k = list.length / m;
  if (k < m) {
    k = m;
    m = list.length / m;
  }
  if (!Number.isInteger(k)) return list;
  const array = new Array(m).fill([]);
  for (const i in array) {
    array[i] = list.slice(Number(i) * k, Number(i) * k + k);
  }
  return array;
}
