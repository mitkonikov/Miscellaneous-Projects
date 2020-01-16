<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

require 'includes/commonFunc.php';

if (loggedin() == FALSE) {
    header("Location: index.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>

	<!-- GLOBAL -->
    <?php include("includes/globalReq.php"); ?>
	<!-- end GLOBAL -->
	
	<script src="js/quiz.js"> </script>
	<link rel="stylesheet" href="css/style_quiz.css"/>
</head>
<body>
    <div id="main-container">
	
		<!-- HEADER -->
		<?php include("header.php"); ?>
		
		<div class="row" style="clear: both;">
			<div id="quiz_selector" class="box">
				<div id="quiz_sel_info">
					
				</div>
				<div id="quiz_sel_subject">
				
				</div>
				<div id="quiz_sel_dif">
				
				</div>
			</div>
		</div>
	</div>
</body>
</html>