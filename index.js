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

var myUpdate;
var id = 0;

window.onload = function() {
	ctx.textAlign = 'center';
	ctx.font = '30px Josefin Sans';

	ctx.fillText('eat and grow bigger! ', canvas.width / 2, cvheight / 2 - 50);
	ctx.font = '18px Josefin Sans';

	ctx.fillText('to move press the upper or lower arrows or W and S', canvas.width / 2, cvheight / 2);
	startButton.onclick = function() {
		startButton.classList.toggle('pressed');
		startGame();
	};
	stopButton.onclick = function() {
		stopGame();
	};
};

function startGame() {
	loadSounds();
	countLifes();
	player = new Astro(200, 360, 60, 46, 1, 5);
	document.onkeydown = function(e) {
		e.preventDefault();
		switch (e.keyCode) {
			case 87:
			case 38:
				movePlayer('up');
				break;
			case 83:
			case 40:
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
		console.log(player.move);
	};
	interval = setInterval(update, 1000 / 50);
}

function writescore() {
	//ctx.fillStyle = 'white';
	ctx.font = '30px Josefin Sans';
	//ctx.fillText('lives: ' + lives, 50, 50);
	ctx.fillText('score: ' + score, canvas.width - 120, 50);
}
function update() {
	counter++;

	ctx.clearRect(0, 0, canvas.width, cvheight);
	cleanArray();
	//MOVE
	backgroundImage.move();

	player.move();
	obstaclesArray.move();
	starsArray.move();

	if (counter === 25 || counter % 50 === 0) {
		addObstacle();
	}
	if (counter % 75 === 0) {
		addObstacle();
	}
	if (counter % 100 === 0) {
		addStar();
	}

	//DRAWW
	//ctx.globalAlpha = 0.2;
	backgroundImage.draw();
	bgStars.draw();

	player.draw();
	obstaclesArray.draw();
	starsArray.draw();
	bgGrass.draw();
	lifeArray.draw();
	writescore();
	if (lives === 0) {
		stopGame();

		ctx.font = '80px Josefin Sans';
		var gameOver = 'game over';

		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.fillText(gameOver, canvas.width / 2, cvheight / 2);
	}
	player.checkCrash();
}

function stopGame() {
	clearInterval(interval);
}

function movePlayer(direction) {
	player.moving = true;
	player.speed++;
	switch (direction) {
		case 'up':
			player.y -= player.speed;
			player.angle -= 8;

			break;
		case 'down':
			player.y += player.speed;
			player.angle += 8;

			break;
	}
}
