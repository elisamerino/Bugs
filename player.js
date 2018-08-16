var playerIm = new Image();
playerIm.src = './images/player2.png';

var slurp = 'slurp';
var crash = 'crash';
var buzz = 'buzz';

function loadSounds() {
	createjs.Sound.registerSound('assets/slurp.wav', slurp);
	createjs.Sound.registerSound('assets/squish.wav', crash);
	createjs.Sound.registerSound('assets/buzz.mp3', buzz);
}

function Player(x, y, width, height, angle, speed) {
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

Player.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * 0.5 * Math.PI / 180);
	//ctx.fillStyle = '#ea1745';

	ctx.drawImage(playerIm, this.width / -2, this.height / -2, this.width, this.height);

	ctx.restore();
};

Player.prototype.move = function() {
	var rotationSpeed = 3;
	if (Math.abs(this.angle) < rotationSpeed) this.angle = 0;
	if (this.angle > 0) {
		this.angle -= rotationSpeed;
	} else if (this.angle < 0) {
		this.angle += rotationSpeed;
	}
};

Player.prototype.checkCrash = function() {
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

	for (i = 0; i < leavesArray.length; i++) {
		if (leavesArray[i].x < playerRight && leavesArray[i].x > playerLeft) {
			var leafCheck;
			for (var j = 0; j < leavesArray[i].height; j++) {
				if (leavesArray[i].y + j > top && leavesArray[i].y + j < bottom) {
					leafCheck = true;
				}
			}
			if (leafCheck === true && this.width > 30) {
				score += 2;
				leavesArray.splice(i, 1);

				createjs.Sound.play(slurp);
				this.width = (this.width * 0.8).toFixed(2);
				this.height = (this.height * 0.8).toFixed(2);
				leafCheck = false;
			}
		}
	}
};

Array.prototype.clean = function() {
	for (var i = 0; i < this.length; i++) {
		if (this[i].x < this[i].width * -1) {
			this.splice(i, 1);
			console.log('i cleaned');
		}
	}
};
