function autocompletion(input, suggestions) {
	// Builds up an array with global variable names, like
	// 'alert', 'document', and 'scrollTo'
	let terms = [];
	for (let name in window)
		terms.push(name);

	input.addEventListener('input', function () {
		// Clean suggestions area
		suggestions.innerHTML = '';

		if (input.value) {
			let matches = [];

			// Push all current matches
			terms.forEach((term) => {
				if (term.startsWith(input.value)) {
					matches.push(term);
				}
			});

			// Create node in suggestions node for each match
			matches.forEach((match) => {
				let field = document.createElement('div');

				field.textContent = match;

				// Change style
				field.style.border = '1px solid black';
				field.style.backgroundColor = 'cornflowerBlue';
				field.style.width = '250px';

				// Replace input area by click
				field.addEventListener('click', () => {
					input.value = field.textContent;
					suggestions.innerHTML = '';
				});

				suggestions.appendChild(field);
			});
		}
	});
}
