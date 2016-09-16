var imageEffects = function()
{
	function getImageData(canvas) 
	{
		return canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
	}

	function putImageData(canvas, imageData)
	{
		canvas.getContext("2d").putImageData(imageData, 0, 0);
	}

	function invert(canvas)
	{
		var imageData = getImageData(canvas);
		var data = imageData.data;
		for (var i = 0; i < data.length; i +=4)
		{
			data[i]		= 255 - data[i];	//red
			data[i+1]	= 255 - data[i+1];	//green
			data[i+2]	= 255 - data[i+2];	//blue
			//data[i+3] is alpha
		}

		putImageData(canvas, imageData);
	}

	function toBlackAndWhite(canvas)
	{
		var imageData = getImageData(canvas);
		var data = imageData.data;
		for(var i = 0; i < data.length; i += 4)
		{
			var grayscale = (data[i] * 0.3) +
					(data[i+1] * .59) +
					(data[i+2] * .11);
			data[i] 	= grayscale;
			data[i+1] 	= grayscale;
			data[i+2] 	= grayscale;
		}

		putImageData(canvas, imageData);
	}

	return {
		invert: invert,
		toBlackAndWhite: toBlackAndWhite
	};
}();
