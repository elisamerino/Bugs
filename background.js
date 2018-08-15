var background = new Image();
background.src = './images/cielo_scuro.png';
var bgStars = new Image();
bgStars.src = './images/stelle.png';
var bgSpeed = -2;
var starSpeed = -5;
var bgx = 0;
var backgroundImage = {
	background: background,

	move: function() {
		bgx += bgSpeed;
		bgx %= canvas.width;
	},
	draw: function() {
		ctx.drawImage(this.background, bgx, 0);

		if (bgSpeed < 0) {
			ctx.drawImage(this.background, bgx + this.background.width, 0);
		} else {
			ctx.drawImage(this.background, bfx - this.background.width, 0);
		}
	}
};

var bgStars = {
	bgStars: bgStars,
	move: function() {
		bgx += starSpeed;
		bgx %= canvas.width;
	},
	draw: function() {
		ctx.drawImage(this.bgStars, bgx, 0);

		if (bgSpeed < 0) {
			ctx.drawImage(this.bgStars, bgx + this.bgStars.width, 0);
		} else {
			ctx.drawImage(this.bgStars, bfx - this.bgStars.width, 0);
		}
	}
};
