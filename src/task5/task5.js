function range(start, end) {
	let array = [];
	for (let i = start; i <= end; i++) {
		array.push(i);
	}
	return array;
}

//Modified version of range
function range(start, end, step = 1) {
	let array = [];
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
