var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var cvheight = canvas.height;
var score = 0;
var lives = 5;
var interval;
var counter = 0;
var player;
var rotationInterval;
var myUpdate;

window.onload = function() {
	startButton.onclick = function() {
		startButton.classList.toggle('pressed');
		startGame();
	};
	stopButton.onclick = function() {
		stopGame();
	};
};

function startGame() {
	player = new Astro(200, 360, 45, 19, 1, 5);
	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 87:
				movePlayer('up');
				break;
			case 83:
				movePlayer('down');
				break;
		}
		if (player.y > cvheight) {
			player.y = 0;
		} else if (player.y < 0) {
			player.y = cvheight;
		}
		player.speed = 5;
	};

	document.onkeyup = function(e) {
		player.rotates();
		//player.move = false;
		console.log(player.move);
	};
	interval = setInterval(update, 1000 / 10);
}

function writescore() {
	//ctx.fillStyle = 'white';
	ctx.font = '30px Josefin Sans';
	ctx.fillText('lives: ' + lives, 50, 50);
	ctx.fillText('score: ' + score, canvas.width - 150, 50);
}
function update() {
	counter++;

	ctx.clearRect(0, 0, canvas.width, cvheight);
	cleanArray();
	//move
	backgroundImage.move();
	//ctx.globalAlpha = 0.8;

	moveObstacles();
	moveStars();

	if (counter % 10 === 0) {
		addObstacle();
	}
	if (counter % 25 === 0) {
		addObstacle();
	}
	if (counter % 30 === 0) {
		addStar();
	}

	if (lives === 0) {
		stopGame();
		console.log('you lost');
		ctx.font = '80px Josefin Sans';
		ctx.fillStyle = 'white';
		ctx.fillText('YOU LOST', canvas.width / 2, cvheight / 2);
	}
	//draw
	backgroundImage.draw();
	drawObstacles();
	drawStars();
	player.draw();
	writescore();
	player.checkCrash();
	function playSound() {
		createjs.Sound.play(powerup);
	}
}

function stopGame() {
	clearInterval(interval);
}

function movePlayer(direction) {
	player.move = true;
	player.speed++;
	switch (direction) {
		case 'up':
			player.y -= player.speed;
			player.angle -= 2;

			break;
		case 'down':
			player.y += player.speed;
			player.angle += 2;

			break;
	}
}
