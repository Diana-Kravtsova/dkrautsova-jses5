function fixedText() {
	let text = "'I'm the cook,' he said, 'it's my job.'";

	// "I'm the cook," he said, "it's my job."
	return text.replace(/(^|\W)'|\s'(\W|$)/g, '$1"$2');
}
