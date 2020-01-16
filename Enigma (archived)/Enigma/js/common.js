function showNews() {
	window.setInterval(function () {
		$("#news").text(news[currentNews]);
		
		if (currentNews == news.length - 1) {
			currentNews = 0;
		} else {
			currentNews++;
		}
	}, 5000);
}

function getNews() {
	$.ajax({
		type: "POST",
		url: "../includes/news.php",
		data: {},
		success: function (response) {
			news = response.split("///");
		}
	});
}

function loggingOut() {
	localStorage.setItem('firstTime', '');
	window.location = "index.php?logout=1";
}

function loadingC() {
	$("#help_trending").tooltipster({
		animation: 'fade',
		delay: 200,
		theme: 'tooltipster-borderless',
		content: "Новости",
		side: 'right'
	});
	
	$("#help_stats").tooltipster({
		animation: 'fade',
		delay: 200,
		theme: 'tooltipster-borderless',
		content: "Статистика во моментот",
		side: 'right'
	});
}

// Alert Functions
function alert_text(text_id) {
	$("#" + text_id).css("background-color", "rgba(255, 50, 50, 0.5)");
	$("#" + text_id).css("width", "85%");
	$("#" + text_id + "-alert-sign").show();
}

function alert_text_dis(text_id) {
	$("#" + text_id).css("background-color", "rgba(255, 255, 255, 0.1)");
	$("#" + text_id + "-alert-sign").hide();
	$("#" + text_id).css("width", "100%");
}

// Event listener for loading the form
window.addEventListener("load", loadingC, false);