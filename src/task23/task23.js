function byTagName(node, tagName) {
	let elements = [];
	for (const element of node.children) {
		let child = element;
		// Check tag names of children
		if (child.nodeType === document.ELEMENT_NODE &&
			child.nodeName === tagName.toUpperCase()) {
			elements.push(child);
		}
		// Check tag names of children's children
		elements = elements.concat(byTagName(child, tagName));
	}
	return elements;
}
