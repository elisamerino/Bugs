var obstaclesArray = [];
var starsArray = [];

var obstacleIm = new Image();
obstacleIm.src = './images/obstacle.png';

function Obstacle(id, x, y, width, height, speed) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
	this.pic = obstacleIm;
}

//TRYING TO MOVE THE OBSTACLES IN THE ARRAY

Array.prototype.draw = function() {
	for (i = 0; i < this.length; i++) {
		ctx.save();
		ctx.drawImage(this[i].pic, this[i].x, this[i].y, this[i].width, this[i].height);
		ctx.restore();
	}
};

Array.prototype.move = function() {
	for (i = 0; i < this.length; i++) {
		this[i].speed += 0.02;
		this[i].x -= this[i].speed;
	}
};

/*Obstacle.prototype.move = function() {
	this.speed *= 1.3;
	this.x -= this.speed;
};*/
//var soundID = 'powerup';
//createjs.Sound.registerSound('.assets/powerup.wav', powerup);

function addObstacle() {
	obstaclesArray.push(
		new Obstacle(
			id,
			canvas.width + 50,
			Math.floor(Math.random() * Math.floor(cvheight - 20) + 20),
			64,
			50,
			2
		)
	);
	id++;
}
