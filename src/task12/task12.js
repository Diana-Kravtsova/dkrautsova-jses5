let every = (array, func) => {
	for (const element of array) {
		if (!func(element)){
			return false;
		}
	}
	return true;
}

let some = (array, func) => {
	for (const element of array) {
		if (func(element)){
			return true;
		}
	}
	return false;
}
