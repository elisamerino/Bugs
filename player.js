var playerIm = new Image();
playerIm.src = './images/player2.png';

var slurp = 'slurp';
var crash = 'crash';

function loadSounds() {
	createjs.Sound.registerSound('assets/slurp.wav', slurp);
	createjs.Sound.registerSound('assets/squish.wav', crash);
}

function Astro(x, y, width, height, angle, speed) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.angle = angle;
	this.centerX = this.x + this.width / 3;
	this.centerY = this.y + this.height / 2;
	this.speed = speed;
	this.moving = false;
}

Astro.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * 0.5 * Math.PI / 180);
	//ctx.fillStyle = '#ea1745';

	ctx.drawImage(playerIm, this.width / -2, this.height / -2, this.width, this.height);

	ctx.restore();
};

Astro.prototype.move = function() {
	var rotationSpeed = 3;
	if (Math.abs(this.angle) < rotationSpeed) this.angle = 0;
	if (this.angle > 0) {
		this.angle -= rotationSpeed;
	} else if (this.angle < 0) {
		this.angle += rotationSpeed;
	}
};

Astro.prototype.checkCrash = function() {
	var playerLeft = this.x - this.width / 2;
	var playerRight = this.x + this.width / 2;
	var top = this.y - this.height / 2;
	var bottom = this.y + this.height / 2;

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
				createjs.Sound.play(crash);
				lifeArray.splice(lifeArray.length - 1, 1);
			}
		}
	}

	//CATCHING POINTS
	for (i = 0; i < starsArray.length; i++) {
		if (starsArray[i].x < playerRight && starsArray[i].x > playerLeft) {
			var starCheck;
			for (var j = 0; j < starsArray[i].height; j++) {
				if (starsArray[i].y + j > top && starsArray[i].y + j < bottom) {
					starCheck = true;
				}
			}
			if (starCheck === true) {
				score++;
				starsArray.splice(i, 1);

				createjs.Sound.play(slurp);
			}
			if (starCheck === true && score % 2 === 0) {
				this.width = (this.width * 1.2).toFixed(2);
				this.height = (this.height * 1.2).toFixed(2);
				starCheck = false;
			}
		}
	}
};

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
