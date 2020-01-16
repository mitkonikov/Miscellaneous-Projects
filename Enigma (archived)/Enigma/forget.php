<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

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
	
	<script src="js/forget.js"> </script>
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
		<div class="large-offset-4 large-4 medium-offset-3 medium-6 small-12 columns">
			<div class="box" id="ver-form">
				<label> Верификационен Код <br> за промена на лозинката: </label>
				<input type="text" class="textbox" placeholder="Верификационен Код" id="forget" style="float:left;"/>
				<div id="forget-alert-sign" class="alert-sign">
					<div class="alert-img"> </div>
				</div>
				
				<div id="change-pass" style="display: none; clear: both;">
					<label> Нова лозинка: </label>
					<input type="password" class="textbox" placeholder="Нова лозинка" id="newPass" style="float:left;"/>
					<div id="newPass-alert-sign" class="alert-sign">
						<div class="alert-img"> </div>
					</div>
				</div>
				
				<button type="button" class="btn home" onclick="verifymein();" style="font-size: 1.2em;"> Промени ја лозинката! </button>
			</div>
			<div class="alert-container" id="alert-forget-form" style="display:none;">
				<label id="form-msg"> </label>
			</div>
		</div>
	</div>
</body>
</html>