function asTabs(node) {
	let tabs = [];
	let listTabs = document.createElement("div");

	// Add tabs
	for (let i = 0; i < node.childNodes.length; i++) {
		let child = node.childNodes[i];
		if (child.nodeType === document.ELEMENT_NODE){
			tabs.push(child);
		}
	}

	// Add button with text
	tabs.forEach((tab, i) => {
		let button = document.createElement("button");
		button.textContent = tab.getAttribute("data-tabname");
		button.addEventListener("click", () => { selectTab(i); })
		listTabs.appendChild(button);
	});
	node.insertBefore(listTabs, node.firstChild);

	// Style selected tab
	function selectTab (selected) {
		tabs.forEach((tab, i) => {
			tab.style.display = i === selected ? "" : "none";
		});
		for (let i = 0; i < listTabs.childNodes.length; i++) {
			listTabs.childNodes[i].className = i === selected ? "enabled" : "disabled";
		}
	}
	// Default tab
	selectTab(0);
}
