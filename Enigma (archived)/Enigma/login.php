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
	
    <script src="js/login.js"> </script>
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
		<div id="login-form" class="box">
			<div class="con-in-box">
				<label> Емаил: </label>
				<input type="email" class="textbox in-box" placeholder="Емаил" id="email"/>
				<div id="email-alert-sign" class="alert-sign"> 
					<div class="alert-img"> </div>
				</div>
			</div>
			<div class="con-in-box" id="login-password">
				<label> Лозинка: </label>
				<input type="password" class="textbox in-box" placeholder="Лозинка" id="password"/>
				<div id="password-alert-sign" class="alert-sign"> 
					<div class="alert-img"> </div>
				</div>
			</div>
			<div class="con-in-box">
				<div id="logging-form-btns">
					<input type="checkbox" id="remember" > <label id="rememberLbl"> Запомни ме </label>
					<button id="loggingBtn" type="button" class="btn home" onclick="logmein();"> Најави се </button>
				</div>
				<button id="forgetMeBtn" type="button" class="btn home" onclick="forgetme();" style="display: none;"> Испрати порака </button>
				<button id="forgetBtn" class="square" onclick="forgetHide();"> Ја заборавив лозинката </button>
			</div>
		</div>
		<div class="alert-container" id="alert-login-form" style="display:none;">
			<label id="form-msg"> </label>
		</div>
		<?php
			if (isset($_GET['verified'])) {
				if ($_GET['verified'] == 1) {
					echo '<div class="alert-container-success" id="alert-verified-form">
							<label> Вие сте успешно верификувани! </label>
						</div>';
				}
			}
			
			if (isset($_GET['changed'])) {
				if ($_GET['changed'] == 1) {
					echo '<div class="alert-container-success" id="alert-changed-form">
							<label> Вие успешно ја променивте лозинката! </label>
						</div>';
				}
			}
		?>
	</div>
    <div class="foot">
        <div class="row">
            <div class="large-12 medium-12 small-12">
                <button type="button" class="btn home" onclick="window.location = 'index.php';"> Врати се на почетна </button>
                <button type="button" class="btn home" onclick="window.location = 'register.php';"> Регистрирај се! </button>
            </div>
        </div>
    </div>
</body>
</html>