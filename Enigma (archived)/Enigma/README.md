# Enigma
Macedonian Educational Games

This is going to be a web application with Macedonian educational games.
We are making this web app for a local contest.

# TODO:
- Home
- Login / Register
- Game
- Profile
  -- Statistics
- Database
  -- Ke se smenat include php filovto


require_once('recaptchalib.php');

$privatekey = "6LdUDAwUAAAAAEn37Z7INnNyewT_4yszN5KQ2sJL";
$resp = recaptcha_check_answer ($privatekey,
                              $_SERVER["REMOTE_ADDR"],
                              $_POST["recaptcha_challenge_field"],
                              $_POST["recaptcha_response_field"]);
if (!$resp->is_valid) {
  // What happens when the CAPTCHA was entered incorrectly
  die "something went wrong";
} else {