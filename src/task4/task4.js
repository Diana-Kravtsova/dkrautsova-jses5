let countBs = (string) => {
	let count = 0;
	for (let i = 0; i < string.length - 1; i++) {
		if(string[i] === 'B'){
			count++;
		}
	}
	return count;
}
/*
let countBs = (string) => {
	return countChar(string, 'B');
}*/
let countChar = (string, symbol) => {
	let count = 0;
	for (const element of string) {
		if (element === symbol){
			count++;
		}
	}
	return count;
}
/*
let countChar = (string, symbol) => {
	let count = 0;
	for (let i = 0; i < string.length; i++) {
		if(string[i] === symbol){
			count++;
		}
	}
	return count;
}*/