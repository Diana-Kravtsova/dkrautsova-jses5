let url = 'https://eloquentjavascript.net/author';
let types = [
	'text/plain',
	'text/html',
	'application/json',
	'application/rainbow+unicorns'
];

async function getType() {
	for (let type of types) {
		let response = await fetch(url, {headers: {'accept': type}});
		console.log(`Type: \n${type}: \n\n${await response.text()}`);
	}
}

getType();
