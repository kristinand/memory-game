export function listToArray<T>(list: T[], column: number): T[][] {
  let col = column;
  let row = list.length / col;
  const storedRow = row;

  if (col > row) {
    row = col;
    col = storedRow;
  }

  if (Number.isInteger(row)) {
    const array = new Array(row).fill([]);
    return array.map((_, i) => list.slice(i * col, i * col + col));
  }

  return [list];
}
