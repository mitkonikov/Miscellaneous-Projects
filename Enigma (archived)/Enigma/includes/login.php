<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

$email = $_POST["EMAIL"];
$password = $_POST["PASSWORD"];
$remember = $_POST["REMEMBER"];

$password = strip_tags($password);

$password = stripslashes($password);

require 'class-query.php';
require 'class-insert.php';

$email = filter_var($email, FILTER_SANITIZE_EMAIL);

$password = $query->escapeString(hash("sha512", $password));

if (isset($email) === true && empty($email) === false) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
	    if (isset($password) === true && empty($password) === false) {

	    	$result = $query->loginCheck($email);
	    	if ($result === 'doesntexist') {
	    		echo 'Email doesnt exist';
	    	} else if ($result['Password'] != $password) {
	    		echo 'Password is incorrect';
	    	} else if ($result['Password'] == $password) {
				if ($result['isVerified'] == '1') {
					if ($remember === "true") {
						$salt = hash("sha512", rand() . rand() . rand());
						setcookie("enigma_user", $email, time() + 24 * 60 * 60, "/");
						setcookie("enigma_salt", $salt, time() + 24 * 60 * 60, "/");
						$userID = $result['ID'];
						$insert->update_salt($userID,  $salt);
					}
					session_start();
					$_SESSION['enigma_user'] = $result['ID'];
					$insert->setOnline($result['ID'], '1');
					echo 'success';
				} else {
					echo 'not verified';
					header("Location: ../verify.php");
				}
	    	}
	    }
	} else {
	    echo 'Email isnt valid';
	    exit();
	}
}