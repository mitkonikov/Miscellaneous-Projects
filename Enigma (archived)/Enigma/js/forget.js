var firstTime_1 = true;
var beenIncorrect = false;
var changePass = false;

function verifymein() {
	var vercode = $("#forget").val(); // It gets the verification code from the textbox
	vercode = $.trim(vercode);
	
	if (!changePass) {
		if (vercode != '') { // If the code is not empty
			// Disable the alert (in case that there were no alert, it would do nothing)
			alert_text_dis("forget");
			
			if (!firstTime_1 && beenIncorrect) { // alert-forget-form's code
				$("#alert-forget-form").animate({height: 'toggle'});
			} else if (firstTime_1) { firstTime_1 = false; }
			
			// Post the verification code to the php
			$.ajax({
				type: "POST",
				url: "../includes/forget.php",
				data: { VERCODE : vercode },
				success: function (response) {
					if (response == "successVer") {
						showChangeExtension();
					} else if (response == "not valid") {
						alert_text("verify");
						$("#form-msg").text("Кодот е погрешен!");
						$("#alert-verify-form").animate({height: 'toggle'});
						beenIncorrect = true;
					} else if (response == "not verified") {
						// Redirect to verify
						window.location = "verify.php";
					} else {
						$("#form-msg").text("Се појави проблем. Пробајте пак. Администраторот е известен!");
						$("#alert-verify-form").animate({height: 'toggle'});
						beenIncorrect = true;
						console.log(response);
					}
				}
			});
		} else {
			alert_text("forget"); // Alert that the verification code field is empty!
		}
	} else {
		var password = $("#newPass").val();
		password = $.trim(password);
		
		if (vercode != '') { // If the code is not empty
			// Disable the alert (in case that there were no alert, it would do nothing)
			alert_text_dis("forget");
			
			if (password != '') {
				alert_text_dis("newPass");
				
				if (!firstTime_1 && beenIncorrect) { // alert-forget-form's code
					$("#alert-forget-form").animate({height: 'toggle'});
				} else if (firstTime_1) { firstTime_1 = false; }
				
				// Post the verification code to the php
				$.ajax({
					type: "POST",
					url: "../includes/forget.php",
					data: { VERCODE : vercode, PASSWORD : password },
					success: function (response) {
						if (response == "success") {
							// Redirect to login
							window.location = "login.php?changed=1";
						} else if (response == "not valid") {
							alert_text("verify");
							$("#form-msg").text("Кодот е погрешен!");
							$("#alert-verify-form").animate({height: 'toggle'});
							beenIncorrect = true;
						} else if (response == "not verified") {
							// Redirect to verify
							window.location = "verify.php";
						} else {
							$("#form-msg").text("Се појави проблем. Пробајте пак. Администраторот е известен!");
							$("#alert-verify-form").animate({height: 'toggle'});
							beenIncorrect = true;
							console.log(response);
						}
					}
				});
			
			} else {
				alert_text("newPass"); // Alert that the verification code field is empty!
			}
		} else {
			alert_text("forget"); // Alert that the verification code field is empty!
		}
	}
}

function showChangeExtension() {
	$("#change-pass").animate({height : 'toggle'});
	changePass = true;
}