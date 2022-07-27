const ANCESTRY_FILE = require('../../ext/ancestry')
let ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
	function plus(a, b) {
		return a + b;
	}
	return array.reduce(plus) / array.length;
}

let groupBy = (array, func) => {
	let group = {};
	for (const element of array) {
		func(group, element);
	}
	return group;
}

let getStatistic = () => {
	let byName = groupBy(ancestry, (object, person) => {
		object[person.name] = person;
	});

	let ages = [];
	for (const element of ancestry) {
		// fill the array with arrays
		ages.push([]);
	}

	for (let pers in byName) {
		// get ages
		if (byName.hasOwnProperty(pers)) {
			let person = byName[pers];
			ages[Math.ceil(person.died / 100)].push(person.died - person.born);
		}
	}

	let averageAge = ages.map((century) => {
		if (century.length > 0) {
			return average(century);
		}
	})

	let statistic = [];
	averageAge.forEach((age, century) => {
		if (age) {
			statistic.push(century + ': ' + age)
		}
	})

	return statistic;
}
