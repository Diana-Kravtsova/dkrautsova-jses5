let countBs = (string) => {
	return countChar(string, 'B');
}

let countChar = (string, symbol) => {
	let count = 0;
	for (const element of string) {
		if (element === symbol){
			count++;
		}
	}
	return count;
}
