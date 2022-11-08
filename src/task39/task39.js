function start() {
	// Create form from objects
	let form = {
		path: document.getElementById('path'),
		file: document.getElementById('file'),
		select: document.getElementById('select'),
		back: document.getElementById('back'),
		createFile: document.getElementById('createFile'),
		inputFile: document.getElementById('inputFile'),
		createDir: document.getElementById('createDir'),
		inputDir: document.getElementById('inputDir'),
		deleteFile: document.getElementById('deleteFile'),
		deleteDir: document.getElementById('deleteDir'),
		save: document.getElementById('save'),
		text: document.getElementById('text'),
		pathname: '/',
		filename: ''
	};

	displayPath(form, getPath('/'));

	// Add all form event listeners
	addEvents(form);
}

function addEvents(form) {
	form.select.addEventListener('change', function() {
		let options = form.select.childNodes;
		let selected = '';

		// Looking for selected option
		for (const element of options) {
			if (element.selected) {
				selected = element.text;
				break;
			}
		}

		// Check is it a directory or a file
		if (/\//.test(selected)) {
			form.pathname += selected;
			displayPath(form, getPath(form.pathname));
			form.back.disabled = false;
			form.deleteDir.disabled = false;
			closeFile(form);
		} else {
			form.filename = selected;
			displayFile(form, loadFile(form.pathname + form.filename));
			form.save.disabled = false;
			form.deleteFile.disabled = false;
		}
	});

	// Click a 'back' button
	form.back.addEventListener('click', function(event) {
		form.pathname = form.pathname.slice(0, form.pathname.slice(0,
			form.pathname.length - 1).lastIndexOf('/') + 1);
		displayPath(form, getPath(form.pathname));

		closeFile(form);

		// Check root directory
		if (form.pathname === '/') {
			form.back.disabled = true;
			form.deleteDir.disabled = true;
		}
	});

	// Click a 'Create file' button
	form.createFile.addEventListener('click', function() {
		saveFile(form.pathname + form.inputFile.value, '');
		displayPath(form, getPath(form.pathname));
		form.inputFile.value = '';
		form.inputFile.dispatchEvent(new Event('input'));
	});

	form.inputFile.addEventListener('input', function() {
		form.createFile.disabled = form.inputFile.value === '';
	});

	// Click a 'Create directory' button
	form.createDir.addEventListener('click', function() {
		createDirectory(form.pathname + form.inputDir.value);
		displayPath(form, getPath(form.pathname));
		form.inputDir.value = '';
		form.inputDir.dispatchEvent(new Event('input'));
	});

	form.inputDir.addEventListener('input', function() {
		form.createDir.disabled = form.inputDir.value === '';
	});

	// Click a 'Delete file' button
	form.deleteFile.addEventListener('click', function () {
		let result = confirm("Are you sure you want to delete this file?");
		if (result) {
			remove(form.pathname + form.filename);
			displayPath(form, getPath(form.pathname));
			closeFile(form);
		}
	});

	// Click a 'Delete directory' button
	form.deleteDir.addEventListener('click', function () {
		let result = confirm("Are you sure you want to delete this directory?");
		if (result) {
			remove(form.pathname);
			form.pathname = form.pathname.slice(0, form.pathname.slice(0,
				form.pathname.length - 1).lastIndexOf('/') + 1);
			displayPath(form, getPath(form.pathname));
			if (form.pathname === '/') {
				form.back.disabled = true;
				form.deleteDir.disabled = true;
			}
			closeFile(form);
		}
	});

	// Click a 'Save' button
	form.save.addEventListener('click', function() {
		// Save file
		saveFile(form.pathname + form.filename, form.text.value);
	});
}

function getPath(path) {
	// Request to get the path
	return JSON.parse(urlRequest('GET', path, null, 'path'));
}

function loadFile(filename) {
	// Request to load the file
	return urlRequest('GET', filename, null, 'file');
}

function saveFile(filename, text) {
	// Request to save the file
	return urlRequest('PUT', filename, text);
}

function createDirectory(path) {
	// Request to create the directory
	return urlRequest('MKCOL', path, null);
}

function remove(path) {
	// Request to delete the directory or the file
	return urlRequest('DELETE', path, null);
}

function displayFile(form, text) {
	form.text.value = text;
	form.file.textContent = form.filename;
}

function closeFile(form){
	form.filename = '';
	form.file.textContent = '';
	form.text.value = '';
	form.deleteFile.disabled = true;
	form.save.disabled = true;
}

function displayPath(form, list) {
	let options = form.select.childNodes;

	// Remove all old options
	for (let i = 0; i < options.length;) {
		form.select.removeChild(options[i]);
	}

	// Create new options
	list.forEach(function(elem) {
		let option = document.createElement('option');
		option.appendChild(document.createTextNode(elem));
		form.select.appendChild(option);
	});

	// Condition for no popup list
	if (options.length >= 2) {
		form.select.size = options.length;
	} else {
		form.select.size = 2;
	}

	form.path.textContent = form.pathname;
}

function urlRequest(method, url, body, type) {
	let req = new XMLHttpRequest();

	// Configuring of request
	req.open(method, url, false);

	// Set header type
	req.setRequestHeader('type', type);

	// Set body request
	req.send(body);

	// Return request result
	if (req.status < 400) {
		return req.responseText;
	} else {
		return 'Request failed: ' + req.status + '\n' + req.responseText;
	}
}
