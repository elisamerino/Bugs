var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var cvheight = canvas.height;
var score = 0;
var lives = 10;

window.onload = function() {
	startButton.onclick = function() {
		startButton.classList.toggle('pressed');
		startGame();
	};
};

function startGame() {
	var timeGap = Math.floor(Math.random() * Math.floor(100));
	var player = new Astro(130, 360, 48, 24, 1, 5);

	var intervalId = setInterval(function() {
		document.onkeydown = function(e) {
			switch (e.keyCode) {
				case 87:
					player.y -= player.speed;
					player.angle--;
					setTimeout(function() {
						for (var i = 0; i > player.angle; i--) {
							player.angle++;
						}
					}, 3000);

					break;
				case 83:
					player.y += player.speed;
					player.angle++;
					setTimeout(function() {
						for (var i = 0; i < player.angle; i++) {
							player.angle--;
							//console.log(player.angle);
						}
					}, 3000);
					break;
			}
			if (player.y <= 0 || player.y >= cvheight) {
				player.speed *= -1;
			}
		};

		function update() {
			ctx.clearRect(0, 0, canvas.width, cvheight);
			//ctx.globalAlpha = 0.8;

			//obstacle.move();
			moveObstacles();
			//obstacle.draw();
			drawObstacles();
			player.draw();
			player.checkCrash();
			//ctx.fillStyle = 'white';
			ctx.font = '30px Josefin Sans';
			ctx.fillText('lives: ' + lives, 50, 50);
			//	console.log(intervalId);
			intervalId++;
		}
		update();

		if (intervalId % 20 === 0) {
			addObstacle();
			//console.log(intervalId);
		}

		stopButton.onclick = function() {
			clearInterval(intervalId);
		};
	}, 200);
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
