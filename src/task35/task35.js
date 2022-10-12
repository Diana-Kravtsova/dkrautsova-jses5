function createField(grid, size) {
	// Add some pistachio color
	document.body.style.background = '#7aa990';

	// This holds the checkboxes that display the grid in the document.
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let box = document.createElement("input");
			box.type = 'checkbox';

			// Randomize start field
			box.checked = !!Math.round(Math.random());

			grid.appendChild(box);
		}
		grid.appendChild(document.createElement("br"));
	}
	return grid;
}

function getField() {
	let cell = document.getElementsByTagName('input');
	let field = []

	// Create of two-dimension array of field
	for (let i = 0; i < Math.sqrt(cell.length); i++) {
		field.push([]);

		// Take a side of square
		for (let j = 0; j < Math.sqrt(cell.length); j++) {
			field[i][j] = cell[Math.sqrt(cell.length) * i + j].checked ? 1 : 0;
		}
	}
	return field;
}

function generateField(field) {
	let newField = [];

	// Create new array based on old array field
	for (let i = 0; i < field.length; i++) {
		newField.push([]);
		for (let j = 0; j < field[i].length; j++) {

			// Check of three rules
			switch (calculateCell(field, i, j)) {
				// Lives on
				case 2:
					newField[i][j] = field[i][j];
					break;
				// Becomes alive
				case 3:
					newField[i][j] = 1;
					break;
				// Die
				default:
					newField[i][j] = 0;
					break;
			}
		}
	}
	return newField;
}

function setField(field) {
	let cell = document.getElementsByTagName('input');
	for (let i = 0; i < field.length; i++) {
		for (let j = 0; j < field[i].length; j++) {
			cell[field.length * i + j].checked = !!field[i][j];
		}
	}
}

function calculateCell(field, x, y) {
	let cell = 0;
	// Calculate number alive neighbour cells
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			// Choosing of right cells for calculating
			if ((i !== 0 || j !== 0) && onField(field.length, x + i, y + j)) {
				cell = field[x + i][y + j] === 1 ? cell + 1 : cell;
			}
		}
	}
	return cell;
}

function onField(size, x, y) {
	// Check edges of field
	return x >= 0 && y >= 0 && x < size && y < size;
}

function turn() {
	setField(generateField(getField()))
}

function next(button) {
	button.addEventListener('click', turn);
}

function AutoRun(button) {
	let running = null;
	button.addEventListener("click", () => {
		if (running) {
			clearInterval(running);
			running = null;
		} else {
			running = setInterval(turn, 400);
		}
	});
}
