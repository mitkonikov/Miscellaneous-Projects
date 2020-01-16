var fullScreenOpen = false;
var firstTime = true;

function exitHandler()
{
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)
    {
		if (fullScreenOpen) {
			$("#Canvas").hide();
			fullScreenOpen = false;
		} else {
			$("#Canvas").show();
			fullScreenOpen = true;
		}
    }
}

$(document).ready(function() {
	$("#Canvas").hide();
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
	
	$("#goFS").click(function() {
		if (firstTime) { 
			document.getElementById('Canvas').src += ''; // A FIX for Mozilla Firefox
			firstTime = false;
		}
		
		$("#Canvas").show();
		var container = document.getElementById("Canvas");
		if (container.requestFullscreen) {
			container.requestFullscreen();
		} else if (container.msRequestFullscreen) {
			container.msRequestFullscreen();
		} else if (container.mozRequestFullScreen) {
			container.mozRequestFullScreen();
		} else if (container.webkitRequestFullscreen) {
			container.webkitRequestFullscreen();
		}
	});
});