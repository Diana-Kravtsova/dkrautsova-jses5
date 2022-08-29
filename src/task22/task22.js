function buildTable(data) {
	let table = document.createElement("table");
	let tr = document.createElement("tr");

	// Array of keys
	let fields = Object.keys(data[0]);

	// Fill headers of the table
	for (const element of fields) {
		let th = document.createElement("th");
		th.appendChild(document.createTextNode(element));
		tr.appendChild(th);
	}
	table.appendChild(tr);

	// Fill the table
	data.forEach(function (object) {
		let tr = document.createElement("tr");
		fields.forEach(function (field){
			let td = document.createElement("td");
			td.textContent = object[field];

			// Set text align
			td.setAttribute('style',
				typeof object[field] === 'number' ?
					'text-align: right' :
					'text-align: left'
			);
			tr.appendChild(td);
		})
		table.appendChild(tr)
	})

	return table;
}
