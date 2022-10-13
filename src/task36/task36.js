import http from "http";

let readStreamAsString = (stream, callback) => {
	let data = '';
	stream.on('data', (chunk) => {
		data += chunk.toString();
	});
	stream.on('end', () => {
		callback(null, data);
	});
	stream.on('error', (err) => {
		callback(err);
	});
}

let urlRequest = () => {
	let types = [
		'text/plain',
		'text/html',
		'application/json'
	];

	for (const element of types) {
		let request = http.request({
			hostname: 'eloquentjavascript.net',
			path: '/author',
			headers: {
				Accept: element
			}
		}, (response) => {
			readStreamAsString(response, (err, data) => {
				err === null ? console.log(`\nType: ${element}\n\n`, data) : console.log(err);
			});
		});
		request.end();
	}
}

urlRequest();
