import url from 'url';

function urlToPath(urlStr) {
	let path = url.parse(urlStr).pathname;
	path = path.replace(/[\/\\]\.\./g, '');
	return "." + decodeURIComponent(path);
}
