function Iterator (startValue, finishValue) {
	this.current = startValue;
	this.finish = finishValue;
}

// Next element
Iterator.prototype.next = function (){
	let nextVal = this.current;
	++this.current;
	return nextVal;
}

// Last element
Iterator.prototype.end = function (){
	return this.current > this.finish;
}

// Return first five elements
function logFive (sequence) {
	let log = '';
	for (let i = 0; i < 5 && !sequence.end(); i++) {
		log += sequence.next() + '\n';
	}
	return log;
}

function ArraySeq (array) {
	this.seq = new Iterator(0, array.length - 1);
	this.arr = array;
}

// Next element of array
ArraySeq.prototype.next = function () {
	return this.arr[this.seq.next()];
}

// Last element of array
ArraySeq.prototype.end = function () {
	return this.seq.end();
}

function RangeSeq (from, to) {
	this.seq = new Iterator(from, to);
}

// Next element of range
RangeSeq.prototype.next = function () {
	return this.seq.next();
}

// Last element of range
RangeSeq.prototype.end = function () {
	return this.seq.end();
}
