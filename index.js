var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var cvheight = canvas.height;
var score = 0;
var lives = 5;
var interval = 0;

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
	var timeGap = Math.floor(Math.random() * Math.floor(100));
	var player = new Astro(200, 360, 48, 24, 1, 5);

	var intervalId = setInterval(function() {
		document.onkeydown = function(e) {
			switch (e.keyCode) {
				case 87:
					player.speed++;
					player.y -= player.speed;

					player.angle -= 1.5;
					if (player.angle < 0) {
						setTimeout(function() {
							for (var i = 0; i > player.angle - 3; i--) {
								player.angle++;
							}
						}, 3000);
					}

					break;
				case 83:
					player.speed++;
					player.y += player.speed;

					player.angle += 1.5;

					if (player.angle > 0) {
						setTimeout(function() {
							for (var i = 0; i < player.angle + 3; i++) {
								player.angle--;
							}
						}, 3000);
					}
					break;
			}
			if (player.y > cvheight) {
				player.y = 0;
			} else if (player.y < 0) {
				player.y = cvheight;
			}
			player.speed = 5;
		};
		function writescore() {
			//ctx.fillStyle = 'white';
			ctx.font = '30px Josefin Sans';
			ctx.fillText('lives: ' + lives, 50, 50);
			ctx.fillText('score: ' + score, canvas.width - 150, 50);
		}
		function update() {
			ctx.clearRect(0, 0, canvas.width, cvheight);
			cleanArray();
			//ctx.globalAlpha = 0.8;

			//obstacle.move();
			moveObstacles();
			//obstacle.draw();
			drawObstacles();
			moveStars();
			drawStars();
			player.draw();
			player.checkCrash();
			writescore();
			//	console.log(intervalId);
			intervalId++;
		}
		update();

		if (intervalId % 10 === 0) {
			addObstacle();
		}
		if (intervalId % 25 === 0) {
			addObstacle();
			//console.log(intervalId);
		}
		if (intervalId % 30 === 0) {
			addStar();
		}

		if (lives === 0) {
			stopGame();
			console.log('you lost');
			ctx.font = '80px Josefin Sans';
			ctx.fillStyle = 'white';
			ctx.fillText('YOU LOST', canvas.width / 2, cvheight / 2);
		}
	}, 1000 / 10);

	interval = intervalId;
}

function stopGame() {
	console.log(interval);
	clearInterval(interval);
}
/*

		document.onkeydown = function(e) {
			switch (e) {
				case 87: //w
					Astro.prototype.radius -= 20;
					console.log('up');
					break;
				case 83: //s
					Astro.prototype.radius += 20;
					console.log('down');
					break;
			}
*/
