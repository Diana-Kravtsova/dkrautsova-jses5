let forLoop = () => {
	let result = '';
	for (let string = '#'; string.length < 8; string += '#') {
		result += string + '\n';
	}
	return result;
};
