// [] 1xK -> [[],[],[]] PxM
export function listToArray(list: unknown[], m: number): unknown[] {
  let k = list.length / m;
  let p = m;

  if (k < m) {
    k = m;
    p = list.length / m;
  } 

  if (Number.isInteger(k)) {
    const array = new Array(p).fill([]);
    return array.map((_, i) => list.slice(Number(i) * k, Number(i) * k + k));
  }
  return list;
}
