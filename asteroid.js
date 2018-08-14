var obstaclesArray = [];

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
		2
	);
	obstaclesArray.push(obstacle);
}
Astro.prototype.checkCrash = function() {
	for (i = 0; i < obstaclesArray.length; i++) {
		var playerBegin = this.x - this.width;
		var playerEnd = this.x + this.width;

		//check the crashes //&& playerBegin < obstaclesArray[i].x
		if (obstaclesArray[i].x < playerEnd && obstaclesArray[i].x > playerBegin) {
			//console.log('danger area');
			var top = this.y - this.height / 2;
			var bottom = this.y + this.height / 2;
			var obTop = obstaclesArray[i].y - obstaclesArray[i].height / 2;
			var obBott = obstaclesArray[i].y + obstaclesArray[i].height / 2;
			console.log(top + ', ' + bottom + ' obstacle: ' + obTop + ' ' + obBott);
			//console.log('top ', top, 'bottom ', bottom);
			if (obstaclesArray[i].y > top && obstaclesArray[i].y < bottom) {
				console.log('CRASHED into obstacle n ' + i);
				lives--;
			}
		}
	}
};
