<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

require 'includes/commonFunc.php';

if (isset($_GET['logout'])) { LOGOUT($_GET['logout']); } 
// if logout get var is set, call the logout function

function LOGOUT($in)
{
    if ($in == 1) {
		require 'includes/class-insert.php';
		$insert->setOnline($_SESSION['enigma_user'], '0');
		session_destroy();
		unset($_COOKIE['enigma_user']);
		unset($_COOKIE['enigma_salt']);
		setcookie('enigma_user', null, -1, '/');
		setcookie('enigma_salt', null, -1, '/');
	}
}

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
	
</head>
<body>
    <div class="row">
        <div class="large-offset-2 large-8">
			<h1 class="logo-text">Енигма</h1>
        </div>
    </div>
    <div class="row">
        <div class="large-offset-8 large-2 medium-offset-8 medium-4 small-offset-6 small-6">
            <h1 class="logo-credit"> Mitko Nikov </h1>
        </div>
    </div>
    <div class="row">
        <div class="large-offset-3 large-6 medium-offset-2 medium-8 small-offset-1 small-10 box">
            <label>
                Првата македонска веб апликација која овозможува забавна интеракција преку игри и квизови.
                Играјте квизови на различни теми со помош на најголемата база на прашања во Македонија.
                Имаме прашања за различни предмети како: Македонски, Математика, Биологија, Хемија, Физика и работиме на уште повеќе.
                ..........
            </label>
        </div>
    </div>
    <div class="foot">
        <div class="large-offset-2 large-8">
            <button type="button" class="btn home" onclick="window.location = 'login.php';"> Најави се! </button>
            <button type="button" class="btn home" onclick="window.location = 'register.php';"> Регистрирај се! </button>
        </div>
    </div>
</body>
</html>