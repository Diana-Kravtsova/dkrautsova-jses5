let arrayToList = (array) => {
	return array.length > 0 ? {value: array[0], rest: arrayToList(array.slice(1))} : null;
}

let listToArray = (list) => {
	return list.rest === null ? [list.value] : [list.value, ...listToArray(list.rest)]
}

let prepend = (element, list) => {
	return { value: element, rest: list };
}

let nth = (list, number) => {
	return number === 0 ? list.value : nth(list.rest, number - 1);
}
