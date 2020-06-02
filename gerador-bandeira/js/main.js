function drawTextAlongArc(context, str, centerX, centerY, radius, angle){
		context.save();
		context.translate(centerX, centerY);
		context.rotate(-1 * angle / 2);
		context.rotate(-1 * (angle / str.length) / 2);
		for (var n = 0; n < str.length; n++) {
			context.rotate(angle / str.length);
			context.save();
			context.translate(0, -1 * radius);
			var char = str[n];
			context.fillText(char, 0, 0);
			context.restore();
		}
		context.restore();
}

function demo() {
	c.width = 500;
	c.height = 500;
	render();

}

function render() {

	var hue = +rHue.value, sat = +rSat.value, l = +rL.value;

	ctx.clearRect(0, 0, c.width, c.height);
	ctx.globalCompositeOperation = "source-over";
	ctx.drawImage(bandeiraCustomizada, 0, 0, c.width, c.height);

	// adjust "lightness"
	ctx.globalCompositeOperation = l < 100 ? "color-burn" : "color-dodge";
	// for common slider, to produce a valid value for both directions
	l = l >= 100 ? l - 100 : 100 - (100 - l);
	ctx.fillStyle = "hsl(0, 50%, " + l + "%)";
	ctx.fillRect(0, 0, c.width, c.height);

	// adjust saturation
	ctx.globalCompositeOperation = "saturation";
	ctx.fillStyle = "hsl(0," + sat + "%, 50%)";
	ctx.fillRect(0, 0, c.width, c.height);
	// adjust hue
	ctx.globalCompositeOperation = "hue";
	ctx.fillStyle = "hsl(" + hue + ",1%, 50%)";
	ctx.fillRect(0, 0, c.width, c.height);

	// clip
	ctx.globalCompositeOperation = "destination-in";
	ctx.drawImage(bandeiraCustomizada, 0, 0, c.width, c.height);
	ctx.globalCompositeOperation = "source-over";
	ctx.font = "50px Roboto Mono, monospace";
	ctx.textAlign = "center";
	ctx.fillStyle = "white";

	var centerX = (c.width / 2)-0;
	var centerY = c.height - 260;
	var angle = Math.PI * -0.55; // radians
	var radius = -225;

	drawTextAlongArc(ctx, "ANTIFASCISTA"+((p.checked) ? 'S' : ''), centerX, centerY, radius, angle);

	var centerX = (c.width / 2)-0;
	var centerY = c.height - 245;
	upperNome = nome.value.toUpperCase();
	var angle = upperNome.length/7; // radians
	var radius = 185;
	drawTextAlongArc(ctx, upperNome, centerX, centerY, radius, angle);
	dataUrl = c.toDataURL();


	imageFoo = document.createElement('img');
	imageFoo.setAttribute("id", "bandeira-customizada");
	imageFoo.src = dataUrl;
	toggleImg = document.getElementById('toggle');
	toggleImg.appendChild(imageFoo);
	if(toggleImg.childElementCount >= 1){
		toggleImg.removeChild(toggleImg.childNodes[0]);
	}

	c.style.display="none";

}

// TODO: Converts canvas to an image and save using a button
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}