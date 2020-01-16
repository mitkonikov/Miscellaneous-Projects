var firstTime_1 = true;
var beenIncorrect = false;
var logging = true; // Used for forgetting-password-form

function loading() {
    $("#password").keyup(function (event) {
        if (event.keyCode == 13) {
            logmein();
        }
    });
	
	$("#password").focusout(function() {
		if ($("#password").val() == "" || $("#password").val().length < 8) {
			alert_text("password"); // Alert that the password field is empty!
		} else {
			alert_text_dis("password"); // Disable the alert
		}
	});
}

// A function for sending an AJAX REQUEST
function logmein() {
    var email = $('input#email').val();
    var password = $('input#password').val();
    var remember = false;
	if (document.getElementById('remember').checked) { remember = true; }
    if ($.trim(email) != '') {
		alert_text_dis("email");
		if ($.trim(password) != '') {
			alert_text_dis("password");
			if (!firstTime_1 && beenIncorrect) {
				$("#alert-login-form").animate({height: 'toggle'});
			} else if (firstTime_1) { firstTime_1 = false; }
			$.ajax({
				type: "POST",
				url: "../includes/login.php",
				data: { EMAIL : email, PASSWORD : password, REMEMBER: remember },
				success: function (response) {
					if (response == "success") {
						// Redirect to home
						window.location = "home.php";
					} else if (response == "Password is incorrect") {
						alert_text("password");
						$("#form-msg").text("Лозинката е погрешна!");
						$("#alert-login-form").animate({height: 'toggle'});
						beenIncorrect = true;
					} else if (response == "Email doesnt exist") {
						alert_text("email");
						$("#form-msg").text("Овој е-маил не е регистриран!");
						$("#alert-login-form").animate({height: 'toggle'});
						beenIncorrect = true;
					} else if (response == "not verified") {
						// Redirect to verify.php for verification
						window.location = "verify.php";
					} else if (response == "Email isnt valid") {
						alert_text("email");
						$("#form-msg").text("Овој е-маил не е валиден!");
						$("#alert-login-form").animate({height: 'toggle'});
						beenIncorrect = true;
					} else {
						$("#form-msg").text("Се појави проблем во вашата најава. Пробајте пак да се најавите. Администраторот е известен!");
						$("#alert-login-form").animate({height: 'toggle'});
						beenIncorrect = true;
						console.log(response);
					}
				}
			});
		} else {
			alert_text("password"); // Alert that the password field is empty!
		}
    } else {
		alert_text("email"); // Alert that the email field is empty!
	}
}

function forgetHide() {
	if (logging) {
		$("#login-password").animate({height: 'toggle'}); // Password Form
		$("#logging-form-btns").animate({height: 'toggle'}); // Btns from Logging Form
		$("#forgetBtn").text(" Најави се "); // Becomes like a back button
		$("#forgetMeBtn").show(); // Shows the main button for sending msg.
		$("#login-form").animate({height: "12em"}); // The whole form shrinks
		logging = false;
	} else {
		$("#login-form").animate({height: "18em"}); // The whole form extends
		$("#logging-form-btns").animate({height: 'toggle'}); // Btns from Logging Form
		$("#login-password").animate({height: 'toggle'}); // Password Form
		$("#forgetMeBtn").hide(); // Hides the main button for sending msg.
		$("#forgetBtn").text(" Ја заборавив лозинката "); // resets the "I forget my password" button
		logging = true;
	}
}

function forgetme() {
	var email = $('input#email').val(); // Gets the email
	
    if ($.trim(email) != '') { // Preliminary check
		alert_text_dis("email");
		
		if (!firstTime_1 && beenIncorrect) {
			$("#alert-login-form").animate({height: 'toggle'});
		} else if (firstTime_1) { firstTime_1 = false; }
		
		$.ajax({
			type: "POST",
			url: "../includes/forget.php",
			data: { EMAIL : email },
			success: function (response) {
				if (response == "success") {
					// Redirect to forget
					window.location = "forget.php";
				} else if (response == "not registered") {
					alert_text("email");
					$("#form-msg").text("Овој е-маил не е регистриран!");
					$("#alert-login-form").animate({height: 'toggle'});
					beenIncorrect = true;
				} else if (response == "not verified") {
					// Redirect to verify.php for verification
					window.location = "verify.php";
				} else if (response == "not valid") {
					alert_text("email");
					$("#form-msg").text("Овој е-маил не е валиден!");
					$("#alert-login-form").animate({height: 'toggle'});
					beenIncorrect = true;
				} else if (response == "no input") {
					alert_text("email"); // Alert that the email field is empty!
				} else {
					$("#form-msg").text("Се појави проблем. Пробајте пак. Администраторот е известен!");
					$("#alert-login-form").animate({height: 'toggle'});
					beenIncorrect = true;
					console.log(response);
				}
			}
		});
		
    } else {
		alert_text("email"); // Alert that the email field is empty!
	}
}

// Event listener for loading the form
window.addEventListener("load", loading, false);

$(document).ready(function() {
    if ($('#alert-verified-form').length) {
		swal({
		title: 'УСПЕШНО СТЕ ВЕРИФИКУВАН!',
		type: 'success',
		timer: 1500
		});
	}
	
	if ($('#alert-changed-form').length) {
		swal({
		title: 'УСПЕШНО ЈА ПРОМЕНИВТЕ ЛОЗИНКАТА!',
		type: 'success',
		timer: 1500
		});
	}
});