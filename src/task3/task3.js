/*let isEven = (n) => {
	if (n === 0) return true;
	else if (n === 1) return false;
	else if (n < 0) return isEven(-n);
	else return isEven(n - 2);
}*/
/*
let isEven = (n) => {
	if (n === 0) return true;
	else if (n === 1) return false;
	else return n < 0 ? isEven(-n) : isEven(n - 2);
}*/
let isEven = (n) => {
	n = Math.abs(n);
	return n === 0 ? true : n === 1 ? false : isEven(n - 2);
}