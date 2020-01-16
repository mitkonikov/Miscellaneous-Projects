// Redirecting
// if (screen.width <= 699) {
//     document.location = "mobile.html";
// }

var featGameInitAR = 0;
var featGameInitARMain = 0;
var news = [];
var currentNews = 0;

function loading() {
	featGameInitAR = $(".feat-game").width() / $(".feat-game").height();
	featGameInitARMain = $("#feat-games").width() / $("#feat-games").height();
	
	successfulSignIn();
	getNews();
	showNews();
}

function successfulSignIn() {
	var isFired = localStorage.getItem('firstTime');
	if (isFired != '1') {
		swal({
		title: 'УСПЕШНО СТЕ НАЈАВЕНИ!',
		type: 'success',
		timer: 1500
		});
		localStorage.setItem('firstTime', '1');
	}
}

$(window).resize(function() {keepAspect();});

function keepAspect() {
	if (screen.width <= 364)
	{
		$(".feat-game").css("height", featGameInitAR * $(".feat-game").width());
		var calc = featGameInitARMain * $("#feat-games").width();
		$("#feat-games").css("height", calc * 4 + calc * 0.05);
	}
	else
	{
		$(".feat-game").css("height", (featGameInitAR * $(".feat-game").width()) / 2);
		var calc = (featGameInitARMain * $("#feat-games").width()) / 2;
		$("#feat-games").css("height", calc + calc * 0.05);
	}
}

// Event listener for loading the form
window.addEventListener("load", loading, false);