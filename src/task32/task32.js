function all(promises) {
	return new Promise(function (success, fail) {
		let results = [];
		let count = 0;

		if (promises.length === 0) {
			success(results);
		} else {
			promises.forEach(function (promise, index) {
				promise.then(function (result) {
					count++;
					results[index] = result;
					if (promises.length === count) {
						success(results);
					}
				}, function (error) {
					fail(error);
				})
			})
		}
	})
}

// Test code.
all([]).then(function (array) {
	console.log("This should be []:", array);
});

function soon(val) {
	return new Promise(function (success) {
		setTimeout(function () {
				success(val);
			},
			Math.random() * 500);
	});
}

all([soon(1), soon(2), soon(3)]).then(function (array) {
	console.log("This should be [1, 2, 3]:", array);
});

function fail() {
	return new Promise(function (success, fail) {
		fail(new Error("boom"));
	});
}

all([soon(1), fail(), soon(3)]).then(function () {
	console.log("We should not get here");
}, function (error) {
	if (error.message !== "boom")
		console.log("Unexpected failure:", error);
});
