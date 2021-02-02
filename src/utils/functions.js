export function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
} 
export function shuffleList(list) {
	return list.sort(() => Math.random() - 0.5);
}

export function listToArray(list, m) {
	let k = list.length / m;
	if (k < m) {
		k = m;
		m = list.length / m;
	}
	if (!Number.isInteger(k))	return list;
	let array = new Array(m).fill([]);
	for (const i in array) {
		array[i] = list.slice(i * k, i * k + k);
	}
	return array;
}

export function generateRandomColor(min = 0, max = 256) {
	if (min < 0) min = 0;
	if (max > 255) max = 256;
	const first = getRandomNumber(min, max);
	const second = getRandomNumber(min, max);
	const third = getRandomNumber(min, max);
	return `rgb(${first}, ${second}, ${third})`;
};