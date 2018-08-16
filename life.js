var lifes = new Image();
lifes.src = './images/life_2.png';
var lifeArray = [];

function Life(x, y) {
	this.x = x;
	this.y = y;
	this.pic = lifes;
}
Array.prototype.draw = function() {
	for (i = 0; i < this.length; i++) {
		ctx.save();
		ctx.drawImage(this[i].pic, this[i].x, this[i].y);
		ctx.restore();
	}
};
function countLifes() {
	var dist = 36;
	for (var i = 0; i < lives; i++) {
		lifeArray.push(new Life(dist + dist * i + i * 10, 25, 36, 36));
		console.log(lives);
	}
}
