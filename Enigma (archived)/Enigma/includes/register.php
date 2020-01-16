<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

$email = $_POST["email"];
$password = $_POST["password"];
$name = $_POST["name"];
$school = $_POST["school"];
$day = $_POST["day"];
$month = $_POST["month"];
$year = $_POST["year"];
$captcha = $_POST["grecaptcharesponse"];

$email = strip_tags($email);
$password = strip_tags($password);
$name = strip_tags($name);
$school = strip_tags($school);
$day = strip_tags($day);
$month = strip_tags($month);
$year = strip_tags($year);

$email = stripslashes($email);
$password = stripslashes($password);
$name = stripslashes($name);
$school = stripslashes($school);
$day = stripslashes($day);
$month = stripslashes($month);
$year = stripslashes($year);

$email = filter_var($email, FILTER_SANITIZE_EMAIL);

if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
	
	require_once('recaptchalib.php');
	
	$secret = "6LdUDAwUAAAAAEn37Z7INnNyewT_4yszN5KQ2sJL";
	$response = null;
	$reCaptcha = new __ReCaptcha($secret);
	
	if ($captcha != null && $captcha != "") {
		$response = $reCaptcha->verifyResponse(
			$_SERVER["REMOTE_ADDR"],
			$captcha
		);
	}
	
	// $response->success = true; // temporary
	
	if ($response != null) {
		if ($response->success) {
			require 'class-query.php';
			require 'class-insert.php';
		
			$email = $query->escapeString(trim($email));
			$name = $query->escapeString($name);
			$school = $query->escapeString($school);
			
			$date = $year . '-' . $month . '-' . $day;
			$date = $query->escapeString($date);
			
			if ($query->emailCheck($email) === '0') {
				require 'commonFunc.php';
				$verCode = "6n5" . generateRandomString(); // 6n5 is a salt
				$forget = "g" . generateRandomString(10);   // g is a salt
				$salt = hash("sha512", generateRandomString(4));
				 
				$insert->register_user($query->escapeString(hash("sha512", $password)), $name, $email, $verCode, $salt);
				$insert->register_user_info($query->loginCheck($email)['ID'], $school, $date, $forget);
				
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
				$mail->Subject = 'ЕНИГМА - РЕГИСТРАЦИЈА';
				$mail->Body    = '<b>ЕНИГМА</b> <br> Вие сте се регистрирале на нашата веб страна. <br> Оваа порака содржи верификационен код со кој ние ќе знаеме дека вие не сте робот.<br> <br><b>'. $verCode .'</b><br><br>Ви благодариме на вашата почит. <br> Секое добро, тимот на Енигма.';
				$mail->AltBody = 'Код за верификација на вашиот профил: ' . $verCode;
				
				if(!$mail->send()) {
					echo 'Message could not be sent.';
					echo 'Mailer Error: ' . $mail->ErrorInfo;
				} else {
					header("Location: ../verify.php");
				}
				
			} else { echo 'email exists'; }
		} else { echo 'recaptcha failed, Error Code : ' . $response->errorCodes; }
	} else { echo 'recaptcha failed, Error Code : ' . $response->errorCodes; }
} else { echo 'email invalid'; }