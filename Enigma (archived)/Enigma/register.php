<?php

require 'includes/commonFunc.php';

if (loggedin()) {
    header("Location: home.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    
	<!-- GLOBAL -->
    <?php include("includes/globalReq.php"); ?>
	<!-- end GLOBAL -->
	
    <script src="js/register.js"> </script>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>
	<div class="row">
			<div class="large-centered medium-centered small-collapse columns"> <!-- NEED SOME WORK -->
				<h1 class="logo-text">Енигма</h1>
			</div>
	</div>
	<div class="row">
		<div class="large-offset-8 large-2 medium-offset-8 medium-4 small-offset-6 small-6">
			<h1 class="logo-credit"> Mitko Nikov </h1>
		</div>
	</div>
	<div class="row">
		<div class="large-offset- medium-centered small-collapse columns">
			<div class="large-offset-4 large-4 medium-offset-2 medium-8 small-12 box">
				<div class="con-in-box">
					<label> Емаил *: </label>
					<input type="email" class="textbox in-box" placeholder="Емаил" id="email"/>
					
					<div id="email-alert-sign" class="alert-sign"> 
						<div class="alert-img"> </div>
					</div>
				</div>
				
				<div class="con-in-box">
					<label> Лозинка *: </label>
					<input type="password" class="textbox in-box" placeholder="Лозинка" id="password"/>
					
					<div id="password-alert-sign" class="alert-sign"> 
						<div class="alert-img"> </div>
					</div>
				</div>
				
				<div class="con-in-box">
					<label> Име и презиме *: </label>
					<input type="text" class="textbox in-box" placeholder="Име и презиме" id="name"/>
					
					<div id="name-alert-sign" class="alert-sign"> 
						<div class="alert-img"> </div>
					</div>
				</div>
				
				<label> Училиште: </label>
				<input type="text" class="textbox" placeholder="Училиште" name="school"/>
				<label> Датум на раѓање: </label>
				<input type="number" class="textbox birth" placeholder="Ден" name="day" min="1" max="31"/>
				<input type="number" class="textbox birth" placeholder="Месец" name="month" min="1" max="12"/>
				<input type="number" class="textbox birth" placeholder="Година" name="year" min="1950" max="2010"/>
				<div id="captcha-container">
					<div data-theme="dark" class="g-recaptcha" data-sitekey="6LdUDAwUAAAAABEgwM6VYdWnU5RQYe6x2ok_Uz_j" name="captcha"></div>
				</div>
				<button class="btn home" onclick="registerme();"> Регистрирај се! </button>
			</div>
		</div>
	</div>
	<div class="foot">
        <div class="large-offset-2 large-8">
            <label>Имате корисничка сметка?</label>
			<button type="button" class="btn home" onclick="window.location = 'login.php';"> Најави се! </button>
        </div>
    </div>
</body>
</html>