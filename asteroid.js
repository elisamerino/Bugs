var obstaclesArray = [];
var starsArray = [];

function Astro(x, y, width, height, angle, speed) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.angle = angle;
	this.centerX = this.x + this.width / 3;
	this.centerY = this.y + this.height / 2;
	this.speed = speed;
}

Astro.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * 0.5 * Math.PI / 180);
	//ctx.fillStyle = '#ea1745';
	ctx.fillStyle = 'white';
	ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

	ctx.restore();
};

function Obstacle(x, y, width, height, speed) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
}

Obstacle.prototype.draw = function() {
	ctx.save();
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.restore();
};
//TRYING TO MOVE THE OBSTACLES IN THE ARRAY
function drawObstacles() {
	for (i = 0; i < obstaclesArray.length; i++) {
		ctx.save();
		ctx.fillStyle = '#black';
		ctx.fillRect(
			obstaclesArray[i].x,
			obstaclesArray[i].y,
			obstaclesArray[i].width,
			obstaclesArray[i].height
		);

		ctx.restore();
	}
}

function moveObstacles() {
	for (i = 0; i < obstaclesArray.length; i++) {
		obstaclesArray[i].speed *= 1.1;
		obstaclesArray[i].x -= obstaclesArray[i].speed.toFixed(2);
	}
}
/*Obstacle.prototype.move = function() {
	this.speed *= 1.3;
	this.x -= this.speed;
};*/

function addObstacle(x, y, width, height, speed) {
	var obstacle = new Obstacle(
		canvas.width + 50,
		Math.floor(Math.random() * Math.floor(cvheight)),
		50,
		40,
		1
	);
	obstaclesArray.push(obstacle);
}
Astro.prototype.checkCrash = function() {
	var playerLeft = this.x - this.width / 2;
	var playerRight = this.x + this.width / 2;
	var top = this.y - this.height / 2;
	var bottom = this.y + this.height / 2;

	//CRASHING AGAINST OBSTACLES

	for (i = 0; i < obstaclesArray.length; i++) {
		if (obstaclesArray[i].x < playerRight && obstaclesArray[i].x > playerLeft) {
			//var obstacleCenter = obstaclesArray[i].y + obstaclesArray[i].height / 2;
			var checker;
			for (var j = 0; j < obstaclesArray[i].height; j++) {
				if (obstaclesArray[i].y + j > top && obstaclesArray[i].y + j < bottom) {
					checker = true;
				}
			}
			if (checker === true) {
				lives--;
				obstaclesArray.splice(i, 1);
			}
		}
	}

	//CATCHING POINTS
	for (i = 0; i < starsArray.length; i++) {
		if (starsArray[i].x < playerRight && starsArray[i].x > playerLeft) {
			var checker;
			for (var j = 0; j < starsArray[i].height; j++) {
				if (starsArray[i].y + j > top && starsArray[i].y + j < bottom) {
					checker = true;
				}
			}
			if (checker === true) {
				score++;
				starsArray.splice(i, 1);
			}
			if (score % 2 === 0) {
				this.width = (this.width * 1.2).toFixed(2);
				this.height = (this.height * 1.2).toFixed(2);
			}
		}
	}
};

//adding stars for score
var starpic = new Image();
starpic.src = './images/shining.png';

function drawStars() {
	for (i = 0; i < starsArray.length; i++) {
		ctx.save();
		ctx.fillStyle = '#ffbc59';
		ctx.drawImage(
			starpic,
			starsArray[i].x,
			starsArray[i].y,
			starsArray[i].width,
			starsArray[i].height
		);

		ctx.restore();
	}
}

function moveStars() {
	for (i = 0; i < starsArray.length; i++) {
		starsArray[i].speed *= 1.1;
		starsArray[i].x -= starsArray[i].speed.toFixed(2);
	}
}
function addStar(x, y, width, height, speed) {
	var star = new Obstacle(
		canvas.width + 50,
		Math.floor(Math.random() * Math.floor(cvheight)),
		30,
		30,
		1
	);
	starsArray.push(star);
}
function cleanArray() {
	for (var i = 0; i < obstaclesArray.length; i++) {
		if (obstaclesArray[i].x < obstaclesArray[i].width * -1) {
			obstaclesArray.splice(i, 1);
		}
	}
	for (var i = 0; i < starsArray.length; i++) {
		if (starsArray[i].x < starsArray[i].width * -1) {
			starsArray.splice(i, 1);
		}
	}
}
