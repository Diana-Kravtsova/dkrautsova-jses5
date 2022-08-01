// Constructor
function vector(x, y) {
	this.x = x;
	this.y = y;
}

// Methods
vector.prototype.plus = function (vector2) {
	return new vector(this.x + vector2.x, this.y + vector2.y);
};

vector.prototype.minus = function (vector2) {
	return new vector(this.x - vector2.x, this.y - vector2.y);
};

// Getter property
Object.defineProperty(vector.prototype, 'length', {
	get: function () {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y,2));
	}
})
