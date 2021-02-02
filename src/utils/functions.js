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

export function generateRandomColor(sat1 = 50, sat2 = 55, light1 = 70, light2 = 75, hue1 = 0, hue2 = 360) {
	const hue = getRandomNumber(hue1, hue2);
	const sat = getRandomNumber(sat1, sat2);
	const light = getRandomNumber(light1, light2);
	return `hsl(${hue}, ${sat}%, ${light}%)`;
};