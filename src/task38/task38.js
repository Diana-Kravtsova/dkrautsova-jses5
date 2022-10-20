import url from "url";
import http from "http";
import fs from "fs";

let methods = Object.create(null);

http.createServer(function(request, response) {
	function respond(code, body, type) {
		if (!type) type = "text/plain";
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

function urlToPath(urlStr) {
	let path = url.parse(urlStr).pathname;
	path = path.replace(/[\/\\]\.\./g, '');
	return "." + decodeURIComponent(path);
}

function respondErrorOrNothing(respond) {
	return function(error) {
		if (error)
			respond(500, error.toString());
		else
			respond(204);
	};
}

// Task
methods.MKCOL = function(path, respond) {
	fs.stat(path, function(error, stats) {
		if (error && error.code === "ENOENT")
			fs.mkdir(path, respondErrorOrNothing(respond));
		else if (error)
			respond(500, error.toString());
		else if (stats.isDirectory())
			respond(204);
		else
			respond(400);
	});
};
