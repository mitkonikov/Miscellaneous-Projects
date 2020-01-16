<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

session_start();

function loggedin() {
	if (isset($_SESSION['enigma_user'])) {
        return TRUE;
    } else if (isset($_COOKIE['enigma_user'])) {
		if (isset($_COOKIE['enigma_salt'])) {
			require 'class-query.php';
			
			$email = $_COOKIE['enigma_user'];
			$email = filter_var($email, FILTER_SANITIZE_EMAIL);
			if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
				if ($query->emailCheck($email) === '1') { // it doesn't work for some reason
					// Now we know that the email is registered!
					$quering = $query->checkSalt($email);
					if ($quering != null || $quering != false) {
						if ($quering['Salt'] == $_COOKIE['enigma_salt']) {
							$_SESSION['enigma_user'] = $quering['ID'];
							return TRUE;
						} // else report it!
					} // else report it!
				} // else report it!
			} // else report it!
		} // else report it!
		return FALSE;
	} else {
		return FALSE;
	}
	return FALSE;
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>