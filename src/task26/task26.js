// Create random color
function randomColor() {
	let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'A', 'B', 'C', 'D', 'E', 'F'];
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += hex[Math.floor(Math.random() * 16)];
	}
	return color;
}

function trail(count){
	let elements = [];
	addEventListener('mousemove', event => {

		// Create element
		elements.push(document.createElement('div'));
		let lastEl = elements.length - 1;
		elements[lastEl].className = 'trail';
		elements[lastEl].style.left = event.pageX + 'px';
		elements[lastEl].style.top = event.pageY + 'px';
		elements[lastEl].style.background = randomColor();
		document.body.appendChild(elements[lastEl]);

		// Delete unnecessary elements
		if (elements.length > count) {
			document.body.removeChild(elements[0]);
			elements.shift();
		}
	});
}

// Call function from count of dots
trail(20);
