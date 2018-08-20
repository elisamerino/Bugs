var bigBug = new Image();
bigBug.src = './images/bigbug.png';
var bugWidth = 405;
var bugHeight = 345;

function gameLoading() {
	ctx.drawImage(bgStart, 0, 0);

	//drawbug
	ctx.save();
	ctx.translate(270, 300);
	ctx.rotate(-255 * 0.5 * Math.PI / 180);
	ctx.drawImage(bigBug, bugWidth / -1.5 - 470, bugHeight / -2 + 400, bugWidth, bugHeight);
	ctx.restore();
	ctx.textAlign = 'center';
	ctx.font = '80px Josefin Sans';

	ctx.fillText('bugs!', canvas.width / 2, cvheight / 2 - 80);
	ctx.font = '18px Josefin Sans';
	ctx.fillText(
		'move up and down with the upper or lower arrow keys or W and S',
		canvas.width / 2,
		cvheight / 2 - 30
	);

	setTimeout(function() {
		ctx.fillText(
			'catch the balls to get points and grow bigger',
			canvas.width / 2,
			cvheight / 2 + 20
		);
	}, 1200);
	setTimeout(function() {
		ctx.fillText(
			'and the leaves to shrink, it could be handy.',
			canvas.width / 2,
			cvheight / 2 + 68
		);
	}, 2400);
	setTimeout(function() {
		ctx.fillText('caution with the evil beetles!', canvas.width / 2, cvheight / 2 + 116);
	}, 3600);
}
