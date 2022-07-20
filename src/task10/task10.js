const ANCESTRY_FILE = require('../../ext/ancestry')

let ancestry = JSON.parse(ANCESTRY_FILE);
function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

let byName = {};
ancestry.forEach(function(person) {
	byName[person.name] = person;
});

//array of age differences
let differences = [];
for(let children in byName){
	let child = byName[children];
	let mother = byName[child.mother];

	if (child.mother !== null && mother !== undefined){
		differences.push(child.born - mother.born);
	}
}
