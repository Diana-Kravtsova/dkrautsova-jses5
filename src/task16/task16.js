function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
	if (Math.random() < 0.5)
		return a * b;
	else
		throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
	try {
		// Try multiply
		return primitiveMultiply(a, b);
	} catch (error) {
		// Check whether the error belongs
		if (error instanceof MultiplicatorUnitFailure) {
			// Recursion
			return reliableMultiply(a, b);
		} else {
			throw error;
		}
	}
}
