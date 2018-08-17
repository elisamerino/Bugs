function gameLoading() {
	ctx.drawImage(bgStart, 0, 0);
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
	}, 1500);
	setTimeout(function() {
		ctx.fillText(
			'and the leaves to shrink, it could be handy.',
			canvas.width / 2,
			cvheight / 2 + 48
		);
	}, 3000);
	setTimeout(function() {
		ctx.fillText('caution with the other beetles!', canvas.width / 2, cvheight / 2 + 96);
	}, 4500);
}
