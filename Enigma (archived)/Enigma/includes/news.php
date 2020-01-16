<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

require 'class-query.php';

$news = $query->newsReadout();

foreach ($news as $value)
    echo $value."///";

exit();

?>