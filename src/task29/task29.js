let pie = () => {
	let total = results.reduce(function(sum, choice) {
		return sum + choice.count;
	}, 0);

	let currentAngle = -0.5 * Math.PI;
	let centerX = 300, centerY = 150;

	results.forEach(function(result) {
		let sliceAngle = (result.count / total) * 2 * Math.PI;
		cx.beginPath();
		cx.arc(centerX, centerY, 100,
			currentAngle, currentAngle + sliceAngle);

		let middleAngle = currentAngle + 0.5 * sliceAngle;
		let textX = Math.cos(middleAngle) * 120 + centerX;
		let textY = Math.sin(middleAngle) * 120 + centerY;

		cx.textBaseline = "middle";
		cx.textAlign = Math.cos(middleAngle) > 0 ? "left" : "right";
		cx.font = "14 px sans-serif";
		cx.fillStyle = result.color;
		cx.fillText(result.name, textX, textY);

		currentAngle += sliceAngle;
		cx.lineTo(centerX, centerY);
		cx.fillStyle = result.color;
		cx.fill();
	});
}
