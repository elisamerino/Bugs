var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var cvheight = canvas.height;
var score = 0;

window.onload = function() {
	var startButton = document.getElementById('start-button');
	startButton.onclick = function() {
		startButton.classList.toggle('pressed');
		startGame();
	};
};

function startGame() {
	function Astro(x, y, width, height, angle) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.centerX = this.x + this.width / 3;
		this.centerY = this.y + this.height / 2;
	}

	Astro.prototype.draw = function() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * 0.5 * Math.PI / 180);
		ctx.fillStyle = 'black';
		ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

		// translate to rectangle center
		// x = x + 0.5 * width
		// y = y + 0.5 * height

		ctx.restore();
	};

	var player = new Astro(100, 360, 48, 24, 1);

	var intervalId = setInterval(function() {
		document.onkeydown = function(e) {
			switch (e.keyCode) {
				case 87:
					player.y -= 5;
					player.angle--;
					setTimeout(function() {
						for (var i = 0; i > player.angle; i--) {
							player.angle++;
							console.log(player.angle);
						}
					}, 3000);

					break;
				case 83:
					player.y += 5;
					player.angle++;
					setTimeout(function() {
						for (var i = 0; i < player.angle; i++) {
							player.angle--;
							console.log(player.angle);
						}
					}, 3000);
					break;
			}
		};

		function update() {
			ctx.clearRect(0, 0, canvas.width, cvheight);
			//ctx.globalAlpha = 0.8;

			//ctx.font = '30px sans-serif';
			//ctx.fillText(score, 50, 50);
			player.draw();
			//	console.log(intervalId);
			intervalId++;
		}
		update();
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
