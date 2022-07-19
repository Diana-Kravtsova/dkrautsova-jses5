function deepEqual(x, y) {
	if (x === y) return true;

	if (x == null || typeof x != "object" ||
		y == null || typeof y != "object") return false;

	let keysX = Object.keys(x), keysY = Object.keys(y);

	if (keysX.length !== keysY.length) return false;

	for (let key of keysX) {
		if (!keysY.includes(key) || !deepEqual(x[key], y[key])) return false;
	}
	return true;
}