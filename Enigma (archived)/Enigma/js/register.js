function registerme() {
	var email = $('input#email').val();
    var password = $('input#password').val();
	var name = $('input#name').val();
	
	var school = "", day = "", month = "", year = "", captcha = "";
	
	if ($('input#school').val()) school = $('input#school').val();
	if ($('input#day').val()) day = $('input#day').val();
	if ($('input#month').val()) month = $('input#month').val();
	if ($('input#year').val()) year = $('input#year').val();
	if (grecaptcha.getResponse()) captcha = grecaptcha.getResponse();
	
	if ($.trim(email) != '') {
		alert_text_dis("email");
		if ($.trim(password) != '') {
			alert_text_dis("password");
			if ($.trim(name) != '') {
				alert_text_dis("name");
				
				// Everything is valid
				$.ajax({
					type: "POST",
					url: "../includes/register.php",
					data: { email : email, password : password, name : name, school : school, day : day, month : month, year : year, grecaptcharesponse : captcha },
					success: function (response) {
						if (response == "email invalid") {
							alert_text("email");
							// $("#form-msg").text("Овој е-маил не е регистриран!");
							// $("#alert-login-form").animate({height: 'toggle'});
							// beenIncorrect = true;
						} else if (response == "email exists") {
							alert_text("email");
						} else {
							// $("#form-msg").text("Се појави проблем во вашата најава. Пробајте пак да се најавите. Администраторот е известен!");
							// $("#alert-login-form").animate({height: 'toggle'});
							// beenIncorrect = true;
							console.log(response);
						}
					}
				});
				
			} else {
				alert_text("name"); // Alert that the name field is empty!
			}
		} else {
			alert_text("password"); // Alert that the password field is empty!
		}
	} else {
		alert_text("email"); // Alert that the email field is empty!
	}
}