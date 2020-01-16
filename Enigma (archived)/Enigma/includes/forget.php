<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

$email = null;
$vercode = null;
$password = null;

if (isset($_POST["VERCODE"])) { $vercode = $_POST["VERCODE"]; }
if (isset($_POST["PASSWORD"])) { $password = $_POST["PASSWORD"]; }
if (isset($_POST["EMAIL"])) { $email = $_POST["EMAIL"]; }

if (isset($email) === true) {
	$email = strip_tags($email);
	$email = stripslashes($email);
	$email = filter_var($email, FILTER_SANITIZE_EMAIL);
	
	if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
		// Email is verified
		require 'class-query.php'; 
		$email = $query->escapeString($email);
		if ($query->emailCheck($email) === '1') {
			// Email is registered
			if ($query->isVerified($email) == '1') {
				// User is verified
				require 'commonFunc.php';
				
				// Remember the passCode in the datebase
				require 'class-insert.php';
				$id = $query->getID($email);
				$passCode = $query->getForgetCode($id);
				
				require '../PHPMailer/PHPMailerAutoload.php';
				
				$mail = new PHPMailer;
				
				//$mail->SMTPDebug = 3;                               // Enable verbose debug output
				
				$mail->isSMTP();
				$mail->Host = 'smtp.gmail.com';
				$mail->SMTPAuth = true;
				$mail->Username = 'enigmanikov@gmail.com';
				$mail->Password = 'arduinouno';
				$mail->SMTPSecure = 'tls';
				$mail->Port = 587;
				
				$mail->setFrom('enigmanikov@gmail.com', 'Enigma');
				$mail->addAddress($email);
				
				$mail->isHTML(true);
				
				$mail->CharSet = 'UTF-8';
				$mail->Subject = 'ЕНИГМА - РЕСЕТИРАЊЕ НА ЛОЗИНКА';
				$mail->Body    = '<b>ЕНИГМА</b> <br> Вие сте ја заборавиле вашата лозинка. <br> Оваа порака содржи верификационен код со кој ќе можете да ја промените лозинката.<br> <br><b>'. $passCode .'</b><br><br>Ви благодариме на вашата почит. <br> Секое добро, тимот на Енигма.';
				$mail->AltBody = 'Код за промена на лозинката: ' . $passCode;
				
				if(!$mail->send()) {
					echo 'Message could not be sent.';
					echo 'Mailer Error: ' . $mail->ErrorInfo;
				} else {
					echo 'success';
					exit();
				}
			} else {
				echo 'not verified';
				exit();
			}
		} else {
			echo 'not registered';
			exit();
		}
	} else {
		echo 'not valid';
		exit();
	}
} else {
	if (isset($vercode) && substr($vercode, 0, 1) === "g") {
		$vercode = strip_tags($vercode);
		$vercode = stripslashes($vercode);
		
		require 'class-query.php';
		$vercode = $query->escapeString($vercode);
		$id = $query->checkForget($vercode);
		if ($id != FALSE) {
			// Code exists and we get the ID too
			$quering = $query->getInfo($id);
			$email = $quering['Email'];
			$name = $quering['Name'];
			if ($query->isVerified($email) == '1') {
				// User is verified
				if (isset($password)) {
					// The code for finally changing the password
					$password = strip_tags($password);
					$password = stripslashes($password);
					
					$password = $query->escapeString($password);
					
					require 'class-insert.php';
					require 'commonFunc.php';
					
					$newForgetCode = "g" . generateRandomString(10);
					$insert->forget_code($id, $newForgetCode);
					$insert->update_user($id, hash("sha512", $password), $name, $email);
					
					echo 'success';
					exit();
					
				} else {
					echo 'successVer';
					exit();
				}
				
			} else {
				echo 'not verified';
				exit();
			}
			
		} else {
			echo 'not valid';
			exit();
		}
		
	} else {
		echo 'not valid';
		exit();
	}
}