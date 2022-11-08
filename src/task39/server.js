import url from "url";
import http from "http";
import fs from "fs";
import mime from "mime";

function startServer() {
	let methods = {};

	http.createServer(function (request, response) {
		function respond(code, body, type) {
			if (!type)
				type = "text/plain";

			response.writeHead(code, {"Content-Type": type});

			if (body && body.pipe)
				body.pipe(response);
			else
				response.end(body);
		}

		if (request.method in methods)
			methods[request.method](urlToPath(request.url),
				respond, request);
		else
			respond(405, "Method " + request.method + " not allowed.");
	}).listen(8000);

	methods.GET = get;
	methods.PUT = put;
	methods.DELETE = remove;
	methods.MKCOL = mkcol;
}


function get(path, respond, request) {
	// Get header type
	let type = request.headers.type;

	// Exception for index.html, main.js and style.css
	if (!type) {
		if (path === './task39.js' || path === './style.css' || path === './')
			type = 'file';
		if (path === './')
			path += 'task39.html';
	}

	// Check type
	switch (type) {
		case 'file':
			// Check and read the file
			fs.stat(path, function (error) {
				if (error && error.code === 'ENOENT') {
					respond(404, 'Not found');
				} else {
					checkError(error, respond, function () {
						respond(200, fs.createReadStream(path),
							mime.getType(path));
					});
				}
			});
			break;
		case 'path':
			// Check and read the path
			fs.readdir(path, {withFileTypes: true}, function (error, files) {
				checkError(error, respond, function () {
					let list = [];
					files.forEach(function (elem) {
						if (elem.isDirectory())
							list.push(elem.name + '/');
						else
							list.push(elem.name);
					});

					respond(200, JSON.stringify(list));
				});
			});
			break;
		default:
			respond(403, 'Forbidden');
			break;
	}
}

function put(path, respond, request) {
	let stream = fs.createWriteStream(path);

	stream.on('error', function (error) {
		respond(500, error.toString());
	});

	stream.on('finish', function () {
		respond(204);
	});

	request.pipe(stream);
}

function mkcol(path, respond) {
	// Check a given path
	fs.stat(path, function (error, stats) {
		if (error && error.code === "ENOENT")
			fs.mkdir(path, function (err) {
				checkError(err, respond, function () {
					respond(200, 'The directory ' +
						path + ' is successfully created');
				});
			});
		else if (stats.isDirectory())
			respond(204);
		else
			respond(400);
	});
}

function remove(path, respond) {
	fs.stat(path, function (error, stats) {
		if (error && error.code === 'ENOENT')
			respond(204);

		else if (stats.isDirectory())
			// Check and remove path recursively
			fs.rm(path, { recursive: true, force: true},function (err) {
				checkError(err, respond, function () {
					respond(200, 'The directory ' +
						path + ' is successfully removed');
				});
			});

		else
			// Check and remove file
			fs.unlink(path, function (err) {
				checkError(err, respond, function () {
					respond(200, 'The file ' + path +
						' is successfully removed');
				});
			});
	});
}

function urlToPath(urlStr) {
	let path = url.parse(urlStr).pathname;
	path = path.replace(/[\/\\]\.\./g, '');
	return "." + decodeURIComponent(path);
}

function checkError(error, respond, callback) {
	if (error) {
		respond(500, error.toString());
	} else {
		callback();
	}
}

startServer();
