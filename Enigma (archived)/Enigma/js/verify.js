var firstTime_1 = true;
var beenIncorrect = false;

function verifymein() {
	var vercode = $("#verify").val(); // It gets the verification code from the textbox
	vercode = $.trim(vercode);
	if ($.trim(vercode) != '') { // If the code is not empty
		// Disable the alert (in case that there were no alert, it would do nothing)
		alert_text_dis("verify");
		
		if (!firstTime_1 && beenIncorrect) { // alert-verify-form's code
			$("#alert-verify-form").animate({height: 'toggle'});
		} else if (firstTime_1) { firstTime_1 = false; }
		
		// Post the verification code to the php
		$.ajax({
			type: "POST",
			url: "../includes/verify.php",
			data: { VERCODE : vercode },
			success: function (response) {
				if (response == "success") {
					// Redirect to login
					window.location = "login.php?verified=1";
				} else if (response == "invalid") {
					alert_text("verify");
					$("#form-msg").text("Кодот е погрешен!");
					$("#alert-verify-form").animate({height: 'toggle'});
					beenIncorrect = true;
				} else {
					$("#form-msg").text("Се појави проблем. Пробајте пак. Администраторот е известен!");
					$("#alert-verify-form").animate({height: 'toggle'});
					beenIncorrect = true;
					console.log(response);
				}
			}
		});
	} else {
		alert_text("verify"); // Alert that the verification code field is empty!
	}
}