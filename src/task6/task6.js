let reverseArray = (array) => array.map(array.pop, [...array]);

let reverseArrayInPlace = (array) => {
	for (let i = 0; i < Math.floor(array.length / 2); i++){
		let temp = array[i];
		array[i] = array[array.length - 1 - i];
		array[array.length - 1 - i] = temp;
	}
	return array;
}