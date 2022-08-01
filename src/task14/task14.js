function repeat(string, times) {
	let result = '';
	for (let i = 0; i < times; i++) {
		result += string;
	}
	return result
}

function textCell(text) {
	this.text = text.split('\n');
}

textCell.prototype.minWidth = function () {
	return this.text.reduce((width, line) => {
		return Math.max(width, line.length);
	}, 0);
}

textCell.prototype.minHeight = function () {
	return this.text.length;
}

textCell.prototype.draw = function (width, height) {
	let result = [];
	for (let i = 0; i < height; i++) {
		let line = this.text[i] || '';
		result.push(line + repeat(' ', width - line.length));
	}
	return result;
}

// Constructor
function stretchCell(inner, width, height) {
	// Setting all variables
	this.inner = inner;
	this.width = width;
	this.height = height;
}

// Methods
stretchCell.prototype.minWidth = function () {
	// Check for a larger width
	return Math.max(this.width, this.inner.minWidth());
};

stretchCell.prototype.minHeight = function () {
	// Check for a larger height
	return Math.max(this.height, this.inner.minHeight());
};

stretchCell.prototype.draw = function (width, height) {
	// Drawing
	return this.inner.draw(width, height);
};
