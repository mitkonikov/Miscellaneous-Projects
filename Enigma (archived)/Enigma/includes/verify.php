<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

$in = $_POST["VERCODE"];
	
if (isset($in) && substr($in, 0, 3) === "6n5") // 6n5 is a salt
{
    $in = trim($in);
	$in = strip_tags($in);
	$in = stripslashes($in);
	require 'class-query.php';
    require 'class-insert.php';
	$in = $query->escapeString($in);
	$result = $query->verCodeCheck($in);
    if ($result != 'doesntexist') {
        $insert->verify_user($in);
		echo 'success';
    }
	else
	{
		echo 'invalid';
	}
	
	exit();
}
else
{
	echo 'invalid';
	exit();
}