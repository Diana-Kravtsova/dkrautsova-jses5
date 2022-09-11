// 1. A trapezoid (a rectangle that is wider on one side)
let trapezoid = (x, y) => {
	cx.beginPath();
	cx.moveTo(x, y);
	cx.lineTo(x + 50, y);
	cx.lineTo(x + 80, y + 50);
	cx.lineTo(x - 30, y + 50);
	cx.closePath();
	cx.stroke();
}

// 2.A red diamond (a rectangle rotated 45 degrees or ¼π radians)
let diamond = (x, y) => {
	cx.fillStyle = "red";
	cx.translate(x + 30, y + 30);
	cx.rotate(Math.PI / 4);
	cx.fillRect(-30, -30, 60, 60);
	cx.resetTransform();
}

// 3. A zigzagging line
let zigzag = (x, y) => {
	cx.beginPath();
	cx.moveTo(x, y);

	for (let i = 0; i < 6; i++) {
		cx.lineTo(x + 80, y + i * 10 + 6);
		cx.lineTo(x, y + i * 10 + 12);
	}
	cx.stroke();
}

// 4. A spiral made up of 100 straight line segments
let spiral = (x, y) => {
	let rad = 60;
	let xCenter = x + rad;
	let yCenter = y + rad;

	cx.beginPath();
	cx.moveTo(xCenter, yCenter);

	for (let i = 0; i < 300; i++) {
		let angle = i * Math.PI / 48;
		let distance = rad * i / 300;
		cx.lineTo(xCenter + Math.cos(angle) * distance,
			yCenter + Math.sin(angle) * distance);
	}
	cx.stroke()
}

// 5. A yellow star
let star = (x, y) => {
	let rad = 60;
	let xCenter = x + rad;
	let yCenter = y + rad;

	cx.beginPath();
	cx.moveTo(xCenter + rad, yCenter);

	for (let i = 0; i < 9; i++) {
		let angle = i * Math.PI / 4;

		// Add a quadratic Bézier curve
		cx.quadraticCurveTo(xCenter, yCenter,
			xCenter + Math.cos(angle) * rad,
			yCenter + Math.sin(angle) * rad);
	}
	cx.fillStyle = "yellow";
	cx.fill();
}
