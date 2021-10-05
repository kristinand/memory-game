export function formatTime(timer: number): string {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const getMinutes = `${Math.floor(timer / 60)}`;
  return getMinutes !== '0' ? `${getMinutes}min ${getSeconds}s` : `${getSeconds}s`;
}
