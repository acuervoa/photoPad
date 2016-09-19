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

	function toSepia(canvas, depth, intensity)
	{
		depth = depth || 20;
		intensity = intensity || 10;

		var imageData = getImageData(canvas);
		var data = imageData.data;
		for(var i=0; i < data.length; i+=4)
		{
			var grayscale = (data[i] * 0.3) +
					(data[i+1] = .59) +
					(data[i+2] * .11);

			data[i] 	= Math.min(255, grayscale + (depth *2));
			data[i+1] 	= Math.min(255, grayscale + depth);
			data[i+2] 	= Math.max(0, grayscale + intensity);
		}

		putImageData(canvas, imageData);
	}

	function makeWaves(canvas, amplitude, frequency, phase)
	{
		amplitude = amplitude || 10;
		frequency = frequency || 4;
		phase = phase || 0;

		var data = getImageData(canvas).data;
		var newImageData = getImageData(canvas);
		var newData = newImageData.data;
		var width = newImageData.width;
		var height = newImageData.height;

		// Adjust frequency to height of image
		frequency = frequency * 2 * Math.PI / height;

		for (var y = 0; y < height; y++)
		{
			var xoff = 4 * Math.floor(amplitude * Math.sin(y * frequency + phase));
			var yoff = y * 4 * width;

			for (var x = 0; x < width; x++)
			{
				var pos = yoff + x * 4;
				newData[pos + xoff] = data[pos];
				newData[pos + xoff + 1] = data[pos+1];
				newData[pos + xoff + 2] = data[pos+2];
				newData[pos + xoff + 3] = data[pos+3];
			}
		}
		putImageData(canvas, newImageData);
	}

	return {
		invert: invert,
		toBlackAndWhite: toBlackAndWhite,
		toSepia: toSepia,
		makeWaves: makeWaves
	};
}();
