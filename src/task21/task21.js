let month = function() {
	const monthArray = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	return {
		name: function(number) { return monthArray[number]; },
		number: function(name) { return monthArray.indexOf(name); }
	};
}();
