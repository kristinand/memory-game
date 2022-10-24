export function listToArray<T>(list: T[], column: number): T[][] {
  const row = list.length / column;

  if (Number.isInteger(column)) {
    const array = new Array(row).fill([]);
    return array.map((_, i) => list.slice(i * column, i * column + column));
  }

  return [list];
}
