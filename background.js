var background = new Image();
background.src = './images/bg.png';
var bgStars = new Image();
bgStars.src = './images/bg2.png';
var bgGrass = new Image();
bgGrass.src = './images/grass.png';
var bgSpeed = -4;
var starSpeed = -5;
var grassSpeed = -8;
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
var bgGrass = {
	bgGrass: bgGrass,
	move: function() {
		bgx += starSpeed;
		bgx %= canvas.width;
	},
	draw: function() {
		ctx.drawImage(this.bgGrass, bgx, 0);

		if (bgSpeed < 0) {
			ctx.drawImage(this.bgGrass, bgx + this.bgGrass.width, 0);
		} else {
			ctx.drawImage(this.bgGrass, bfx - this.bgGrass.width, 0);
		}
	}
};
