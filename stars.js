var starsArray = [];
//adding stars for score
var starpic = new Image();
starpic.src = './images/food1.png';

function Star(id, x, y, width, height, speed) {
	Obstacle.call(this, id, x, y, width, height, speed);
	this.pic = starpic;
}

function addStar() {
	starsArray.push(
		new Star(
			id,
			canvas.width + 50,
			Math.floor(Math.random() * Math.floor(cvheight - 10) + 10),
			40,
			40,
			0.5
		)
	);
	id++;
}
