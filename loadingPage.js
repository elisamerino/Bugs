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
	ctx.font = '48px Josefin Sans';

	ctx.fillText('eat and grow bigger! ', canvas.width / 2, cvheight / 2 - 100);
	ctx.font = '18px Josefin Sans';
	ctx.fillText(
		'to move up and down press the upper or lower arrow keys or W and S',
		canvas.width / 2,
		cvheight / 2 - 60
	);

	setTimeout(function() {
		ctx.fillText('catch the balls to get points and grow bigger', canvas.width / 2, cvheight / 2);
	}, 1200);
	setTimeout(function() {
		ctx.fillText(
			'and the leaves to shrink, it could be handy.',
			canvas.width / 2,
			cvheight / 2 + 48
		);
	}, 2400);
	setTimeout(function() {
		ctx.fillText('caution with the evil beetles!', canvas.width / 2, cvheight / 2 + 96);
	}, 3600);
}
