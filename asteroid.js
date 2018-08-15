var background = new Image();
background.src = './images/cielo.png';
var bgSpeed = -8;
var playerIm = new Image();
playerIm.src = './images/sternschuppe.png';

var backgroundImage = {
	background: background,
	bgx: 0,
	move: function() {
		this.bgx += bgSpeed;
		this.bgx %= canvas.width;
	},
	draw: function() {
		ctx.drawImage(this.background, this.bgx, 0);

		if (bgSpeed < 0) {
			ctx.drawImage(this.background, this.bgx + this.background.width, 0);
		} else {
			ctx.drawImage(this.background, this.bfx - this.background.width, 0);
		}
	}
};

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
	this.moving = false;
}

Astro.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle * 0.5 * Math.PI / 180);
	//ctx.fillStyle = '#ea1745';

	ctx.drawImage(playerIm, this.width / -2, this.height / -2, this.width, this.height);
	//ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

	ctx.restore();
};

Astro.prototype.rotates = function() {
	if (this.angle > 2) {
		console.log('player rotates');
		this.angle--;
	} else if (this.angle < -2) {
		console.log('player rotates');
		this.angle++;
	} else if (this.angle <= 2 || this.angle >= -2) {
		this.angle = 0;
	}
	player.move = false;
};

var obstacleIm = new Image();
obstacleIm.src = './images/obstacle.png';

function Obstacle(x, y, width, height, speed) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
}

//TRYING TO MOVE THE OBSTACLES IN THE ARRAY
function drawObstacles() {
	for (i = 0; i < obstaclesArray.length; i++) {
		ctx.save();
		//ctx.fillStyle = '#black';
		ctx.drawImage(
			obstacleIm,
			obstaclesArray[i].x,
			obstaclesArray[i].y,
			obstaclesArray[i].width,
			obstaclesArray[i].height
		);
		/*ctx.fillRect(
			obstaclesArray[i].x,
			obstaclesArray[i].x,
			obstaclesArray[i].width,
			obstaclesArray[i].height
		);*/

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
//var soundID = 'powerup';
//createjs.Sound.registerSound('.assets/powerup.wav', powerup);

function addObstacle(x, y, width, height, speed) {
	var obstacle = new Obstacle(
		canvas.width + 50,
		Math.floor(Math.random() * Math.floor(cvheight - 20) + 20),
		40,
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
			var starCheck;
			for (var j = 0; j < starsArray[i].height; j++) {
				if (starsArray[i].y + j > top && starsArray[i].y + j < bottom) {
					starCheck = true;
				}
			}
			if (starCheck === true) {
				score++;
				starsArray.splice(i, 1);
				//SOUND	createjs.Sound.play(powerup);
			}
			if (starCheck === true && score % 2 === 0) {
				this.width = (this.width * 1.2).toFixed(2);
				this.height = (this.height * 1.2).toFixed(2);
				starCheck = false;
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

/*function playSound () {
	createjs.Sound.play(soundID);
  }*/
