var leavesArray = [];
//leaves reset the size of the player

var leaf = new Image();
leaf.src = './images/food2.png';

function Leaf(id, x, y, width, height, speed) {
	Obstacle.call(this, id, x, y, width, height, speed);
	this.pic = leaf;
}

function addLeaf() {
	leavesArray.push(
		new Leaf(
			id,
			canvas.width + 50,
			Math.floor(Math.random() * Math.floor(cvheight - 10) + 10),
			48,
			48,
			2
		)
	);
	id++;
}
