let range = (start, end) => {
	let array = [];
	for (let i = start; i <= end; i++) {
		array.push(i);
	}
	return array;
}

let range = (start, end, step) => {
	let array = [];
	if (step === undefined) {
		// If no step is given
		step = 1;
	}
	while (step > 0 ? start <= end : start >= end) {
		array.push(start);
		start += step;
	}
	return array;
}

let sum = (array) => {
	let amount = 0;
	for (const element of array) {
		amount += element;
	}
	return amount;
}
