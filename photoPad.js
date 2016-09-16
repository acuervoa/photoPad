"use strict";

function PhotoPadApp()
{
	var version = " v5.2",
		canvas = $("#main>canvas")[0],
		context = canvas.getContext("2d"),
		$img = $("<img>"),
		toolbar = new Toolbar($("#toolbar"));

	function setStatus(message) {

		$("#app>footer").text(message);
	}


	this.start = function() {
		$("#app>header").append(version);
		//setStatus("ready");

		if(window.File && window.FileReader)
		{
			$("#load-menu input[type=file]").change(function(e) {
				onLoadFile($(this));
			});
		}
		else
		{
			loadImage("images/default.jpg");
		}

		toolbar.toolbarButtonClicked = toolbarButtonClicked;
	}

	function toolbarButtonClicked(action)
	{	

		console.log(action);
		switch(action)
		{
			case "save":
				var url = canvas.toDataURL();
				window.open(url, "PhotoPadImage");
				break;
		}
	}

	function onLoadFile($input)
	{
		var file = $input[0].files[0];
		if(file.type.match("image.*"))
		{
			var reader = new FileReader();
			reader.onload = function() {loadImage(reader.result); };
			reader.readAsDataURL(file);
		}
		else
		{
			alert("Not a valid image type: " + file.type);
			setStatus("Error loading image!");
		}
	}

	function loadImage(url)
	{
		setStatus("Loading image");
		$img.attr("src", url);
		$img[0].onload = function()
		{
			// Here "this" is the image
			canvas.width = this.width;
			canvas.height = this.height;
			context.drawImage(this, 0, 0);
			setStatus("Choose an effect");
		}
		$img[0].onerror = function()
		{
			setStatus("Error loading image!");
		}
	}
}



$(function() {
	window.app = new PhotoPadApp();
	window.app.start();
});